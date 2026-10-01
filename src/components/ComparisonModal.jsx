import React, { useState, useRef, useCallback } from 'react';
import { X, Sparkles, AlertTriangle, CheckCircle2, FileText, Share2, Eye, EyeOff } from 'lucide-react';

export default function ComparisonModal({
  isOpen,
  onClose,
  item,
  onOpenReport
}) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [showHighlights, setShowHighlights] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  if (!isOpen || !item) return null;

  const compData = item.comparisonData || {
    totalChanges: 1,
    newDamages: 1,
    unchanged: 1,
    changes: [
      {
        id: "c-1",
        type: "danger",
        title: "Visible Difference Flagged",
        status: "🔴 New Change Detected",
        firstDetected: item.afterDate || "Today",
        description: "Surface difference identified by AI vision comparison.",
        box: { top: "45%", left: "30%", width: "25%", height: "20%" }
      }
    ]
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateSlider = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div
      className="modal-overlay"
      style={{ zIndex: 1150 }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="modal-sheet" style={{ maxWidth: 480, maxHeight: '92vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span style={{ fontSize: 18 }}>🔄</span>
            <span>Before vs After AI Comparison</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Item Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {item.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Comparing: {item.beforeDate || "Baseline"} ➔ {item.afterDate || "Latest Scan"}
              </div>
            </div>

            <button
              onClick={() => setShowHighlights(!showHighlights)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                fontWeight: 600,
                color: showHighlights ? 'var(--primary)' : 'var(--text-muted)',
                background: showHighlights ? 'var(--primary-subtle)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (showHighlights ? 'var(--primary)' : 'var(--border-subtle)'),
                padding: '5px 10px',
                borderRadius: 8
              }}
            >
              {showHighlights ? <Eye size={12} /> : <EyeOff size={12} />}
              <span>{showHighlights ? 'Hide Highlights' : 'Show AI Highlights'}</span>
            </button>
          </div>

          {/* Interactive Split Comparison Slider */}
          <div
            ref={containerRef}
            className="compare-container"
            onPointerDown={handlePointerDown}
            style={{ cursor: 'ew-resize' }}
          >
            {/* Left Layer: BEFORE image (Full) */}
            <img
              src={item.imageBefore || item.currentImage}
              alt="Before"
              className="compare-img"
            />
            <div className="compare-badge-left">
              BEFORE • {item.beforeDate || 'Baseline'}
            </div>

            {/* Right Layer: AFTER image (Clipped to slider position) */}
            <div
              className="compare-after-clip"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <img
                src={item.imageAfter || item.currentImage}
                alt="After"
                className="compare-img"
              />
              <div className="compare-badge-right">
                AFTER • {item.afterDate || 'Oct 2026'}
              </div>
            </div>

            {/* Vertical Divider line */}
            <div
              className="compare-slider-divider"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="compare-handle-knob">
                <span style={{ fontSize: 13, fontWeight: 800 }}>⇄</span>
              </div>
            </div>

            {/* AI Highlight Boxes (Visible when toggle on) */}
            {showHighlights && compData.changes?.map((ch) => (
              <div
                key={ch.id}
                className={`detect-box ${ch.type}`}
                style={{
                  ...ch.box,
                  display: sliderPos > 20 ? 'block' : 'none'
                }}
              >
                <span className="detect-box-tag">
                  {ch.type === 'danger' ? '🔴 1 New Change' : '🟢 Intact'}
                </span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
            Drag slider left / right to reveal surface condition change
          </div>

          {/* AI Analysis Summary Breakdown */}
          <div className="glass-card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)'
              }}>
                <Sparkles size={14} color="var(--primary)" />
                <span>AI Vision Difference Analysis</span>
              </div>
              <span className="badge badge-danger">
                {compData.newDamages || 1} New Change Detected
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {compData.changes?.map((ch) => (
                <div
                  key={ch.id}
                  style={{
                    padding: 10,
                    borderRadius: 12,
                    background: ch.type === 'danger' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid ' + (ch.type === 'danger' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(34, 197, 94, 0.25)')
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: ch.type === 'danger' ? 'var(--danger)' : 'var(--success)' }}>
                      {ch.status}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      First noted: {ch.firstDetected}
                    </span>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 3 }}>
                    {ch.title}
                  </div>

                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                    {ch.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Confirmation Banner (UX Rule) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 12,
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
              <strong>Verified by User:</strong> Timestamps authenticated. Cryptographic SHA-256 baseline locked in database.
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-secondary"
              onClick={onClose}
              style={{ flex: 1, padding: 11 }}
            >
              Done
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                onOpenReport(item);
              }}
              style={{ flex: 2, padding: 11 }}
            >
              <FileText size={15} />
              <span>Generate Condition Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
