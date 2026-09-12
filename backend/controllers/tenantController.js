const Tenant = require("../models/Tenant");
const Apartment = require("../models/Apartment");

// Create Tenant
const createTenant = async (req, res, next) => {
  try {
    const { apartment } = req.body;

    const selectedApartment = await Apartment.findById(apartment);

    if (!selectedApartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found",
      });
    }

    if (selectedApartment.status === "Occupied") {
      return res.status(400).json({
        success: false,
        message: "This apartment is already occupied",
      });
    }

    const tenant = await Tenant.create(req.body);

    await Apartment.findByIdAndUpdate(apartment, {
      status: "Occupied",
    });

    const populatedTenant = await Tenant.findById(
      tenant._id
    ).populate("apartment");

    res.status(201).json({
      success: true,
      message: "Tenant created successfully",
      tenant: populatedTenant,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Tenants
const getTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find()
      .populate("apartment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tenants.length,
      tenants,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Tenant
const getTenantById = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate(
      "apartment"
    );

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    res.status(200).json({
      success: true,
      tenant,
    });
  } catch (error) {
    next(error);
  }
};

// Update Tenant
const updateTenant = async (req, res, next) => {
  try {
    const existingTenant = await Tenant.findById(req.params.id);

    if (!existingTenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    const oldApartmentId = existingTenant.apartment;
    const newApartmentId = req.body.apartment;

    // If apartment is changed
    if (
      newApartmentId &&
      oldApartmentId.toString() !== newApartmentId.toString()
    ) {
      const newApartment = await Apartment.findById(
        newApartmentId
      );

      if (!newApartment) {
        return res.status(404).json({
          success: false,
          message: "New apartment not found",
        });
      }

      if (newApartment.status === "Occupied") {
        return res.status(400).json({
          success: false,
          message: "New apartment is already occupied",
        });
      }

      // Old apartment becomes available
      await Apartment.findByIdAndUpdate(oldApartmentId, {
        status: "Available",
      });

      // New apartment becomes occupied
      await Apartment.findByIdAndUpdate(newApartmentId, {
        status: "Occupied",
      });
    }

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("apartment");

    res.status(200).json({
      success: true,
      message: "Tenant updated successfully",
      tenant,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Tenant
const deleteTenant = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    // Make apartment available again
    await Apartment.findByIdAndUpdate(tenant.apartment, {
      status: "Available",
    });

    await Tenant.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tenant deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};