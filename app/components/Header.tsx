'use client';

import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-16 w-full bg-gradient-to-r from-purple-600 to-blue-500 shadow flex items-center justify-center px-4 md:px-8">
      <Link href="/" className="text-white text-2xl font-bold">
        <span className="block md:hidden">AOC Solutions</span>
        <span className="hidden md:block">Advent Of Code 2024 Solutions</span>
      </Link>
    </header>
  );
};

export default Header;
