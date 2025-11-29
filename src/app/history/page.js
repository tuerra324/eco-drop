"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Package, FileText, Box, Wine, Clock, MapPin, List, Map, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getScanHistory } from "@/utils/storage";

// Dynamically import ScanMap to avoid SSR issues with Leaflet
const ScanMap = dynamic(() => import("@/components/ScanMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-3xl bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Loading map...</span>
    </div>
  ),
});

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = getScanHistory();
    setHistory(data);
  }, []);

  const materialIcons = {
    Plastic: Package,
    Paper: FileText,
    Metal: Box,
    Glass: Wine,
  };

  const materialColors = {
    Plastic: { bg: "from-blue-50 to-sky-50", icon: "text-blue-600", badge: "bg-blue-100", text: "text-blue-700" },
    Paper: { bg: "from-amber-50 to-orange-50", icon: "text-amber-600", badge: "bg-amber-100", text: "text-amber-700" },
    Metal: { bg: "from-gray-50 to-slate-50", icon: "text-gray-600", badge: "bg-gray-100", text: "text-gray-700" },
    Glass: { bg: "from-green-50 to-emerald-50", icon: "text-green-600", badge: "bg-green-100", text: "text-green-700" },
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto pb-20" style={{ background: 'linear-gradient(180deg, #F4F9F4 0%, #FFFFFF 100%)' }}>
      <Header title="History" showBack={true} />

      {/* View Toggle */}
      <div className="px-6 py-5">
        <div className="bg-white rounded-2xl p-1.5 flex shadow-sm border border-gray-100">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm ${
              viewMode === "list"
                ? "bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <List size={18} strokeWidth={2.5} />
            <span>List</span>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm ${
              viewMode === "map"
                ? "bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Map size={18} strokeWidth={2.5} />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="px-6 space-y-4 animate-fadeInUp">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Scans</h2>
            <div className="flex items-center space-x-1.5 text-xs text-gray-500">
              <TrendingUp size={14} />
              <span>{history.length} total</span>
            </div>
          </div>

          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No scans yet. Start scanning to see your history!
              </div>
            ) : (
              history.map((scan, index) => {
                const Icon = materialIcons[scan.materialType] || Package;
                const colors = materialColors[scan.materialType] || materialColors.Plastic;

                return (
                  <div
                    key={scan.id}
                    className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 hover:border-green-100 animate-slideInRight"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <Icon size={28} className={colors.icon} strokeWidth={2} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-900">{scan.material}</h3>
                          <span className={`px-2 py-0.5 ${colors.badge} ${colors.text} text-xs font-semibold rounded-full`}>
                            {scan.confidence}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{scan.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={12} />
                            <span className="truncate">{scan.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                          <span className="text-lg">✓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Map View */}
      {viewMode === "map" && (
        <div className="px-6 animate-scaleIn">
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Scan Locations</h3>
                <div className="text-xs text-gray-500 bg-green-50 px-3 py-1.5 rounded-full">
                  {history.length} locations
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Interactive map showing all your recycling scan locations in Bakı
              </p>
              <ScanMap scans={history} />
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
