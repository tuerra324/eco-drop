import Link from "next/link";
import { Leaf, Sparkles } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden" 
         style={{ background: 'linear-gradient(180deg, #F4F9F4 0%, #E8F5E9 100%)' }}>
      
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-32 left-10 w-40 h-40 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-fadeInUp">
        {/* Logo with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-36 h-36 bg-gradient-to-br from-[#34C759] to-[#2FB350] rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Leaf size={72} color="white" strokeWidth={2.5} className="drop-shadow-lg" />
          </div>
        </div>
        
        {/* Title with better typography */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles size={20} className="text-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">AI Powered</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            EcoDrop AI
          </h1>
          <p className="text-gray-600 text-lg font-medium max-w-xs">
            Scan. Recycle. Save the Planet.
          </p>
        </div>
        
        {/* Features pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-sm">
          <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-green-100">
            <span className="text-sm text-gray-700">🤖 AI Detection</span>
          </div>
          <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-green-100">
            <span className="text-sm text-gray-700">🎁 Rewards</span>
          </div>
          <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-green-100">
            <span className="text-sm text-gray-700">🌍 Impact Tracking</span>
          </div>
        </div>
      </div>
      
      {/* CTA Button with premium styling */}
      <div className="w-full max-w-sm space-y-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <Link
          href="/home"
          className="block w-full py-5 bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] text-center relative overflow-hidden group"
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>
        
        <p className="text-center text-sm text-gray-500">
          Join thousands making an impact 🌱
        </p>
      </div>
    </div>
  );
}
