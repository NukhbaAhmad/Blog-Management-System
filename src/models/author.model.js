const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { paginate, toJSON, doesIdExists } = require("./plugins");
const authorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Author first name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Author last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Author email is required"],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Author username is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      private: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds created, updated At
    strict: true, // No extra fields allowed
  }
);
authorSchema.plugin(paginate);
authorSchema.plugin(toJSON);
authorSchema.plugin(doesIdExists);
authorSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

authorSchema.statics.isUsernameTaken = async function (
  username,
  excludeAuthorId
) {
  const query = { username };
  if (excludeAuthorId) {
    query._id = { $ne: excludeAuthorId };
  }
  const userFound = await this.findOne(query);
  return !!userFound;
};

authorSchema.statics.isEmailTaken = async function (email, excludeAuthorId) {
  const query = { email };
  if (excludeAuthorId) {
    query._id = { $ne: excludeAuthorId };
  }
  const userFoundByEmail = await this.findOne(query);
  return !!userFoundByEmail;
};

authorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("Password changed: Hash Password before save.");
  }
  next();
});
authorSchema.post("save", async function (doc, next) {
  console.log("Author created with the details:", doc);
  next();
});
const Author = model("Author", authorSchema);
module.exports = Author;
