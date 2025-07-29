import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { state } = useLocation();
  const role = state?.role || ""; // seller, buyer, subscriber, etc.
  const plan = state?.plan;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: role, // default fallback
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const payload = {
      ...formData,
      user_type:
        formData.user_type === "ma_expert" ? "m&a_expert" : formData.user_type,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        payload
      );
      setMessage("Registration successful!");
    } catch (error) {
      setMessage(
        "Registration failed. " + (error.response?.data?.message || "")
      );
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="register-page">
      <h1>Register {role}</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default Register;
