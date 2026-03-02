"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ];

  const serviceLinks = [
    { name: "OpenNVR", path: "/solutions" },
    { name: "VoIP & WebRTC", path: "/voip-webrtc" },
    { name: "AI Voice & Video Bots", path: "/ai-bots" },
    { name: "MDM Product", path: "/mdm" },
  ];

  return (
    <header className="fixed w-full z-50 bg-dark-nav/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              CryptoVoip
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center text-gray-300 hover:text-primary transition-colors text-sm font-medium py-2">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 mt-0 w-56 rounded-xl shadow-lg bg-dark-nav border border-white/10 overflow-hidden">
                  <div className="py-2">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/trainings" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
              Trainings
            </Link>

            <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
              Contact
            </Link>

            <Link
              href="/contact"
              className="mt-[-4px] bg-primary text-black px-5 py-2 rounded-full font-bold hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              Talk To Us
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-nav border-b border-white/10 h-screen overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-xl font-medium text-gray-300 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Services</p>
              <div className="space-y-4 pl-4">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/trainings" onClick={() => setIsOpen(false)} className="block text-xl font-medium text-gray-300 hover:text-primary pt-4 border-t border-white/10">
              Trainings
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-xl font-medium text-gray-300 hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
