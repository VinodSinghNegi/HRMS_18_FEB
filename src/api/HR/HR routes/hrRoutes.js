var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();

// const HrAuth = require("../../middleware/Hrauth");
const { showProfileById } = require("../HrControllers/showProfileById");
const { showEmploye } = require("../HrControllers/showEmployeesHR");
const { ViewKraGraphs } = require("../HrControllers/viewKraGraph");

router.get("/hr/user/profile/:id", showProfileById);
router.get("/hr/show/users/:skip", showEmploye);

module.exports = router;
