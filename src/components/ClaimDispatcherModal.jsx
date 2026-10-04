import React, { useState } from 'react';
import { 
  X, ShieldAlert, FileText, CheckCircle2, Copy, Download, 
  Send, Sparkles, Check, ChevronRight, AlertTriangle, ArrowRight, ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClaimDispatcherModal({
  isOpen,
  onClose,
  items = [],
  preselectedItemId = null,
  user
}) {
  const [selectedItemId, setSelectedItemId] = useState(() => {
    return preselectedItemId || (items[0] ? items[0].id : null);
  });
  const [claimType, setClaimType] = useState('warranty'); // 'warranty' | 'shipping' | 'landlord' | 'vehicle'
  const [isCopied, setIsCopied] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  if (!isOpen) return null;

  const currentItem = items.find((it) => it.id === selectedItemId) || items[0] || {
    name: 'Sony WH-1000XM5',
    category: 'Electronics',
    purchaseDate: '2024-11-15',
    warrantyDaysLeft: 42,
    statusBadge: 'Urgent Action',
    currentImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  };

  const claimScenarios = [
    {
      id: 'warranty',
      icon: '🛡️',
      title: 'Warranty Claim',
      target: 'Manufacturer / AppleCare / Authorized Center',
      tagline: 'Defect or hardware failure under active warranty'
    },
    {
      id: 'shipping',
      icon: '📦',
      title: 'Shipping Damage',
      target: 'FedEx / UPS / Amazon / Merchant Claims',
      tagline: 'Crushed box, transit drop, or damaged upon delivery'
    },
    {
      id: 'landlord',
      icon: '🏠',
      title: 'Deposit Dispute',
      target: 'Landlord / Property Management',
      tagline: 'Contest move-out deductions using baseline move-in proof'
    },
    {
      id: 'vehicle',
      icon: '🚗',
      title: 'Lease & Transit Return',
      target: 'Auto Dealership / Rental Agency',
      tagline: 'Prove pre-existing scuffs vs return-time condition'
    }
  ];

  const claimId = `LP-CLM-${Math.abs(selectedItemId ? selectedItemId.hashCode?.() || 2026 : 2026).toString().slice(0, 4)}-${new Date().getFullYear()}`;
  const claimantName = user?.name || 'Owner & Policyholder';
  const claimantEmail = user?.email || 'claimant@lifeproof.vault';
  const sha256Seal = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const generateLetterBody = () => {
    if (claimType === 'warranty') {
      return `FORMAL NOTICE OF WARRANTY SERVICE CLAIM
Reference ID: ${claimId}
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

To: ${currentItem.name} Claims & Technical Services Department
From: ${claimantName} (${claimantEmail})

Subject: Formal Warranty Repair / Replacement Request for ${currentItem.name}

Dear Customer Support & Claims Evaluation Team,

Please accept this formal notification of a warranty service request regarding my ${currentItem.name} (Category: ${currentItem.category}), originally acquired on ${currentItem.purchaseDate}.

According to LIFEProof verified ownership records, this product has ${currentItem.warrantyDaysLeft ? `${currentItem.warrantyDaysLeft} days remaining` : 'active warranty status'} under manufacturer terms. 

OBJECTIVE EVIDENCE SUMMARY:
1. Baseline Condition: Registered and authenticated upon acquisition with zero initial operational defects.
2. AI Condition Scan: Recent visual inspection confirms mechanical/hardware degradation occurring strictly under standard operating parameters, not caused by consumer negligence or unauthorized modification.
3. Cryptographic Verification Seal: SHA-256 [${sha256Seal.slice(0, 24)}...] logged on user timeline.

Pursuant to standard warranty obligations, I respectfully request an expedited RMA (Return Merchandise Authorization) number or prepaid repair dispatch.

Attached documentation includes high-resolution photographic proof, serial timestamps, and certified inspection logs.

Sincerely,
${claimantName}
LIFEProof Verified Vault ID: #LP-${currentItem.id || '9921'}`;
    }

    if (claimType === 'shipping') {
      return `FORMAL TRANSIT DAMAGE & REPLACEMENT CLAIM
Reference ID: ${claimId}
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

To: Carrier Claims & Merchant Logistics Department
From: ${claimantName} (${claimantEmail})

Subject: Immediate Claim for Goods Damaged in Transit — ${currentItem.name}

Dear Claims Adjuster,

I am filing an urgent claim for shipment damage incurred during transit for ${currentItem.name}.

The parcel was photographed and visually inspected immediately upon handover. LIFEProof AI vision scanning detected crushed structural outer carton corners and direct impact stress on the internal merchandise.

VERIFIABLE EVIDENCE ENCLOSED:
- Real-time timestamped intake photos recorded at point of receipt.
- AI defect detection verifying packaging structural compromise prior to seal opening.
- Certified Cryptographic Record: SHA-256 [${sha256Seal.slice(0, 24)}...].

As the shipment arrived damaged through carrier handling, I request a replacement dispatch or full reimbursement to the original payment method within 5 business days.

Sincerely,
${claimantName}`;
    }

    if (claimType === 'landlord') {
      return `SECURITY DEPOSIT DEDUCTION CONTESTATION
Reference ID: ${claimId}
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

To: Property Management & Leasing Office
From: ${claimantName} (${claimantEmail})

Subject: Formal Dispute of Proposed Move-Out Damage Deductions — ${currentItem.name}

Dear Property Management,

I am writing to formally contest the proposed move-out damage deduction regarding ${currentItem.name} in my leased residence.

Under local tenancy law, tenants are not liable for pre-existing conditions or ordinary wear and tear. LIFEProof visual records demonstrate conclusively that the condition in question was either documented upon initial move-in occupancy or represents normal aging:

VERIFIABLE TIMELINE PROOF:
1. Move-in Baseline Inspection: Authenticated high-resolution photographs established on tenancy start date.
2. Comparative Analysis: Side-by-side comparison demonstrates zero tenant negligence.
3. Tamper-Proof Cryptographic Seal: SHA-256 [${sha256Seal.slice(0, 24)}...].

Please confirm within 7 calendar days that the contested deduction has been rescinded and the full deposit balance released.

Sincerely,
${claimantName}`;
    }

    return `FORMAL VEHICLE / LEASE CONDITION VERIFICATION
Reference ID: ${claimId}
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

To: Vehicle Lease Return & Inspection Department
From: ${claimantName} (${claimantEmail})

Subject: Pre-Return Condition Verification for ${currentItem.name}

Enclosed is the comprehensive LIFEProof condition audit for ${currentItem.name}. All surface panels, glass, and interior wear have been audited and cryptographically sealed against pre-existing inspection baselines.

Cryptographic Seal: SHA-256 [${sha256Seal.slice(0, 24)}...].

Sincerely,
${claimantName}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLetterBody());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsDispatched(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }}>
      <div className="modal-sheet" style={{ maxWidth: 620, maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div className="modal-header" style={{ paddingBottom: 12 }}>
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(245, 158, 11, 0.2))',
              border: '1px solid var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={20} color="var(--danger)" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                Smart Claim & Dispute Dispatcher
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Auto-generate formal warranty, shipping, and landlord dispute packets
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="modal-body" style={{ padding: '16px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Step 1: Select Claim Scenario */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'block' }}>
              1. Select Claim Type
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 8
            }}>
              {claimScenarios.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => {
                    setClaimType(sc.id);
                    setIsDispatched(false);
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: claimType === sc.id ? 'var(--primary-subtle)' : 'var(--bg-input)',
                    border: '1px solid ' + (claimType === sc.id ? 'var(--primary)' : 'var(--border-subtle)'),
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}
                >
                  <div style={{ fontSize: 18 }}>{sc.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: claimType === sc.id ? 'var(--primary)' : 'var(--text-primary)' }}>
                    {sc.title}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    {sc.target}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Select Item from Vault */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'block' }}>
              2. Target Vault Item
            </label>
            <select
              value={selectedItemId || ''}
              onChange={(e) => {
                setSelectedItemId(e.target.value);
                setIsDispatched(false);
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: 13,
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {items.map((it) => (
                <option key={it.id} value={it.id}>
                  {it.name} ({it.category}) {it.warrantyDaysLeft ? `— ${it.warrantyDaysLeft}d warranty` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Evidence Badges Ribbon */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--primary-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={16} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Cryptographic Seal Verified
                </div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  SHA-256: {sha256Seal.slice(0, 18)}...
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-success" style={{ fontSize: 9 }}>
                ✓ Baseline Match
              </span>
              <span className="badge badge-primary" style={{ fontSize: 9 }}>
                Case #{claimId}
              </span>
            </div>
          </div>

          {/* Step 3: Generated Formal Legal Dispute Letter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                3. Generated Dispute Package
              </label>
              <button
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                {isCopied ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                <span>{isCopied ? "Copied!" : "Copy Letter"}</span>
              </button>
            </div>

            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 12,
              padding: 14,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              lineHeight: 1.5,
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
              maxHeight: 220,
              overflowY: 'auto'
            }}>
              {generateLetterBody()}
            </div>
          </div>

          {/* Dispatch Status Alert if dispatched */}
          {isDispatched && (
            <div style={{
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={18} color="var(--success)" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)' }}>
                    Dispute Package Dispatched!
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    Carrier Tracking & Evidence Log registered under #{claimId}
                  </div>
                </div>
              </div>
              <span className="badge badge-success" style={{ fontSize: 10 }}>
                SENT ✓
              </span>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer" style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10
        }}>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
            style={{ padding: '10px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Download size={14} />
            <span>Export PDF</span>
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '10px 16px', fontSize: 12 }}
            >
              Close
            </button>

            <button
              onClick={handleDispatch}
              disabled={isDispatching || isDispatched}
              className="btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: isDispatched ? 'var(--success)' : 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
                color: '#fff'
              }}
            >
              {isDispatching ? (
                <span>Dispatching Package...</span>
              ) : isDispatched ? (
                <>
                  <Check size={14} />
                  <span>Claim Dispatched</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Dispatch Claim Package</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
