const express = require('express');
const busRouteController = require('../controllers/busRouteController');
const busRouteRouter = express.Router();

busRouteRouter.post("/createRoute", busRouteController.createRoute);

module.exports = busRouteRouter;