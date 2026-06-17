import { useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InquiryCart from "./components/InquiryCart";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import CRS from "./pages/CRS.tsx";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTopOnMount = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    // Disable smooth scrolling temporarily to prevent scrolling animation on page transition
    const originalStyle = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    
    window.scrollTo({ top: 0, behavior: "auto" });
    
    // In case there is any delayed paint/layout that alters scroll, we use a small timeout to restore it
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalStyle;
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ScrollToTopOnMount><Home /></ScrollToTopOnMount>} />
        <Route path="/about" element={<ScrollToTopOnMount><About /></ScrollToTopOnMount>} />
        <Route path="/products" element={<ScrollToTopOnMount><Products /></ScrollToTopOnMount>} />
        <Route path="/services" element={<ScrollToTopOnMount><Services /></ScrollToTopOnMount>} />
        <Route path="/gallery" element={<ScrollToTopOnMount><Gallery /></ScrollToTopOnMount>} />
        <Route path="/certifications" element={<ScrollToTopOnMount><Certifications /></ScrollToTopOnMount>} />
        <Route path="/careers" element={<ScrollToTopOnMount><Careers /></ScrollToTopOnMount>} />
        <Route path="/crs" element={<ScrollToTopOnMount><CRS /></ScrollToTopOnMount>} />
        <Route path="/blog" element={<ScrollToTopOnMount><Blog /></ScrollToTopOnMount>} />
        <Route path="/blog/:id" element={<ScrollToTopOnMount><BlogDetail /></ScrollToTopOnMount>} />
        <Route path="/contact" element={<ScrollToTopOnMount><Contact /></ScrollToTopOnMount>} />
        <Route path="*" element={<ScrollToTopOnMount><NotFound /></ScrollToTopOnMount>} />
      </Routes>
    </AnimatePresence>
  );
};


const AppShell = () => {
  const location = useLocation();
  const isGallery = location.pathname === "/gallery";
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      {!isGallery && <Footer />}
      <InquiryCart />
      <ScrollToTop />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
