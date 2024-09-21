const express = require("express");
const router = express.Router();
const zoneController = require("../controller/ZoneController");

router.post("/",  zoneController.createZone);
router.post("/bulk_zones",  zoneController.createBulkZones);
router.get("/",  zoneController.getAllZones);
router.get("/getZoneRecordsForToday/:zoneId",  zoneController.getZoneRecordsForToday);
router.get("/:id",  zoneController.getZoneById);
router.put("/:id",  zoneController.updateZone);
router.delete("/:id",  zoneController.deleteZone);

module.exports = router;
