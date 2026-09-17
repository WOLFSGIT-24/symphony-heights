export interface AmenityItem {
  id: string;
  title: string;
  level: string;
  levelNumber: string;
  description: string;
  imageUrl: string;
  images?: string[];
  bullets: string[];
}

export interface FloorPlanUnit {
  id: string;
  title: string;
  type: string;
  area: string;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  highlights: string[];
}

export interface CommuteDestination {
  id: string;
  name: string;
  distance: string;
  icon: string;
  times: {
    driving: number;
    transit: number;
    walking: number;
  };
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  submittedAt: string;
  source: string;
  preferredDate?: string;
  preferredTime?: string;
  status: "Pending" | "Contacted" | "Scheduled" | "Completed";
  notes?: string;
}

export const amenitiesData: AmenityItem[] = [
  {
    id: "arrival",
    title: "Ground Level",
    level: "Ground",
    levelNumber: "01",
    description: "Interactive spaces where children play, neighbours connect and families spend quality time together.",
    imageUrl: "/ground2.webp",
    images: ["/ground2.webp", "/ground3.webp", "/ground4.webp", "/pet-park.webp"],
    bullets: [
      "Double-height Lobby with custom Italian marble finishing",
      "Reflective Water Cascades & signature arrival sculpture",
      "24/7 Dedicated Concierge & Valet services",
      "Pristine landscaped walkways and drop-off canopy"
    ]
  },
  {
    id: "wellness",
    title: "Podium Level",
    level: "Podium",
    levelNumber: "02",
    description: "Clubhouse, yoga deck, wellness spaces and community zones designed for relaxation, fitness and celebrations.",
    imageUrl: "/podium2.webp",
    images: ["/podium2.webp", "/podium3.webp", "/podium4.webp"],
    bullets: [
      "High-performance Gymnasium with premium equipment",
      "Zen Yoga & Meditation Studio with acoustic padding",
      "Indoor Temperature-controlled Pool & thermal jacuzzi",
      "Aromatherapy steam rooms and massage chambers"
    ]
  },
  {
    id: "rooftop",
    title: "Rooftop Level",
    level: "Rooftop",
    levelNumber: "03",
    description: "Recreation, leisure spaces and panoramic skyline views that elevate everyday living.",
    imageUrl: "/roof5.webp",
    images: ["/roof5.webp", "/roof2.webp", "/roof3.webp", "/roof4.webp"],
    bullets: [
      "Infinity Edge lap pool overlooking the city skyline",
      "Sunset Lounge & open-air Barbecue deck",
      "Stargazing Observatory with professional telescopes",
      "Bespoke private dining pods and sky deck"
    ]
  }
];

export const locationsData: CommuteDestination[] = [
  {
    id: "manyata",
    name: "Manyata Tech Park",
    distance: "5.8 km",
    icon: "business_center",
    times: {
      driving: 25,
      transit: 35,
      walking: 70
    }
  },
  {
    id: "mall-of-asia",
    name: "Mall of Asia",
    distance: "7.2 km",
    icon: "shopping_bag",
    times: {
      driving: 20,
      transit: 35,
      walking: 95
    }
  },
  {
    id: "airport",
    name: "Kempegowda Int. Airport",
    distance: "24.5 km",
    icon: "flight_takeoff",
    times: {
      driving: 30,
      transit: 55,
      walking: 290
    }
  }
];

export const floorPlansData: FloorPlanUnit[] = [
  {
    id: "ground",
    title: "Ground Level Plan",
    type: "Ground",
    area: "Amenities",
    imageUrl: "/Ground-floor-plan.webp",
    bedrooms: 0,
    bathrooms: 0,
    balconies: 0,
    highlights: [
      "1. Security Cabin",
      "2. Waiting Plaza (School Bus/Taxi)",
      "3. Vendors Waiting/Parking",
      "4. Entrance Plaza",
      "5. Feature Wall",
      "6. Seating Pavilion (Covered)",
      "7. Resident Car Parking",
      "8. Visitor Car Parking",
      "9. Grass Mound With Sculpture",
      "10. Drop Off to Entry Lobby",
      "11. Interactive Plaza",
      "12. Tot-Lot",
      "13. Cricket Practice Pitch",
      "14. Pet Park",
      "15. Skating Rink",
      "16. Driveway",
      "17. Transformer Yard, DG Yard",
      "18. Garbage Waste Converter"
    ]
  },
  {
    id: "podium",
    title: "Podium Level Plan",
    type: "Podium",
    area: "Amenities",
    imageUrl: "/podium-floor-plan.webp",
    bedrooms: 0,
    bathrooms: 0,
    balconies: 0,
    highlights: [
      "1. Lift Lobby/Reception",
      "2. Association Room",
      "3. Pre-function Space",
      "4. Double Height Party Hall",
      "5. Spillover Party Deck/Party Lawn",
      "6. Indoor Games",
      "7. Multi-purpose Deck",
      "8. Gym",
      "9. Seating Lawn and Covered Pavilion",
      "10. Al Fresco Dining/Barbecue",
      "11. Guest Rooms",
      "12. WFH/Tuition Centre",
      "13. Restrooms",
      "14. Lawn With Stepped Seating",
      "15. Gravel Path",
      "16. Wellness Lawn",
      "17. Yoga Deck With Pergola Above",
      "18. Connection Bridge to Elevated Walkway",
      "19. Elevated Walkway",
      "20. Steps to Ground floor"
    ]
  },
  {
    id: "rooftop",
    title: "Rooftop Level Plan",
    type: "Rooftop",
    area: "Amenities",
    imageUrl: "/rooftop-plan.webp",
    bedrooms: 0,
    bathrooms: 0,
    balconies: 0,
    highlights: [
      "1. Covered Walkway",
      "2. Futsal Court",
      "3. Double Heighted Badminton Court",
      "4. Kids Play Area",
      "5. Seating",
      "6. Play Wall",
      "7. Changing Room/Spa",
      "8. Main Pool",
      "9. Kids Pool",
      "10. Pool Deck",
      "11. Pool Loungers",
      "12. Covered Seating",
      "13. Sculpture"
    ]
  }
];

export const projectSnapshot = {
  landArea: "1 Acre Canvas / 2.5 Acres",
  totalUnits: "128 Boutique Residences",
  configuration: "Premium 3 BHK Homes",
  startingPrice: "₹ 1.9 Cr* Onwards",
  paymentPlan: "25 : 25 : 25 : 25 Flexi Payment Plan",
  possession: "Dec 2026",
  rera: "PRM/KA/RERA/1251/446/PR/250925/008120",
  developer: "Disha Properties",
  salesPartner: "Wolf Media",
  phone: "080 4735 9991",
  whatsappPhone: "+91 90356 79657",
  locationName: "Hennur Bagalur Road, Doddagubbi Main Rd, Bengaluru, 560077"
};
