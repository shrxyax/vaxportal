// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
  
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const navigate = useNavigate();
//   const { login, error, user, clearErrors } = useContext(AuthContext);

//   useEffect(() => {
//     // If user is already logged in, redirect to dashboard
//     if (user) {
//       navigate("/dashboard");
//     }
    
//     // Display authentication errors from context
//     if (error) {
//       setFormError(error);
//       clearErrors();
//       setIsSubmitting(false);
//     }
//   }, [user, error, navigate, clearErrors]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear error message when user starts typing again
//     if (formError) setFormError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
    
//     if (!formData.email || !formData.password) {
//       setFormError("Please enter both email and password");
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       await login(formData.email, formData.password);
//       // If login is successful, the user will be redirected in the useEffect
//     } catch (err) {
//       // Errors are handled in the auth context and shown via useEffect
//       console.error("Login error:", err);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <div className="shield-icon">🛡️</div>
//         <h2>Welcome back</h2>
//         <p>
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </div>

//       <div className="login-box">
//         {formError && <div className="error-message">{formError}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <label>Email address</label>
//           <input 
//             type="email" 
//             name="email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             required 
//             disabled={isSubmitting}
//           />

//           <label>Password</label>
//           <input 
//             type="password" 
//             name="password" 
//             value={formData.password} 
//             onChange={handleChange} 
//             required 
//             disabled={isSubmitting}
//           />
          
//           <div className="forgot-password">
//             <Link to="/forgot-password">Forgot password?</Link>
//           </div>

//           <button 
//             type="submit" 
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Signing in..." : "Sign in"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // Ensure this file exists in src/pages/

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Reset error before making a request

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email)
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      console.log(email, password)
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="background">
    <div className="login-container">
      <div className="login-header">
        <h2>Sign in to your account</h2>
        <p>Don’t have an account? <a href="/signup">Sign up</a></p>
      </div>

      <div className="login-box">
        <label>Email address</label>
        <input type="email" ref={emailRef} required />

        <label>Password</label>
        <input type="password" ref={passwordRef} required />

        <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleLogin}>Sign in</button>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;