import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import React from "react";

const MobileMenu = () => {
  return (
    <div className="flex justify-between items-center px-5 py-4 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] border-t-[1px] border-black">
      <Link href="/">
        <FaHome className="text-3xl opacity-80" />
      </Link>
      <Link href="/cart">
        <FiShoppingCart className="text-3xl opacity-80" />
      </Link>
      <Link href="/profile">
        <MdAccountCircle className="text-3xl opacity-80" />
      </Link>
    </div>
  );
};

export default MobileMenu;
