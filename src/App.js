// import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./context/AuthContext"; // Import the AuthContext
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import DashboardPage from "./pages/DashboardPage";
// import AppointmentsPage from "./pages/AppointmentsPage";
// import BookAppointment from "./pages/BookAppointment";
// import Certificates from "./pages/certificates";
// import SettingsPage from "./pages/SettingsPage";
// import Sidebar from "./pages/Sidebar";

// // Protected Route component that checks for authentication
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   // Show loading state if auth state is still being determined
//   if (loading) {
//     return <div className="loading-screen">Loading...</div>;
//   }

//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// // WithSidebar component that includes the sidebar
// const WithSidebar = ({ children }) => (
//   <div className="app-layout">
//     <Sidebar />
//     <div className="content">{children}</div>
//   </div>
// );

// function AppContent() {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/home" element={<HomePage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignupPage />} />

//       {/* Protected routes */}
//       <Route 
//         path="/dashboard" 
//         element={
//           <ProtectedRoute>
//             <WithSidebar>
//               <DashboardPage />
//             </WithSidebar>
//           </ProtectedRoute>
//         } 
//       />
//       <Route 
//         path="/appointments" 
//         element={
//           <ProtectedRoute>
//             <WithSidebar>
//               <AppointmentsPage />
//             </WithSidebar>
//           </ProtectedRoute>
//         } 
//       />
//       <Route 
//         path="/appointments/book" 
//         element={
//           <ProtectedRoute>
//             <WithSidebar>
//               <BookAppointment />
//             </WithSidebar>
//           </ProtectedRoute>
//         } 
//       />
//       <Route 
//         path="/certificates" 
//         element={
//           <ProtectedRoute>
//             <WithSidebar>
//               <Certificates />
//             </WithSidebar>
//           </ProtectedRoute>
//         } 
//       />
//       <Route 
//         path="/settings" 
//         element={
//           <ProtectedRoute>
//             <WithSidebar>
//               <SettingsPage />
//             </WithSidebar>
//           </ProtectedRoute>
//         } 
//       />
      
//       {/* Catch all other routes and redirect to home */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     // Wrap entire app with AuthProvider to make auth context available everywhere
//     <AuthProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import Home Page
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BookAppointment from "./pages/BookAppointment";
import Certificates from "./pages/certificates";
import SettingsPage from "./pages/SettingsPage";
import Sidebar from "./pages/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/dashboard" element={<WithSidebar><DashboardPage /></WithSidebar>} />
        <Route path="/appointments" element={<WithSidebar><AppointmentsPage /></WithSidebar>} />
        <Route path="/appointments/book" element={<WithSidebar><BookAppointment /></WithSidebar>} />
        <Route path="/certificates" element={<WithSidebar><Certificates /></WithSidebar>} />
        <Route path="/settings" element={<WithSidebar><SettingsPage /></WithSidebar>} />
      </Routes>
    </Router>
  );
}
const WithSidebar = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <div className="content">{children}</div>
  </div>
);

export default App;








