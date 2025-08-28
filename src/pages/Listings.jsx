import React from "react";
import { useRecoilValue } from "recoil";
import { propertiesState } from "../recoil/propertiesAtom";
import PropertyCard from "../components/PropertyCard";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Listings = () => {
  const properties = useRecoilValue(propertiesState);

  return (
    <>
      <Header />
      <div className="AboutHero__main_wrapper">
        <div className="AboutHero__container">
          <h4>Explore Confidential Business Opportunities</h4>
          <p>
            Browse Our Curated Marketplace of Business Listings, Buyers, and M&A
            Experts. Seller and Buyer Listings Contact Information is Kept
            Confidential. You Can Message Listings Owners Directly.
          </p>
        </div>
      </div>

      <PropertyCard />
      <Footer />
    </>
  );
};

export default Listings;
