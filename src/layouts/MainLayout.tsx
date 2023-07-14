import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from "@/layouts/Footer.tsx";

export default function MainLayout() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className="pt-16 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
