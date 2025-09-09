import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import notifInfo from "../../../assets/notifInfo.png";
import serachIcon from "../../../assets/serachIcon.png";
import userImg from "../../../assets/userImg.png";

const MySaveListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/business-listing/public")
      .then((res) => {
        setListings(res.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  // Image + name template
  const listingNameTemplate = (rowData) => (
    <div className="flex items-center gap-2 img_my_save_lisiting">
      <img
        src={rowData.image || "https://via.placeholder.com/40"}
        alt={rowData.businessName}
        className="w-10 h-10 rounded"
      />
      <span>{rowData.businessName}</span>
    </div>
  );

  // NDA Status template
  const ndaStatusTemplate = (rowData) => {
    const status = rowData.ndaStatus || "Not Started";
    const severity =
      status === "Submitted"
        ? "success"
        : status === "Approved"
        ? "info"
        : "danger";
    return <Tag value={status} severity={severity} />;
  };

  // Revenue + Asking Price template
  const moneyTemplate = (value) =>
    value ? `$${Number(value).toLocaleString()}` : "$0";

  // CIM Access lock
  const cimTemplate = () => (
    <i className="pi pi-lock" style={{ color: "#f59e0b" }} />
  );
  const industryTemplate = (rowData) => {
    if (Array.isArray(rowData.industry)) {
      return rowData.industry.join(", ");
    }
    return rowData.industry || "-";
  };
  // Action heart
  const actionTemplate = () => (
    <Button icon="pi pi-heart-fill" className="button__save_listing" />
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="dashboard__header_block">
        <h3 className="heading__Digital_CIM">Saved Listings</h3>

        <div className="dashboard__header_search_notification_wrap">
          <div className="dashboard__search_field_wrap">
            <input type="text" placeholder="Search" />
            <img src={serachIcon} alt="search" />
          </div>
          <div className="dashboard__notification_wrap">
            <button>
              <img src={notifInfo} alt="notifications" />
            </button>
          </div>
          <div className="dashboard__user_wrap">
            <button>
              <img src={userImg} alt="user" />
            </button>
          </div>
        </div>
      </div>
      <div className="my__save_listing_wrap">
        <DataTable
          value={listings}
          paginator
          rows={10}
          responsiveLayout="scroll"
          emptyMessage="No business listings found."
        >
          <Column header="Listing Name" body={listingNameTemplate} />
          <Column header="Industry" body={industryTemplate} />
          <Column header="NDA Status" body={ndaStatusTemplate} />
          <Column field="type" header="Type" />
          <Column
            field="revenue"
            header="Revenue"
            body={(rowData) => moneyTemplate(rowData.revenue)}
          />
          <Column
            field="askingPrice"
            header="Asking Price"
            body={(rowData) => moneyTemplate(rowData.askingPrice)}
          />
          <Column header="CIM Access" body={cimTemplate} />
          <Column header="Action" body={actionTemplate} />
        </DataTable>
      </div>
    </>
  );
};

export default MySaveListing;
