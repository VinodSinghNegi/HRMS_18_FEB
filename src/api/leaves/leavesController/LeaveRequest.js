const Leave = require("../leaves.model");
const LeaveTypesSeeds = require("../leaveType.model");

const leaveRequest = async (req, res, next) => {
  try {
    let leave = await Leave.find({ reportingManagerId: req._id }).populate(
      "userId leaveData",
      "name"
    );
    if (!leave) {
      return res.status(400).send({ msg: "No request available" });
    }
    leave = leave.filter(
      e => e.fromDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
    );
    res.send(leave);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("leave Request Error");
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const { id, value } = req.params;
    let leave = await Leave.findByIdAndUpdate(
      id,
      { Status: value },
      {
        new: true
      }
    );
    if (!leave) {
      return res.status(400).send({ msg: "No request available" });
    }
    leave = await Leave.find({ reportingManagerId: req._id }).populate(
      "userId leaveData",
      "name"
    );
    leave = leave.filter(
      e => e.fromDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
    );

    res.send(leave);

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error updating");
  }
};

module.exports = { leaveRequest, updateRequest };
