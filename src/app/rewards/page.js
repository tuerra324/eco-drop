"use client";
import { useState, useEffect } from "react";
import { Coins, TrendingUp, Gift, Sparkles, Star, Target, Zap, Award, X } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getUserData, getMissions, updateUserData } from "@/utils/storage";
import { rewards as mockRewards } from "@/data/mockData";

export default function RewardsPage() {
  const [userData, setUserData] = useState(null);
  const [missions, setMissions] = useState([]);
  const [animatedCoins, setAnimatedCoins] = useState(0);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const data = getUserData();
    if (data) {
      setUserData(data);
      animateCoins(data.ecoCoins);
    }
    setMissions(getMissions());

    const handleUpdate = (e) => {
      if (e.detail) {
        setUserData(e.detail);
        animateCoins(e.detail.ecoCoins);
      }
    };
    window.addEventListener('userDataUpdated', handleUpdate);
    return () => window.removeEventListener('userDataUpdated', handleUpdate);
  }, []);

  const animateCoins = (target) => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setAnimatedCoins(target);
        clearInterval(timer);
      } else {
        setAnimatedCoins(Math.floor(start));
      }
    }, 16);
  };

  // Recent activity (mock for now, could be real later)
  const recentActivity = [
    { id: 1, action: "Scanned Plastic bottle", coins: 10, time: "2 min ago", icon: "♻️" },
    { id: 2, action: "Daily streak bonus", coins: 5, time: "1 hour ago", icon: "🔥" },
    { id: 3, action: "Scanned Paper", coins: 8, time: "3 hours ago", icon: "📄" },
  ];

  const handleRewardClick = (reward) => {
    if (userData && reward.available && userData.ecoCoins >= reward.coins) {
      setSelectedReward(reward);
    }
  };

  const handleRedeem = () => {
    if (userData && selectedReward) {
      updateUserData({ ecoCoins: userData.ecoCoins - selectedReward.coins });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setSelectedReward(null);
      }, 3000);
    }
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen max-w-sm mx-auto pb-20" style={{ background: 'linear-gradient(180deg, #F4F9F4 0%, #FFFFFF 100%)' }}>
      <Header title="Rewards" showBack={true} />

      <div className="px-6 py-6 space-y-6">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-ping"
                style={{
                  background: ['#34C759', '#FFB800', '#FF3B30', '#007AFF'][i % 4],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Animated EcoCoins Balance */}
        <div className="relative overflow-hidden rounded-3xl animate-scaleIn">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="relative p-8 text-white text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Sparkles size={18} className="text-white/90 animate-pulse" />
              <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">Your Balance</p>
              <Sparkles size={18} className="text-white/90 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <Coins size={56} strokeWidth={2.5} className="drop-shadow-lg animate-bounce" style={{ animationDuration: '2s' }} />
              <h2 className="text-7xl font-bold drop-shadow-lg transition-all duration-500">
                {animatedCoins}
              </h2>
            </div>
            <p className="text-white/80 text-sm">EcoCoins earned</p>
          </div>
        </div>

        {/* Weekly Missions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                <Target size={20} className="text-purple-600" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-gray-900">Weekly Missions</h3>
            </div>
            <div className="text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full font-semibold">
              +45 coins
            </div>
          </div>
          
          <div className="space-y-3">
            {missions.map((mission, index) => (
              <div 
                key={mission.id}
                className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 animate-slideInRight"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mission.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{mission.title}</p>
                      <p className="text-xs text-gray-500">+{mission.reward} coins</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-purple-600">
                    {mission.progress}/{mission.target}
                  </div>
                </div>
                <div className="relative w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(mission.progress / mission.target) * 100}%`,
                      transitionDelay: `${0.3 + index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-[#34C759]" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-gray-900">Last 7 days</h3>
          </div>
          
          <div className="mb-5">
            <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {mockRewards.last7Days.drops} drops
            </p>
            <p className="text-sm text-gray-500 mt-1">Keep up the great work!</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Progress to next reward</span>
              <span className="font-bold text-gray-900">
                {mockRewards.nextReward.current}/{mockRewards.nextReward.target}
              </span>
            </div>
            <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#34C759] to-[#2FB350] rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${mockRewards.nextReward.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">Just {mockRewards.nextReward.target - mockRewards.nextReward.current} more coins to unlock!</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Zap size={18} className="text-amber-500" />
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl animate-slideInRight"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{activity.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-amber-600 font-bold">
                  <span>+{activity.coins}</span>
                  <Coins size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Available Rewards</h3>
            <Star size={16} className="text-amber-500" />
          </div>
          <div className="space-y-3">
            {mockRewards.available.map((reward, index) => (
              <div
                key={reward.id}
                onClick={() => handleRewardClick(reward)}
                className={`bg-white rounded-2xl p-5 shadow-sm transition-all duration-300 border cursor-pointer ${
                  reward.available && userData.ecoCoins >= reward.coins
                    ? "hover:shadow-lg border-gray-50 hover:border-green-100 hover:scale-[1.02]" 
                    : "opacity-60 border-gray-100 cursor-not-allowed"
                } animate-slideInRight`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{reward.title}</h4>
                    <p className="text-sm text-gray-500">{reward.description}</p>
                    {reward.available && userData.ecoCoins >= reward.coins && (
                      <p className="text-xs text-green-600 font-semibold mt-2">✓ Available to redeem</p>
                    )}
                  </div>
                  <div
                    className={`ml-4 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm ${
                      reward.available && userData.ecoCoins >= reward.coins
                        ? "bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {reward.coins}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reward Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeInUp">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                <Gift size={32} className="text-white" />
              </div>
              <button onClick={() => setSelectedReward(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedReward.title}</h3>
            <p className="text-gray-600 mb-6">{selectedReward.description}</p>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-6 border border-amber-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Cost:</span>
                <div className="flex items-center space-x-2 text-amber-600 font-bold text-lg">
                  <Coins size={24} />
                  <span>{selectedReward.coins}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRedeem}
              className="w-full py-4 bg-gradient-to-r from-[#34C759] to-[#2FB350] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              Redeem Reward
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
