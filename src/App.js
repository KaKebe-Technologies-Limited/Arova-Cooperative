import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import React, { useState, useContext, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import BlogPage from "./pages/BlogPage";
import BlogPostDetail from "./pages/BlogPostDetail";
import ContactPage from "./pages/ContactPage";
import Navbar from "./layout/NavBar";
import ScrollToTop from "./layout/ScrollToTop";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import Footer from "./layout/Footer";

// Admin pages loaded lazily — keeps ReactQuill (~200 KB) out of the initial bundle
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AdminLoginPage = React.lazy(() => import("./pages/AdminLoginPage"));

const AdminFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <svg className="animate-spin h-10 w-10 text-emerald-600" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </div>
);

const animationStyles = `
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
`;

const ArovaContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedHex } = useContext(ThemeContext);

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Toaster position="top-right" />
      <ScrollToTop />
      <style>{animationStyles}</style>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} primaryColor={resolvedHex} />
      <div className="pt-24">
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/about"       element={<AboutPage />} />
            <Route path="/team"        element={<TeamPage />} />
            <Route path="/blog"        element={<BlogPage />} />
            <Route path="/blog/:slug"  element={<BlogPostDetail />} />
            <Route path="/contact"     element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin"       element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <SWRConfig value={{ revalidateOnFocus: false, dedupingInterval: 60000, shouldRetryOnError: false }}>
        <ThemeProvider>
          <AuthProvider>
            <ArovaContent />
          </AuthProvider>
        </ThemeProvider>
      </SWRConfig>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
