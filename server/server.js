const express = require("express"); 
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const dbConnection = require("./src/db/dbConnection.js");
const serviceRouter = require("./src/routes/service.routes.js");
const authRouter = require('./src/routes/auth.routes.js');
const paymentRouter = require('./src/routes/stripe.routes.js');
const blogRouter = require('./src/routes/blog.routes.js');
const bookingRouter = require('./src/routes/booking.routes.js');

const app = express();

// CORS configuration
let corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://nutricare11.netlify.app",
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

// API Routes
app.use("/api/service", serviceRouter);
app.use("/api/auth", authRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/blog", blogRouter);
app.use("/api/bookings", bookingRouter);



// Create HTTP server and Socket.IO server
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions
});

// Store io globally so it can be used in controllers
global.io = io;

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Nutri Care Server is Running .....");
});
// Start server
server.listen(3000, () => {
  console.log("🚀 Server running on https://dieticain.onrender.com");
  dbConnection();
});
