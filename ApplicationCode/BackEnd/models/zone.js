const db = require("../db/connection");

class Zone {
  static createZone(zone) {
    return new Promise((resolve, reject) => {
      const {
        engine_serial_no,
        defect_name,
        action_taken,
        user,
        station_id,
        screen_no,
        operator_name,
      } = zone;
      const query = `
        INSERT INTO zone 
        (engine_serial_no, defect_name, action_taken, user, station_id, screen_no, operator_name) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        query,
        [
          engine_serial_no,
          defect_name,
          action_taken,
          user,
          station_id,
          screen_no,
          operator_name,
        ],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  static createBulkZones(zones) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(zones) || zones.length === 0) {
        reject(new Error("Invalid input: expected an array of zones"));
        return;
      }

      const insertQuery = `
        INSERT INTO zone 
        (engine_serial_no, defect_name, action_taken, user, station_id, screen_no, operator_name) 
        VALUES ?`;
      const values = zones.map((zone) => [
        zone.engine_serial_no,
        zone.defect_name,
        zone.action_taken,
        zone.user,
        zone.station_id,
        zone.screen_no,
        zone.operator_name,
      ]);

      db.query(insertQuery, [values], (insertErr, insertResult) => {
        if (insertErr) {
          reject(insertErr);
          return;
        }
        resolve(insertResult);
      });
    });
  }

  static getAllZones() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM zone";
      db.query(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  static getZoneById(zoneId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM zone WHERE id = ?";
      db.query(query, [zoneId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (rows.length === 0) {
          resolve(null);
          return;
        }
        resolve(rows[0]);
      });
    });
  }

  static getZonesByDate(date) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM zone
        WHERE DATE(updated_at) = ?
        ORDER BY updated_at DESC
      `;
      db.query(query, [date], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  static getZonesByDateAndId(date, zoneId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM zone
        WHERE DATE(updated_at) = ? AND screen_no = ?
        ORDER BY updated_at DESC
      `;
      db.query(query, [date, zoneId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }



  static updateZone(zoneId, zoneData) {
    return new Promise((resolve, reject) => {
      const {
        engine_serial_no,
        defect_name,
        action_taken,
        user,
        station_id,
        screen_no,
        operator_name,
      } = zoneData;
      const query = `
        UPDATE zone 
        SET engine_serial_no = ?, defect_name = ?, action_taken = ?, user = ?, station_id = ?, screen_no = ?, operator_name = ? 
        WHERE id = ?`;
      db.query(
        query,
        [
          engine_serial_no,
          defect_name,
          action_taken,
          user,
          station_id,
          screen_no,
          operator_name,
          zoneId,
        ],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  static deleteZone(zoneId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM zone WHERE id = ?";
      db.query(query, [zoneId], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

module.exports = Zone;
