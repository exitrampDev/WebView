import React from "react";
import { useSetRecoilState } from "recoil";
import { activePageAtom } from "../../../recoil/ctaState";
import icon1 from "../../../assets/d-icon.png";
import icon2 from "../../../assets/d-icon1.png";
import icon3 from "../../../assets/d-icon2.png";

export default function SelleListingNav() {
  const setActivePage = useSetRecoilState(activePageAtom);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="nav__dahboard">
      <ul>
        <li>
          <button onClick={() => handleClick("Dashboard")}>
            <img src={icon1} alt="-" /> Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => handleClick("Saved Listing")}>
            <img src={icon2} alt="-" /> Saved Listing
          </button>
        </li>
        <li>
          <button onClick={() => handleClick("My Listing")}>
            <img src={icon2} alt="-" /> My Listing
          </button>
        </li>
        <li>
          <button onClick={() => handleClick("Recently Viewed")}>
            <img src={icon3} alt="-" /> Recently Viewed
          </button>
        </li>
      </ul>
    </div>
  );
}
