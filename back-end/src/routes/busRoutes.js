const express = require('express');
const busController = require('../controllers/busController');
const busRouter = express.Router();

busRouter.post("/createBus", busController.createBus);
busRouter.get("/buses", busController.getBuses);

module.exports = busRouter;