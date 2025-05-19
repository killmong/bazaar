const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date },
    image: { type: String },
    address: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },

      country: { type: String },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
