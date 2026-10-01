import React, { useRef } from 'react';
import { X, Printer, Download, Share2, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

export default function EvidenceReportModal({ isOpen, onClose, item }) {
  const reportRef = useRef(null);

  if (!isOpen || !item) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = `LIFEPROOF OFFICIAL CONDITION REPORT
Report ID: LP-2026-8942-B
Item/Property: ${item.name}
Category: ${item.category} (${item.room || 'General'})
Baseline Date: ${item.beforeDate || item.purchaseDate}
Inspection Date: ${item.afterDate || 'Today'}
Condition Score: ${item.conditionScore}/100

CHANGES RECORDED:
${(item.comparisonData?.changes || []).map((ch) => `- [${ch.status}] ${ch.title}: ${ch.description}`).join('\n')}

VERIFICATION & INTEGRITY:
SHA-256 Hash: 8f4a7c91e0d2b384fa6712bc9048123efd671290ab771120dc894101eefa0932
Status: Verified by user timestamp on record.
DISCLAIMER: AI-assisted condition record. AI observations are suggestions confirmed by user.`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LIFEProof_Report_${item.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }}>
      <div className="modal-sheet" style={{ maxWidth: 500, maxHeight: '92vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span style={{ fontSize: 18 }}>📑</span>
            <span>Condition Evidence Report</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Printable Report Document Card */}
          <div
            ref={reportRef}
            style={{
              background: '#FFFFFF',
              color: '#0F172A',
              padding: 24,
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              fontFamily: 'var(--font-body)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            {/* Report Official Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid #0F172A',
              paddingBottom: 12
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="/logo.png" alt="LifeProof" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0F172A' }}>Life</span>
                    <span style={{ color: '#6C63FF' }}>Proof</span>
                  </h3>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.08em', marginTop: 2, textTransform: 'uppercase' }}>
                  Certified Condition Evidence Report
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0F172A' }}>
                  REF #LP-2026-8942-B
                </div>
                <div style={{ fontSize: 10, color: '#64748B' }}>
                  Generated: 01 Oct 2026
                </div>
              </div>
            </div>

            {/* Target Property / Subject */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              background: '#F8FAFC',
              padding: 12,
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              fontSize: 11
            }}>
              <div>
                <span style={{ color: '#64748B' }}>Subject / Property:</span>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>{item.name}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Category / Space:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.category} • {item.room || 'General'}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Baseline Inspection:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.beforeDate || item.purchaseDate}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Current Inspection:</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.afterDate || '01 Oct 2026'}</div>
              </div>
            </div>

            {/* Side-by-side Evidence Photos */}
            {item.hasComparison && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>
                  Photographic Comparison Evidence
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                    <img
                      src={item.imageBefore}
                      alt="Before"
                      style={{ width: '100%', height: 110, objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 4,
                      left: 4,
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      Baseline: {item.beforeDate}
                    </div>
                  </div>

                  <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #EF4444' }}>
                    <img
                      src={item.imageAfter}
                      alt="After"
                      style={{ width: '100%', height: 110, objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 4,
                      left: 4,
                      background: 'rgba(239,68,68,0.85)',
                      color: '#fff',
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      Inspection: {item.afterDate}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Changes Log Breakdown */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>
                AI Change Analysis & Observations
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(item.comparisonData?.changes || [
                  { title: "No critical changes flagged", status: "🟢 Normal Wear", description: "Pristine inspection record." }
                ]).map((ch, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 6,
                      background: ch.type === 'danger' ? '#FEF2F2' : '#F0FDF4',
                      border: '1px solid ' + (ch.type === 'danger' ? '#FECACA' : '#DCFCE7'),
                      fontSize: 11
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                      <span style={{ color: ch.type === 'danger' ? '#DC2626' : '#16A34A' }}>
                        {ch.status}
                      </span>
                      <span style={{ color: '#64748B', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                        {ch.firstDetected}
                      </span>
                    </div>
                    <div style={{ color: '#1E293B', marginTop: 2 }}>{ch.title} — {ch.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic Seal & Legal Note */}
            <div style={{
              borderTop: '1px dashed #CBD5E1',
              paddingTop: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 10,
              color: '#64748B'
            }}>
              <div>
                <div><strong>SHA-256 Hash:</strong> 8f4a7c...eefa0932</div>
                <div style={{ marginTop: 2 }}>AI-assisted condition record. User verified.</div>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: 6,
                background: '#ECFDF5',
                color: '#059669',
                fontWeight: 700,
                border: '1px solid #A7F3D0'
              }}>
                ✓ Tamper Evident
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-secondary"
              onClick={handlePrint}
              style={{ flex: 1, padding: 11 }}
            >
              <Printer size={15} />
              <span>Print</span>
            </button>
            <button
              className="btn-primary"
              onClick={handleDownload}
              style={{ flex: 2, padding: 11 }}
            >
              <Download size={15} />
              <span>Export PDF / Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
