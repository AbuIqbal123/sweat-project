// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected")) // Database connected successfully log
  .catch((err) => console.log("DB connection error", err)); // Database connection error log

// middleware
app.use(morgan("dev")); // Morgan logging middleware
app.use(cors({ origin: true, credentials: true })); // CORS middleware
app.use(express.json()); // Body parser middleware for handling JSON

// routes
const testRoutes = require("./routes/test");
app.use("/", testRoutes); // Use test routes

const ModuleModel = require("./models/moduleSchema");
app.get("/getModules", (req, res) => {
  ModuleModel.find()
    .then((modules) => {
      console.log("Fetched Modules:", modules); // Debug log for fetched modules
      res.json(modules);
    })
    .catch((err) => {
      console.error("Error fetching modules:", err); // Error log for fetching modules
      res.status(400).json("Error: " + err);
    });
  console.log("getModules");
});

// Route for data transformation and saving
const dataTransformationRoute = require("./routes/dataTransformationRoute");
app.use("/api", dataTransformationRoute); // Use data transformation routes under /api

// Error handling middleware (if required)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log stack trace for errors
  res.status(500).send("Something broke!");
});

// port
const port = process.env.PORT || 8000;

// listener
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log server running on port
});

server.on("error", (err) => {
  console.error("Server error:", err); // Log server errors
});
