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

  const [isOpen, setIsOpen] = useState(false);

  const sortedDays = days.sort((a, b) => {
    const numA = parseInt(a.replace("day", ""), 10);
    const numB = parseInt(b.replace("day", ""), 10);
    return numA - numB;
  });

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-50 text-white text-2xl md:hidden ${isOpen && "hidden"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <aside
        className={`fixed overflow-y-scroll top-0 left-0 z-40 h-full w-64 bg-white shadow-md border-r-2 border-gray-200 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <ul className="flex flex-col h-full">
          {sortedDays.map((day) => {
            const isActive = currentDay === day;
            return (
              <Link href={`/${day}`} key={day}>
                <li
                  className={`py-4 pl-8 text-lg font-semibold ${
                    isActive ? "bg-gray-200 text-gray-800" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {day.replace("day", "Day ")}
                </li>
              </Link>
            );
          })}
        </ul>
      </aside>

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
