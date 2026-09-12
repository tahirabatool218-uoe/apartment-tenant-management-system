import { useEffect, useState } from "react";

import {
  FiEdit2,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "./Tenants.css";

function Tenants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenants, setTenants] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apartmentsLoading, setApartmentsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    apartment: "",
    moveInDate: "",
  });

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  // Fetch all tenants
  const fetchTenants = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await api.get("/tenants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTenants(response.data.tenants || []);
    } catch (error) {
      console.error("Fetch tenants error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load tenants"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch apartments
  const fetchApartments = async (currentApartmentId = null) => {
    try {
      setApartmentsLoading(true);

      const token = getToken();

      const response = await api.get("/apartments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const availableApartments = (
        response.data.apartments || []
      ).filter(
        (apartment) =>
          apartment.status === "Available" ||
          apartment._id === currentApartmentId
      );

      setApartments(availableApartments);
    } catch (error) {
      console.error("Fetch apartments error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load apartments"
      );
    } finally {
      setApartmentsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
    fetchApartments();
  }, []);

  // Handle form input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open Add Tenant modal
  const handleAddTenant = async () => {
    setEditingTenant(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      apartment: "",
      moveInDate: "",
    });

    setError("");

    await fetchApartments();

    setShowModal(true);
  };

  // Open Edit Tenant modal
  const handleEditTenant = async (tenant) => {
    setEditingTenant(tenant);

    const currentApartmentId =
      tenant.apartment?._id || "";

    setFormData({
      name: tenant.name || "",
      email: tenant.email || "",
      phone: tenant.phone || "",
      apartment: currentApartmentId,
      moveInDate: tenant.moveInDate
        ? new Date(tenant.moveInDate)
            .toISOString()
            .split("T")[0]
        : "",
    });

    setError("");

    await fetchApartments(currentApartmentId);

    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingTenant(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      apartment: "",
      moveInDate: "",
    });

    setError("");
  };

  // Add or Update Tenant
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const token = getToken();

      const tenantData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        apartment: formData.apartment,
        moveInDate: formData.moveInDate,
      };

      if (editingTenant) {
        const response = await api.put(
          `/tenants/${editingTenant._id}`,
          tenantData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTenants((previous) =>
          previous.map((tenant) =>
            tenant._id === editingTenant._id
              ? response.data.tenant
              : tenant
          )
        );
      } else {
        const response = await api.post(
          "/tenants",
          tenantData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTenants((previous) => [
          response.data.tenant,
          ...previous,
        ]);
      }

      handleCloseModal();

      await fetchApartments();
    } catch (error) {
      console.error("Save tenant error:", error);

      setError(
        error.response?.data?.message ||
          (editingTenant
            ? "Failed to update tenant"
            : "Failed to create tenant")
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete Tenant
  const handleDeleteTenant = async (tenant) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${tenant.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(tenant._id);
      setError("");

      const token = getToken();

      await api.delete(`/tenants/${tenant._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTenants((previous) =>
        previous.filter(
          (item) => item._id !== tenant._id
        )
      );

      await fetchApartments();
    } catch (error) {
      console.error("Delete tenant error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete tenant"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Search tenants
  const filteredTenants = tenants.filter((tenant) => {
    const search = searchTerm.toLowerCase().trim();

    const apartmentNumber =
      tenant.apartment?.apartmentNumber || "";

    return (
      tenant.name?.toLowerCase().includes(search) ||
      tenant.email?.toLowerCase().includes(search) ||
      tenant.phone?.toLowerCase().includes(search) ||
      apartmentNumber.toLowerCase().includes(search)
    );
  });

  // Format date
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Header
          title="Tenants"
          description="Manage your tenant information and rental details."
        />

        <div className="dashboard-content">
          <div className="tenants-page">
            <div className="tenants-toolbar">
              <div className="search-wrapper">
                <FiSearch className="search-icon" />

                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>

              <button
                type="button"
                className="primary-button add-tenant-button"
                onClick={handleAddTenant}
              >
                <FiPlus />
                Add Tenant
              </button>
            </div>

            {error && !showModal && (
              <div className="tenants-error">
                {error}
              </div>
            )}

            <div className="tenants-card">
              <div className="card-heading">
                <div>
                  <h2>All Tenants</h2>

                  <p>
                    View and manage all registered tenants.
                  </p>
                </div>
              </div>

              <div className="table-container">
                {loading ? (
                  <div className="empty-table-message">
                    Loading tenants...
                  </div>
                ) : (
                  <table className="tenants-table">
                    <thead>
                      <tr>
                        <th>Tenant</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Apartment</th>
                        <th>Move In</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredTenants.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="empty-table-message"
                          >
                            {searchTerm
                              ? "No tenants found."
                              : "No tenants found. Add your first tenant."}
                          </td>
                        </tr>
                      ) : (
                        filteredTenants.map((tenant) => (
                          <tr key={tenant._id}>
                            <td>{tenant.name}</td>

                            <td>{tenant.email}</td>

                            <td>{tenant.phone}</td>

                            <td>
                              {tenant.apartment
                                ?.apartmentNumber || "-"}
                            </td>

                            <td>
                              {formatDate(
                                tenant.moveInDate
                              )}
                            </td>

                            <td>
                              <div className="table-actions">
                                <button
                                  type="button"
                                  className="edit-action"
                                  title="Edit tenant"
                                  onClick={() =>
                                    handleEditTenant(
                                      tenant
                                    )
                                  }
                                  disabled={
                                    deletingId ===
                                    tenant._id
                                  }
                                >
                                  <FiEdit2 />
                                </button>

                                <button
                                  type="button"
                                  className="delete-action"
                                  title="Delete tenant"
                                  onClick={() =>
                                    handleDeleteTenant(
                                      tenant
                                    )
                                  }
                                  disabled={
                                    deletingId ===
                                    tenant._id
                                  }
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="tenant-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>
                  {editingTenant
                    ? "Edit Tenant"
                    : "Add Tenant"}
                </h2>

                <p>
                  {editingTenant
                    ? "Update tenant information."
                    : "Add a new tenant to the system."}
                </p>
              </div>

              <button
                type="button"
                className="close-modal-button"
                onClick={handleCloseModal}
                disabled={saving}
              >
                <FiX />
              </button>
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter tenant name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apartment">
                    Apartment
                  </label>

                  <select
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    required
                    disabled={apartmentsLoading}
                  >
                    <option value="">
                      {apartmentsLoading
                        ? "Loading apartments..."
                        : "Select apartment"}
                    </option>

                    {apartments.map((apartment) => (
                      <option
                        key={apartment._id}
                        value={apartment._id}
                      >
                        {apartment.apartmentNumber} -{" "}
                        {apartment.building} -{" "}
                        {apartment.bedrooms} Bedroom
                        {apartment.bedrooms !== 1
                          ? "s"
                          : ""}
                      </option>
                    ))}
                  </select>

                  {!apartmentsLoading &&
                    apartments.length === 0 && (
                      <small>
                        No available apartments found.
                      </small>
                    )}
                </div>

                <div className="form-group">
                  <label htmlFor="moveInDate">
                    Move In Date
                  </label>

                  <input
                    id="moveInDate"
                    name="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={
                    saving ||
                    apartmentsLoading ||
                    apartments.length === 0
                  }
                >
                  {saving
                    ? editingTenant
                      ? "Updating..."
                      : "Saving..."
                    : editingTenant
                    ? "Update Tenant"
                    : "Add Tenant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tenants;