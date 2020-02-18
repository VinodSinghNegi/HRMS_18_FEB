var user = require("../../api/users/user.model");
var designation = require("../../api/designation/designation.model");

async function func() {
  const number = await user.countDocuments();
  if (number < 1) {
    const des = await designation.findOne({ name: "Admin" });
    const hrDes = await designation.findOne({ name: "Human Resource" });

    if (des) {
      const des_id = await des._id;
      const obj = {
        name: "CEO",
        email: "admin@gmail.com",
        designation_id: des_id,
        gender: "Male"
      };
      const e = new user(obj);
      e.save();

      const hrDes_id = await hrDes._id;
      const hrObj = {
        name: "HR",
        email: "mernhr@gmail.com",
        designation_id: hrDes_id,
        gender: "Male"
      };
      const elem = new user(hrObj);
      elem.save();
    } else {
      func();
    }
  }
}
func();
module.exports = func;
