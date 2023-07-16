// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const rankingRoutes = require("./routes/rankingRoutes");
const updateScore = require("./routes/updateScore");

require("dotenv").config();
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rankings", rankingRoutes);
app.use("/api/update", updateScore);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Listening on port ${port}...`));
