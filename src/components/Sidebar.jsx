import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri"
import { HiOutlineMenu } from "react-icons/hi";

import { logo, testicon2 } from "../assets"
import { links } from "../assets/constants"
import { current } from "@reduxjs/toolkit";

const NavLinks = () => {
  const [currentPage, setCurrentPage] = useState('Discover')

  return (
    <div className="mt-10">
      {links.map(link => (
        <NavLink
          key={link.name}
          to={link.to}
          className={`flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 ${currentPage === link.to ? 'active' : ''}`}
          onClick={() => { setCurrentPage(link.name); return handleCLick && handleClick() }}
        // cái này để check xem có hàm handleClick ko thì mới dùng bởi chỉ có trên mobile thì mới có hàm này
        >
          <link.icon className="w-6 h-6 mr-2"></link.icon>
          {link.name}
        </NavLink>

      ))}
    </div>
  )
}

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px]
      py-10 px-4 bg-[#191624]">
        <img src={testicon2} alt="logo" className="w-full h-14
        object-contain"/>
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)} />
        ) : (<HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)} />)}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b]
      backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={testicon2} alt="logo" className="w-full h-14
        object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        {/* cái này là để đóng side bar trên mobile nếu không sang trang mới sidebar vẫn sẽ hiện */}
      </div>
    </>
  )
}

export default Sidebar;
