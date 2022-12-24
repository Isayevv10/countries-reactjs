import React, { useState } from "react";
import { BsMoon } from "react-icons/bs";

const Navbar = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <div className='container mx-auto flex justify-between my-5'>
        <div className='sm:text-2xl text-xl font-bold '>
          <p>Where in the world</p>
        </div>
        <div className='flex font-bold cursor-pointer' onClick={toggleTheme}>
          <span>
            <BsMoon className='inline' />
          </span>
          <p>Dark Mode</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
