const Leave = require("../leaves.model");
const LeaveTypesSeeds = require("../leaveType.model");

const applyleave = async (req, res, next) => {
  const { fromDate, toDate } = req.body;
  let instance = await Leave.find({ userId: req._id });
  try {
    if (instance) {
      for (let index = 0; index < instance.length; index++) {
        if (
          (new Date(fromDate).setHours(0, 0, 0, 0) >=
            instance[index].fromDate.setHours(0, 0, 0, 0) &&
            new Date(fromDate).setHours(0, 0, 0, 0) <=
              instance[index].toDate.setHours(0, 0, 0, 0)) ||
          (new Date(toDate).setHours(0, 0, 0, 0) >=
            instance[index].fromDate.setHours(0, 0, 0, 0) &&
            new Date(toDate).setHours(0, 0, 0, 0) <=
              instance[index].toDate.setHours(0, 0, 0, 0))
        ) {
          return res.status(400).send({ msg: "Leaves overlapping" });
        }
      }
    }

    instance = new Leave({
      ...req.body
    });
    instance.userId = req._id;
    instance.reportingManagerId = req.user.reportingManager;
    await instance.save();
    res.send({ msg: "successfully applied" });
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Error saving leaves" });
  }
};

const getLeave = async (req, res, next) => {
  try {
    const leave = await Leave.find({ userId: req._id })
      .populate("leaveData", "name")
      .select("-__v")
      .sort({ fromDate: -1 });

    if (!leave) {
      return res.status(400).send({ msg: "leave not present" });
    }
    res.send(leave);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
  next();
};

const deleteLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    console.log(leave, leave.Status);
    if (!leave || leave.Status !== "Not Approved") {
      return res.status(400).send({ cannotdelete: "cannot delete" });
    }
    await leave.remove();
    res.send("success fully deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
  next();
};
const getleaveseeds = async (req, res, next) => {
  try {
    const leaveSeeds = await LeaveTypesSeeds.find().select("-__v");
    res.json(leaveSeeds);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Leave Seeds Error");
  }
};

module.exports = { applyleave, getLeave, deleteLeave, getleaveseeds };
