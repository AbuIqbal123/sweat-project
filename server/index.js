const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const moduleRoutes = require("./Routes/ModuleRoutes");
const { handleError } = require("./utils/errorUtils");

// Express Server Setup
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const liveDb = process.env.MongoDB_URI;
mongoose
  .connect(liveDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Routes
    app.use("/module", moduleRoutes);

    // Serve client build in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }

    // Start server
    app.listen(port, () => {
      console.log(`Node/Express Server is Up...\nPort: localhost:${port}`);
    });
  })
  .catch((error) => {
    handleError(error, console.error);
    process.exit(1); // Exit the process with a non-zero status code
  });
