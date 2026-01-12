import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./layout/NavBar";
import AdminLoginModal from "./components/AdminLoginModal";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);

  const navigate = useNavigate();
  const { resolvedHex } = useContext(ThemeContext);
  const primaryColor = resolvedHex;

  // -----------------------------
  // BLOG POSTS BOOTSTRAP
  // -----------------------------
  useEffect(() => {
    const defaultPosts = [
      {
        id: 1,
        title: "From 15 Women to 19,000+ Members",
        excerpt: "How a small savings group transformed the region.",
        date: "Dec 14, 2024",
        image: "/images/blog 1.jpg",
        category: "Success Story",
        status: "Published",
      },
      {
        id: 2,
        title: "Breaking the Poverty Cycle",
        excerpt: "Low interest loans are changing lives.",
        date: "Nov 20, 2024",
        image: "/images/blog 2.jpg",
        category: "Finance",
        status: "Published",
      },
      {
        id: 3,
        title: "Revolutionizing Agriculture via Value Addition",
        excerpt: "Helping farmers earn more through processing.",
        date: "Oct 15, 2024",
        image: "/images/blog 4.webp",
        category: "Agriculture",
        status: "Published",
      },
      {
        id: 4,
        title: "The Power of a Shared Dream",
        excerpt: "It started with 15 women.",
        date: "Sep 08, 2024",
        image: "/images/blog 5.jpg",
        category: "Community",
        status: "Published",
      },
      {
        id: 5,
        title: "Serving the Lango & Acholi Sub-regions",
        excerpt: "Expanding across Northern Uganda.",
        date: "Aug 22, 2024",
        image: "/images/blog 3.jpg",
        category: "Impact",
        status: "Published",
      },
      {
        id: 6,
        title: "Funding Our Future: 2B UGX",
        excerpt: "Strategic funding accelerating impact.",
        date: "Jul 15, 2024",
        image: "/images/blog 6.jpg",
        category: "Finance",
        status: "Published",
      },
    ];

    const saved = localStorage.getItem("arova_blog_posts");
    setBlogPosts(saved ? JSON.parse(saved) : defaultPosts);
  }, []);

  // -----------------------------
  // ADMIN LOGIN
  // -----------------------------
  const handleAdminLogin = () => {
    if (adminPassword === "arova2024") {
      setIsAdmin(true);
      localStorage.setItem("isAuthenticated", "true");
      setShowAdminLogin(false);
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      <ScrollToTop />
      <style>{animationStyles}</style>

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isAdmin={isAdmin}
        setShowAdminLogin={setShowAdminLogin}
        primaryColor={primaryColor}
      />

      <div className="pt-24">
        <Routes>
          <Route path="/" element={<HomePage blogPosts={blogPosts} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage blogPosts={blogPosts} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin"
            element={
              isAdmin || localStorage.getItem("isAuthenticated") === "true" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>

      <Footer />

      {showAdminLogin && (
        <AdminLoginModal
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          handleAdminLogin={handleAdminLogin}
          setShowAdminLogin={setShowAdminLogin}
          primaryColor={primaryColor}
        />
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <ArovaContent />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
