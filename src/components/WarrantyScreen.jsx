import React, { useState } from 'react';
import { ShieldCheck, Clock, FileText, AlertTriangle, ChevronRight, Download, Plus, Check } from 'lucide-react';

export default function WarrantyScreen({ items, onOpenItem, onOpenPaywall }) {
  const [activeTab, setActiveTab] = useState('warranties'); // 'warranties' | 'documents'

  const warrantyItems = items.filter((it) => it.warrantyDaysLeft !== null || it.warrantyStatus);
  const expiringSoon = warrantyItems.filter((it) => it.warrantyDaysLeft && it.warrantyDaysLeft <= 45);

  const allDocuments = items.flatMap((item) =>
    (item.documents || []).map((doc) => ({
      ...doc,
      itemName: item.name,
      categoryIcon: item.categoryIcon,
      itemId: item.id
    }))
  );

  return (
    <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Protection & Vault
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginTop: 2
        }}>
          Warranty & Documents
        </h2>
      </div>

      {/* Segmented Switcher */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--bg-input)',
        padding: 4,
        borderRadius: 14,
        border: '1px solid var(--border-subtle)'
      }}>
        <button
          onClick={() => setActiveTab('warranties')}
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            background: activeTab === 'warranties' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'warranties' ? 'var(--text-primary)' : 'var(--text-muted)',
            boxShadow: activeTab === 'warranties' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          🛡️ Warranties ({warrantyItems.length})
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            background: activeTab === 'documents' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'documents' ? 'var(--text-primary)' : 'var(--text-muted)',
            boxShadow: activeTab === 'documents' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          📄 Smart Vault ({allDocuments.length})
        </button>
      </div>

      {/* WARRANTIES TAB */}
      {activeTab === 'warranties' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Expiring Soon Banner */}
          {expiringSoon.length > 0 && (
            <div style={{
              padding: '12px 14px',
              borderRadius: 16,
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <AlertTriangle size={18} color="var(--warning)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                <strong>{expiringSoon.length} warranty expiring soon:</strong> Check device condition to submit warranty claims before coverage ends.
              </div>
            </div>
          )}

          {/* List of Warranties with Progress Countdown Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {warrantyItems.map((item) => {
              const days = item.warrantyDaysLeft;
              const maxDays = 365 * 2; // reference 2 yr scale
              const percent = days !== null ? Math.min(100, Math.max(8, (days / maxDays) * 100)) : 100;
              const isUrgent = days !== null && days <= 45;

              return (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: 14,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                  }}
                  onClick={() => onOpenItem(item.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{item.categoryIcon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {item.warrantyStatus}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: 13,
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        color: isUrgent ? 'var(--warning)' : 'var(--success)'
                      }}>
                        {days !== null ? `${days} days` : 'Active'}
                      </span>
                      {days !== null && (
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                          Expires: {item.warrantyExpiry}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual Countdown Bar */}
                  {days !== null && (
                    <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: isUrgent
                          ? 'linear-gradient(90deg, #EF4444, #F59E0B)'
                          : 'linear-gradient(90deg, #10B981, #06B6D4)'
                      }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SMART DOCUMENTS TAB */}
      {activeTab === 'documents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            padding: '12px 14px',
            borderRadius: 14,
            background: 'var(--primary-subtle)',
            border: '1px solid rgba(108, 99, 255, 0.25)',
            fontSize: 12,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <div>
              <strong>AI Document OCR:</strong> Invoices, leases, and receipts automatically structured into dates, prices, and serial numbers.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allDocuments.map((doc, idx) => (
              <div
                key={doc.id || idx}
                className="glass-card"
                style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}
                onClick={() => onOpenItem(doc.itemId)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(108, 99, 255, 0.15)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16
                    }}>
                      📄
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {doc.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {doc.itemName} • {doc.date}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-primary" style={{ fontSize: 10 }}>
                    {doc.type}
                  </span>
                </div>

                {/* AI Extracted Tokens */}
                {doc.extractedData && (
                  <div style={{
                    padding: 8,
                    borderRadius: 10,
                    background: 'var(--bg-input)',
                    fontSize: 11,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    color: 'var(--text-secondary)'
                  }}>
                    {Object.entries(doc.extractedData).map(([key, val]) => (
                      <div key={key}>
                        <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}: </span>
                        <strong style={{ color: 'var(--text-primary)' }}>{val}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
