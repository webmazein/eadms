const Zone = require("../models/zone");
const Defect = require("../models/defects");
const Operator= require("../models/operators");
const moment = require("moment")

exports.createZone = async (req, res) => {
  try {
    await Zone.createZone(req.body);
    res.status(201).send("Zone created successfully");
  } catch (err) {
    console.error("Error creating zone:", err);
    res.status(500).send("Error creating zone");
  }
};

exports.createBulkZones = async (req, res) => {
  try {
    await Zone.createBulkZones(req.body);
    res.status(201).send("Bulk zones created successfully");
  } catch (err) {
    console.error("Error creating bulk zones:", err);
    res.status(500).send("Error creating bulk zones");
  }
};

exports.getAllZones = async (req, res) => {
  try {
    const zones = await Zone.getAllZones();
    res.json(zones);
  } catch (err) {
    console.error("Error getting zones:", err);
    res.status(500).send("Error getting zones");
  }
};

exports.getZoneRecordsForToday = async (req, res) => {
    try {
      const currentDate = moment().format("YYYY-MM-DD");
      const { zoneId } = req.params; // Retrieve zoneId from query parameters
  
      let zoneRecords;
      if (zoneId) {
        zoneRecords = await Zone.getZonesByDateAndId(currentDate, zoneId);
      } else {
        zoneRecords = await Zone.getZonesByDate(currentDate);
      }
  
      const dataPromises = zoneRecords.map(async (zone) => {
        const { defect_name, station_id } = zone;
  
        // Fetch defect information
        const defect = await Defect.getDefectByName(defect_name);
  
        // Fetch operator information
        const operator = await Operator.getOperatorByStationId(station_id);
  
        return {
          ...zone,
          defect_name_hi: defect ? defect.defect_name_hi : '',
          defects: defect ? [defect] : [],
          operators: operator ? [operator] : [],
        };
      });
  
      const formattedData = await Promise.all(dataPromises);
  
      res.status(200).json({
        status: 200,
        message: "Zone records fetched successfully for current day",
        error: null,
        data: formattedData,
      });
    } catch (error) {
      console.error("Error fetching zone records:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  

exports.getZoneById = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const zone = await Zone.getZoneById(zoneId);
    if (!zone) {
      res.status(404).send("Zone not found");
      return;
    }
    res.json(zone);
  } catch (err) {
    console.error("Error getting zone:", err);
    res.status(500).send("Error getting zone");
  }
};

exports.updateZone = async (req, res) => {
  try {
    const zoneId = req.params.id;
    await Zone.updateZone(zoneId, req.body);
    res.send("Zone updated successfully");
  } catch (err) {
    console.error("Error updating zone:", err);
    res.status(500).send("Error updating zone");
  }
};

exports.deleteZone = async (req, res) => {
  try {
    const zoneId = req.params.id;
    await Zone.deleteZone(zoneId);
    res.status(200).send("Zone deleted successfully");
  } catch (err) {
    console.error("Error deleting zone:", err);
    res.status(500).send("Error deleting zone");
  }
};
