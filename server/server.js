const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./src//db//dbConnection.js");
const cookieParser = require("cookie-parser");
const serviceRouter = require("./src/routes/service.routes.js");
const authRouter = require('./src/routes/auth.routes.js');
const paymentRouter = require('./src/routes/stripe.routes.js');
const blogRouter = require('./src/routes/blog.routes.js')
const bookingRouter = require('./src/routes/booking.routes.js')

let corsOptions = {
  origin: ["http://localhost:5173","http://localhost:5174","http://192.168.29.249:5173"],
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
app.use('/api/payment',paymentRouter);
app.use('/api/blog',blogRouter);
app.use('/api/bookings',bookingRouter);

app.get("/", (req, res) => {
  res.send("Nutri Care Server is Running .....");
});

app.listen(3001, () => {
  console.log("Server is Running on Port 3001");
  dbConnection();
});
