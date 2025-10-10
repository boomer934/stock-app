import Image from "next/image";
import React from "react";
import DropDownMenu from "./DropDownMenu";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-2 sm:p-4 bg-gray-800/40 backdrop-blur-xl min-h-[60px] sm:min-h-[70px]">
      <Link href={"/"}>
        <Image
          src={"/logo-nobg.png"}
          alt="Signals"
          width={40}
          height={40}
          className="sm:w-[50px] sm:h-[50px]"
        ></Image>
      </Link>
      <div className="flex-1 max-w-md mx-2 sm:mx-4">
        <SearchBar />
      </div>
      <DropDownMenu />
    </nav>
  );
}
