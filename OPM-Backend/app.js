// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { strict } = require("assert");
require("dotenv").config();
const auth = require("./src/controllers/authController");
const app = express();
exports.app = app;
const moment = require('moment');
require('moment-timezone');
// ============ imporing routes ================

const authRoute = require("./src/routes/authRoute");
const ticketRoute = require("./src/routes/ticketRoute");
const contractRoute = require("./src/routes/contractRoute");
const clientRoute = require("./src/routes/clientRoute");
// const employeeRoute = require("./src/routes/employeeRoute");
const fileRoute = require("./src/routes/fileRoute");
const folderRoute = require("./src/routes/folderRoute");
const technicianRoute = require("./src/routes/technicienRoot");
const eqRoute = require("./src/routes/equipmentRoute");
const eqSoftRoute = require("./src/routes/equipmentsoftRoute");
const typesupport = require("./src/routes/typesupportRoute");
const site = require("./src/routes/siteRoute");
// const workOrderRoute = require("./src/routes/workOrderRoute");
// const followUpRoute = require("./src/routes/followUpRoute");
// const countRoute = require("./src/routes/countRoute");
// const partOrderRoute = require("./src/routes/partOrderRoute");
const fileRoutes = require("./src/routes/fileRoute");
const vistepreventiveRoute = require("./src/routes/vistepreventiveRoute");




//========== configuration ============
moment.tz.setDefault('Africa/Tunis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
//app.use(userData);

// configuring cors
//app.use(cors);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control"
  );
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.status(200).send();
  } else {
    next();
  }
});
//=========== connecting to database ==============
let gfs;
mongoose.set("strictQuery", true);
mongoose   
  .connect(
    "mongodb://localhost:27017/OPMnew",
    // "mongodb+srv://root:root@opmcluster.dvzi5iq.mongodb.net/OPM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("error has been occured: ", err));

// connecting the file upload to mongoose




// ========= configurring routes ==========

// app.use("/user", userRoute); //not going to use those
app.use("/auth",authRoute);
app.use("/ticket",  ticketRoute);
app.use("/contract",contractRoute);
app.use('/files', fileRoutes);
app.use("/client", clientRoute);
app.use("/equipment", eqRoute);
app.use("/equipmentSoft", eqSoftRoute);
app.use("/typeSupport", typesupport);
app.use("/site", site);
app.use("/file", auth.verify, fileRoute);
app.use("/folder", folderRoute);
app.use("/tech", technicianRoute);
app.use("/vistepreventive", vistepreventiveRoute);







// app.use("/workOrder", auth.verify, workOrderRoute);
// app.use("/followUp", auth.verify, followUpRoute);
// app.use("/count", auth.verify, countRoute);
// app.use("/partOrder", auth.verify, partOrderRoute);
// ======== exporting app ========
module.exports = app;
