"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Scan, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Scan", path: "/scan", icon: Scan },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 pb-safe z-50 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                isActive ? "text-[#34C759]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#34C759] to-[#2FB350] rounded-full"></div>
              )}
              <div className={`flex flex-col items-center space-y-1 transition-transform duration-300 ${
                isActive ? "scale-110" : "scale-100"
              }`}>
                <div className={`p-2 rounded-2xl transition-all duration-300 ${
                  isActive ? "bg-green-50" : ""
                }`}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-xs font-semibold transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
