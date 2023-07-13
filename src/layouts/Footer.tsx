import React from 'react';
import logo from '@/assets/images/technet-logo-white.png';
import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    // <div className="bg-[#242630] text-secondary p-20">
    //   <div className="flex justify-between">
    //     <div>
    //       <img className="h-10" src={logo} alt="Logo" />
    //     </div>
    //     <div className="flex gap-20">
    //       <ul className="space-y-2">
    //         <li>Upcoming</li>
    //         <li>Shipping</li>
    //         <li>How it works</li>
    //       </ul>
    //       <ul className="space-y-2">
    //         <li>Support</li>
    //         <li>Careers</li>
    //       </ul>
    //       <ul className="space-y-2">
    //         <li>List your gear</li>
    //         <li>Contact team</li>
    //       </ul>
    //     </div>
    //     <div className="flex gap-2 text-2xl">
    //       <RiFacebookBoxFill />
    //       <RiInstagramLine />
    //     </div>
    //   </div>
    //   <div className="flex w-full mt-20 gap-5">
    //     <p>Privacy Policy</p>
    //     <p>Terms & Condition</p>
    //     <p className="ml-auto"> &#169; TechNet {year}</p>
    //   </div>
    // </div>

    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
      </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>

  );
}
