const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./src//db//dbConnection.js");
const cookieParser = require("cookie-parser");
const serviceRouter = require("./src/routes/service.routes.js");
const authRouter = require('./src/routes/auth.routes.js')

let corsOptions = {
  origin: ["http://localhost:5173","http://192.168.31.233:5173"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/service", serviceRouter);
app.use('/api/auth',authRouter);

app.get("/", (req, res) => {
  res.send("Nutri Care Server is Running .....");
});

app.listen(3000, () => {
  console.log("Server is Running on Port 3000");
  dbConnection();
});
