"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, History, Gift, MapPin, Zap } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { getUserData, initializeStorage } from "@/utils/storage";

export default function HomePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    initializeStorage();
    const data = getUserData();
    if (data) setUserData(data);

    const handleUpdate = (e) => {
      if (e.detail) setUserData(e.detail);
    };
    window.addEventListener('userDataUpdated', handleUpdate);
    return () => window.removeEventListener('userDataUpdated', handleUpdate);
  }, []);

  if (!userData) return null;

  return (
    <div className="min-h-screen max-w-sm mx-auto pb-20" style={{ background: 'linear-gradient(180deg, #F4F9F4 0%, #FFFFFF 100%)' }}>
      {/* Header with gradient */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-5 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              EcoDrop AI
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Your eco companion</p>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-100">
            <Zap size={14} className="text-green-600" />
            <span className="text-xs font-semibold text-green-700">{userData.ecoCoins} pts</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 pt-12 pb-8">
        {/* Large Scan Button with premium design */}
        <div className="relative mb-16 animate-scaleIn">
          {/* Pulse ring effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-30 animate-pulse blur-2xl"></div>
          
          <Link
            href="/scan"
            className="relative block w-52 h-52 bg-gradient-to-br from-[#34C759] to-[#2FB350] rounded-full flex flex-col items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 overflow-hidden group"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            <Camera size={68} color="white" strokeWidth={2.5} className="drop-shadow-lg relative z-10" />
            <span className="text-white font-bold text-xl mt-4 relative z-10 drop-shadow-md">Scan Waste</span>
            
            {/* Decorative dots */}
            <div className="absolute bottom-6 flex space-x-1.5">
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </Link>
        </div>

        {/* Quick Access Grid with premium cards */}
        <div className="w-full space-y-3 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/history"
              className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center space-y-3 border border-gray-50 hover:border-green-100 active:scale-95"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <History size={26} className="text-[#34C759]" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-700">History</span>
            </Link>

            <Link
              href="/rewards"
              className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center space-y-3 border border-gray-50 hover:border-amber-100 active:scale-95"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Gift size={26} className="text-amber-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-700">Rewards</span>
            </Link>

            <Link
              href="/history"
              className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center space-y-3 border border-gray-50 hover:border-blue-100 active:scale-95"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <MapPin size={26} className="text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-700">Map</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="w-full mt-8 bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-5 shadow-sm border border-green-50 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{userData.totalScans}</p>
              <p className="text-xs text-gray-500 mt-1">Scans</p>
            </div>
            <div className="border-l border-r border-gray-100">
              <p className="text-2xl font-bold text-green-600">{userData.co2Saved.toFixed(1)}kg</p>
              <p className="text-xs text-gray-500 mt-1">CO₂ Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userData.treesSaved}</p>
              <p className="text-xs text-gray-500 mt-1">Trees</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
