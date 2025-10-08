
import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
 
  return (
    <footer
    className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 justify-start items-start p-4 sm:p-6 text-yellow-400 border-t border-yellow-400/30 mx-2 sm:mx-4 backdrop-blur-sm">
      <Image
        src="/logo-nobg.png"
        alt="Signals"
        width={40}
        height={40}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 sm:w-[50px] sm:h-[50px]"
      ></Image>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-sm sm:text-base">Pages</h3>
        <ul className="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm text-yellow-400/70">
          <li className="cursor-pointer hover:text-yellow-400 transition-colors">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-400 transition-colors">
            <Link href="/alerts">Alerts</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-400 transition-colors">
            <Link href="/market">Market</Link>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-sm sm:text-base">Platform</h3>
        <ul className="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm text-yellow-400/70">
          <li className="cursor-pointer hover:text-yellow-400 transition-colors">
            <Link href="https://github.com/boomer934" target="_blank">
              Github
            </Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-400 transition-colors">
            <Link href="https://boomer934-portfolio.vercel.app" target="_blank">
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
