const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./db conn/connection");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:80", // Use environment variable
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import routers
const incidentRouter = require("./routes/incidentRouters");
const userRouter = require("./routes/userRouters");
const authRouter = require("./routes/authRouters");
const errorMiddleware = require("./middlewares/errorMiddleware");
const contactRouters = require("./routes/contactRouters");
const adminRouter = require("./routes/adminRouters");

// Use routers
app.use("/api/auth", authRouter);

app.use("/api", authMiddleware);
app.use("/api/incidents", incidentRouter);
app.use("/api/users", userRouter);
app.use("/api/contact", contactRouters);
app.use("/api/admin", adminRouter);

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.post("/hello", (req, res) => {
  res.send("Hello, POST request!");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
