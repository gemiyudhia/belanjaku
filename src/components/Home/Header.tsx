"use client";

import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { PiMagnifyingGlass } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const Header = () => {
  const { status } = useSession();

  return (
    <>
      <div className="flex items-center justify-between mx-5 py-5 lg:py-0">
        <Link href="/" className="">
          <Image
            src="/images/logo.png"
            alt="Logo BelanjaKu"
            width={110}
            height={110}
          />
        </Link>
        <form action="">
          <div className="relative">
            <Input
              type="text"
              placeholder="Mau beli apa hari ini?"
              className="w-96 lg:w-[500px] focus:ring-2 focus:ring-primary focus:outline-none py-6 px-4"
            />
            <PiMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl opacity-75" />
          </div>
        </form>
        <div className="hidden md:flex gap-x-6 items-center">
          {status === "authenticated" ? (
            <>
              <Link href="/">
                <FiShoppingCart className="text-3xl" />
              </Link>
              <Link href="/">
                <MdAccountCircle className="text-3xl" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-primary">
                <Button className="py-6 px-9 bg-transparent text-lg rounded-xl border border-primary hover:bg-transparent font-semibold">
                  Masuk
                </Button>
              </Link>
              <Link href="/register" className="text-white">
                <Button className="py-6 px-9 bg-primary text-lg rounded-xl border font-semibold">
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 w-full">
        <MobileMenu />
      </div>
    </>
  );
};

export default Header;
