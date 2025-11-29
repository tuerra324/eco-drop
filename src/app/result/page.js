"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Package, FileText, Box, Wine, MapPin, Clock, Coins, Check, Sparkles } from "lucide-react";
import { Suspense } from "react";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const material = searchParams.get("material") || "Plastic";
  const confidence = searchParams.get("confidence") || "92";

  const materialIcons = {
    Plastic: Package,
    Paper: FileText,
    Metal: Box,
    Glass: Wine,
  };

  const materialColors = {
    Plastic: { gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-200" },
    Paper: { gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-200" },
    Metal: { gradient: "from-gray-500 to-gray-600", bg: "bg-gray-50", text: "text-gray-600", ring: "ring-gray-200" },
    Glass: { gradient: "from-green-500 to-emerald-600", bg: "bg-green-50", text: "text-green-600", ring: "ring-green-200" },
  };

  const Icon = materialIcons[material] || Package;
  const colors = materialColors[material] || materialColors.Plastic;

  const handleConfirm = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col items-center justify-between px-6 py-8 relative overflow-hidden"
         style={{ background: 'linear-gradient(180deg, #F4F9F4 0%, #FFFFFF 100%)' }}>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-5 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-5 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="flex-1 flex items-center justify-center w-full max-w-md">
        {/* Result Card with premium design */}
        <div className="w-full bg-white rounded-3xl shadow-xl p-8 space-y-8 border border-gray-100 animate-scaleIn">
          {/* Success indicator */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Check size={32} className="text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Material Icon with gradient background */}
          <div className="relative flex justify-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-full opacity-10 blur-2xl scale-110`}></div>
            <div className={`relative w-28 h-28 bg-gradient-to-br ${colors.gradient} rounded-3xl flex items-center justify-center shadow-lg ring-8 ${colors.ring}`}>
              <Icon size={48} className="text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Title and Confidence */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">{material}</h2>
              <p className="text-gray-500 font-medium">Successfully detected</p>
            </div>
            
            {/* Confidence badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-200">
              <Sparkles size={16} className="text-green-600" />
              <span className="text-green-700 font-bold text-sm">Confidence: {confidence}%</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Clock size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Time</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-sm font-semibold text-gray-900">Xətai, Bakı</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">Confirm & Save</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => router.push("/scan")}
              className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-green-300 hover:bg-green-50 transition-all duration-300 active:scale-[0.98]"
            >
              Scan Again
            </button>
          </div>
        </div>
      </div>

      {/* Reward Badge */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl px-6 py-4 shadow-xl flex items-center space-x-3 animate-fadeInUp border-4 border-amber-200"
           style={{ animationDelay: '0.3s' }}>
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
          <Coins size={28} className="text-amber-500" />
        </div>
        <div>
          <p className="text-white/90 text-xs font-medium">You earned</p>
          <p className="text-white font-bold text-xl">+10 EcoCoins</p>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#F4F9F4] to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading results...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
