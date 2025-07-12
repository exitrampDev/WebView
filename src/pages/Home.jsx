import React from "react";
import PropertyCard from "../components/PropertyCard";
import HeroSec from "../components/homepage/HeroSec";
import WhoUseSec from "../components/homepage/WhoUseSec";
import PlatformFeature from "../components/homepage/PlatformFeature";
import ExitRampPricing from "../components/homepage/ExitRampPricing";
import HowItWorks from "../components/homepage/HowItWorks";

const Home = () => {
  return (
    <>
      <HeroSec />
      <WhoUseSec />
      <PlatformFeature />
      <ExitRampPricing />
      <HowItWorks />
    </>
  );
};

export default Home;
