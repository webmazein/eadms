const RaisedDefects = require("../models/raisedDefects");
const Defects = require("../models/defects")
const Operators = require("../models/operators");
const net = require('net');

const PLC_IP_ADDRESS = '192.168.1.110'; // Replace with your PLC's IP address
const PLC_PORT = 23; // Replace with your PLC's TCP port
const { clients } = require('../websocket-server'); 
const WebSocket = require('ws');

// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 1111 });
// let clients = [];

// wss.on("connection", (ws) => {
//   clients.push(ws);
//   console.log("New client connected");
//   ws.on("close", () => {
//     clients = clients.filter((client) => client !== ws);
//     console.log("Client disconnected");
//   });
// });
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

exports.createRaisedDefect = async (req, res) => {
  try {
    const newDefect = await RaisedDefects.createRaisedDefect(req.body);
    // const defectIds = req.body.defect.map((def) => def.value);
    // const defects = await Promise.all(
    //   defectIds.map((id) => Defects.getDefectById(id))
    // );
    
    // const operators = await Promise.all(
    //   defects.map((id) => Operators.getOperatorByStationId(id.station_id))
    // );
    
    notifyClients({
      data : newDefect.data.zoneInsertData
    });
    res.status(201).json({
      message: "Raised Defect created successfully",
      status: 201,
      error: null,
    });
    
    // Connect to the PLC
   const plcClient = new net.Socket();
    plcClient.connect(PLC_PORT, PLC_IP_ADDRESS, () => {
      // Send a message to the PLC
      const message = defects.map((def) => def.station_id).join(",");
      plcClient.write(message, 'utf-8', () => {
        console.log('Message sent');
      });
    });

    // Handle errors
    plcClient.on('error', (err) => {
      console.error('Error:', err.message);
    });

    // Handle connection close
    plcClient.on('close', () => {
      console.log('PLC connection closed');
    });
    
  } catch (err) {
    console.error("Error creating raised defect:", err);
    res.status(500).json({
      message: "Error creating raised defect",
      status: 500,
      error: err.message,
    });
  }
};

exports.createBulkRaisedDefect = async (req, res) => {
  try {
    await RaisedDefects.createBulkRaisedDefects(req.body);
    res.status(201).send("Bulk Raised Defect created successfully");
  } catch (err) {
    console.error("Error creating bulk raised defect:", err);
    res.status(500).send("Error creating bulk raised defect");
  }
};

exports.getAllRaisedDefects = async (req, res) => {
  try {
    const raisedDefects = await RaisedDefects.getAllRaisedDefects();
    res.json(raisedDefects);
  } catch (err) {
    console.error("Error getting raised defects:", err);
    res.status(500).send("Error getting raised defects");
  }
};

exports.getRaisedDefectById = async (req, res) => {
  try {
    const raisedDefectId = req.params.id;
    const raisedDefect = await RaisedDefects.getRaisedDefectById(
      raisedDefectId
    );
    if (!raisedDefect) {
      res.status(404).send("Raised Defect not found");
      return;
    }
    res.json(raisedDefect);
  } catch (err) {
    console.error("Error getting raised defect:", err);
    res.status(500).send("Error getting raised defect");
  }
};

exports.updateRaisedDefect = async (req, res) => {
  try {
    const raisedDefectId = req.params.id;
    await RaisedDefects.updateRaisedDefect(raisedDefectId, req.body);
    res.send("Raised Defect updated successfully");
  } catch (err) {
    console.error("Error updating raised defect:", err);
    res.status(500).send("Error updating raised defect");
  }
};

exports.deleteRaisedDefect = async (req, res) => {
  try {
    const raisedDefectId = req.params.id;
    await RaisedDefects.deleteRaisedDefect(raisedDefectId);
    res.status(200).send("Raised Defect deleted successfully");
  } catch (err) {
    console.error("Error deleting raised defect:", err);
    res.status(500).send("Error deleting raised defect");
  }
};

exports.defectsReport = async (req, res) => {
  try {
    const response = await RaisedDefects.getDefectReports();
    res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

