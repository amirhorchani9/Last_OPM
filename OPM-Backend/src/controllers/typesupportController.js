const TypeSupport = require('../models/typeSupportModel');
const File = require('../models/fileModel');
// const Site = require('../models/siteModel');

//create contract
exports.createTypeSupport = async (req, res) => {
  try {
    // let a = "jjj"
    console.log(req.files)
  const supportName  = req.body.supportName
  const supportEmail = req.body.supportEmail
  const typesupport = TypeSupport({ supportName: supportName ,supportEmail:supportEmail });

    const files = req.files[0]
  // const file =req.files ;
  const newFile =File({
    fileName: files.filename,
    path: 'http://localhost:3000/'+files.destination + '/' + files.filename,
    title:files.originalname.toString(),
  })
  newFile.save();
  typesupport.logo =newFile._id.toString()
  typesupport.save()
  res.status(200).json({ err: false, message: "Successful operation !", rows: typesupport });
} catch (error) {
  res.status(500).json({ err: true, message: error.message });
}

};

exports.updateTypeSupport = async (req, res) => {
  try {
    const { _id, supportName, supportEmail,} = req.body;
    const updateTypeSupport = await TypeSupport.findByIdAndUpdate(
      { _id },
      { supportName, supportEmail}, // Update image field as well
      { new: true }
    );
    if (!updateTypeSupport) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({ err: false, message: "Successful operation !", rows: updateTypeSupport });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Ensure other methods like delete and getAll also work as needed.

// equipmentName version constructure
exports.deleteTypeSupport = async (req, res) => {
  try {
    const typesupport = await TypeSupport.findOneAndDelete({ _id: req.body._id });
    if (!typesupport) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({ err: false, message: "Successful operation !", rows: typesupport });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.getAllTypeSupport  = async (req, res) => {
  try {
    const typesupport = await TypeSupport.find().populate({
      path: 'logo',
      model: 'File',
    });
    res.status(200).json({err: false, message: "Successful operation !", rows: typesupport});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

    // console.log(req.body._id );
