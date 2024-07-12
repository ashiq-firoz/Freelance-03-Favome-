"use client";

import React, { useState } from "react";
import { HoveredLink, Menu } from "./ui/navbar-menu";
import { cn } from "../utils/cn";

interface NavBarComponentProps {
  className?: string;
}

const NavBarComponent: React.FC<NavBarComponentProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className={cn("fixed top-6 inset-x-0 max-w-xl mx-auto z-50", className)}>
        <Menu setActive={setActive}>
          <HoveredLink href="/">
            <div className="flex items-center">
              {/* <img src="/img/logo.png" alt="Logo" className="h-15 w-10" /> */}
              <span className="text-black font-semibold hidden sm:block">
                FAVOME
              </span>
            </div>
          </HoveredLink>
          <HoveredLink href="#about">
            {/* Display "About" on small screens */}
            <span className="sm:hidden">About</span>
            {/* Display "About Us" on larger screens */}
            <span className="hidden sm:inline">About Us</span>
          </HoveredLink>
          <HoveredLink href="#products">Products</HoveredLink>
          <HoveredLink href="#">Store</HoveredLink>
          <HoveredLink href="#contact">
          <span className="sm:hidden">Contact</span>
            {/* Display "Contact Us" on larger screens */}
          <span className="hidden sm:inline">Contact Us</span>
          </HoveredLink>
        </Menu>
      </div>
    </>
  );
};

export default NavBarComponent;