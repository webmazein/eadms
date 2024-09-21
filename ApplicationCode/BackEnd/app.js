const https = require('https');
const express = require("express");
const XLSX = require("xlsx");
const { sequelize, Data } = require("./models/model");
const path = require("path");
const userRoutes = require("./routes/UserRoute");
const defectRoutes = require("./routes/DefectsRoute");
const operatorsRoutes = require("./routes/OperatorsRoute");
const actionsRoutes = require("./routes/ActionsRoute");
const raisedDefect = require("./routes/RaisedDefectsRoute");
const zoneRoutes = require("./routes/ZoneRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const moment = require("moment");
const db = require("./db/connection");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const serverAddress = process.env.SERVER_ADDRESS;

const server = http.createServer(app);

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/zone", zoneRoutes);
app.use("/defects", defectRoutes);
app.use("/operators", operatorsRoutes);
app.use("/actions", actionsRoutes);
app.use("/raise_defects", raisedDefect);
const { clients } = require('./websocket-server'); 
const WebSocket = require('ws');

app.get("/api/zone-records", async (req, res) => {
  try {
    const currentDate = moment().format("YYYY-MM-DD");
    const query = `
      SELECT *
      FROM zone
      WHERE DATE(updated_at) = ? ORDER BY updated_at DESC
    `;

    db.query(query, [currentDate], async (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Error fetching zone records for current day",
          error: err.message,
        });
      }

      // Fetch additional data (defects and operators) for each zone record
      const dataPromises = rows.map(async (row) => {
        const { defect_name, station_id } = row;

        // Fetch defect information
        const defectQuery = "SELECT * FROM defects WHERE defect_name = ?";
        const defect = await new Promise((resolve, reject) => {
          db.query(defectQuery, [defect_name], (err, defectResult) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(defectResult[0]);
          });
        });

        // Fetch operator information
        const operatorQuery = "SELECT * FROM operators WHERE station_id = ?";
        const operator = await new Promise((resolve, reject) => {
          db.query(operatorQuery, [station_id], (err, operatorResult) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(operatorResult[0]);
          });
        });

        return {
          ...row,
          defect_name_hi: defect ? defect.defect_name_hi : '',
          defects: defect ? [defect] : [], // Format defects as array
          operators: operator ? [operator] : [], // Format operators as array
        };
      });

      // Execute all promises to fetch additional data
      const formattedData = await Promise.all(dataPromises);

      res.status(200).json({
        status: 200,
        message: "Zone records fetched successfully for current day",
        error: null,
        data: formattedData,
      });
    });
  } catch (error) {
    console.error("Error fetching zone records:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.get("/api/all-zone-records", async (req, res) => {
  try {
    // Query to fetch all records from the 'zone' table
    const query = `
      SELECT *
      FROM zone
      ORDER BY updated_at DESC
    `;

    db.query(query, async (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Error fetching all zone records",
          error: err.message,
        });
      }

      // Fetch additional data (defects and operators) for each zone record
      const dataPromises = rows.map(async (row) => {
        const { defect_name, station_id } = row;

        // Fetch defect information
        const defectQuery = "SELECT * FROM defects WHERE defect_name = ?";
        const defect = await new Promise((resolve, reject) => {
          db.query(defectQuery, [defect_name], (err, defectResult) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(defectResult[0]);
          });
        });

        // Fetch operator information
        const operatorQuery = "SELECT * FROM operators WHERE station_id = ?";
        const operator = await new Promise((resolve, reject) => {
          db.query(operatorQuery, [station_id], (err, operatorResult) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(operatorResult[0]);
          });
        });

        return {
          ...row,
          defects: defect ? [defect] : [], // Format defects as array
          operators: operator ? [operator] : [], // Format operators as array
        };
      });

      // Execute all promises to fetch additional data
      const formattedData = await Promise.all(dataPromises);

      res.status(200).json({
        status: 200,
        message: "All zone records fetched successfully",
        error: null,
        data: formattedData,
      });
    });
  } catch (error) {
    console.error("Error fetching all zone records:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
});



// Route to handle inserting or updating timer value
app.post('/settings', (req, res) => {
  const { alert_timer } = req.body;

  // Check if a record already exists
  const selectQuery = 'SELECT * FROM settings LIMIT 1';
  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error('Error selecting timer value:', err);
      res.status(500).json({ error: 'Failed to check timer value' });
      return;
    }

    if (rows.length > 0) {
      // If record exists, update it
      const updateQuery = `UPDATE settings SET alert_timer = ${alert_timer}`;
      db.query(updateQuery, (err, result) => {
        if (err) {
          console.error('Error updating timer value:', err);
          res.status(500).json({ error: 'Failed to update timer value' });
          return;
        }
        console.log('Timer value updated successfully');
        res.status(200).json({ message: 'Timer value updated successfully' });
      });
    } else {
      // If no record exists, insert a new one
      const insertQuery = `INSERT INTO settings (alert_timer) VALUES (${alert_timer})`;
      db.query(insertQuery, (err, result) => {
        if (err) {
          console.error('Error inserting timer value:', err);
          res.status(500).json({ error: 'Failed to add timer value' });
          return;
        }
        console.log('Timer value added successfully');
        res.status(201).json({ message: 'Timer value added successfully' });
      });
    }

    function notifyClients(data) {
      console.log("Notifying clients:", JSON.stringify(data));
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          try {
            client.send(JSON.stringify(data));
          } catch (error) {
            console.error("Error sending message to client:", error);
          }
        }
      });
    }
    const setting_alert_timer = {
      timer : alert_timer
    }
    notifyClients(setting_alert_timer)

  });
});

// Route to fetch alert_timer value
app.get('/settings/alert_timer', (req, res) => {
  const selectQuery = 'SELECT alert_timer FROM settings LIMIT 1';
  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error('Error fetching alert_timer:', err);
      res.status(500).json({ error: 'Failed to fetch alert_timer value' });
      return;
    }

    if (rows.length > 0) {
      const alertTimerValue = rows[0].alert_timer;
      res.status(200).json({ alert_timer: alertTimerValue });
    } else {
      res.status(404).json({ message: 'Alert timer value not found' });
    }
  });
});

async function uploadData(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  try {
    await sequelize.sync();
    for (const row of data) {
      await Data.create(row);
    }
    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

app.get("/upload", (req, res) => {
  const filePath = path.join(__dirname, "data.xlsx");
  uploadData(filePath)
    .then(() => res.send("File parsed and data inserted successfully"))
    .catch((err) => res.status(500).send("Error uploading data: " + err));
});

app.get("/fetch-data", async (req, res) => {
  try {
    const data = await Data.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error);
  }
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, serverAddress, () => {
  console.log(`Server is running on ${serverAddress}:${PORT}`);
});

// module.exports = { notifyClients };
