import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/ctaState";

export default function BusinessListingDetail() {
  const { user, access_token } = useRecoilValue(authState) ?? {};
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        // Save favorite
        const response = await fetch("http://localhost:3000/recently", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ businessId: id }), // ✅ correct payload
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const favData = await response.json();
        console.log("Favorite saved:", favData);
      } catch (error) {
        console.error("Error saving favorite:", error);
      }

      try {
        // Fetch business detail
        const res = await fetch(`http://localhost:3000/business-listing/${id}`);
        const data = await res.json();
        setBusiness(data);
      } catch (err) {
        console.error("Error fetching business:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <ProgressSpinner />;
  if (!business) return <p>Business not found</p>;

  return (
    <>
      <Header />
      <div className="breadcrubs__main_container">
        <Link to={`/`} className="">
          Home
        </Link>
        /
        <Link to={`/listings/`} className="">
          Business for sale
        </Link>
        / Business listing details
      </div>
      <div className="p-6">
        <Card title={business.businessName}>
          <img
            src={business.image}
            alt={business.businessName}
            className="w-64 h-64 object-cover rounded-lg mb-4"
          />
          <p>
            <b>Location:</b> {business.city}, {business.state}
          </p>
          <p>
            <b>Asking Price:</b> ${business.askingPrice}
          </p>
          <p>
            <b>Revenue:</b> ${business.revenue}
          </p>
          <p>
            <b>Cash Flow:</b> ${business.cashFlow}
          </p>
          <p>
            <b>Industry:</b> {business.industry?.join(", ")}
          </p>
          <p>
            <b>Description:</b> {business.whatDoseBusinessDo}
          </p>
        </Card>
      </div>
      <Footer />
    </>
  );
}
