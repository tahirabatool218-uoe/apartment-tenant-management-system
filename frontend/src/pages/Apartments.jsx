import { useEffect, useState } from "react";

import Header from "../components/Header";

import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiX,
  FiEye,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import "./Apartments.css";

function Apartments() {
  const [apartments, setApartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingApartment, setEditingApartment] = useState(null);

  const [selectedApartment, setSelectedApartment] = useState(null);

  const [formData, setFormData] = useState({
    apartmentNumber: "",
    building: "",
    floor: "",
    bedrooms: "",
    rent: "",
    status: "Available",
  });

  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");

  const { user } = useAuth();

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "superadmin";

  // =========================================================
  // Fetch Apartments
  // =========================================================

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get("/apartments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApartments(response.data.apartments);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load apartments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  // =========================================================
  // Handle Form Change
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================================================
  // Open Details
  // =========================================================

  const openDetailsModal = (apartment) => {
    setSelectedApartment(apartment);
  };

  // =========================================================
  // Close Details
  // =========================================================

  const closeDetailsModal = () => {
    setSelectedApartment(null);
  };

  // =========================================================
  // Open Add Modal
  // =========================================================

  const openAddModal = () => {
    if (!isAdmin) {
      return;
    }

    setEditingApartment(null);

    setFormData({
      apartmentNumber: "",
      building: "",
      floor: "",
      bedrooms: "",
      rent: "",
      status: "Available",
    });

    setFormError("");
    setShowModal(true);
  };

  // =========================================================
  // Open Edit Modal
  // =========================================================

  const openEditModal = (apartment) => {
    if (!isAdmin) {
      return;
    }

    setEditingApartment(apartment);

    setFormData({
      apartmentNumber: apartment.apartmentNumber,
      building: apartment.building,
      floor: apartment.floor,
      bedrooms: apartment.bedrooms,
      rent: apartment.rent,
      status: apartment.status,
    });

    setFormError("");
    setShowModal(true);
  };

  // =========================================================
  // Close Add / Edit Modal
  // =========================================================

  const closeModal = () => {
    if (formLoading) {
      return;
    }

    setShowModal(false);
    setEditingApartment(null);
    setFormError("");
  };

  // =========================================================
  // Create / Update Apartment
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      return;
    }

    setFormError("");

    if (
      !formData.apartmentNumber ||
      !formData.building ||
      formData.floor === "" ||
      formData.bedrooms === "" ||
      formData.rent === ""
    ) {
      setFormError(
        "Please fill in all required fields."
      );

      return;
    }

    try {
      setFormLoading(true);

      const token = localStorage.getItem("token");

      const apartmentData = {
        apartmentNumber: formData.apartmentNumber,
        building: formData.building,
        floor: Number(formData.floor),
        bedrooms: Number(formData.bedrooms),
        rent: Number(formData.rent),
        status: formData.status,
      };

      if (editingApartment) {
        await api.put(
          `/apartments/${editingApartment._id}`,
          apartmentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await api.post(
          "/apartments",
          apartmentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setShowModal(false);
      setEditingApartment(null);

      setFormData({
        apartmentNumber: "",
        building: "",
        floor: "",
        bedrooms: "",
        rent: "",
        status: "Available",
      });

      await fetchApartments();
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          (editingApartment
            ? "Failed to update apartment"
            : "Failed to create apartment")
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================================================
  // Delete Apartment
  // =========================================================

  const handleDelete = async (apartment) => {
    if (!isAdmin) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete apartment ${apartment.apartmentNumber}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(apartment._id);
      setError("");

      const token = localStorage.getItem("token");

      await api.delete(
        `/apartments/${apartment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchApartments();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete apartment"
      );
    } finally {
      setDeleteLoading("");
    }
  };

  // =========================================================
  // Filter Apartments
  // =========================================================

  const filteredApartments = apartments.filter(
    (apartment) => {
      const searchValue =
        searchTerm.toLowerCase();

      return (
        apartment.apartmentNumber
          .toLowerCase()
          .includes(searchValue) ||
        apartment.building
          .toLowerCase()
          .includes(searchValue) ||
        apartment.status
          .toLowerCase()
          .includes(searchValue)
      );
    }
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Header
          title="Apartments"
          description={
            isAdmin
              ? "Manage your apartment information and availability."
              : "Browse available apartments."
          }
        />

        <div className="apartments-page">

          {/* =================================================
              Toolbar
          ================================================= */}

          <div className="apartments-toolbar">

            <div className="search-box">
              <FiSearch />

              <input
                type="text"
                placeholder="Search apartments..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            {isAdmin && (
              <button
                type="button"
                className="add-button"
                onClick={openAddModal}
              >
                <FiPlus />
                <span>Add Apartment</span>
              </button>
            )}

          </div>

          {/* =================================================
              Loading
          ================================================= */}

          {loading && (
            <div className="apartments-message">
              Loading apartments...
            </div>
          )}

          {/* =================================================
              Error
          ================================================= */}

          {error && (
            <div className="apartments-error">
              {error}
            </div>
          )}

          {/* =================================================
              Empty State
          ================================================= */}

          {!loading &&
            !error &&
            filteredApartments.length === 0 && (
              <div className="apartments-empty">

                <h3>
                  {searchTerm
                    ? "No apartments found"
                    : "No apartments yet"}
                </h3>

                <p>
                  {searchTerm
                    ? "Try a different search term."
                    : isAdmin
                    ? "Add your first apartment to start managing your property."
                    : "No apartments are currently available."}
                </p>

              </div>
            )}

          {/* =================================================
              Apartments Table
          ================================================= */}

          {!loading &&
            !error &&
            filteredApartments.length > 0 && (
              <div className="apartments-table-wrapper">

                <table className="apartments-table">

                  <thead>
                    <tr>
                      <th>Apartment</th>
                      <th>Building</th>
                      <th>Floor</th>
                      <th>Bedrooms</th>
                      <th>Rent</th>
                      <th>Status</th>

                      {isAdmin ? (
                        <th>Actions</th>
                      ) : (
                        <th>Details</th>
                      )}
                    </tr>
                  </thead>

                  <tbody>

                    {filteredApartments.map(
                      (apartment) => (
                        <tr key={apartment._id}>

                          <td>
                            {apartment.apartmentNumber}
                          </td>

                          <td>
                            {apartment.building}
                          </td>

                          <td>
                            {apartment.floor}
                          </td>

                          <td>
                            {apartment.bedrooms}
                          </td>

                          <td>
                            Rs.{" "}
                            {apartment.rent.toLocaleString()}
                          </td>

                          <td>
                            <span
                              className={`status-badge ${
                                apartment.status.toLowerCase()
                              }`}
                            >
                              {apartment.status}
                            </span>
                          </td>

                          {/* =================================================
                              Admin Actions
                          ================================================= */}

                          {isAdmin && (
                            <td>
                              <div className="table-actions">

                                <button
                                  type="button"
                                  className="edit-action"
                                  title="Edit apartment"
                                  onClick={() =>
                                    openEditModal(
                                      apartment
                                    )
                                  }
                                  disabled={
                                    deleteLoading ===
                                    apartment._id
                                  }
                                >
                                  <FiEdit2 />
                                </button>

                                <button
                                  type="button"
                                  className="delete-action"
                                  title="Delete apartment"
                                  onClick={() =>
                                    handleDelete(
                                      apartment
                                    )
                                  }
                                  disabled={
                                    deleteLoading ===
                                    apartment._id
                                  }
                                >
                                  <FiTrash2 />
                                </button>

                              </div>
                            </td>
                          )}

                          {/* =================================================
                              Normal User Details
                          ================================================= */}

                          {!isAdmin && (
                            <td>
                              <div className="table-actions">

                                <button
                                  type="button"
                                  className="details-action"
                                  title="View apartment details"
                                  aria-label="View apartment details"
                                  onClick={() =>
                                    openDetailsModal(
                                      apartment
                                    )
                                  }
                                >
                                  <FiEye />
                                </button>

                              </div>
                            </td>
                          )}

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

          {/* =================================================
              User Apartment Details Modal
          ================================================= */}

          {selectedApartment && !isAdmin && (
            <div
              className="modal-overlay"
              onClick={closeDetailsModal}
            >

              <div
                className="apartment-modal"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <div className="modal-header">

                  <div>
                    <h2>
                      Apartment Details
                    </h2>

                    <p>
                      View apartment information.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={closeDetailsModal}
                  >
                    <FiX />
                  </button>

                </div>

                <div className="apartment-form">

                  <div className="form-row">

                    <div className="form-field">

                      <label>
                        Apartment Number
                      </label>

                      <input
                        type="text"
                        value={
                          selectedApartment.apartmentNumber
                        }
                        readOnly
                      />

                    </div>

                    <div className="form-field">

                      <label>
                        Building
                      </label>

                      <input
                        type="text"
                        value={
                          selectedApartment.building
                        }
                        readOnly
                      />

                    </div>

                  </div>

                  <div className="form-row">

                    <div className="form-field">

                      <label>
                        Floor
                      </label>

                      <input
                        type="text"
                        value={
                          selectedApartment.floor
                        }
                        readOnly
                      />

                    </div>

                    <div className="form-field">

                      <label>
                        Bedrooms
                      </label>

                      <input
                        type="text"
                        value={
                          selectedApartment.bedrooms
                        }
                        readOnly
                      />

                    </div>

                  </div>

                  <div className="form-row">

                    <div className="form-field">

                      <label>
                        Monthly Rent
                      </label>

                      <input
                        type="text"
                        value={`Rs. ${selectedApartment.rent.toLocaleString()}`}
                        readOnly
                      />

                    </div>

                    <div className="form-field">

                      <label>
                        Status
                      </label>

                      <input
                        type="text"
                        value={
                          selectedApartment.status
                        }
                        readOnly
                      />

                    </div>

                  </div>

                  <div className="modal-actions">

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={closeDetailsModal}
                    >
                      Close
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              Add / Edit Apartment Modal
          ================================================= */}

          {showModal && isAdmin && (
            <div
              className="modal-overlay"
              onClick={closeModal}
            >

              <div
                className="apartment-modal"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <div className="modal-header">

                  <div>

                    <h2>
                      {editingApartment
                        ? "Edit Apartment"
                        : "Add Apartment"}
                    </h2>

                    <p>
                      {editingApartment
                        ? "Update apartment information below."
                        : "Enter apartment information below."}
                    </p>

                  </div>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={closeModal}
                    disabled={formLoading}
                  >
                    <FiX />
                  </button>

                </div>

                {formError && (
                  <div className="form-error">
                    {formError}
                  </div>
                )}

                <form
                  className="apartment-form"
                  onSubmit={handleSubmit}
                >

                  <div className="form-row">

                    <div className="form-field">

                      <label htmlFor="apartmentNumber">
                        Apartment Number
                      </label>

                      <input
                        id="apartmentNumber"
                        name="apartmentNumber"
                        type="text"
                        placeholder="e.g. A-101"
                        value={
                          formData.apartmentNumber
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="form-field">

                      <label htmlFor="building">
                        Building
                      </label>

                      <input
                        id="building"
                        name="building"
                        type="text"
                        placeholder="e.g. Building A"
                        value={
                          formData.building
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="form-row">

                    <div className="form-field">

                      <label htmlFor="floor">
                        Floor
                      </label>

                      <input
                        id="floor"
                        name="floor"
                        type="number"
                        min="0"
                        placeholder="e.g. 1"
                        value={formData.floor}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="form-field">

                      <label htmlFor="bedrooms">
                        Bedrooms
                      </label>

                      <input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min="0"
                        placeholder="e.g. 2"
                        value={
                          formData.bedrooms
                        }
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="form-row">

                    <div className="form-field">

                      <label htmlFor="rent">
                        Monthly Rent
                      </label>

                      <input
                        id="rent"
                        name="rent"
                        type="number"
                        min="0"
                        placeholder="e.g. 35000"
                        value={formData.rent}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="form-field">

                      <label htmlFor="status">
                        Status
                      </label>

                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >

                        <option value="Available">
                          Available
                        </option>

                        <option value="Occupied">
                          Occupied
                        </option>

                      </select>

                    </div>

                  </div>

                  <div className="modal-actions">

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={closeModal}
                      disabled={formLoading}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="save-button"
                      disabled={formLoading}
                    >
                      {formLoading
                        ? editingApartment
                          ? "Updating..."
                          : "Saving..."
                        : editingApartment
                        ? "Update Apartment"
                        : "Save Apartment"}
                    </button>

                  </div>

                </form>

              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Apartments;