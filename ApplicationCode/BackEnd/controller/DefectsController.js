const Defect = require("../models/defects");
const RaisedDefects = require("../models/raisedDefects");
const Zone = require("../models/zone");
// const { notifyClients } = require("../app");




exports.createDefect = async (req, res) => {
  // console.log("Notifying clients:");
  // clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send(JSON.stringify(req.body));
  //   }
  // });
  // notifyClients(req.body);
  try {
    await Defect.createDefect(req.body);
    res.status(201).send("Defect created successfully");
  } catch (err) {
    console.error("Error creating defect:", err);
    res.status(500).send("Error creating defect");
  }
};

exports.createBulkDefect = async (req, res) => {
  try {
    await Defect.createBulkDefects(req.body);
    res.status(201).send("Bulk Defect created successfully");
    // Optionally notify clients about the bulk upload
    // req.body.forEach((defect) => notifyClients(defect));
  } catch (err) {
    console.error("Error creating bulk defect:", err);
    res.status(500).send("Error creating bulk defect");
  }
};

exports.getAllDefects = async (req, res) => {
  try {
    const defects = await Defect.getAllDefects();
    res.json(defects);
  } catch (err) {
    console.error("Error getting defects:", err);
    res.status(500).send("Error getting defects");
  }
};

// exports.getDefectsForScreen = async (req, res) => {
//   try {
//     const screenId = req.params.screenNo;
//     const defects = await Defect.getDefectByScreenNo(screenId);
    
//     const defectCountsPromises = defects.map(async (defect) => {
//       const count = await RaisedDefects.countDefectsForToday(defect.defect_name);
//       return {
//         ...defect,
//         count, // Add the count field to the defect object
//       };
//     });

//     // Wait for all counts to be resolved
//     const defectsWithCounts = await Promise.all(defectCountsPromises);
    
//     res.json(defectsWithCounts);
//     // res.json(defects);
//   } catch (err) {
//     console.error("Error getting defects:", err);
//     res.status(500).send("Error getting defects");
//   }
// }

exports.getDefectsForScreen = async (req, res) => {
  try {
    const screenId = req.params.screenNo;
    const defects = await Defect.getDefectByScreenNo(screenId);
    
    const defectCountsPromises = defects.map(async (defect) => {
      const countResponse = await Zone.countDefectsForToday(defect.defect_name);
      return {
        ...defect,
        count: countResponse.count, // Access the count from the response
      };
    });

    // Wait for all counts to be resolved
    const defectsWithCounts = await Promise.all(defectCountsPromises);
    
    res.json(defectsWithCounts);
  } catch (err) {
    console.error("Error getting defects:", err);
    res.status(500).send("Error getting defects");
  }
};


exports.getDefectById = async (req, res) => {
  try {
    const defectId = req.params.id;
    const defect = await Defect.getDefectById(defectId);
    if (!defect) {
      res.status(404).send("Defect not found");
      return;
    }
    res.json(defect);
  } catch (err) {
    console.error("Error getting defect:", err);
    res.status(500).send("Error getting defect");
  }
};

exports.updateDefect = async (req, res) => {
  try {
    const defectId = req.params.id;
    await Defect.updateDefect(defectId, req.body);
    res.send("Defect updated successfully");
    notifyClients(req.body);
  } catch (err) {
    console.error("Error updating defect:", err);
    res.status(500).send("Error updating defect");
  }
};

exports.deleteDefect = async (req, res) => {
  try {
    const defectId = req.params.id;
    await Defect.deleteDefect(defectId);
    res.status(200).send("Defect deleted successfully");
    notifyClients({ id: defectId, deleted: true });
  } catch (err) {
    console.error("Error deleting defect:", err);
    res.status(500).send("Error deleting defect");
  }
};
