import React, { useEffect, useState } from "react";
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

export default function SellerListing() {
  const { user, access_token } = useRecoilValue(authState) ?? {};
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

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
    yearStablished: "",
    city: "",
    state: "",
    country: "",
    industry: "",
    revenue: "",
    askingPrice: "",
    cashFlow: "",
    status: "draft",
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
        industry: newListing.industry
          ? newListing.industry.split(",").map((i) => i.trim())
          : [],
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
        industry: "",
        revenue: "",
        askingPrice: "",
        cashFlow: "",
        status: "draft",
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
        src={row.thumbnail || "https://via.placeholder.com/40"}
        alt={row.businessName}
        style={{ width: "40px", borderRadius: "6px", marginRight: "10px" }}
      />
      <span>{row.businessName}</span>
    </div>
  );

  const statusTemplate = (row) => (
    <Tag
      value={row.status}
      severity={
        row.status === "Live"
          ? "success"
          : row.status === "Draft"
          ? "danger"
          : "warning"
      }
    />
  );

  const cimTemplate = (row) => (
    <Tag
      value={row.cimStatus}
      severity={
        row.cimStatus === "Ready To Share"
          ? "success"
          : row.cimStatus === "Incomplete"
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

  const actionTemplate = (row) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button-text"
        label="View"
        onClick={() => console.log("View", row.id)}
      />
      {row.status === "Live" ? (
        <Button
          icon="pi pi-times"
          className="p-button-text p-button-danger"
          label="Unpublish"
          onClick={() => console.log("Unpublish", row.id)}
        />
      ) : (
        <Button
          icon="pi pi-upload"
          className="p-button-text p-button-success"
          label="Publish"
          onClick={() => console.log("Publish", row.id)}
        />
      )}
    </div>
  );

  // ==== UI ====
  return (
    <div className="my-listings-page">
      <h2 className="mb-2">My Listings</h2>
      <p className="mb-4">
        Manage all your business listings. View, edit, publish, and control CIM
        access for each listing.
      </p>

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
          ]}
          onChange={(e) => setFilters((f) => ({ ...f, industry: e.value }))}
          placeholder="Industry"
        />

        <Dropdown
          value={filters.status}
          options={[
            { label: "Live", value: "Live" },
            { label: "Draft", value: "Draft" },
            { label: "Inactive", value: "Inactive" },
          ]}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.value }))}
          placeholder="Status"
        />

        <InputText
          value={filters.year || ""}
          onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
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
          onChange={(e) => setFilters((f) => ({ ...f, lastEdited: e.value }))}
          placeholder="Last Edited"
          showIcon
        />

        <Button
          label="Create Listing"
          icon="pi pi-plus"
          onClick={() => setShowCreateDialog(true)}
        />
      </div>

      {/* Data Table */}
      <DataTable
        value={listings}
        paginator
        rows={10}
        loading={loading}
        responsiveLayout="scroll"
      >
        <Column header="Listing Name" body={listingNameTemplate} />
        <Column field="industry" header="Industry" />
        <Column field="status" header="Status" body={statusTemplate} />
        <Column field="yearEstablished" header="Year" />
        <Column header="Location" body={locationTemplate} />
        <Column field="revenue" header="Revenue" body={moneyTemplate} />
        <Column
          field="askingPrice"
          header="Asking Price"
          body={moneyTemplate}
        />
        <Column field="cimStatus" header="CIM Status" body={cimTemplate} />
        <Column field="views" header="Views" />
        <Column header="Last Edited" body={dateTemplate} />
        <Column header="Action" body={actionTemplate} />
      </DataTable>

      {/* Create Listing Dialog */}
      <Dialog
        header="Create New Listing"
        visible={showCreateDialog}
        style={{ width: "50vw" }}
        onHide={() => setShowCreateDialog(false)}
      >
        <div className="p-fluid grid">
          <div className="col-6">
            <InputText
              value={newListing.businessName}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, businessName: e.target.value }))
              }
              placeholder="Business Name"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.businessType}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, businessType: e.target.value }))
              }
              placeholder="Business Type"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.entityType}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, entityType: e.target.value }))
              }
              placeholder="Entity Type"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.yearStablished}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, yearStablished: e.target.value }))
              }
              placeholder="Year Established"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.city}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, city: e.target.value }))
              }
              placeholder="City"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.state}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, state: e.target.value }))
              }
              placeholder="State"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.country}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, country: e.target.value }))
              }
              placeholder="Country"
            />
          </div>
          <div className="col-6">
            <InputText
              value={newListing.industry}
              onChange={(e) =>
                setNewListing((f) => ({ ...f, industry: e.target.value }))
              }
              placeholder="Industry (comma separated)"
            />
          </div>
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
                setNewListing((f) => ({ ...f, askingPrice: e.target.value }))
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
        </div>

        <div className="flex justify-content-end mt-3">
          <Button
            label="Cancel"
            className="p-button-text"
            onClick={() => setShowCreateDialog(false)}
          />
          <Button
            label="Create"
            icon="pi pi-check"
            onClick={handleCreateListing}
          />
        </div>
      </Dialog>
    </div>
  );
}
