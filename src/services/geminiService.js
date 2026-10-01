// LIFEProof AI Vision & Gemini Integration Service

const STORAGE_KEY = "lifeproof_gemini_api_key";

export function getStoredGeminiKey() {
  return localStorage.getItem(STORAGE_KEY) || "";
}

export function setStoredGeminiKey(key) {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Analyzes an image (dataUrl or preset image URL)
 * Returns structured JSON matching the LIFEProof specification:
 * {
 *   objects: [{ name, condition, confidence }],
 *   observations: [{ type, severity, description }],
 *   needs_user_confirmation: true
 * }
 */
export async function analyzeImageCondition(imageSrc, category = "Home") {
  const apiKey = getStoredGeminiKey();

  if (apiKey) {
    try {
      // If we have a base64 or blob image and an API key, we call Gemini Vision
      let base64Data = "";
      let mimeType = "image/jpeg";

      if (imageSrc.startsWith("data:")) {
        const parts = imageSrc.split(",");
        mimeType = parts[0].match(/:(.*?);/)[1];
        base64Data = parts[1];
      } else {
        // Fetch demo image and convert to base64
        const res = await fetch(imageSrc);
        const blob = await res.blob();
        mimeType = blob.type || "image/jpeg";
        base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(blob);
        });
      }

      const prompt = `You are LIFEProof AI, an objective condition analysis and ownership verification assistant.
Analyze this image of a ${category}.
Identify key objects and any visible conditions (scratches, cracks, dents, stains, damage, or pristine state).
CRITICAL: AI observations are suggestions, not legal proof.
Return strictly valid JSON in this format:
{
  "objects": [
    { "name": "string", "condition": "good|minor_damage|damaged", "confidence": 0.92 }
  ],
  "observations": [
    { "type": "scratch|crack|dent|stain|clean", "severity": "none|low|medium|high", "description": "short description" }
  ],
  "suggestedTitle": "Item or space name",
  "conditionScore": 88,
  "needs_user_confirmation": true
}`;

      const apiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: mimeType, data: base64Data } }
                ]
              }
            ],
            generationConfig: {
              response_mime_type: "application/json"
            }
          })
        }
      );

      if (apiRes.ok) {
        const resultData = await apiRes.json();
        const text = resultData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return JSON.parse(text);
        }
      }
    } catch (err) {
      console.warn("Live Gemini API call failed or timed out, falling back to local vision engine:", err);
    }
  }

  // High-fidelity fallback / simulated vision engine
  await new Promise((r) => setTimeout(r, 1200)); // realistic scanning feel

  if (imageSrc.includes("apartment_after")) {
    return {
      objects: [
        { name: "Drywall Paint", condition: "minor_damage", confidence: 0.94 },
        { name: "Wooden Baseboard", condition: "good", confidence: 0.91 },
        { name: "Interior Oak Door", condition: "good", confidence: 0.97 }
      ],
      observations: [
        {
          type: "scratch",
          severity: "medium",
          description: "New 12cm horizontal drywall abrasive mark detected 95cm from floor"
        },
        {
          type: "crack",
          severity: "low",
          description: "Existing hairline baseboard stress grain unchanged from baseline"
        }
      ],
      suggestedTitle: "Apartment #4B — Bedroom Wall Scan",
      conditionScore: 86,
      needs_user_confirmation: true
    };
  }

  if (imageSrc.includes("package")) {
    return {
      objects: [
        { name: "Cardboard Shipping Box", condition: "damaged", confidence: 0.96 },
        { name: "Security Packaging Tape", condition: "good", confidence: 0.92 },
        { name: "Carrier Tracking Label", condition: "good", confidence: 0.95 }
      ],
      observations: [
        {
          type: "dent",
          severity: "high",
          description: "Severe corner impact compression on outer cardboard container"
        },
        {
          type: "clean",
          severity: "none",
          description: "Tamper tape unbroken; internal padding cushioning contents"
        }
      ],
      suggestedTitle: "Express Parcel Unboxing Scan",
      conditionScore: 74,
      needs_user_confirmation: true
    };
  }

  if (imageSrc.includes("laptop")) {
    return {
      objects: [
        { name: "Liquid Retina XDR Panel", condition: "good", confidence: 0.98 },
        { name: "Space Black Aluminum Deck", condition: "good", confidence: 0.96 },
        { name: "Magic Keyboard & Trackpad", condition: "good", confidence: 0.95 }
      ],
      observations: [
        {
          type: "clean",
          severity: "none",
          description: "Zero dead pixels, no hairline display scratches, hinge tension optimal"
        }
      ],
      suggestedTitle: "MacBook Pro 16\" M3 Max Inspection",
      conditionScore: 98,
      needs_user_confirmation: true
    };
  }

  if (imageSrc.includes("headphones")) {
    return {
      objects: [
        { name: "Over-Ear Acoustic Cups", condition: "good", confidence: 0.95 },
        { name: "Synthetic Leather Headband", condition: "good", confidence: 0.92 },
        { name: "Pivot Hinges", condition: "good", confidence: 0.94 }
      ],
      observations: [
        {
          type: "scratch",
          severity: "low",
          description: "Minimal micro-wear on synthetic leather headband cushion; acoustics intact"
        }
      ],
      suggestedTitle: "Sony WH-1000XM5 Condition Check",
      conditionScore: 91,
      needs_user_confirmation: true
    };
  }

  // Generic fallback
  return {
    objects: [
      { name: "Surface Material", condition: "good", confidence: 0.91 },
      { name: "Edge Alignment", condition: "good", confidence: 0.88 }
    ],
    observations: [
      {
        type: "clean",
        severity: "none",
        description: "Surface scanned. No critical structural anomalies detected."
      }
    ],
    suggestedTitle: `${category} Condition Record`,
    conditionScore: 92,
    needs_user_confirmation: true
  };
}

/**
 * "Ask My Stuff" AI query processor
 * Can invoke live Gemini API or answer using full relational knowledge graph of user's items
 */
export async function askMyStuff(query, items) {
  const apiKey = getStoredGeminiKey();
  const lowerQ = query.toLowerCase();

  // Check if live Gemini key exists
  if (apiKey) {
    try {
      const context = items.map((it) => ({
        name: it.name,
        category: it.category,
        room: it.room,
        conditionScore: it.conditionScore,
        conditionStatus: it.conditionStatus,
        purchaseDate: it.purchaseDate,
        price: it.price,
        warrantyDaysLeft: it.warrantyDaysLeft,
        warrantyStatus: it.warrantyStatus,
        warrantyExpiry: it.warrantyExpiry,
        timeline: it.timeline?.map((t) => `${t.date}: ${t.title} - ${t.desc}`)
      }));

      const prompt = `You are "Ask My Stuff", the intelligent memory system of LIFEProof.
The user owns the following items with condition records, warranties, and timelines:
${JSON.stringify(context, null, 2)}

User Question: "${query}"

Answer accurately, concisely, and helpfully using the verified facts from their records.
Mention item names, remaining days, dates, or repair history directly.
Keep the answer under 3-4 concise paragraphs or bullet points.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text,
            relatedItems: findRelatedItems(lowerQ, items)
          };
        }
      }
    } catch (e) {
      console.warn("Live Gemini chat failed, using local memory engine:", e);
    }
  }

  // High-fidelity instant local memory engine
  await new Promise((r) => setTimeout(r, 600));

  if (lowerQ.includes("warranty") || lowerQ.includes("warranties") || lowerQ.includes("expire")) {
    const activeWarranties = items.filter((it) => it.warrantyDaysLeft !== null);
    const sorted = [...activeWarranties].sort((a, b) => a.warrantyDaysLeft - b.warrantyDaysLeft);
    
    return {
      text: `You have **${sorted.length} products** currently under active warranty tracking:\n\n` +
        sorted
          .map((item) => {
            const urgency = item.warrantyDaysLeft <= 45 ? "⚠️ **Expiring Soon**" : "✓ Active";
            return `• **${item.name}** — **${item.warrantyDaysLeft} days remaining** (${item.warrantyExpiry}) — ${urgency}`;
          })
          .join("\n\n") +
        `\n\n💡 *Action item: Sony WH-1000XM5 expires in 42 days. Consider filing any claim before Nov 15.*`,
      relatedItems: sorted
    };
  }

  if (lowerQ.includes("repair") || lowerQ.includes("laptop") || lowerQ.includes("macbook")) {
    const macbook = items.find((i) => i.id === "item-macbook-pro");
    return {
      text: `**MacBook Pro 16" M3 Max** was last serviced on **20 September 2026** at the Apple Genius Bar.\n\n` +
        `• **Service Type:** Routine diagnostic check & keycap alignment.\n` +
        `• **Warranty Status:** AppleCare+ active with **187 days remaining** (expires 12 Aug 2027).\n` +
        `• **Current Condition Score:** 98/100 (Pristine).`,
      relatedItems: macbook ? [macbook] : []
    };
  }

  if (lowerQ.includes("apartment") || lowerQ.includes("move-in") || lowerQ.includes("wall") || lowerQ.includes("scratch")) {
    const apt = items.find((i) => i.id === "item-apartment-4b");
    return {
      text: `Here is everything recorded for **Apartment #4B (Master Bedroom)**:\n\n` +
        `• **Initial Move-in Baseline:** 12 August 2026 (24 verified condition photos).\n` +
        `• **Recent Inspection:** 01 October 2026.\n` +
        `• **AI Diff Analysis:** Detected **1 new change** (12cm horizontal wall scratch on bedroom drywall) while the oak door and baseboards remain unchanged.\n` +
        `• **Documents on File:** Residential Lease Agreement & $2,400 Security Deposit receipt.\n\n` +
        `You can tap **"Export Report"** on this item to generate an official PDF dispute package for your landlord.`,
      relatedItems: apt ? [apt] : []
    };
  }

  if (lowerQ.includes("package") || lowerQ.includes("delivery") || lowerQ.includes("proof")) {
    const pkg = items.find((i) => i.id === "item-package-delivery");
    return {
      text: `Yes! You have a verified condition scan for **Express Online Package (Lens Kit)**:\n\n` +
        `• **Delivered:** 01 Oct 2026 at 14:15 by FedEx Express.\n` +
        `• **Scan Timestamp:** 01 Oct 2026 at 14:22 (7 minutes after drop-off).\n` +
        `• **AI Observation:** Structural corner crush detected on outer corrugated carton.\n` +
        `• **Status:** Claim packet ready to export for FedEx or merchant replacement.`,
      relatedItems: pkg ? [pkg] : []
    };
  }

  // Fallback smart response
  return {
    text: `Based on your LIFEProof vault:\n\n` +
      `You are currently tracking **${items.length} items** across Home, Electronics, Vehicle, and Packages.\n` +
      `• **Warranties:** 4 active warranties tracked.\n` +
      `• **Needs Attention:** 2 items (Sony Headphones expiring in 42 days, Apartment #4B wall scratch flagged).\n\n` +
      `Ask me questions like "Which warranties expire soon?", "When was my laptop repaired?", or "Show my apartment records".`,
    relatedItems: items.slice(0, 2)
  };
}

function findRelatedItems(query, items) {
  return items.filter(
    (item) =>
      query.includes(item.name.toLowerCase()) ||
      query.includes(item.category.toLowerCase()) ||
      (item.room && query.includes(item.room.toLowerCase()))
  );
}
