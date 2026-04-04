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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex items-center justify-between px-8 py-4 transition-all duration-300">
      <Link
        href="/"
        className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-purple-300 to-fuchsia-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
        NeuroTrack
      </Link>

      <ul className="hidden md:flex gap-8 text-[15px] font-medium tracking-wide">
        {navItems.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href={item.href}
              className={`relative px-2 py-1 ${
                pathname === item.href
                  ? "text-white"
                  : "text-gray-400 hover:text-purple-300"
              } transition-colors duration-300 group`}>
              {item.name}
              {pathname === item.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-purple-400 rounded-full"
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link
        href="/journal"
        className="hidden md:flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/20 backdrop-blur-md">
        Try Now
      </Link>
    </nav>
  );
}
