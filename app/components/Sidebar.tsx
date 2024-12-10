'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  days: string[];
};

const Sidebar = ({ days }: SidebarProps) => {
  const url = useParams();
  const currentDay = url?.day;

  // State to toggle sidebar for mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className={`fixed top-4 left-4 z-50 text-white text-2xl md:hidden ${isOpen && "hidden"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-md border-r-2 border-gray-200 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <ul className="flex flex-col h-full">
          {days.map((day) => {
            const isActive = currentDay === day;
            return (
              <Link href={`/${day}`} key={day}>
                <li
                  className={`py-4 pl-8 text-lg font-semibold ${
                    isActive ? "bg-gray-200 text-gray-800" : ""
                  }`}
                  onClick={() => setIsOpen(false)} // Close sidebar on click
                >
                  {day.replace("day", "Day ")}
                </li>
              </Link>
            );
          })}
        </ul>
      </aside>

      {/* Overlay for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
