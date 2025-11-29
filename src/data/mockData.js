// Mock Data for EcoDrop AI Application

export const userData = {
  name: "Əli Məmmədov",
  email: "ali.mammadov@example.com",
  ecoCoins: 120,
  totalScans: 47,
  co2Saved: 23.5, // kg
  treesSaved: 3,
  joinDate: "2024-01-15"
};

export const scanHistory = [
  {
    id: 1,
    material: "Plastik",
    materialType: "Plastic",
    confidence: 92,
    time: "14:32",
    date: "Today",
    location: "Xətai, Bakı",
    lat: 40.3777,
    lng: 49.8460,
    timestamp: new Date().toISOString(),
    ecoCoins: 10
  },
  {
    id: 2,
    material: "Kağız",
    materialType: "Paper",
    confidence: 88,
    time: "12:11",
    date: "Today",
    location: "Nərimanov",
    lat: 40.4093,
    lng: 49.8671,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ecoCoins: 8
  },
  {
    id: 3,
    material: "Metal",
    materialType: "Metal",
    confidence: 95,
    time: "09:45",
    date: "Yesterday",
    location: "Yasamal",
    lat: 40.3953,
    lng: 49.8822,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    ecoCoins: 15
  },
  {
    id: 4,
    material: "Plastik",
    materialType: "Plastic",
    confidence: 91,
    time: "Yesterday",
    date: "Yesterday",
    location: "Nəsimi",
    lat: 40.4015,
    lng: 49.8739,
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    ecoCoins: 10
  },
  {
    id: 5,
    material: "Kağız",
    materialType: "Paper",
    confidence: 87,
    time: "Yesterday",
    date: "Yesterday",
    location: "Sabail",
    lat: 40.3656,
    lng: 49.8350,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    ecoCoins: 8
  }
];

export const rewards = {
  currentCoins: 120,
  last7Days: {
    drops: 5,
    coinsEarned: 51
  },
  nextReward: {
    current: 120,
    target: 150,
    progress: 80 // percentage
  },
  available: [
    {
      id: 1,
      title: "Coffee Discount",
      description: "10% off at partner cafes",
      coins: 50,
      available: true
    },
    {
      id: 2,
      title: "Plant a Tree",
      description: "We'll plant a tree in your name",
      coins: 100,
      available: true
    },
    {
      id: 3,
      title: "Eco Shopping Bag",
      description: "Premium reusable bag",
      coins: 200,
      available: false
    }
  ]
};

export const achievements = [
  {
    id: 1,
    title: "First Scan",
    description: "Completed your first waste scan",
    icon: "🎯",
    earned: true
  },
  {
    id: 2,
    title: "Eco Warrior",
    description: "Scanned 50+ items",
    icon: "⭐",
    earned: false
  },
  {
    id: 3,
    title: "Green Hero",
    description: "Saved 20kg of CO₂",
    icon: "🌱",
    earned: true
  }
];

export const materialTypes = {
  Plastic: {
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: "Package"
  },
  Paper: {
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    icon: "FileText"
  },
  Metal: {
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    icon: "Box"
  },
  Glass: {
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: "Wine"
  }
};
