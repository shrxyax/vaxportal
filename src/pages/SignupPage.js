import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const ageRef = useRef(null);
  const idNumberRef = useRef(null);
  const phoneRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(null);

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const age = ageRef.current.value;
    const idNumber = idNumberRef.current.value;
    const phone = phoneRef.current.value;

    if (!fullName || !email || !password || !confirmPassword || !age || !idNumber || !phone) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        fullName,
        email,
        password,
        age,
        idNumber,
        phone,
      });

      if (response.status === 201) {
        navigate("/login");
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="background">
    <div className="signup-container">
      <div className="signup-header">
        <div className="shield-icon"></div>
        <h2>Create your account</h2>
        <p>Already have an account? <a href="/login">Sign in</a></p>
      </div>

      <div className="signup-box">
        <label>Full Name</label>
        <input type="text" ref={fullNameRef} required />

        <label>Email address</label>
        <input type="email" ref={emailRef} required />

        <div className="row">
          <div className="input-group">
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" ref={confirmPasswordRef} required />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Age</label>
            <input type="number" ref={ageRef} required />
          </div>

          <div className="input-group">
            <label>ID Number</label>
            <input type="text" ref={idNumberRef} required />
          </div>
        </div>

        <label>Phone Number</label>
        <input type="tel" ref={phoneRef} required />

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleSignup}>Sign up</button>
      </div>
    </div>
    </div>
  );
};

export default SignupPage;