require("dotenv").config();

const mongoose = require("mongoose");
const StaffUser = require("../models/StaffUser");

const demoStaffUsers = [
  {
    name: "Alice Kamau",
    email: "alice@peacebond.org",
    password: "123456",
    role: "staff",
  },
  {
    name: "John Mwangi",
    email: "john@peacebond.org",
    password: "123456",
    role: "staff",
  },
  {
    name: "Fatima Noor",
    email: "fatima@peacebond.org",
    password: "123456",
    role: "staff",
  },
];

async function seedStaffUsers() {
  const results = [];

  for (const staffUser of demoStaffUsers) {
    const existingStaffUser = await StaffUser.findOne({ email: staffUser.email });

    if (existingStaffUser) {
      results.push({ email: staffUser.email, status: "already exists" });
      continue;
    }

    await StaffUser.create(staffUser);
    results.push({ email: staffUser.email, status: "created" });
  }

  return results;
}

async function runSeed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required to seed staff users.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const results = await seedStaffUsers();

  results.forEach((result) => {
    console.log(`${result.email}: ${result.status}`);
  });

  await mongoose.disconnect();
}

if (require.main === module) {
  runSeed()
    .then(() => {
      console.log("Staff user seed complete.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Staff user seed failed:", error.message);
      process.exit(1);
    });
}

module.exports = {
  demoStaffUsers,
  seedStaffUsers,
};
