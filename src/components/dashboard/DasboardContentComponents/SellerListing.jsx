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
import { Tooltip } from "primereact/tooltip";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { Link } from "react-router-dom";

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
     briefDescription: "",
    businessOverview: "",
    keyHighlights: [],
    businessName: "",
    businessType: "",
    entityType: "",
    yearStablished: "",
    city: "",
    state: "",
    country: "",
    ownershipStructure: "",
    isOwnerInvolved: "",
    ownerShipBreakdown: "",
    facilitiesOffices: "",
    numberOfEmployees: "",
    warehouseStaff: "",
    administrativeStaff: "",
    generalManager: "",
    warehouseSupervisor: "",
    revenueModel: "",
    ownerSemiInvolved: "",
    workForceDescription: "",
    keyClientsContacts: "",
    whatDoseBusinessDo: "",
    seasonalityOrTrends: "",
    anyPendingLegalMatter: "",
    growthOppertunityNarrative: "",
    industry: [],
    revenue: 0,
    askingPrice: 0,
    cashFlow: 0,
    status: "inactive",
    cimStatus: "not_ready",
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
        briefDescription: "",
    businessOverview: "",
    keyHighlights: [],
    businessName: "",
    businessType: "",
    entityType: "",
    yearStablished: "",
    city: "",
    state: "",
    country: "",
    ownershipStructure: "",
    isOwnerInvolved: "",
    ownerShipBreakdown: "",
    facilitiesOffices: "",
    numberOfEmployees: "",
    warehouseStaff: "",
    administrativeStaff: "",
    generalManager: "",
    warehouseSupervisor: "",
    revenueModel: "",
    ownerSemiInvolved: "",
    workForceDescription: "",
    keyClientsContacts: "",
    whatDoseBusinessDo: "",
    seasonalityOrTrends: "",
    anyPendingLegalMatter: "",
    growthOppertunityNarrative: "",
    industry: [],
    revenue: 0,
    askingPrice: 0,
    cashFlow: 0,
    status: "inactive",
    cimStatus: "not_ready",
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
        row.status === "live"
          ? "success"
          : row.status === "inactive"
          ? "danger"
          : "primary"
      }
    />
  );

  const cimTemplate = (row) => {
  const formattedStatus = row.cimStatus
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Tag
      value={formattedStatus}
      severity={
        row.cimStatus === "ready_to_share"
          ? "success"
          : row.cimStatus === "in_progress"
          ? "warning"
          : "danger"
      }
    />
  );
};


  const locationTemplate = (row) =>
    row.city && row.state ? `${row.city}, ${row.state}` : "-";

  const moneyTemplate = (row, { field }) =>
    row[field] ? `$${row[field].toLocaleString()}` : "-";

  const dateTemplate = (row) =>
    row.lastEdited
      ? new Date(row.lastEdited).toLocaleDateString()
      : "Not Edited";

  const handleDeleteListing = async (id) => {
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
 const handleChange = (e, field) => {
    setNewListing({ ...newListing, [field]: e.target.value });
  };
  const actionTemplate = (row) => (
    <div className="action__listing_btns">
      <i
        className="pi pi-eye cursor-pointer text-blue-500 hover:text-blue-700"
        onClick={() => console.log("View", row._id)}
      ></i>


       <Link to={`/user/cim/${row._id}`}>
         <i
          className="pi pi-file cursor-pointer text-green-500 hover:text-green-700 cim__icon_click"
          data-pr-tooltip="View CIM"
        ></i>
        <Tooltip target=".cim__icon_click" position="top" />
      </Link>

      {row.status === "published" ? (<>
       <i
          className="pi pi-times cursor-pointer text-red-500 hover:text-red-700 button__unpublish_action_lisitng_seller"
          onClick={() => console.log("Unpublish", row._id)}
          data-pr-tooltip="Unpublish"
        ></i>
        <Tooltip target=".button__unpublish_action_lisitng_seller" position="top" />
      
      </>
       
      ) : (
        <i
          className="pi pi-pencil cursor-pointer text-green-500 hover:text-green-700"
          onClick={() => console.log("Publish", row._id)}
        ></i>
      )}

      <i
        className="pi pi-trash cursor-pointer text-red-500 hover:text-red-700 button__delete_action_lisitng_seller"
        onClick={() => handleDeleteListing(row._id)}
         data-pr-tooltip="Remove"
        ></i>
        <Tooltip target=".button__delete_action_lisitng_seller" position="top" />
    </div>
  );
const handleImageSelect = (e) => {
  const file = e.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setNewListing({ ...newListing, image: reader.result }); 
  };

  reader.readAsDataURL(file);
};

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
                This information is used to generate your Confidential Information Memorandum (CIM) and prepare your business for buyer review.
              </p>
            </div>
            <div className="">
             <div className="listing__creation_block_main_wrap">
              {/* Business Name */}
      <div className="listing__creation_field_col md:col-4">
        <label>Business Name</label>
        <InputText
          value={newListing.businessName}
          onChange={(e) => handleChange(e, "businessName")}
        />
      </div>

      {/* Business Type */}
      <div className="listing__creation_field_col md:col-4">
        <label>Business Type</label>
          <InputText
            value={newListing.businessType || ""}
            onChange={(e) => handleChange(e, "businessType", e.target.value)}
            placeholder="Enter business type"
          />
      </div>

      {/* File Uploads */}
      <div className="listing__creation_field_col md:col-6">
        <label>Business Image</label>
        <FileUpload
          mode="basic"
          accept="image/*"
          customUpload
          auto
          chooseLabel="Upload Image"
          onSelect={handleImageSelect}
        />
      </div>

      
      {/* Entity Type */}
      <div className="listing__creation_field_col md:col-4">
        <label>Entity Type</label>
        <Dropdown
          value={newListing.entityType}
          options={[
              { label: "LLC", value: "llc" },
              { label: "C-Corp", value: "c_corp" },
              { label: "S-Corp", value: "s_corp" },
              { label: "LLP", value: "llp" },
              { label: "Sole Proprietorship", value: "sole_proprietorship" },
              { label: "PLLC", value: "pllc" },
              { label: "LP", value: "lp" },
              { label: "Other", value: "other" }
            ]}
          onChange={(e) => handleChange(e, "entityType")}
          placeholder="Select"
        />
      </div>
     

      {/* Key Highlights */}
      <div className="listing__creation_field_col">
        <label>Key Highlights</label>
        <Chips
          value={newListing.keyHighlights}
          onChange={(e) => setNewListing({ ...newListing, keyHighlights: e.value })}
          separator=","
        />
      </div>

       {/* Industry */}
      <div className="listing__creation_field_col md:col-6">
        <label>Industry</label>
        <InputTextarea
          value={newListing.industry?.join(", ") || ""}
          onChange={(e) =>
            setNewListing({ ...newListing, industry: e.target.value.split(",").map(i => i.trim()) })
          }
          placeholder="Enter industries (comma separated)"
          rows={3}
          cols={30}
        />
      </div>

      {/* Revenue */}
      <div className="listing__creation_field_col md:col-4">
        <label>Revenue</label>
        <InputNumber
          value={newListing.revenue}
          onValueChange={(e) => setNewListing({ ...newListing, revenue: e.value })}
          mode="currency"
          currency="USD"
        />
      </div>

      {/* Asking Price */}
      <div className="listing__creation_field_col md:col-4">
        <label>Asking Price</label>
        <InputNumber
          value={newListing.askingPrice}
          onValueChange={(e) => setNewListing({ ...newListing, askingPrice: e.value })}
          mode="currency"
          currency="USD"
        />
      </div>

      {/* Cash Flow */}
      <div className="listing__creation_field_col md:col-4">
        <label>Cash Flow</label>
        <InputNumber
          value={newListing.cashFlow}
          onValueChange={(e) => setNewListing({ ...newListing, cashFlow: e.value })}
          mode="currency"
          currency="USD"
        />
      </div>


      {/* Status */}
      <div className="listing__creation_field_col md:col-6">
        <label>Status</label>
        <Dropdown
          value={newListing.status}
          options={[
            { label: "Live", value: "live" },
            { label: "Inactive", value: "inactive" },
            { label: "Draft", value: "draft" },
          ]}
          onChange={(e) => handleChange(e, "status")}
        />
      </div>

      {/* CIM Status */}
      <div className="listing__creation_field_col md:col-6">
        <label>CIM Status</label>
        <Dropdown
          value={newListing.cimStatus}
          options={[
            { label: "Ready to share", value: "ready_to_share" },
            { label: "Incomplete", value: "incomplete" },
            { label: "Not ready", value: "not_ready" },
          ]}
          onChange={(e) => handleChange(e, "cimStatus")}
        />
      </div>
      

     <div className="listing__creation_field_col md:col-4">
  <label>Year Established</label>
  <Calendar
    value={newListing.yearStablished ? new Date(newListing.yearStablished) : null}
    onChange={(e) =>
      handleChange(e, "yearStablished", e.value ? e.value.getFullYear() : "")
    }
    view="year"
    dateFormat="yy"   // shows only year
    placeholder="Select Year"
    showIcon
  />
</div>

     {/* City */}
<div className="listing__creation_field_col md:col-4">
  <label>City</label>
  <InputText
    value={newListing.city || ""}
    onChange={(e) => handleChange(e, "city", e.target.value)}
    placeholder="Enter City"
  />
</div>

{/* State */}
<div className="listing__creation_field_col md:col-4">
  <label>State</label>
  <InputText
    value={newListing.state || ""}
    onChange={(e) => handleChange(e, "state", e.target.value)}
    placeholder="Enter State"
  />
</div>

{/* Country */}
<div className="listing__creation_field_col md:col-4">
  <label>Country</label>
  <InputText
    value={newListing.country || ""}
    onChange={(e) => handleChange(e, "country", e.target.value)}
    placeholder="Enter Country"
  />
</div>  

      {/* Ownership Structure */}
      <div className="listing__creation_field_col md:col-4">
        <label>Ownership Structure</label>
        <InputText
          value={newListing.ownershipStructure}
          onChange={(e) => handleChange(e, "ownershipStructure")}
        />
      </div>

      {/* Is Owner Involved */}
      <div className="listing__creation_field_col md:col-4">
        <label>Is Owner Involved?</label>
        <div className="flex align-items-center gap-3 mt-2">
          <RadioButton
            inputId="yes"
            name="isOwnerInvolved"
            value="yes"
            onChange={(e) =>
              setNewListing({ ...newListing, isOwnerInvolved: e.value })
            }
            checked={newListing.isOwnerInvolved === "yes"}
          />
          <label htmlFor="yes">Yes</label>
          <RadioButton
            inputId="no"
            name="isOwnerInvolved"
            value="no"
            onChange={(e) =>
              setNewListing({ ...newListing, isOwnerInvolved: e.value })
            }
            checked={newListing.isOwnerInvolved === "no"}
          />
          <label htmlFor="no">No</label>
        </div>
      </div>

      {/* Number of Employees */}
      <div className="listing__creation_field_col md:col-4">
        <label>Number of Employees</label>
        <Dropdown
          value={newListing.numberOfEmployees}
          options={[{ label: "10-50", value: "10-50" }, { label: "50-100", value: "50-100" }]}
          onChange={(e) => handleChange(e, "numberOfEmployees")}
          placeholder="Select"
        />
      </div>

      {/* Warehouse Staff */}
      <div className="listing__creation_field_col md:col-4">
        <label>Warehouse Staff</label>
        <Dropdown
          value={newListing.warehouseStaff}
          options={[{ label: "5", value: "5" }, { label: "10", value: "10" }]}
          onChange={(e) => handleChange(e, "warehouseStaff")}
          placeholder="Select"
        />
      </div>

      {/* Administrative Staff */}
      <div className="listing__creation_field_col md:col-4">
        <label>Administrative Staff</label>
        <Dropdown
          value={newListing.administrativeStaff}
          options={[{ label: "3", value: "3" }, { label: "6", value: "6" }]}
          onChange={(e) => handleChange(e, "administrativeStaff")}
          placeholder="Select"
        />
      </div>

      {/* General Manager */}
      <div className="listing__creation_field_col md:col-6">
        <label>General Manager</label>
        <InputText
          value={newListing.generalManager}
          onChange={(e) => handleChange(e, "generalManager")}
        />
      </div>

      {/* Warehouse Supervisor */}
      <div className="listing__creation_field_col md:col-6">
        <label>Warehouse Supervisor</label>
        <InputText
          value={newListing.warehouseSupervisor}
          onChange={(e) => handleChange(e, "warehouseSupervisor")}
        />
      </div>

      {/* Revenue Model */}
      <div className="listing__creation_field_col md:col-6">
        <label>Revenue Model</label>
        <Dropdown
          value={newListing.revenueModel}
          options={[{ label: "Subscription", value: "subscription" }, { label: "Sales", value: "sales" }]}
          onChange={(e) => handleChange(e, "revenueModel")}
          placeholder="Select"
        />
      </div>
      
 <div className="listing__creation_field_col">
        <label>Brief Description</label>
        <InputTextarea
          rows={3}
          value={newListing.briefDescription}
          onChange={(e) => handleChange(e, "briefDescription")}
        />
      </div>

      {/* Business Overview */}
      <div className="listing__creation_field_col">
        <label>Business Overview</label>
        <InputTextarea
          rows={3}
          value={newListing.businessOverview}
          onChange={(e) => handleChange(e, "businessOverview")}
        />
      </div>
      {/* Ownership % Breakdown */}
      <div className="listing__creation_field_col md:col-6">
        <label>Ownership % Breakdown</label>
        <InputTextarea
          rows={3}
          value={newListing.ownerShipBreakdown}
          onChange={(e) => handleChange(e, "ownerShipBreakdown")}
        />
      </div>

      {/* Facilities / Offices */}
      <div className="listing__creation_field_col md:col-6">
        <label>Facilities / Offices</label>
        <InputTextarea
          rows={3}
          value={newListing.facilitiesOffices}
          onChange={(e) => handleChange(e, "facilitiesOffices")}
        />
      </div>

      {/* Owner (Semi-Involved) */}
      <div className="listing__creation_field_col md:col-6">
        <label>Owner (Semi-Involved)</label>
        <InputTextarea
          rows={3}
          value={newListing.ownerSemiInvolved}
          onChange={(e) => handleChange(e, "ownerSemiInvolved")}
        />
      </div>

      {/* Workforce Description */}
      <div className="listing__creation_field_col md:col-6">
        <label>Workforce Description</label>
        <InputTextarea
          rows={3}
          value={newListing.workForceDescription}
          onChange={(e) => handleChange(e, "workForceDescription")}
        />
      </div>

      {/* Key Clients / Contracts */}
      <div className="listing__creation_field_col md:col-6">
        <label>Key Clients / Contracts</label>
        <InputTextarea
          rows={3}
          value={newListing.keyClientsContacts}
          onChange={(e) => handleChange(e, "keyClientsContacts")}
        />
      </div>

      {/* What does your business do? */}
      <div className="listing__creation_field_col md:col-6">
        <label>What does your business do?</label>
        <InputTextarea
          rows={3}
          value={newListing.whatDoseBusinessDo}
          onChange={(e) => handleChange(e, "whatDoseBusinessDo")}
        />
      </div>

      {/* Seasonality or Trends */}
      <div className="listing__creation_field_col md:col-6">
        <label>Seasonality or Trends</label>
        <InputTextarea
          rows={3}
          value={newListing.seasonalityOrTrends}
          onChange={(e) => handleChange(e, "seasonalityOrTrends")}
        />
      </div>

      {/* Any Pending Legal Matters? */}
      <div className="listing__creation_field_col md:col-6">
        <label>Any Pending Legal Matters?</label>
        <InputTextarea
          rows={3}
          value={newListing.anyPendingLegalMatter}
          onChange={(e) => handleChange(e, "anyPendingLegalMatter")}
        />
      </div>

      {/* Growth & Opportunity Narrative */}
      <div className="listing__creation_field_col">
        <label>Growth & Opportunity Narrative</label>
        <InputTextarea
          rows={3}
          value={newListing.growthOppertunityNarrative}
          onChange={(e) => handleChange(e, "growthOppertunityNarrative")}
        />
      </div>

    </div>

              {/* Action Buttons */}
              <div className="listing__creation_block_main_action_btn">
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  className="p-button-secondary"
                  onClick={() => setShowCreateDialog(false)}
                />
                <Button
                  label="Create"
                  icon="pi pi-check"
                  className="p-button-success"
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
            <div className="my__listing_render_table_filters">
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
                  { label: "Live", value: "live" },
                  { label: "Inactive", value: "inactive" },
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
                className="btn__crt_listing"
                onClick={() => setShowCreateDialog((prev) => !prev)}
              />
            </div>
            {/* Data Table */}
            <div className="my__save_listing_wrap my__listing_table">
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
            </div>
            
          </>
        )}
      </div>
    </>
  );
}
