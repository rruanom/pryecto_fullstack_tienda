require('dotenv').config()
const mongoose = require("mongoose");

const connectWithRetry = () => {
  console.log("Attempting to connect to MongoDB...");
  mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // Aumentado a 15 segundos
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

const db = mongoose.connection;

db.on("error", error => console.log("MongoDB connection error:", error));
db.once("open", () => console.log("MongoDB connection established"));

module.exports = mongoose;