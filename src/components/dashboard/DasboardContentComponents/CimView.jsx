import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import notifInfo from "../../../assets/notifInfo.png";
import serachIcon from "../../../assets/serachIcon.png";
import userImg from "../../../assets/userImg.png";
import axios from "axios";

function CIMview() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/business-listing/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="cim__view_main_container">
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
    
                <div className="brief__infor_content">
                  <p>
                    This information is used to generate your Confidential Information Memorandum (CIM) and prepare your business for buyer review.
                  </p>
                </div>
    <div className="cim__view_main_block_wrap">
      
      {/* Business Overview */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Business Overview</h2>
        <div className="list__card_cim_row"><span>Business Name:</span> {listing.businessName}</div>
        <div className="list__card_cim_row"><span>Business Type:</span> {listing.businessType}</div>
        <div className="list__card_cim_row"><span>Entity Type:</span> {listing.entityType}</div>
        <div className="list__card_cim_row"><span>Year Established:</span> {listing.yearStablished}</div>
        <div className="list__card_cim_row"><span>Owner Involvement:</span> {listing.isOwnerInvolved}</div>
        <div className="list__card_cim_row"><span>Ownership Structure:</span> {listing.ownershipStructure}</div>
        <div className="list__card_cim_row"><span>Ownership % Breakdown:</span> {listing.ownerShipBreakdown}</div>
      </div>

      {/* Location Details */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Location Details</h2>
        <div className="list__card_cim_row"><span>City:</span> {listing.city}</div>
        <div className="list__card_cim_row"><span>State:</span> {listing.state}</div>
        <div className="list__card_cim_row"><span>Country:</span> {listing.country}</div>
        <div className="list__card_cim_row featured_facilities_cim">
          <span>Facilities / Offices:</span>
          <ul className="ml-2">
            {listing.facilitiesOffices?.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* Operational Details */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Operational Details</h2>
        <div className="list__card_cim_row"><span>Employees:</span> {listing.numberOfEmployees}</div>
        <div className="list__card_cim_row"><span>Warehouse Staff:</span> {listing.warehouseStaff}</div>
        <div className="list__card_cim_row"><span>Administrative:</span> {listing.administrativeStaff}</div>
        <div className="list__card_cim_row"><span>General Manager:</span> {listing.generalManager}</div>
        <div className="list__card_cim_row"><span>Owner (Semi-Involved):</span> {listing.ownerSemiInvolved}</div>
        <div className="list__card_cim_row list__card_cim_row_dir_col"><span>Pending Legal Matters:</span> {listing.anyPendingLegalMatter}</div>
      </div>

      {/* Financial Highlights */} 
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Financial Highlights</h2>
        <div className="list__card_cim_row"><span>Annual Revenue:</span> ${listing.revenue}</div>
        <div className="list__card_cim_row"><span>Annual Cash Flow:</span> ${listing.cashFlow}</div>
        <div className="list__card_cim_row featured_facilities_cim">
          <span>Key Clients / Contracts:</span>
          <ul className="ml-2">
            {listing.keyClientsContacts?.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Organizational Details */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Organizational Details</h2>
        <div className="list__card_cim_row"><span>General Manager:</span> {listing.generalManager}</div>
        <div className="list__card_cim_row"><span>Warehouse Supervisor:</span> {listing.warehouseSupervisor}</div>
        <div className="list__card_cim_row"><span>Fulfillment Staff:</span> {listing.warehouseStaff}</div>
        <div className="list__card_cim_row"><span>Administrative Staff:</span> {listing.administrativeStaff}</div>
        <div className="list__card_cim_row"><span>Owner Involvement:</span> {listing.isOwnerInvolved}</div>
      </div>

      {/* Attached Files */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Attached Files</h2>
        {listing.profitAndLossFile && <a href={listing.profitAndLossFile}>P&L Statement</a>}<br />
        {listing.balanceSheetFile && <a href={listing.balanceSheetFile}>Balance Sheet</a>}<br />
        {listing.threeYearTaxReturnFile && <a href={listing.threeYearTaxReturnFile}>3-Year Tax Return</a>}<br />
        {listing.ownerShipCaptableFile && <a href={listing.ownerShipCaptableFile}>Ownership Cap Table</a>}
      </div>

      {/* Ownership & Legal */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Ownership & Legal</h2>
        <div className="list__card_cim_row"><span>Ownership Structure:</span> {listing.ownershipStructure}</div>
        <div className="list__card_cim_row list__card_cim_row_dir_col"><span>Pending Legal Matters:</span> {listing.anyPendingLegalMatter}</div>
      </div>

      {/* Growth & Opportunity */}
      <div className="cim__view_main_card">
        <h2 className="heading__card_cim">Growth & Opportunity Narrative</h2>
        <div className="list__card_cim_row">{listing.growthOppertunityNarrative || "N/A"}</div>
      </div>
    </div>
    </div>
  );
}

export default CIMview;
