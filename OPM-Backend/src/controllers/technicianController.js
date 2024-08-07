const Technicien = require('../models/technicienModel');


exports.getAllEmployees = async (req, res) => {
  try {
    const techniciens = await Technicien.find().populate('image'); // Populate the image field
    res.status(200).json({ err: false, message: "Successful operation!", rows: techniciens });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }}
  

exports.updateStatTech = async (req, res) => {
  try {
    const { _id, valid } = req.body;
    const upadteTchnician = await Technicien.findOneAndUpdate(
      { _id },
      { valid },
      { new: true }
    );
    if (!upadteTchnician) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Account status changes successfully", rows: upadteTchnician });
  } catch (err) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};


exports.getAllEmployeesByValid = async (req, res) => {
  const { valid } = req.params;
  try {
    if(!valid){
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    // const employee = await Employee.find({ valid });
    const technicien = await Technicien.find({ valid:valid});
    // .find({clientId:user._id})
    res.status(200).json({err: false, message: "Successful operation !", rows: technicien});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};





















// Get all employees by validity
// exports.getAllEmployeesByValid = async (req, res) => {
//   const { valid,userRolle } = req.params;
//   try {
//     if(!valid || !userRolle){
//       return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
//     }
//     // const employee = await Employee.find({ valid });
//     const employee = await Employee.find({ valid:valid ,authority:userRolle });
//     // .find({clientId:user._id})
//     res.status(200).json({err: false, message: "Successful operation !", rows: employee});
//   } catch (error) {
//     res.status(500).json({ err: true, message: error.message });
//   }
// };
// Get all employees by authority
exports.getAllEmployeesByAuthority = async (req, res) => {
  const { authority } = req.params;
  try {
    if(!authority){
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    const employee = await Employee.find({ authority });
    res.status(200).json({err: false, message: "Successful operation !", rows: employee});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single clinet 
exports.getEmployeeByEmail = async (req, res, next) => {
    try {
      const employee = await Employee.findOne({ email: req.body.email });
      if (!employee) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: employee});
    } catch (error) {
      res.status(500).json({ err: true, message: error.message });
    }
  };

// Update a user still working on it username
exports.updateEmployee = async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthDate, image, newEmail, valid } = req.body;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { email },
      { email: newEmail, password, firstName, lastName, birthDate, image, valid },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) !" });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: updatedEmployee});
  } catch (err) {
    console.error(error);
    res.status(500).send({ err:true, message: error.message });
  }
};

// Delete a employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { email: req.body.email },
      { valid: false },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ err: true, message: 'No (data,operation) (found,done) ! ' });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: employee});
  } catch (error) {
    res.status(500).send({ err:true, message: error.message });
  }
};
