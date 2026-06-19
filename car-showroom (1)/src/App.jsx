import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServicesIndex from "./pages/ServicesIndex";
import ServiceDetail from "./pages/ServiceDetail";
import Inventory from "./pages/Inventory";
import InventoryDetail from "./pages/InventoryDetail";
import CarForm from "./pages/CarForm";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { InventoryProvider } from "./context/InventoryContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <InventoryProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Nested routing under /services */}
          <Route path="/services" element={<Services />}>
            <Route index element={<ServicesIndex />} />
            <Route path=":slug" element={<ServiceDetail />} />
          </Route>

          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/new" element={<CarForm />} />
          <Route path="/inventory/:id" element={<InventoryDetail />} />
          <Route path="/inventory/:id/edit" element={<CarForm />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </InventoryProvider>
    </ThemeProvider>
  );
}
