import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-2 justify-start items-start p-4 text-yellow-400 border-t-1 border-yellow-400 mx-4">
      <Image
        src="/logo-nobg.png"
        alt="Signals"
        width={50}
        height={50}
        className="absolute top-5 right-5"
      ></Image>
      <h3>Pages</h3>
      <ul className="flex flex-col gap-2 text-[90%] text-yellow-400/50">
        <li className="cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/alert">Alert</Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/market">Market</Link>
        </li>
      </ul>
      <h3>Platform</h3>
      <ul className="flex flex-col gap-2 text-[90%] text-yellow-400/50">
        <li className="cursor-pointer">
          <Link href="https://github.com/boomer934" target="_blank">
            Github
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link href="https://boomer934-portfolio.vercel.app" target="_blank">
            Portfolio
          </Link>
        </li>
      </ul>
    </footer>
  );
}
