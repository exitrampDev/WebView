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
      <div style={{ padding: "20px" }}>
        <h2>All Listings</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listings;
