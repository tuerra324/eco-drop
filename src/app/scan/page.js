"use client";
import { useState, useEffect, useRef } from "react";
import { Camera, X, Zap, ScanLine, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { addScan, addEcoCoins, checkAchievements } from "@/utils/storage";

export default function ScanPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleScan = () => {
    setScanning(true);
    
    // Simulate AI detection
    setTimeout(() => {
      setScanning(false);
      const materials = ["Plastic", "Paper", "Metal", "Glass"];
      const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
      
      const mockResult = {
        material: `${randomMaterial} Item`,
        materialType: randomMaterial,
        confidence: Math.floor(Math.random() * 10) + 88,
        ecoCoins: randomMaterial === "Metal" ? 15 : randomMaterial === "Glass" ? 12 : randomMaterial === "Plastic" ? 10 : 8,
        location: "Bakı, Azərbaycan" 
      };
      setDetected(mockResult);
    }, 2000);
  };

  const handleConfirm = () => {
    if (detected) {
      // Save to local storage
      addScan({
        material: detected.material,
        materialType: detected.materialType,
        confidence: detected.confidence,
        location: detected.location,
        ecoCoins: detected.ecoCoins,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: "Today",
        lat: 40.4093 + (Math.random() * 0.05 - 0.025), // Simulate random location in Baku
        lng: 49.8671 + (Math.random() * 0.05 - 0.025)
      });

      addEcoCoins(detected.ecoCoins);
      checkAchievements();

      // Navigate to result page with query params
      const query = new URLSearchParams({
        material: detected.material,
        type: detected.materialType,
        confidence: detected.confidence,
        coins: detected.ecoCoins
      }).toString();
      
      router.push(`/result?${query}`);
    }
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto gradient-to-b from-gray-900 to-black flex flex-col">
      <Header title="Scan Waste" showBack={true} />

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        {/* Dynamic background grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-black/80 pointer-events-none"></div>
        
        {/* Animated scan lines */}
        {scanning && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse" style={{ top: '30%' }}></div>
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-pulse" style={{ top: '50%', animationDelay: '0.3s' }}></div>
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse" style={{ top: '70%', animationDelay: '0.6s' }}></div>
          </div>
        )}

        {!scanning && !detected && (
          <div className="text-center space-y-6 z-10 animate-fadeInUp">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative w-56 h-56 border-4 border-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Camera size={80} className="text-white/60" strokeWidth={1.5} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white/90 text-xl font-semibold">Position waste in frame</p>
              <p className="text-white/50 text-sm">Make sure the item is clearly visible</p>
            </div>
          </div>
        )}

        {scanning && !detected && (
          <div className="text-center space-y-8 z-10 animate-scaleIn">
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 bg-green-500/30 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-green-400/20 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="relative w-56 h-56 border-4 border-green-400 rounded-3xl flex items-center justify-center backdrop-blur-sm bg-green-500/10">
                <div className="relative">
                  <ScanLine size={80} className="text-green-400 animate-pulse" strokeWidth={2} />
                  <Sparkles size={24} className="absolute -top-2 -right-2 text-green-300 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-green-400 font-medium tracking-wider uppercase text-sm">Analyzing Material...</p>
            </div>
          </div>
        )}

        {detected && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-8 animate-fadeInUp z-20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                    {detected.confidence}% Confidence
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{detected.material}</h2>
                <p className="text-gray-500 mt-1">Detected Material: {detected.materialType}</p>
              </div>
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
                <Zap size={32} className="text-green-600" fill="currentColor" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 font-medium uppercase">Reward</p>
                <p className="text-2xl font-bold text-gray-900">+{detected.ecoCoins} Coins</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 font-medium uppercase">Impact</p>
                <p className="text-2xl font-bold text-green-600">Low CO₂</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleConfirm}
                className="w-full py-4 bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                Confirm & Collect
              </button>
              <button 
                onClick={() => setDetected(null)}
                className="w-full py-4 bg-white text-gray-500 font-semibold rounded-2xl hover:bg-gray-50 transition-colors"
              >
                Scan Again
              </button>
            </div>
          </div>
        )}
      </div>

      {!detected && (
        <div className="p-8 bg-black/40 backdrop-blur-md absolute max-w-sm mx-auto bottom-0 w-full z-10">
          <button
            onClick={handleScan}
            disabled={scanning}
            className="w-full py-5 bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
          >
            <Camera size={24} className="group-hover:scale-110 transition-transform" />
            <span>{scanning ? "Scanning..." : "Start Scan"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
