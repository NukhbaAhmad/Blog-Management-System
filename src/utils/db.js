const mongoose = require("mongoose");

const connectDb = () => {
  const db = mongoose.connect("mongodb://localhost:27018/");
  return db;
};
const closeDb = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log("Db connection closed.");
  }
};

module.exports = { closeDb, connectDb };
