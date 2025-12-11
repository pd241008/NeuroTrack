"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Journal", href: "/journal" },
    { name: "Result", href: "/result" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl shadow-purple-900/20 flex items-center justify-between px-6 py-3">
      <Link
        href="/"
        className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
        NeuroTrack
      </Link>

      <ul className="hidden md:flex gap-8 text-sm tracking-wide">
        {navItems.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              href={item.href}
              className={`${
                pathname === item.href
                  ? "text-purple-400 font-medium"
                  : "text-gray-300 hover:text-purple-300"
              } transition-colors`}>
              {item.name}
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link
        href="/journal"
        className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition duration-300 shadow-lg shadow-purple-600/30">
        Try Now
      </Link>
    </nav>
  );
}
