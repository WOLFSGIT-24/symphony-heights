import { WixDataItem, WixDataQueryResult } from './types';

export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

// Initial seed data for Symphony Heights by Disha Properties
const initialData: Record<string, WixDataItem[]> = {
  legalapprovals: [
    {
      _id: 'legal-1',
      approvalName: 'Karnataka RERA Registered',
      description: 'Fully compliant and registered under Karnataka RERA with registration number PRM/KA/RERA/1251/446/PR/250925/008120.',
      issuingAuthority: 'Karnataka RERA Authority',
      approvalDate: new Date('2024-03-15'),
      isVerified: true,
    },
    {
      _id: 'legal-2',
      approvalName: 'BBMP / BDA Sanctioned Plan',
      description: 'Meticulously planned and sanctioned building plan adhering to comprehensive structural, safety and fire norms.',
      issuingAuthority: 'Bruhat Bengaluru Mahanagara Palike',
      approvalDate: new Date('2024-04-10'),
      isVerified: true,
    },
    {
      _id: 'legal-3',
      approvalName: '100% Clear Titles & Ownership',
      description: 'Freehold land parcel with zero legal encumbrances, title deed verified by premier legal counsels.',
      issuingAuthority: 'Revenue Department of Karnataka',
      approvalDate: new Date('2024-01-20'),
      isVerified: true,
    },
    {
      _id: 'legal-4',
      approvalName: 'Leading Bank Loan Approvals',
      description: 'Pre-approved home loan facilities from SBI, HDFC, ICICI, and Axis Bank with attractive interest rates and quick approvals.',
      issuingAuthority: 'State Bank of India & Major Banks',
      approvalDate: new Date('2024-05-01'),
      isVerified: true,
    },
    {
      _id: 'legal-5',
      approvalName: 'BESCOM & BWSSB Sanctioned',
      description: 'Dedicated transformer yard, DG backup for all units and common areas, and sanctioned water connections.',
      issuingAuthority: 'Electricity & Water Supply Boards',
      approvalDate: new Date('2024-02-18'),
      isVerified: true,
    },
    {
      _id: 'legal-6',
      approvalName: 'Pollution Control Board NOC & STP',
      description: 'Environmental compliance certificate with dedicated eco-friendly organic waste converter and sewage treatment plant.',
      issuingAuthority: 'State Pollution Control Board',
      approvalDate: new Date('2024-03-28'),
      isVerified: true,
    },
  ],

  plotconfigurations: [
    {
      _id: 'plan-1',
      plotName: '3 BHK Home (Type A)',
      dimensions: '1818 SQ.FT. SBUA',
      areaSqFt: 1818,
      description: '',
      availabilityStatus: 'Available',
      plotImage: '/unit-402.png',
    },
    {
      _id: 'plan-2',
      plotName: '3 BHK Home (Type B)',
      dimensions: '1857 SQ.FT. SBUA',
      areaSqFt: 1857,
      description: '',
      availabilityStatus: 'Available',
      plotImage: '/unit-1503.png',
    },
  ],

  infrastructuredetails: [
    {
      _id: 'infra-1',
      featureName: 'Boutique Scale: 128 Residences',
      featureDescription: 'Only 128 exclusive homes on an intimate 1-acre canvas, ensuring low density, peace, and high privacy.',
      featureIcon: '/building.png',
      displayOrder: 1,
      isAvailable: true,
    },
    {
      _id: 'infra-2',
      featureName: 'Multi-Level Curated Amenities',
      featureDescription: 'Ground, Podium, and Rooftop levels thoughtfully allocated for fitness, celebrations, wellness, and recreation.',
      featureIcon: '/roof5.jpg',
      displayOrder: 2,
      isAvailable: true,
    },
    {
      _id: 'infra-3',
      featureName: '24/7 Security & Access Control',
      featureDescription: 'Guarded entry pavilion, CCTV surveillance across all zones, RFID barrier access, and dedicated intercom.',
      featureIcon: '/ground.jpg',
      displayOrder: 3,
      isAvailable: true,
    },
    {
      _id: 'infra-4',
      featureName: 'Rooftop Infinity Edge Pool',
      featureDescription: 'Sky-high infinity lap pool, separate kids pool, lounger deck, and sunset lounge overlooking Hennur skyline.',
      featureIcon: '/roof.jpg',
      displayOrder: 4,
      isAvailable: true,
    },
    {
      _id: 'infra-5',
      featureName: 'Double-Height Lobby & Party Hall',
      featureDescription: 'Grand arrival lobby with Italian marble finish and a double-height celebration hall with spillover lawn.',
      featureIcon: '/partyhall.jpg',
      displayOrder: 5,
      isAvailable: true,
    },
    {
      _id: 'infra-6',
      featureName: 'Eco-Friendly Infrastructure',
      featureDescription: 'Rainwater harvesting, Organic Waste Converter (OWC), sewage treatment plant, and solar LED lighting.',
      featureIcon: '/pet-park.jpg',
      displayOrder: 6,
      isAvailable: true,
    },
  ],

  projectamenities: [
    {
      _id: 'amenity-1',
      amenityName: 'Ground Level',
      description: '',
      galleryImage: '/ground2.jpg',
      category: 'Ground Level',
      displayOrder: 1,
    },
    {
      _id: 'amenity-2',
      amenityName: 'Podium Level',
      description: '',
      galleryImage: '/podium2.jpg',
      category: 'Podium Level',
      displayOrder: 2,
    },
    {
      _id: 'amenity-3',
      amenityName: 'Rooftop Level',
      description: '',
      galleryImage: '/roof5.jpg',
      category: 'Rooftop Level',
      displayOrder: 3,
    },
  ],

  gatedlivingbenefits: [
    {
      _id: 'gated-1',
      benefitTitle: 'Boutique Community of 128 Residences',
      benefitDescription: 'No crowded corridors or overburdened amenities. Enjoy a peaceful, high-stature neighborhood with intimate scale.',
      benefitVisual: '/building.png',
      displayOrder: 1,
      isActive: true,
    },
    {
      _id: 'gated-2',
      benefitTitle: '100% Vastu-Compliant 3 BHK Homes',
      benefitDescription: 'Every home is thoughtfully positioned for optimal light, natural cross-ventilation, and positive energy flow.',
      benefitVisual: '/unit-402.png',
      displayOrder: 2,
      isActive: true,
    },
    {
      _id: 'gated-3',
      benefitTitle: '3 Distinct Levels of Lifestyle Amenities',
      benefitDescription: 'Organised across Ground, Podium, and Rooftop tiers to ensure dedicated spaces for fitness, sports, and quiet relaxation.',
      benefitVisual: '/roof5.jpg',
      displayOrder: 3,
      isActive: true,
    },
    {
      _id: 'gated-4',
      benefitTitle: 'Exclusive 25:25:25:25 Flexi Payment Plan',
      benefitDescription: 'Pay 25% now and nothing for the next 1 year. Stress-free homeownership crafted for discerning professionals.',
      benefitVisual: '/intimate-scale.jpg',
      displayOrder: 4,
      isActive: true,
    },
  ],

  investmenthighlights: [
    {
      _id: 'inv-1',
      highlightTitle: 'High-Growth Hennur Main Road Corridor',
      highlightQuote: 'Positioned at Hennur Bagalur Road, Bengaluru, minutes away from Manyata Tech Park, KIADB Aerospace SEZ, and Mall of Asia.',
      emphasizedPhrase: 'Exponential Capital Appreciation',
      displayOrder: 1,
      additionalContext: 'Rapidly transforming into North Bangalore’s premier residential and tech destination.',
    },
    {
      _id: 'inv-2',
      highlightTitle: 'Seamless Connectivity & Airport Access',
      highlightQuote: 'Only 25 mins to Manyata Tech Park, 20 mins to Mall of Asia, and 30 mins to Kempegowda International Airport.',
      emphasizedPhrase: 'Effortless Daily Commutes',
      displayOrder: 2,
      additionalContext: 'Direct signal-free connectivity to Outer Ring Road and upcoming Metro line.',
    },
    {
      _id: 'inv-3',
      highlightTitle: 'Disha Properties — Proven Track Record',
      highlightQuote: 'Renowned for quality construction, architectural innovation, clear titles, and transparent customer delivery.',
      emphasizedPhrase: 'Trust & Uncompromising Quality',
      displayOrder: 3,
      additionalContext: 'RERA Registered Project with clear financial and regulatory approvals.',
    },
    {
      _id: 'inv-4',
      highlightTitle: 'High Rental Yield & Ready Demand',
      highlightQuote: 'With tens of thousands of tech professionals employed nearby, 3 BHK boutique residences in Hennur command top rental yields.',
      emphasizedPhrase: 'Prime Investment Asset',
      displayOrder: 4,
      additionalContext: 'Strong sustained rental demand and high resale value.',
    },
  ],

  contactformsubmissions: [],
};

// In-memory data store for local execution
const store: Record<string, WixDataItem[]> = { ...initialData };

function createQueryResult<T extends WixDataItem>(
  items: T[],
  totalCount: number,
  limit: number,
  skip: number
): WixDataQueryResult<T> {
  const currentPage = Math.floor(skip / limit);
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return {
    items,
    totalCount,
    length: items.length,
    pageSize: limit,
    currentPage,
    totalPages,
    hasNext: () => (currentPage + 1) * limit < totalCount,
    hasPrev: () => currentPage > 0,
    next: async () => {
      const nextSkip = skip + limit;
      return createQueryResult(items.slice(nextSkip, nextSkip + limit), totalCount, limit, nextSkip);
    },
    prev: async () => {
      const prevSkip = Math.max(0, skip - limit);
      return createQueryResult(items.slice(prevSkip, prevSkip + limit), totalCount, limit, prevSkip);
    },
  };
}

export class BaseCrudService {
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    options?: PaginationOptions
  ): Promise<WixDataQueryResult<T>> {
    const limit = options?.limit ?? 50;
    const skip = options?.skip ?? 0;

    const collection = (store[collectionId] || []) as T[];
    const paginatedItems = collection.slice(skip, skip + limit);

    return createQueryResult<T>(paginatedItems, collection.length, limit, skip);
  }

  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string
  ): Promise<T | null> {
    const collection = (store[collectionId] || []) as T[];
    const item = collection.find((i) => i._id === itemId);
    return item ? ({ ...item } as T) : null;
  }

  static async create<T extends WixDataItem>(
    collectionId: string,
    item: Partial<T>
  ): Promise<T> {
    if (!store[collectionId]) {
      store[collectionId] = [];
    }

    const newItem = {
      _id: item._id || crypto.randomUUID(),
      _createdDate: new Date(),
      _updatedDate: new Date(),
      ...item,
    } as T;

    store[collectionId].push(newItem);
    return { ...newItem };
  }

  static async update<T extends WixDataItem>(
    collectionId: string,
    item: Partial<T> & { _id: string }
  ): Promise<T> {
    if (!store[collectionId]) {
      store[collectionId] = [];
    }

    const index = store[collectionId].findIndex((i) => i._id === item._id);
    if (index === -1) {
      throw new Error(`Item with id ${item._id} not found in collection ${collectionId}`);
    }

    const updatedItem = {
      ...store[collectionId][index],
      ...item,
      _updatedDate: new Date(),
    } as T;

    store[collectionId][index] = updatedItem;
    return { ...updatedItem };
  }

  static async delete(collectionId: string, itemId: string): Promise<boolean> {
    if (!store[collectionId]) return false;

    const initialLength = store[collectionId].length;
    store[collectionId] = store[collectionId].filter((i) => i._id !== itemId);
    return store[collectionId].length < initialLength;
  }
}
