# 🛡️ LIFEProof

<div align="center">

  <h3>Your personal memory for the things you own.</h3>
  <p><strong>Capture it. Track it. Prove it.</strong></p>

  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
  [![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-Vision_API-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
  [![RevenueCat](https://img.shields.io/badge/RevenueCat-In--App_Purchases-F2545B?style=flat-square)](https://www.revenuecat.com/)
  [![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-22C55E?style=flat-square&logo=github)](https://amirun-nahar.github.io/lifeproof/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

  <br/>

  <a href="https://amirun-nahar.github.io/lifeproof/"><strong>🌐 Explore Live Web Application »</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-pitch--demo-walkthrough-2-minute-video-flow"><strong>🎬 2-Minute Demo Script »</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-getting-started-locally"><strong>🚀 Run Locally »</strong></a>

</div>

---

## 📌 Executive Summary

We invest thousands of dollars into laptops, smartphones, leased vehicles, rented apartments, and delivered parcels. Yet when dispute strikes—a landlord withholds a security deposit, an online shipment arrives crushed, or hardware fails right at warranty expiration—**consumers lack objective, verifiable proof**. Receipts vanish into email inboxes, photos get buried in camera rolls, and claim adjusters reject unsupported claims.

**LIFEProof** bridges this gap by creating an AI-powered visual memory vault for your physical possessions. Powered by **Google Gemini Multimodal Vision AI**, LIFEProof establishes baseline condition audits, actively tracks warranty expirations, isolates micro-damage via draggable comparison sliders, and produces **SHA-256 cryptographically certified evidence reports**.

---

## 🌟 Core Value Pillars

```
       [ 1. CAPTURE IT ]                 [ 2. TRACK IT ]                  [ 3. PROVE IT ]
    Gemini Multimodal Vision       Proactive Warranty Radar       Before/After Split Slider
  Real-time Radar Condition Scan    Visual Timeline Lifecycle    Certified SHA-256 PDF Reports
   Human-in-the-Loop Safeguards     Automated Expiration Alerts     Legal Dispute Evidence Pack
```

1. **Capture It (AI Vision Scanner)**: Real-time radar scan sweeps across images to detect objects, surface defects, micro-scratches, and dents. Adheres to **Rule 5: AI suggests, user confirms**—ensuring users retain absolute ownership over legal documentation.
2. **Track It (Warranty Radar & Timeline)**: Proactively monitors warranty deadlines with color-coded urgency banners (e.g., *Sony WH-1000XM5 in 42 days*). Every asset maintains an append-only chronological history (Purchase ➔ Inspection ➔ Repair ➔ Warranty).
3. **Prove It (Interactive Split Slider & Certified Reports)**: Draggable comparison slider visually isolates physical changes between baseline and current state. Generates tamper-evident condition reports sealed with cryptographic SHA-256 hashes.

---

## 🎬 Pitch & Demo Walkthrough (2-Minute Video Flow)

The application features an interactive top **Pitch Flow Ribbon** designed specifically for judging, evaluators, and presentation recordings:

| Time | Chapter | Screen / Action | WOW Feature & Technical Highlight |
|:---:|:---|:---|:---|
| **0:00** | **1. Problem & Home** | Home Dashboard | Real-time portfolio metrics (12 Items, 4 Warranties, 2 Attention), urgent warranty radar banner. |
| **0:15** | **2. Smart AI Capture** | Add Record Flow | Category selector (Home, Electronics, Vehicle, Package), instant demo presets & live camera intake. |
| **0:30** | **3. AI Condition Scan** | Laser Scanner View | Real-time radar sweep, bounding box defect tagging, condition scoring with user confirmation gate. |
| **1:00** | **4. WOW: Before/After** | Draggable Comparison Slider | **Hero Interaction**: Split slider between Aug 12 baseline & Oct 01 check (`🔴 1 New wall scratch`, `🟢 2 Unchanged`). |
| **1:20** | **5. Visual Timeline** | Item Profile | Chronological event tree: Purchased ➔ Baseline Scan ➔ Dealership Service ➔ Warranty Deadline. |
| **1:35** | **6. Ask My Stuff** | AI Memory Assistant | Natural language query: *"Which warranties expire this month?"* or *"When was my laptop serviced?"* |
| **1:45** | **7. Evidence Report** | Certified Condition Report | Official stamped documentation with SHA-256 cryptographic seal, Before/After photos, and **Export PDF** / Print. |
| **1:50** | **8. RevenueCat Paywall** | LifeProof Pro Modal | Tier architecture: Free vs Monthly ($4.99) vs Annual ($39.99) vs Lifetime ($89.99). **Evaluator Code: `HACKATHON2026`!** |

---

## 📸 Key Features & Capabilities

### 🔍 Interactive Before/After Split Slider
Compare past baseline scans against present-day conditions with a fluid 60fps draggable slider handle (`⇄`). Dynamic bounding boxes pinpoint new wear-and-tear while certifying untouched areas.

### 🤖 Ask My Stuff (Natural Language AI Memory)
A conversational assistant that queries your personal inventory knowledge graph. Ask complex lifecycle questions and receive instant, linked item responses.

### 🛡️ Cryptographically Sealed Condition Reports
Generate formal, insurer-ready reports featuring:
- Unique Verification Case Number
- Timestamped side-by-side photographic evidence
- Verified SHA-256 checksum seal for legal and dispute presentation
- One-click PDF export & print stylesheet

### 👑 RevenueCat Monetization Architecture
Complete paywall flow modeling industry-standard consumer app subscriptions:
- **Free Tier**: Up to 5 items with basic comparison checks.
- **Pro Tier ($4.99/mo or $39.99/yr)**: Unlimited items, automated timeline alerts, and certified exports.
- **Lifetime License ($89.99)**: One-time perpetual vault license.

> [!TIP]
> **Judges & Evaluators Promo Unlock**:
> Open **Unlock Pro** or the Paywall modal, enter promo code **`HACKATHON2026`** (or **`JUDGES`**), and tap **Apply** to unlock all Pro entitlements with celebratory confetti!

---

## 🛠️ Technology Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│                   LIFEProof Frontend                   │
│         React 19 • Vite 8 • Vanilla CSS Tokens         │
├───────────────────────────┬────────────────────────────┤
│         AI Vision         │        Monetization        │
│   Google Gemini 1.5/2.0   │      RevenueCat Paywall    │
│  Multimodal Vision Engine │   Monthly / Annual / Life  │
├───────────────────────────┴────────────────────────────┤
│                Security & Presentation                 │
│  SHA-256 Verification • iPhone 16 Pro Frame / Desktop  │
└────────────────────────────────────────────────────────┘
```

- **Frontend Core**: React 19 + Vite 8
- **Styling Architecture**: Vanilla CSS Design Tokens (Apple Health × Notion × Linear × Modern Fintech)
- **Typography**: Sora & Space Grotesk (Headings), Inter (Body), JetBrains Mono (Numbers & Cryptographic Hashes)
- **AI Vision Engine**: Hybrid Google Gemini Multimodal Vision API (1.5 Flash / 2.0 Flash) with intelligent offline heuristic fallback
- **Integrity Layer**: SHA-256 cryptographic hashing for evidence validation
- **Responsive Modes**: Toggleable **iPhone 16 Pro Mockup Frame** (with Dynamic Island) or **Full Responsive Desktop Mode**

---

## 📂 Project Directory Structure

```text
lifeproof/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── demo/                     # High-resolution comparison presets
│   └── favicon.svg               # Vector brand assets
├── src/
│   ├── assets/                   # Static icons & branding elements
│   ├── components/
│   │   ├── AccountProfileModal.jsx    # User management & role switching
│   │   ├── AddRecordModal.jsx         # Live camera & AI radar condition scanner
│   │   ├── AskMyStuffModal.jsx        # Conversational memory assistant
│   │   ├── AuthModal.jsx              # Evaluator & credential authentication
│   │   ├── BottomNav.jsx              # Mobile navigation bar
│   │   ├── ComparisonModal.jsx        # WOW draggable Before/After slider
│   │   ├── DemoWalkthroughBar.jsx     # Pinned top pitch flow ribbon
│   │   ├── EvidenceReportModal.jsx    # Certified SHA-256 PDF generator
│   │   ├── Header.jsx                 # App navigation, search, and badges
│   │   ├── HomeScreen.jsx             # Metrics, urgent warranty radar & feed
│   │   ├── ItemDetailModal.jsx        # Lifecycle timeline & item attributes
│   │   ├── LifeProofLogo.jsx          # Vector logo with brand gradients
│   │   ├── OnboardingModal.jsx        # Interactive first-launch onboarding
│   │   ├── RevenueCatPaywallModal.jsx # Paywall tiers & promo unlock engine
│   │   ├── SettingsModal.jsx          # Gemini API Key & dark/light theme
│   │   └── WarrantyScreen.jsx         # Expiration radar & document vault
│   ├── data/
│   │   └── mockData.js           # Production-ready demo scenarios & seed records
│   ├── services/
│   │   └── geminiService.js      # Google Gemini Multimodal Vision client
│   ├── App.css
│   ├── App.jsx                   # Root application state & modal coordinator
│   ├── index.css                 # Design token system & global utilities
│   └── main.jsx
├── index.html                    # SEO tags, viewport configuration & fonts
├── package.json
├── vite.config.js                # Build configuration with relative asset base
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher

### Installation & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amirun-Nahar/lifeproof.git
   cd lifeproof
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:5173/](http://localhost:5173/) to view the running application.

### Production Build
To validate the production bundle:
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

The application is fully static with zero mandatory backend dependencies, meaning it can be deployed seamlessly to any static hosting provider.

### GitHub Pages (Configured via GitHub Actions)
A production deployment workflow is already committed in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Any push to `main` automatically triggers an optimized build and deploys to:
👉 **[https://amirun-nahar.github.io/lifeproof/](https://amirun-nahar.github.io/lifeproof/)**

### Vercel / Netlify
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `./`

---

## 👥 Project Team & Partners

* **Nahar** ([@Amirun-Nahar](https://github.com/Amirun-Nahar)) — *Owner, Lead Architecture & Engineering*  
  `naharamina68@gmail.com`
* **Farhan Hamim** ([@FarhanHamim](https://github.com/FarhanHamim)) — *Co-Owner, Product Partner & Design*  
  `farhanhamim2001@gmail.com`

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Built with ❤️ for Hackathon 2026.
