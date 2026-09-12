const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    apartmentNumber: {
      type: String,
      required: [true, "Apartment number is required"],
      unique: true,
      trim: true,
    },

    building: {
      type: String,
      required: [true, "Building name is required"],
      trim: true,
    },

    floor: {
      type: Number,
      required: [true, "Floor is required"],
      min: [0, "Floor cannot be negative"],
    },

    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: [0, "Bedrooms cannot be negative"],
    },

    rent: {
      type: Number,
      required: [true, "Rent is required"],
      min: [0, "Rent cannot be negative"],
    },

    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Apartment", apartmentSchema);