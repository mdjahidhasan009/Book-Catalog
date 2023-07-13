import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from "@/layouts/Footer.tsx";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
