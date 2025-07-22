"use client";
import { useState } from "react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="z-50 relative space-y-1 text-white text-3xl p-2"
      >
        <span className="block h-1 w-6 bg-amber-50" />
        <span className="block h-1 w-6 bg-amber-50" />
        <span className="block h-1 w-6 bg-amber-50" />
      </button>

      {/* Overlay (klik luar untuk nutup) */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-[#1B263B] shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-4xl hover:text-red-400"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex-grow flex flex-col items-center justify-center space-y-4 text-white text-base">
          <li><Link href="/dashboard" className="block hover:text-blue-400 text-2xl font-medium">Dashboard</Link></li>
          <li><Link href="/device" className="block hover:text-blue-400 text-2xl font-medium">Devices</Link></li>
          <li><Link href="/sensor" className="block hover:text-blue-400 text-2xl font-medium">Sensors</Link></li>
          <li><Link href="/alert" className="block hover:text-blue-400 text-2xl font-medium">Alerts</Link></li>
          <li><Link href="/ticket" className="block hover:text-blue-400 text-2xl font-medium">Ticket</Link></li>
          <li><Link href="/account" className="block hover:text-blue-400 text-2xl font-medium">Account</Link></li>
        </ul>
      </div>
    </>
  );
}
