const express = require("express");

const dbconnection = require("./config/database");

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const investorRoutes = require("./routes/investor");
const pitchdeckRoutes = require("./routes/pitchdeck");

const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT_BACKEND || 4001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// swagger
// swagger(app);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/investor", investorRoutes);
app.use("/api/v1/pitchdeck", pitchdeckRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`server started on port no. ${PORT}`);
});

dbconnection();
