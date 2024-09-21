const db = require("../db/connection");
const moment = require("moment");

class RaisedDefects {

  static createRaisedDefect(raisedDefect) {
    return new Promise((resolve, reject) => {
      const { user, engineSerialNumber, defect, actionTaken } = raisedDefect;
      const defectsLabels = defect.map((def) => def.label);
      const actionsLabels = actionTaken.map((action) => action.label);
  
      // Start a transaction
      db.beginTransaction((err) => {
        if (err) {
          return reject({
            status: 500,
            message: "Error starting transaction",
            error: err.message,
          });
        }
  
        // Insert into raised_defects table
        const insertRaisedDefectQuery =
          "INSERT INTO raised_defects (engine_serial_no, defects, actions, user) VALUES (?, ?, ?, ?)";
  
        db.query(
          insertRaisedDefectQuery,
          [
            engineSerialNumber,
            defectsLabels.join(", "),
            actionsLabels.join(", "),
            user,
          ],
          (err, result) => {
            if (err) {
              return db.rollback(() => {
                reject({
                  status: 500,
                  message: "Error creating raised defect",
                  error: err.message,
                });
              });
            }
  
            const raisedDefectId = result.insertId;
  
            // Array to hold all zone insert promises and inserted IDs
            const zoneInsertData = [];
            let insertCount = 0;
  
            defect.forEach((def) => {
              const defectLabel = def.label;
  
              // Fetch station_id and screen_no from defects table
              const defectQuery =
                "SELECT station_id, screen_no, defect_name_hi FROM defects WHERE defect_name = ?";
              db.query(defectQuery, [defectLabel], (defectErr, defectResult) => {
                if (defectErr) {
                  return db.rollback(() => {
                    reject({
                      status: 500,
                      message: "Error fetching station_id and screen_no",
                      error: defectErr.message,
                    });
                  });
                }
  
                if (defectResult.length === 0) {
                  return db.rollback(() => {
                    reject({
                      status: 404,
                      message: `Defect '${defectLabel}' not found in defects table`,
                      error: "Defect not found",
                    });
                  });
                }
  
                const { station_id, screen_no, defect_name_hi } = defectResult[0];
  
                // Fetch operator_name from operators table
                const operatorQuery =
                  "SELECT operator_name FROM operators WHERE station_id = ?";
                db.query(
                  operatorQuery,
                  [station_id],
                  (operatorErr, operatorResult) => {
                    if (operatorErr) {
                      return db.rollback(() => {
                        reject({
                          status: 500,
                          message: "Error fetching operator_name",
                          error: operatorErr.message,
                        });
                      });
                    }
  
                    if (operatorResult.length === 0) {
                      return db.rollback(() => {
                        reject({
                          status: 404,
                          message: `Operator not found for station_id '${station_id}'`,
                          error: "Operator not found",
                        });
                      });
                    }
  
                    const operator_name = operatorResult[0].operator_name;
  
                    // Insert into zone table
                    const zoneInsertQuery =
                      "INSERT INTO zone (engine_serial_no, defect_name, action_taken, user, station_id, screen_no, operator_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
                    db.query(
                      zoneInsertQuery,
                      [
                        engineSerialNumber,
                        defectLabel,
                        actionsLabels.join(", "),
                        user,
                        station_id,
                        screen_no,
                        operator_name,
                      ],
                      (zoneErr, zoneResult) => {
                        if (zoneErr) {
                          return db.rollback(() => {
                            reject({
                              status: 500,
                              message: "Error inserting into zone table",
                              error: zoneErr.message,
                            });
                          });
                        }
                        
                        // Store the ID and values of the inserted zone record
                        zoneInsertData.push({
                          id: zoneResult.insertId,
                          engine_serial_no: engineSerialNumber,
                          defect_name: defectLabel,
                          defect_name_hi : defect_name_hi,
                          action_taken: actionsLabels.join(", "),
                          user: user,
                          station_id: station_id,
                          screen_no: screen_no,
                          operator_name: operator_name,
                          updated_at : moment()
                        });
  
                        insertCount++;
  
                        // Check if all inserts are done
                        if (insertCount === defect.length) {
                          db.commit((commitErr) => {
                            if (commitErr) {
                              return db.rollback(() => {
                                reject({
                                  status: 500,
                                  message: "Error committing transaction",
                                  error: commitErr.message,
                                });
                              });
                            }
  
                            resolve({
                              status: 201,
                              message: "Raised defect created successfully",
                              error: null,
                              data: {
                                 zoneInsertData
                              },
                            });
                          });
                        }
                      }
                    );
                  }
                );
              });
            });
          }
        );
      });
    });
  } 

  static getAllRaisedDefects() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM raised_defects";
      db.query(query, (err, rows) => {
        if (err) {
          reject({
            status: 500,
            message: "Error fetching raised defects",
            error: err.message,
          });
          return;
        }
        resolve({
          status: 200,
          message: "Raised defects fetched successfully",
          error: null,
          data: rows,
        });
      });
    });
  }

  static getRaisedDefectById(raisedDefectId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM raised_defects WHERE id = ?";
      db.query(query, [raisedDefectId], (err, rows) => {
        if (err) {
          reject({
            status: 500,
            message: "Error fetching raised defect by ID",
            error: err.message,
          });
          return;
        }
        if (rows.length === 0) {
          resolve({
            status: 404,
            message: "Raised defect not found",
            error: null,
            data: null,
          });
          return;
        }
        resolve({
          status: 200,
          message: "Raised defect fetched successfully",
          error: null,
          data: rows[0],
        });
      });
    });
  }

  static updateRaisedDefect(raisedDefectId, raisedDefectData) {
    return new Promise((resolve, reject) => {
      const { engineSerialNumber, defects, actionTaken, user } =
        raisedDefectData;
      const defectsString = defects.map((def) => def.label).join(", ");
      const actionString = actionTaken.map((action) => action.label).join(", ");
      const query =
        "UPDATE raised_defects SET engine_serial_no = ?, defects = ?, actions = ?, user = ? WHERE id = ?";

      db.query(
        query,
        [engineSerialNumber, defectsString, actionString, user, raisedDefectId],
        (err, result) => {
          if (err) {
            reject({
              status: 500,
              message: "Error updating raised defect",
              error: err.message,
            });
            return;
          }
          resolve({
            status: 200,
            message: "Raised defect updated successfully",
            error: null,
            data: result,
          });
        }
      );
    });
  }

  static deleteRaisedDefect(raisedDefectId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM raised_defects WHERE id = ?";
      db.query(query, [raisedDefectId], (err, result) => {
        if (err) {
          reject({
            status: 500,
            message: "Error deleting raised defect",
            error: err.message,
          });
          return;
        }
        resolve({
          status: 200,
          message: "Raised defect deleted successfully",
          error: null,
          data: result,
        });
      });
    });
  }

  static getDefectReports() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          rd.engine_serial_no, 
          rd.defects, 
          rd.actions, 
          rd.updated_at,
          rd.user,
          d.defect_name,
          d.station_id,
          d.screen_no,
          o.operator_name
        FROM raised_defects rd
        INNER JOIN defects d ON FIND_IN_SET(d.defect_name, rd.defects)
        INNER JOIN operators o ON o.station_id = d.station_id
      `;
      db.query(query, (err, rows) => {
        if (err) {
          reject({
            status: 500,
            message: "Error fetching defect reports",
            error: err.message,
          });
          return;
        }
        resolve({
          status: 200,
          message: "Defect reports fetched successfully",
          error: null,
          data: rows,
        });
      });
    });
  }
} 

module.exports = RaisedDefects;
