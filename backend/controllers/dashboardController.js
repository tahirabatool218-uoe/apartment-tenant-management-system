const Apartment = require("../models/Apartment");
const Tenant = require("../models/Tenant");

const getDashboardStats = async (req, res, next) => {
  try {
    const totalApartments = await Apartment.countDocuments();

    const availableApartments = await Apartment.countDocuments({
      status: "Available",
    });

    const occupiedApartments = await Apartment.countDocuments({
      status: "Occupied",
    });

    const totalTenants = await Tenant.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalApartments,
        availableApartments,
        occupiedApartments,
        totalTenants,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};