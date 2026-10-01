// LIFEProof Mock Database & Demo Scenarios
export const INITIAL_ITEMS = [
  {
    id: "item-apartment-4b",
    name: "Apartment #4B — Master Bedroom",
    category: "Home",
    categoryIcon: "🏠",
    room: "Master Bedroom",
    conditionScore: 86,
    conditionStatus: "Attention Needed",
    statusBadge: "1 New Note",
    purchaseDate: "2026-08-12",
    warrantyDaysLeft: null,
    warrantyStatus: "Lease Active",
    warrantyExpiry: "2027-08-11",
    description: "Move-in rental condition record. Baseline established Aug 12, 2026. 6-month inspection logged Oct 01, 2026.",
    imageBefore: "/demo/apartment_before.jpg",
    imageAfter: "/demo/apartment_after.jpg",
    currentImage: "/demo/apartment_after.jpg",
    beforeDate: "12 Aug 2026",
    afterDate: "01 Oct 2026",
    hasComparison: true,
    comparisonData: {
      totalChanges: 3,
      newDamages: 1,
      unchanged: 2,
      changes: [
        {
          id: "ch-1",
          type: "danger",
          title: "Horizontal Wall Scratch & Scuff",
          status: "🔴 New Change Detected",
          firstDetected: "01 October 2026",
          description: "12cm surface abrasive mark on drywall, 95cm above floor level.",
          box: { top: "54%", left: "22%", width: "26%", height: "12%" }
        },
        {
          id: "ch-2",
          type: "success",
          title: "Baseboard Hairline Stress Mark",
          status: "🟢 Existing Condition Unchanged",
          firstDetected: "12 August 2026",
          description: "Micro-separation along wooden trim present in baseline photo.",
          box: { top: "82%", left: "20%", width: "28%", height: "8%" }
        },
        {
          id: "ch-3",
          type: "success",
          title: "Solid Oak Door & Handle Finish",
          status: "🟢 Unchanged Condition",
          firstDetected: "12 August 2026",
          description: "No scratches, veneer peeling, or hardware displacement.",
          box: { top: "8%", left: "54%", width: "26%", height: "80%" }
        }
      ]
    },
    timeline: [
      {
        id: "t-1",
        date: "12 Aug 2026",
        title: "Signed Lease & Initial Move-in Baseline",
        type: "baseline",
        icon: "📦",
        desc: "24 photographic records captured. Clean wall, intact baseboards, zero drywall abrasions noted.",
        badge: "Baseline"
      },
      {
        id: "t-2",
        date: "28 Aug 2026",
        title: "Air Conditioner Filter Servicing",
        type: "repair",
        icon: "🛠️",
        desc: "HVAC contractor routine visit. No interior wall impact recorded.",
        badge: "Maintenance"
      },
      {
        id: "t-3",
        date: "01 Oct 2026",
        title: "6-Month Scheduled Condition Scan",
        type: "check",
        icon: "📸",
        desc: "AI Vision detected 1 new horizontal scratch mark on bedroom drywall. Comparison report generated.",
        badge: "Scan"
      },
      {
        id: "t-4",
        date: "11 Aug 2027",
        title: "Lease Term Renewal or Move-out Inspection",
        type: "warranty",
        icon: "📄",
        desc: "Deposit return deadline. Move-in evidence report locked for proof.",
        badge: "Milestone"
      }
    ],
    documents: [
      {
        id: "doc-1",
        title: "Residential Lease Agreement",
        type: "PDF Document",
        date: "12 Aug 2026",
        size: "2.4 MB",
        extractedData: {
          landlord: "Highland Properties LLC",
          securityDeposit: "$2,400.00",
          term: "12 Months (Exp. Aug 11, 2027)"
        }
      },
      {
        id: "doc-2",
        title: "Move-in Inspection Checklist",
        type: "Checklist",
        date: "12 Aug 2026",
        size: "1.1 MB",
        extractedData: {
          conditionNotes: "Drywall spotless upon entry. Tenant countersigned."
        }
      }
    ]
  },
  {
    id: "item-macbook-pro",
    name: "MacBook Pro 16\" M3 Max",
    category: "Electronics",
    categoryIcon: "💻",
    room: "Office Desk",
    conditionScore: 98,
    conditionStatus: "Excellent",
    statusBadge: "Pristine",
    purchaseDate: "2026-08-12",
    warrantyDaysLeft: 187,
    warrantyStatus: "AppleCare+ Active",
    warrantyExpiry: "2027-08-12",
    price: "$3,499.00",
    serialNumber: "C02XG819MD6T",
    description: "Space Black 16-inch M3 Max (36GB RAM / 1TB SSD). Full coverage under AppleCare+.",
    imageBefore: "/demo/laptop_macbook.jpg",
    imageAfter: "/demo/laptop_macbook.jpg",
    currentImage: "/demo/laptop_macbook.jpg",
    beforeDate: "12 Aug 2026",
    afterDate: "01 Oct 2026",
    hasComparison: false,
    timeline: [
      {
        id: "mb-1",
        date: "12 Aug 2026",
        title: "Purchased at Apple Fifth Avenue",
        type: "purchase",
        icon: "📦",
        desc: "Brand new retail purchase ($3,499.00). Invoice archived in document vault.",
        badge: "Purchase"
      },
      {
        id: "mb-2",
        date: "12 Aug 2026",
        title: "Initial Unboxing & Display Condition Scan",
        type: "check",
        icon: "📸",
        desc: "Liquid Retina XDR panel inspected. 0 dead pixels, anodized aluminum chassis 100% flawless.",
        badge: "Baseline"
      },
      {
        id: "mb-3",
        date: "20 Sep 2026",
        title: "Apple Genius Bar Alignment Check",
        type: "repair",
        icon: "🛠️",
        desc: "Routine keycap inspection & dust extraction performed under warranty.",
        badge: "Service"
      },
      {
        id: "mb-4",
        date: "01 Oct 2026",
        title: "Condition Verification Check",
        type: "check",
        icon: "📸",
        desc: "Chassis and hinge tension verified. Zero micro-scratches.",
        badge: "Scan"
      },
      {
        id: "mb-5",
        date: "12 Aug 2027",
        title: "AppleCare+ Extended Warranty Expiration",
        type: "warranty",
        icon: "🛡️",
        desc: "187 days of accidental damage and battery protection remaining.",
        badge: "Warranty"
      }
    ],
    documents: [
      {
        id: "mb-doc-1",
        title: "Apple Store Official Invoice #AP-9941",
        type: "Invoice",
        date: "12 Aug 2026",
        size: "410 KB",
        extractedData: {
          product: "MacBook Pro 16\"",
          price: "$3,499.00",
          serial: "C02XG819MD6T",
          warranty: "1 Year Limited + AppleCare+"
        }
      }
    ]
  },
  {
    id: "item-sony-headphones",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    categoryIcon: "🎧",
    room: "Everyday Carry",
    conditionScore: 91,
    conditionStatus: "Expiring Soon",
    statusBadge: "⚠️ 42 Days Left",
    purchaseDate: "2025-11-15",
    warrantyDaysLeft: 42,
    warrantyStatus: "Manufacturer 1-Yr Expiring",
    warrantyExpiry: "2026-11-15",
    price: "$399.00",
    serialNumber: "SN-882941-X5",
    description: "Premium noise cancelling over-ear headphones. Warranty ends in 42 days. Claim repairs now if needed.",
    imageBefore: "/demo/headphones.jpg",
    imageAfter: "/demo/headphones.jpg",
    currentImage: "/demo/headphones.jpg",
    beforeDate: "15 Nov 2025",
    afterDate: "01 Oct 2026",
    hasComparison: false,
    timeline: [
      {
        id: "sh-1",
        date: "15 Nov 2025",
        title: "Purchased from Best Buy",
        type: "purchase",
        icon: "📦",
        desc: "Original retail purchase with 1-Year Sony North America warranty.",
        badge: "Purchase"
      },
      {
        id: "sh-2",
        date: "10 May 2026",
        title: "Headband Cushion Inspection",
        type: "check",
        icon: "📸",
        desc: "Synthetic leather headband verified. Normal micro-flexing, no tears.",
        badge: "Scan"
      },
      {
        id: "sh-3",
        date: "15 Nov 2026",
        title: "Manufacturer Warranty Expiration",
        type: "warranty",
        icon: "🛡️",
        desc: "Only 42 days remaining. If ANC or battery issues exist, file a ticket before Nov 15.",
        badge: "Urgent"
      }
    ],
    documents: [
      {
        id: "sh-doc-1",
        title: "Best Buy Tax Receipt",
        type: "Receipt",
        date: "15 Nov 2025",
        size: "320 KB",
        extractedData: {
          product: "Sony WH-1000XM5",
          price: "$399.99",
          warrantyDuration: "12 Months"
        }
      }
    ]
  },
  {
    id: "item-package-delivery",
    name: "Express Online Package (Lens Kit)",
    category: "Package",
    categoryIcon: "📦",
    room: "Front Porch",
    conditionScore: 74,
    conditionStatus: "Damaged in Transit",
    statusBadge: "⚠️ Box Crushed",
    purchaseDate: "2026-10-01",
    warrantyDaysLeft: null,
    warrantyStatus: "Dispute Window (7 Days)",
    warrantyExpiry: "2026-10-08",
    price: "$649.00",
    trackingNumber: "FEDEX-7892-0192",
    description: "Arrived with crushed corner on outer shipping carton. AI scan documented damage immediately upon delivery.",
    imageBefore: "/demo/package_damaged.jpg",
    imageAfter: "/demo/package_damaged.jpg",
    currentImage: "/demo/package_damaged.jpg",
    beforeDate: "01 Oct 2026 14:15",
    afterDate: "01 Oct 2026 14:22",
    hasComparison: false,
    timeline: [
      {
        id: "pkg-1",
        date: "01 Oct 2026 14:15",
        title: "Delivery Driver Dropped Package",
        type: "delivery",
        icon: "📦",
        desc: "Delivered to front doorstep by FedEx Express.",
        badge: "Delivered"
      },
      {
        id: "pkg-2",
        date: "01 Oct 2026 14:22",
        title: "LifeProof AI Unboxing Scan",
        type: "check",
        icon: "📸",
        desc: "AI detected crushed corrugated corner. Evidence recorded before tape was sliced.",
        badge: "Scan"
      },
      {
        id: "pkg-3",
        date: "01 Oct 2026 14:35",
        title: "Carrier Damage Claim Generated",
        type: "document",
        icon: "📑",
        desc: "Automated LifeProof Condition Report ready for customer support refund claim.",
        badge: "Claim"
      }
    ],
    documents: [
      {
        id: "pkg-doc-1",
        title: "Merchant Shipping Notice & Invoice",
        type: "Invoice",
        date: "28 Sep 2026",
        size: "180 KB",
        extractedData: {
          product: "Sony 24-70mm GM Lens Kit",
          carrier: "FedEx Express",
          insuredValue: "$649.00"
        }
      }
    ]
  },
  {
    id: "item-lg-tv",
    name: "LG 65\" C3 OLED 4K TV",
    category: "Electronics",
    categoryIcon: "📺",
    room: "Living Room",
    conditionScore: 100,
    conditionStatus: "Perfect",
    statusBadge: "301 Days Left",
    purchaseDate: "2026-07-29",
    warrantyDaysLeft: 301,
    warrantyStatus: "Manufacturer 2-Yr Active",
    warrantyExpiry: "2027-07-29",
    price: "$1,796.00",
    description: "OLED Evo 4K display. Screen uniformity verified. No burn-in or dead subpixels.",
    imageBefore: "/demo/laptop_macbook.jpg",
    imageAfter: "/demo/laptop_macbook.jpg",
    currentImage: "/demo/laptop_macbook.jpg",
    hasComparison: false,
    timeline: [
      {
        id: "tv-1",
        date: "29 Jul 2026",
        title: "Purchased from Costco Wholesale",
        type: "purchase",
        icon: "📦",
        desc: "Included Costco 2-Year extended warranty coverage.",
        badge: "Purchase"
      },
      {
        id: "tv-2",
        date: "29 Jul 2026",
        title: "Baseline OLED Uniformity Test Scan",
        type: "check",
        icon: "📸",
        desc: "Gray scale 5% test pattern captured. Uniformity is 100%.",
        badge: "Baseline"
      }
    ],
    documents: []
  },
  {
    id: "item-honda-civic",
    name: "2022 Honda Civic Sedan",
    category: "Vehicle",
    categoryIcon: "🚗",
    room: "Garage",
    conditionScore: 89,
    conditionStatus: "Good",
    statusBadge: "520 Days Left",
    purchaseDate: "2024-03-10",
    warrantyDaysLeft: 520,
    warrantyStatus: "Powertrain 5-Yr Active",
    warrantyExpiry: "2029-03-10",
    price: "$24,500.00",
    description: "Sonic Gray Pearl. 34,210 miles logged. Regular dealership inspections maintained.",
    imageBefore: "/demo/apartment_before.jpg",
    imageAfter: "/demo/apartment_before.jpg",
    currentImage: "/demo/apartment_before.jpg",
    hasComparison: false,
    timeline: [
      {
        id: "car-1",
        date: "10 Mar 2024",
        title: "Vehicle Delivery & Registration",
        type: "purchase",
        icon: "🚗",
        desc: "New title and registration recorded with original bill of sale.",
        badge: "Purchase"
      },
      {
        id: "car-2",
        date: "14 Apr 2026",
        title: "30,000-Mile Dealership Service",
        type: "repair",
        icon: "🛠️",
        desc: "Synthetic oil change, brake fluid flush, multi-point visual inspection passed.",
        badge: "Service"
      }
    ],
    documents: []
  }
];

export const DEMO_SCENARIOS = [
  {
    id: "scenario-apartment-baseline",
    name: "Apartment Move-in Baseline",
    category: "Home",
    image: "/demo/apartment_before.jpg",
    suggestedName: "Master Bedroom Wall & Doorway",
    detectedObjects: ["Drywall Surface", "Baseboard Molding", "Interior Oak Door"],
    conditions: [
      { type: "success", label: "Wall surface pristine (0 scratches)" },
      { type: "success", label: "Door veneer and hinges intact" },
      { type: "neutral", label: "Baseboard hairline natural grain" }
    ]
  },
  {
    id: "scenario-apartment-after",
    name: "Apartment 6-Months Later (Damaged)",
    category: "Home",
    image: "/demo/apartment_after.jpg",
    suggestedName: "Master Bedroom Condition Check",
    detectedObjects: ["Drywall Surface", "Baseboard Molding", "Interior Oak Door"],
    conditions: [
      { type: "danger", label: "⚠️ New horizontal wall scratch detected (12cm)" },
      { type: "success", label: "Baseboard condition unchanged" },
      { type: "success", label: "Door finish unchanged" }
    ]
  },
  {
    id: "scenario-package-crushed",
    name: "Online Delivery (Crushed Corner)",
    category: "Package",
    image: "/demo/package_damaged.jpg",
    suggestedName: "FedEx Express Parcel Delivery",
    detectedObjects: ["Cardboard Box", "Fragile Tape", "Shipping Label"],
    conditions: [
      { type: "danger", label: "⚠️ Structural corner impact crush (Grade 3)" },
      { type: "success", label: "Security tape unbroken" },
      { type: "neutral", label: "Carrier tracking label readable" }
    ]
  },
  {
    id: "scenario-macbook-mint",
    name: "MacBook Pro Screen & Chassis",
    category: "Electronics",
    image: "/demo/laptop_macbook.jpg",
    suggestedName: "MacBook Pro M3 Max",
    detectedObjects: ["Liquid Retina Display", "Space Black Keyboard Deck", "Trackpad"],
    conditions: [
      { type: "success", label: "Anti-reflective screen coating intact" },
      { type: "success", label: "Anodized aluminum edge mint" },
      { type: "success", label: "Keycaps zero oil wear" }
    ]
  },
  {
    id: "scenario-headphones-wear",
    name: "Sony WH-1000XM5 Condition",
    category: "Electronics",
    image: "/demo/headphones.jpg",
    suggestedName: "Sony WH-1000XM5 Black",
    detectedObjects: ["Earcups", "Soft-fit Leather Headband", "Audio Jack"],
    conditions: [
      { type: "warning", label: "⚠️ Manufacturer warranty expiring in 42 days" },
      { type: "success", label: "Headband extension slider smooth" },
      { type: "success", label: "Ear cushions responsive" }
    ]
  }
];

export const PRESET_QUESTIONS = [
  "Which products are still under warranty?",
  "When was my laptop last repaired?",
  "Show me everything related to my apartment",
  "What changed on my bedroom wall?",
  "Do I have proof for the damaged package?"
];

export const SMART_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "🛡️ Warranty ending in 42 days",
    body: "Your Sony WH-1000XM5 warranty expires on Nov 15, 2026. File any pending issues now.",
    time: "2 hours ago",
    unread: true,
    itemId: "item-sony-headphones"
  },
  {
    id: "notif-2",
    title: "📸 Condition check suggested",
    body: "You haven't checked your Honda Civic's condition in 6 months. Take a quick 30s scan.",
    time: "1 day ago",
    unread: false,
    itemId: "item-honda-civic"
  },
  {
    id: "notif-3",
    title: "🔴 New damage flagged",
    body: "Apartment #4B condition check identified 1 new wall scratch. View comparison.",
    time: "3 days ago",
    unread: false,
    itemId: "item-apartment-4b"
  }
];
