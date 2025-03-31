const express = require('express');
const Analytic = require('../models/analytic.model.js');
const router = express.Router();
const {getAnalytics, getAnalytic, createAnalytic, updateAnalytic, deleteAnalytic} = require('../controllers/analytic.controller.js');

router.get('/', getAnalytics);

router.get("/:id", getAnalytic);

router.post("/", createAnalytic);

// Update a analytic
router.put("/:id", updateAnalytic);

// Delete a analytic
router.delete("/:id", deleteAnalytic);

module.exports = router;