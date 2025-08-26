import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/ctaState";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import notifInfo from "../../../assets/notifInfo.png";
import serachIcon from "../../../assets/serachIcon.png";
import userImg from "../../../assets/userImg.png";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";

export default function SellerListing() {
  const { user, access_token } = useRecoilValue(authState) ?? {};
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const entityTypes = [
    { label: "LLC", value: "LLC" },
    { label: "C-Corp", value: "C-Corp" },
    { label: "S-Corp", value: "S-Corp" },
    { label: "LLP", value: "LLP" },
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    { label: "PLLC", value: "PLLC" },
    { label: "LP", value: "LP" },
    { label: "Other", value: "Other" },
  ];
  const industryOptions = [
    { label: "Technology", value: "Technology" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Finance", value: "Finance" },
    { label: "Education", value: "Education" },
    { label: "Retail", value: "Retail" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Real Estate", value: "Real Estate" },
    { label: "Other", value: "Other" },
  ];
  const [filters, setFilters] = useState({
    search: "",
    industry: null,
    status: null,
    year: null,
    location: null,
    lastEdited: null,
  });

  // Create Listing Dialog
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newListing, setNewListing] = useState({
    businessName: "",
    businessType: "",
    entityType: "",
    yearStablished: "", // ✅ fixed spelling
    city: "",
    state: "",
    country: "",
    industry: [], // ✅ always array
    revenue: "",
    askingPrice: "",
    cashFlow: "",
    status: "draft",
    cimStatus: "not_ready",
    image: "",
  });

  // Fetch Listings
  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/business-listing", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (Array.isArray(res.data)) {
        setListings(res.data);
      } else if (Array.isArray(res.data.data)) {
        setListings(res.data.data);
      } else {
        setListings([]);
      }
    } catch (err) {
      console.error("Error fetching listings:", err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) fetchListings();
  }, [access_token]);

  // Create Listing Handler
  const handleCreateListing = async () => {
    try {
      const payload = {
        ...newListing,
        revenue: Number(newListing.revenue),
        askingPrice: Number(newListing.askingPrice),
        cashFlow: Number(newListing.cashFlow),
      };

      await axios.post("http://localhost:3000/business-listing", payload, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setShowCreateDialog(false);
      setNewListing({
        businessName: "",
        businessType: "",
        entityType: "",
        yearStablished: "",
        city: "",
        state: "",
        country: "",
        industry: [],
        revenue: "",
        askingPrice: "",
        cashFlow: "",
        status: "draft",
        cimStatus: "not_ready",
        image: "",
      });
      fetchListings(); // refresh table
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  // ==== Templates ====
  const listingNameTemplate = (row) => (
    <div className="flex align-items-center">
      <img
        src={row.image || "https://via.placeholder.com/40"}
        alt={row.businessName}
        style={{ width: "40px", borderRadius: "6px", marginRight: "10px" }}
      />
      <span>{row.businessName}</span>
    </div>
  );
  const industryTemplate = (row) => {
    if (Array.isArray(row.industry) && row.industry.length) {
      return row.industry.join(" | ");
    }
    return "-"; // fallback if empty
  };

  const statusTemplate = (row) => (
    <Tag
      value={row.status}
      severity={
        row.status === "published"
          ? "success"
          : row.status === "draft"
          ? "warning"
          : "danger"
      }
    />
  );

  const cimTemplate = (row) => (
    <Tag
      value={row.cimStatus}
      severity={
        row.cimStatus === "ready"
          ? "success"
          : row.cimStatus === "in_progress"
          ? "warning"
          : "danger"
      }
    />
  );

  const locationTemplate = (row) =>
    row.city && row.state ? `${row.city}, ${row.state}` : "-";

  const moneyTemplate = (row, { field }) =>
    row[field] ? `$${row[field].toLocaleString()}` : "-";

  const dateTemplate = (row) =>
    row.lastEdited
      ? new Date(row.lastEdited).toLocaleDateString()
      : "Not Edited";

  const handleDeleteListing = async (id) => {
    console.log("id >>>>>>>>>", id);
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/business-listing/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      // Refresh table
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const actionTemplate = (row) => (
    <div className="flex gap-3 text-lg">
      <i
        className="pi pi-eye cursor-pointer text-blue-500 hover:text-blue-700"
        onClick={() => console.log("View", row._id)}
      ></i>

      {row.status === "published" ? (
        <i
          className="pi pi-times cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => console.log("Unpublish", row._id)}
        ></i>
      ) : (
        <i
          className="pi pi-upload cursor-pointer text-green-500 hover:text-green-700"
          onClick={() => console.log("Publish", row._id)}
        ></i>
      )}

      <i
        className="pi pi-trash cursor-pointer text-red-500 hover:text-red-700"
        onClick={() => handleDeleteListing(row._id)}
      ></i>
    </div>
  );

  // ==== UI ====
  return (
    <>
      <div className="my-listings-page">
        {showCreateDialog ? (
          <>
            <div className="dashboard__header_block">
              <h3 className="heading__Digital_CIM">
                {" "}
                Confidential Information Memorandum
              </h3>

              <div className="dashboard__header_search_notification_wrap">
                <div className="dashboard__search_field_wrap">
                  <input type="text" placeholder="Search" />
                  <img src={serachIcon} alt="" />
                </div>
                <div className="dashboard__notification_wrap">
                  <button>
                    <img src={notifInfo} alt="" />
                  </button>
                </div>
                <div className="dashboard__user_wrap">
                  <button>
                    <img src={userImg} alt="" />
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <p>
                Manage all your business listings. View, edit, publish, and
                control buyer CIM access for each listing.
              </p>
            </div>
            <div className="">
              <div className="p-fluid grid">
                {/* Business Name */}
                <div className="col-6">
                  <InputText
                    value={newListing.businessName}
                    onChange={(e) =>
                      setNewListing((f) => ({
                        ...f,
                        businessName: e.target.value,
                      }))
                    }
                    placeholder="Business Name"
                  />
                </div>

                {/* Business Type */}
                <div className="col-6">
                  <InputText
                    value={newListing.businessType}
                    onChange={(e) =>
                      setNewListing((f) => ({
                        ...f,
                        businessType: e.target.value,
                      }))
                    }
                    placeholder="Business Type"
                  />
                </div>

                {/* Entity Type */}
                <div className="col-6">
                  <Dropdown
                    value={newListing.entityType}
                    options={entityTypes}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, entityType: e.value }))
                    }
                    placeholder="Select Entity Type"
                    className="w-full"
                  />
                </div>

                {/* Year Established (Calendar - year only) */}
                <div className="col-6">
                  <Calendar
                    value={newListing.yearStablished}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, yearStablished: e.value }))
                    }
                    view="year"
                    dateFormat="yy"
                    placeholder="Year Established"
                    className="w-full"
                  />
                </div>

                {/* Location */}
                <div className="col-4">
                  <InputText
                    value={newListing.city}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, city: e.target.value }))
                    }
                    placeholder="City"
                  />
                </div>
                <div className="col-4">
                  <InputText
                    value={newListing.state}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, state: e.target.value }))
                    }
                    placeholder="State"
                  />
                </div>
                <div className="col-4">
                  <InputText
                    value={newListing.country}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, country: e.target.value }))
                    }
                    placeholder="Country"
                  />
                </div>

                {/* Industry */}
                <div className="col-12">
                  <MultiSelect
                    value={newListing.industry}
                    options={industryOptions}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, industry: e.value }))
                    }
                    placeholder="Select Industries"
                    display="chip"
                    className="w-full"
                  />
                </div>

                {/* Financials */}
                <div className="col-4">
                  <InputText
                    value={newListing.revenue}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, revenue: e.target.value }))
                    }
                    placeholder="Revenue"
                  />
                </div>
                <div className="col-4">
                  <InputText
                    value={newListing.askingPrice}
                    onChange={(e) =>
                      setNewListing((f) => ({
                        ...f,
                        askingPrice: e.target.value,
                      }))
                    }
                    placeholder="Asking Price"
                  />
                </div>
                <div className="col-4">
                  <InputText
                    value={newListing.cashFlow}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, cashFlow: e.target.value }))
                    }
                    placeholder="Cash Flow"
                  />
                </div>

                {/* Status */}
                <div className="col-6">
                  <Dropdown
                    value={newListing.status}
                    options={[
                      { label: "Draft", value: "draft" },
                      { label: "Inactive", value: "inactive" },
                      { label: "Live", value: "live" },
                      { label: "Published", value: "published" },
                    ]}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, status: e.value }))
                    }
                    placeholder="Status"
                  />
                </div>

                {/* CIM Status */}
                <div className="col-6">
                  <Dropdown
                    value={newListing.cimStatus}
                    options={[
                      { label: "Not Ready", value: "not_ready" },
                      { label: "Incomplete", value: "incomplete" },
                      { label: "Ready to Share", value: "ready_to_share" },
                    ]}
                    onChange={(e) =>
                      setNewListing((f) => ({ ...f, cimStatus: e.value }))
                    }
                    placeholder="CIM Status"
                  />
                </div>

                {/* Image Upload */}
                <div className="col-12">
                  <FileUpload
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Upload Image"
                    auto
                    customUpload
                    uploadHandler={(e) => {
                      const file = e.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewListing((f) => ({
                          ...f,
                          image: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="w-full"
                  />
                </div>

                {/* Financial Documents */}
                <div className="col-12">
                  <FileUpload
                    mode="basic"
                    accept=".pdf,.doc,.docx"
                    chooseLabel="Upload P&L File"
                    customUpload
                    auto
                    uploadHandler={(e) => {
                      setNewListing((f) => ({
                        ...f,
                        profitAndLossFile: e.files[0].name,
                      }));
                    }}
                  />
                </div>

                <div className="col-12">
                  <FileUpload
                    mode="basic"
                    accept=".pdf,.doc,.docx"
                    chooseLabel="Upload Balance Sheet"
                    customUpload
                    auto
                    uploadHandler={(e) => {
                      setNewListing((f) => ({
                        ...f,
                        balanceSheetFile: e.files[0].name,
                      }));
                    }}
                  />
                </div>

                <div className="col-12">
                  <FileUpload
                    mode="basic"
                    accept=".pdf,.doc,.docx"
                    chooseLabel="Upload 3-Year Tax Return"
                    customUpload
                    auto
                    uploadHandler={(e) => {
                      setNewListing((f) => ({
                        ...f,
                        threeYearTaxReturnFile: e.files[0].name,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-content-end mt-3 gap-2">
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  className="p-button-secondary"
                  onClick={() => setShowCreateDialog(false)}
                />
                <Button
                  label="Create"
                  icon="pi pi-check"
                  onClick={handleCreateListing}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dashboard__header_block">
              <h3>My Listing</h3>

              <div className="dashboard__header_search_notification_wrap">
                <div className="dashboard__search_field_wrap">
                  <input type="text" placeholder="Search" />
                  <img src={serachIcon} alt="" />
                </div>
                <div className="dashboard__notification_wrap">
                  <button>
                    <img src={notifInfo} alt="" />
                  </button>
                </div>
                <div className="dashboard__user_wrap">
                  <button>
                    <img src={userImg} alt="" />
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <p>
                Manage all your business listings. View, edit, publish, and
                control buyer CIM access for each listing.
              </p>
            </div>
            {/* Top Filters + Create Button */}
            <div className="filters flex flex-wrap gap-3 mb-4">
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                  placeholder="Search Listing"
                />
              </span>

              <Dropdown
                value={filters.industry}
                options={[
                  { label: "Restaurants", value: "Restaurants" },
                  { label: "Logistics", value: "Logistics" },
                  { label: "E-commerce", value: "E-commerce" },
                  { label: "Healthcare", value: "Healthcare" },
                  { label: "Finance", value: "Finance" },
                  { label: "Education", value: "Education" },
                  { label: "Real Estate", value: "Real Estate" },
                  { label: "Technology", value: "Technology" },
                  { label: "Manufacturing", value: "Manufacturing" },
                  { label: "Other", value: "Other" },
                ]}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, industry: e.value }))
                }
                placeholder="Industry"
              />

              <Dropdown
                value={filters.status}
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                ]}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.value }))}
                placeholder="Status"
              />

              <InputText
                value={filters.year || ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, year: e.target.value }))
                }
                placeholder="Year"
              />

              <InputText
                value={filters.location || ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="Location"
              />

              <Calendar
                value={filters.lastEdited}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, lastEdited: e.value }))
                }
                placeholder="Last Edited"
                showIcon
              />

              <Button
                label="Create Listing"
                icon="pi pi-plus"
                onClick={() => setShowCreateDialog((prev) => !prev)}
              />
            </div>
            {/* Data Table */}
            <DataTable
              value={listings}
              paginator
              rows={10}
              loading={loading}
              responsiveLayout="scroll"
              className="listing__main_wrap"
            >
              <Column header="Listing Name" body={listingNameTemplate} />
              <Column header="Industry" body={industryTemplate} />
              <Column field="status" header="Status" body={statusTemplate} />
              <Column field="yearStablished" header="Year" />
              <Column header="Location" body={locationTemplate} />
              <Column field="revenue" header="Revenue" body={moneyTemplate} />
              <Column
                field="askingPrice"
                header="Asking Price"
                body={moneyTemplate}
              />
              <Column
                field="cimStatus"
                header="CIM Status"
                body={cimTemplate}
              />
              <Column field="views" header="Views" />
              <Column header="Last Edited" body={dateTemplate} />
              <Column header="Action" body={actionTemplate} />
            </DataTable>
          </>
        )}
      </div>
    </>
  );
}
