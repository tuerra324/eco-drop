// Storage utility functions for EcoDrop AI
const STORAGE_KEYS = {
  USER_DATA: 'ecodrop_user_data',
  SCAN_HISTORY: 'ecodrop_scan_history',
  ACHIEVEMENTS: 'ecodrop_achievements',
  MISSIONS: 'ecodrop_missions',
};

// Initialize storage with default data
export const initializeStorage = () => {
  if (typeof window === 'undefined') return;

  // Check if data exists, if not, set defaults
  if (!localStorage.getItem(STORAGE_KEYS.USER_DATA)) {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
      name: "Əli Məmmədov",
      email: "ali.mammadov@example.com",
      ecoCoins: 120,
      totalScans: 47,
      co2Saved: 23.5,
      treesSaved: 3,
      joinDate: new Date().toISOString(),
    }));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY)) {
    localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify([]));
  }
};

// Get user data
export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  
  if (!data) {
    initializeStorage();
    const newData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return newData ? JSON.parse(newData) : null;
  }
  
  return JSON.parse(data);
};

// Update user data
export const updateUserData = (updates) => {
  if (typeof window === 'undefined') return;
  const current = getUserData();
  if (!current) return; // Safety check
  
  const updated = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updated));
  
  // Trigger custom event for reactivity
  window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: updated }));
  return updated;
};

// Add EcoCoins
export const addEcoCoins = (amount) => {
  const userData = getUserData();
  if (!userData) return;
  
  return updateUserData({
    ecoCoins: userData.ecoCoins + amount,
    totalScans: userData.totalScans + 1,
  });
};

// Get scan history
export const getScanHistory = () => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
  return data ? JSON.parse(data) : [];
};

// Add scan to history
export const addScan = (scan) => {
  if (typeof window === 'undefined') return;
  
  // Ensure storage is initialized
  if (!localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY)) {
    initializeStorage();
  }
  
  const history = getScanHistory();
  const newScan = {
    ...scan,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  };
  
  history.unshift(newScan); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(history));
  
  // Update user stats
  const co2PerMaterial = { Plastic: 0.5, Paper: 0.3, Metal: 0.8, Glass: 0.4 };
  const userData = getUserData();
  
  if (userData) {
    const newCO2 = userData.co2Saved + (co2PerMaterial[scan.materialType] || 0.4);
    
    updateUserData({
      co2Saved: newCO2,
      treesSaved: Math.floor(newCO2 / 7.5),
    });
  }
  
  return newScan;
};

// Get missions
export const getMissions = () => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.MISSIONS);
  if (data) return JSON.parse(data);
  
  // Default missions
  const defaultMissions = [
    { id: 1, title: "Scan 5 items today", progress: 0, target: 5, reward: 15, icon: "📱" },
    { id: 2, title: "Try all material types", progress: 0, target: 4, reward: 20, icon: "🎯" },
    { id: 3, title: "Scan in 3 locations", progress: 0, target: 3, reward: 10, icon: "📍" },
  ];
  
  localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(defaultMissions));
  return defaultMissions;
};

// Update mission progress
export const updateMissionProgress = (missionId) => {
  const missions = getMissions();
  const updated = missions.map(mission => {
    if (mission.id === missionId && mission.progress < mission.target) {
      return { ...mission, progress: mission.progress + 1 };
    }
    return mission;
  });
  
  localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(updated));
  return updated;
};

// Get achievements
export const getAchievements = () => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  if (data) return JSON.parse(data);
  
  // Default achievements
  const defaultAchievements = [
    { id: 1, title: "First Scan", description: "Completed your first waste scan", icon: "🎯", earned: false },
    { id: 2, title: "Eco Warrior", description: "Scanned 50+ items", icon: "⭐", earned: false },
    { id: 3, title: "Green Hero", description: "Saved 20kg of CO₂", icon: "🌱", earned: false },
  ];
  
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(defaultAchievements));
  return defaultAchievements;
};

// Check and update achievements
export const checkAchievements = () => {
  const userData = getUserData();
  const achievements = getAchievements();
  
  let updated = false;
  const newAchievements = achievements.map(achievement => {
    if (achievement.earned) return achievement;
    
    // Check conditions
    if (achievement.id === 1 && userData.totalScans >= 1) {
      updated = true;
      return { ...achievement, earned: true };
    }
    if (achievement.id === 2 && userData.totalScans >= 50) {
      updated = true;
      return { ...achievement, earned: true };
    }
    if (achievement.id === 3 && userData.co2Saved >= 20) {
      updated = true;
      return { ...achievement, earned: true };
    }
    
    return achievement;
  });
  
  if (updated) {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(newAchievements));
  }
  
  return newAchievements;
};

// Clear all data (for testing)
export const clearAllData = () => {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
