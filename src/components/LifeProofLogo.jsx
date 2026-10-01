import React from 'react';

export default function LifeProofLogo({ size = 36, showText = false, showTagline = false, className = '' }) {
  const iconSize = size;
  
  return (
    <div className={`lifeproof-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: showText ? 10 : 0 }}>
      {/* High-fidelity Vector SVG of the Camera Shield Viewfinder */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 12px rgba(108, 99, 255, 0.35))' }}
      >
        <defs>
          {/* Main Viewfinder & Shield Gradient */}
          <linearGradient id="lpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Shield Gloss Gradient */}
          <linearGradient id="shieldFill" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>

          {/* Lens Dark Gradient */}
          <radialGradient id="lensBody" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#2A1B54" />
            <stop offset="45%" stopColor="#111827" />
            <stop offset="100%" stopColor="#080C16" />
          </radialGradient>

          {/* Lens Specular Glare */}
          <linearGradient id="lensGlare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.1" />
          </linearGradient>

          {/* Star Sparkle Gradient */}
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* 1. Camera Viewfinder Corner Brackets */}
        {/* Top-Left Bracket */}
        <path
          d="M 18 36 L 18 24 A 8 8 0 0 1 26 16 L 38 16"
          stroke="url(#lpGradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Top-Right Bracket */}
        <path
          d="M 82 16 L 94 16 A 8 8 0 0 1 102 24 L 102 36"
          stroke="url(#lpGradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Bottom-Left Bracket */}
        <path
          d="M 18 84 L 18 96 A 8 8 0 0 0 26 104 L 38 104"
          stroke="url(#lpGradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Bottom-Right Bracket */}
        <path
          d="M 82 104 L 94 104 A 8 8 0 0 0 102 96 L 102 84"
          stroke="url(#lpGradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* 2. Protective Security Shield */}
        <path
          d="M 60 22 C 78 22 88 28 88 44 C 88 74 65 92 60 96 C 55 92 32 74 32 44 C 32 28 42 22 60 22 Z"
          fill="url(#shieldFill)"
        />

        {/* 3. Outer Lens Ring */}
        <circle cx="60" cy="56" r="22" fill="#FFFFFF" />

        {/* 4. Camera Lens Body */}
        <circle cx="60" cy="56" r="18" fill="url(#lensBody)" />

        {/* 5. Lens Reflection Glare Arc */}
        <ellipse cx="56" cy="52" rx="10" ry="7" fill="url(#lensGlare)" transform="rotate(-30 56 52)" />

        {/* 6. Sharp Specular Highlight Dot */}
        <circle cx="64" cy="50" r="3.2" fill="#FFFFFF" />
        <circle cx="67" cy="54" r="1.5" fill="#FFFFFF" opacity="0.7" />

        {/* 7. AI Sparkle Star on top-right of shield */}
        <path
          d="M 86 24 Q 86 31 93 31 Q 86 31 86 38 Q 86 31 79 31 Q 86 31 86 24 Z"
          fill="url(#starGradient)"
          filter="drop-shadow(0 0 4px #00D2FF)"
        />
      </svg>

      {/* Brand Name & Tagline */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: size * 0.58,
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Life</span>
            <span style={{
              background: 'linear-gradient(135deg, #00D2FF 0%, #3B82F6 40%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Proof
            </span>
          </div>

          {showTagline && (
            <span style={{
              fontSize: Math.max(10, size * 0.26),
              color: 'var(--text-secondary)',
              fontWeight: 500,
              letterSpacing: '0.01em',
              marginTop: 2
            }}>
              Capture it. Track it. Prove it.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
