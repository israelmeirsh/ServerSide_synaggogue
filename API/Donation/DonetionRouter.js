const express = require("express");
const { createDonation } = require("./DonationController");
const router = express.Router();



router.post("/", createDonation);

module.exports = router;
