var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const adminauth = require("../../middleware/adminauth");
const { showEmploye } = require("../admin_controllers/showemploye");
const { addUser } = require("../admin_controllers/adduser");
const userauth = require("../../middleware/userauth");

router.get("/showemployees/:skip", userauth, showEmploye);
router.post(
  "/adduser",
  [
    adminauth,
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "please include valid email").isEmail()
    // check("password","Please enter a password with 6 or more characters").isLength({  min:6})
  ],
  addUser
);

module.exports = router;
