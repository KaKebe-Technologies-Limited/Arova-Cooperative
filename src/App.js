import React, { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./layout/NavBar";
import ScrollToTop from "./layout/ScrollToTop";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import Footer from "./layout/Footer";

const animationStyles = `
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
`;

const ArovaContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedHex } = useContext(ThemeContext);
  const primaryColor = resolvedHex;

  return (
    <div className="font-sans text-gray-900 bg-white">
      <ScrollToTop />
      <style>{animationStyles}</style>

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        primaryColor={primaryColor}
      />

      <div className="pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ArovaContent />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
