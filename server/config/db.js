const mongoose = require("mongoose");
const { seedDemoData } = require("../seed/staffUsers");

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI not set. Database connection skipped.");
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  await seedDemoData();
}

module.exports = connectDB;
