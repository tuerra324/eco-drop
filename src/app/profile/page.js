"use client";
import { useState, useEffect } from "react";
import { User, Mail, Leaf, TreePine, Award, Settings, LogOut, Sparkles, TrendingUp, Edit2, Camera } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getUserData, getAchievements, updateUserData } from "@/utils/storage";
import { achievements as defaultAchievements } from "@/data/mockData";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    // Load from localStorage or use defaults
    const stored = getUserData();
    if (stored) {
      setUserData(stored);
      setEditName(stored.name);
    }
    
    const storedAchievements = getAchievements();
    setAchievements(storedAchievements.length > 0 ? storedAchievements : defaultAchievements);

    // Listen for storage updates
    const handleUpdate = (e) => {
      if (e.detail) {
        setUserData(e.detail);
      }
    };
    window.addEventListener('userDataUpdated', handleUpdate);
    return () => window.removeEventListener('userDataUpdated', handleUpdate);
  }, []);

  const handleSaveName = () => {
    if (editName.trim()) {
      updateUserData({ name: editName });
      setIsEditing(false);
    }
  };

  if (!userData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen max-w-sm mx-auto pb-20" style={{ background: 'linear-gradient(180deg, #F4F9F4 0%, #FFFFFF 100%)' }}>
      <Header title="Profile" showBack={false} />

      <div className="px-6 py-6 space-y-4">
        {/* Enhanced User Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-scaleIn">
          <div className="flex items-start space-x-4 mb-6">
            {/* Avatar with edit button */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#34C759] to-[#2FB350] rounded-full flex items-center justify-center shadow-lg">
                <User size={40} className="text-white" strokeWidth={2.5} />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-all">
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 pt-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl font-bold text-lg focus:outline-none focus:border-green-500"
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveName}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditName(userData.name);
                        setIsEditing(false);
                      }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <Edit2 size={14} className="text-gray-400" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-1.5 text-gray-500 text-sm mt-1">
                    <Mail size={12} />
                    <span className="text-xs">{userData.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid - Horizontal with better design */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <p className="text-3xl font-bold text-gray-900">{userData.totalScans}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Scans</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100">
              <p className="text-3xl font-bold text-[#34C759]">{userData.ecoCoins}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Coins</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <p className="text-3xl font-bold text-gray-900">{userData.treesSaved}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Trees</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact - Compact cards */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={18} className="text-[#34C759]" strokeWidth={2.5} />
            <h3 className="font-bold text-gray-900">Environmental Impact</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Leaf size={24} className="text-[#34C759]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">CO₂ Saved</p>
                  <p className="font-bold text-gray-900">Carbon offset</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#34C759]">{userData.co2Saved} kg</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <TreePine size={24} className="text-[#34C759]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Trees Equivalent</p>
                  <p className="font-bold text-gray-900">Environmental contribution</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#34C759]">{userData.treesSaved}</p>
            </div>
          </div>
        </div>

        {/* Achievements - Compact */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Award size={18} className="text-amber-500" strokeWidth={2.5} />
            <h3 className="font-bold text-gray-900">Achievements</h3>
          </div>
          
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative overflow-hidden flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 ${
                  achievement.earned
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
                    : "bg-gray-50 border-2 border-gray-100 opacity-60"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{achievement.title}</p>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="w-8 h-8 bg-[#34C759] rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="space-y-2 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <button className="w-full py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:border-green-200 hover:bg-green-50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-2">
            <Settings size={18} strokeWidth={2.5} />
            <span>Settings</span>
          </button>
          
          <button className="w-full py-3.5 bg-white border-2 border-red-200 text-red-600 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:bg-red-50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-2">
            <LogOut size={18} strokeWidth={2.5} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
