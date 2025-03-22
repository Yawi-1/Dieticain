const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./src//db//dbConnection.js");
const serviceRouter = require("./src/routes/service.routes.js");
const app = express();

// let corsOptions = {
//     origin: 'http://localhost:5173',
//     methods:'GET,POST,PUT,DELETE'
// }
app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use("/api/service", serviceRouter);

app.get("/", (req, res) => {
  res.send("Nutri Care Server is Running .....");
});

app.listen(3000, () => {
  console.log("Server is Running on Port 3000");
  dbConnection();
});
