import React from 'react';
import { Play, Sparkles, Clock, SplitSquareVertical, MessageSquareText, FileText, ShieldAlert, Smartphone, Monitor } from 'lucide-react';
import LifeProofLogo from './LifeProofLogo';

export default function DemoWalkthroughBar({
  onSelectStep,
  currentStep,
  isDesktopView,
  setIsDesktopView,
  onOpenClaim,
  onOpenSettings
}) {
  const steps = [
    { id: 'home', label: '1. Problem & Home', icon: Clock },
    { id: 'capture', label: '2. Smart AI Capture', icon: Sparkles },
    { id: 'compare', label: '3. WOW: Before/After 🌟', icon: SplitSquareVertical },
    { id: 'timeline', label: '4. Visual Timeline', icon: Clock },
    { id: 'ask', label: '5. Ask My Stuff', icon: MessageSquareText },
    { id: 'report', label: '6. Evidence Report', icon: FileText },
    { id: 'claim', label: '7. Claim Dispatcher ⚖️', icon: ShieldAlert }
  ];

  return (
    <div className="demo-top-bar">
      <div className="demo-brand">
        <LifeProofLogo size={24} showText={false} />
        <span style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          <span>Life</span>
          <span style={{
            background: 'linear-gradient(135deg, #00D2FF 0%, #3B82F6 40%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Proof</span>
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>v1.0 • Hackathon 2026</span>
      </div>

      <div className="demo-flow-pills">
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Play size={12} fill="currentColor" /> Pitch Flow:
        </span>
        {steps.map((st) => {
          const Icon = st.icon;
          const isActive = currentStep === st.id;
          return (
            <button
              key={st.id}
              className={`demo-step-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectStep(st.id)}
            >
              <Icon size={12} />
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>

      <div className="demo-controls-right">
        <button
          className="icon-btn-pill"
          onClick={() => setIsDesktopView(!isDesktopView)}
          title={isDesktopView ? "Switch to Mobile iPhone Frame" : "Switch to Full Desktop View"}
        >
          {isDesktopView ? <Smartphone size={13} /> : <Monitor size={13} />}
          <span>{isDesktopView ? "Mobile View" : "Desktop View"}</span>
        </button>

        <button
          className="icon-btn-pill"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.15))',
            borderColor: 'var(--danger)',
            color: 'var(--danger)'
          }}
          onClick={onOpenClaim}
        >
          <ShieldAlert size={13} />
          <span>File Claim ⚖️</span>
        </button>

        <button
          className="icon-btn-pill"
          onClick={onOpenSettings}
          title="Settings & Gemini API Key"
        >
          <span>⚙️</span>
        </button>
      </div>
    </div>
  );
}
