import React from "react";

export default function BuyerFreeNav() {
  return (
    <div>
      <div className="nav__dahboard">
        <ul>
          <li>
            <Link to="/dashboard">
              <img src={icon1} alt="-" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/listings">
              <img src={icon2} alt="-" />
              Saved Listing
            </Link>
          </li>
          <li>
            <Link to="/listings">
              <img src={icon3} alt="-" />
              Recently Viewed
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
