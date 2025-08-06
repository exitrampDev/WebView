import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil/ctaState";

import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const setAuth = useSetRecoilState(authState);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const token = res.data.access_token;
      const user = res.data.data;
      // Example: store token based on "Remember Me"
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenLocalStorage", token);
      if (formData.remember) {
        sessionStorage.setItem("tokenSessionStorage", token);
      }
      setAuth({ access_token: token, user });
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        "Login failed. " +
          (error.response?.data?.message || "Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="register-page">
        <div className="text-center mb-5 register__header_block">
          <h2>Welcome Back to Exit Ramp</h2>
          <p>
            Login to manage your listings, track NDAs, or explore new
            opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-fluid login__form_wrap">
          <div className="field__set">
            <label htmlFor="email">Email Address</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Type here..."
              required
            />
          </div>

          <div className="field__set">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              toggleMask
              feedback={false}
              placeholder="***********"
              required
            />
          </div>

          <div className="login__remember_forget_pass">
            <div className="p-field-checkbox mb-3">
              <Checkbox
                inputId="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="ml-2">
                Remember me
              </label>
            </div>
            <div className="forget__passwor_main mb-2">
              <NavLink to="/forgot-password">Forgot your password?</NavLink>
            </div>
          </div>

          <Button
            type="submit"
            label={loading ? "Logging in..." : "Sign In"}
            loading={loading}
            className="mb-3"
          />
        </form>

        {message && <p className="form-message">{message}</p>}

        <div className="login_block_col register__block">
          Don't have an account? <NavLink to="/register">Sign Up</NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
