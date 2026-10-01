import React, { useState } from 'react';
import { Camera, SplitSquareVertical, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export default function OnboardingModal({ isOpen, onClose }) {
  const [slide, setSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      badge: "Visual Ownership Memory",
      title: "Your photos remember moments. LifeProof remembers the details.",
      desc: "We take thousands of photos, but gallery apps don't understand condition changes, warranties, or the story behind your belongings.",
      icon: "📸",
      gradient: "linear-gradient(135deg, #6C63FF 0%, #3B82F6 100%)"
    },
    {
      badge: "AI Condition Intelligence",
      title: "Know what changed before disputes happen.",
      desc: "Move into an apartment or receive a delivery? LifeProof scans surfaces and compares records over time to identify new scratches or damage.",
      icon: "🔄",
      gradient: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
    },
    {
      badge: "Warranty & Document Vault",
      title: "Never lose a warranty or receipt again.",
      desc: "Smart OCR extracts purchase dates, serials, and expiry terms so you get alerted before protection expires.",
      icon: "🛡️",
      gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)"
    },
    {
      badge: "Instant Evidence Reports",
      title: "Capture it. Track it. Prove it.",
      desc: "Export timestamped, tamper-evident condition reports with before/after photos whenever landlords, insurers, or buyers ask.",
      icon: "✨",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
    }
  ];

  const current = slides[slide];

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }}>
      <div className="modal-sheet" style={{ maxWidth: 420, padding: 0, overflow: 'hidden' }}>
        <div style={{
          height: 220,
          background: current.gradient,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 24,
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: 54,
            marginBottom: 10,
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.3))'
          }}>
            {current.icon}
          </div>
          <span style={{
            background: 'rgba(255, 255, 255, 0.22)',
            backdropFilter: 'blur(8px)',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 99,
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            {current.badge}
          </span>
        </div>

        <div style={{ padding: '24px 22px 28px', display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.3,
            color: 'var(--text-primary)',
            marginBottom: 12
          }}>
            {current.title}
          </h2>

          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: 26,
            flex: 1
          }}>
            {current.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {slides.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: slide === i ? 24 : 8,
                    height: 8,
                    borderRadius: 99,
                    background: slide === i ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {slide < slides.length - 1 ? (
              <button
                className="btn-primary"
                onClick={() => setSlide(slide + 1)}
                style={{ padding: '10px 18px', fontSize: 13 }}
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  fontSize: 13,
                  background: 'linear-gradient(135deg, #10B981, #06B6D4)'
                }}
              >
                <span>Start Protecting</span>
                <Check size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
