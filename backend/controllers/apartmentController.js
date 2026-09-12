const Apartment = require("../models/Apartment");

// Create Apartment
const createApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Apartment created successfully",
      apartment,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Apartments
const getApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: apartments.length,
      apartments,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Apartment
const getApartmentById = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found",
      });
    }

    res.status(200).json({
      success: true,
      apartment,
    });
  } catch (error) {
    next(error);
  }
};

// Update Apartment
const updateApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Apartment updated successfully",
      apartment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Apartment
const deleteApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);

    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Apartment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
};