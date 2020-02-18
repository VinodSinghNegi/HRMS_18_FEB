const User = require("../../users/user.model");

const showProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -__v")
      .populate("kraAttributes designation_id department_id reportingManager", [
        "name"
      ]);

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};
module.exports = { showProfileById };
