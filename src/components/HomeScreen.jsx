import React, { useState } from 'react';
import { Plus, ShieldCheck, AlertCircle, Clock, ChevronRight, SplitSquareVertical, ArrowUpRight, Sparkles } from 'lucide-react';

export default function HomeScreen({
  items,
  onOpenItem,
  onOpenAdd,
  onOpenCompare,
  onOpenPaywall,
  selectedCategory,
  setSelectedCategory,
  user,
  onOpenAuth
}) {
  const categories = [
    { id: 'All', label: 'All', icon: '✨' },
    { id: 'Home', label: 'Home', icon: '🏠' },
    { id: 'Electronics', label: 'Electronics', icon: '💻' },
    { id: 'Vehicle', label: 'Vehicle', icon: '🚗' },
    { id: 'Package', label: 'Packages', icon: '📦' }
  ];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((it) => it.category.toLowerCase() === selectedCategory.toLowerCase());

  const expiringItem = items.find((i) => i.warrantyDaysLeft && i.warrantyDaysLeft <= 45);

  return (
    <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Unauthenticated Guest Callout Banner */}
      {!user && (
        <div style={{
          padding: '12px 14px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(6, 182, 212, 0.15))',
          border: '1px solid rgba(108, 99, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>🔐</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                Browsing in Guest Mode
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Sign in to sync your ownership vault across devices.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenAuth}
            className="btn-primary"
            style={{ padding: '7px 12px', fontSize: 11, borderRadius: 10, flexShrink: 0 }}
          >
            Sign In
          </button>
        </div>
      )}

      {/* Greeting & Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Personal Memory Vault
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginTop: 2
          }}>
            {user ? `Good evening 👋, ${user.name}` : 'Welcome 👋'}
          </h2>
        </div>

        <button
          onClick={onOpenAdd}
          className="btn-primary"
          style={{ padding: '9px 14px', fontSize: 13, borderRadius: 12 }}
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add Record</span>
        </button>
      </div>

      {/* Quick Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10
      }}>
        <div className="glass-card" style={{ padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            12
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>
            Items Tracked
          </div>
        </div>

        <div className="glass-card" style={{ padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
            4
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>
            Warranties
          </div>
        </div>

        <div className="glass-card" style={{ padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--warning)' }}>
            2
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>
            Attention
          </div>
        </div>
      </div>

      {/* Urgent Alert Banner (Rule 10 & 11) */}
      {expiringItem && (
        <div
          onClick={() => onOpenItem(expiringItem.id)}
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(239, 68, 68, 0.12) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 18,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.2)',
              color: 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0
            }}>
              ⚠️
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning)' }}>
                Warranty Expiring in {expiringItem.warrantyDaysLeft} Days
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 1 }}>
                {expiringItem.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Tap to view receipt & coverage terms
              </div>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--warning)' }} />
        </div>
      )}

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 600,
                background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid ' + (isSelected ? 'var(--primary)' : 'var(--border-subtle)'),
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            Recent Condition Records ({filteredItems.length})
          </h3>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Sorted by latest check
          </span>
        </div>

        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card"
            style={{
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => onOpenItem(item.id)}
          >
            <div style={{ display: 'flex', gap: 14 }}>
              {/* Thumbnail with condition score pill */}
              <div style={{
                width: 90,
                height: 90,
                borderRadius: 14,
                overflow: 'hidden',
                background: '#0B1020',
                flexShrink: 0,
                position: 'relative'
              }}>
                <img
                  src={item.currentImage}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: item.conditionScore >= 90 ? 'var(--success)' : item.conditionScore >= 80 ? 'var(--warning)' : 'var(--danger)',
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  padding: '1px 5px',
                  borderRadius: 4
                }}>
                  {item.conditionScore}%
                </div>
              </div>

              {/* Info column */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {item.categoryIcon} {item.category}
                  </span>
                  {item.room && (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>• {item.room}</span>
                  )}
                </div>

                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {item.name}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  {item.hasComparison && (
                    <span className="badge badge-danger" style={{ fontSize: 10 }}>
                      🔴 1 New Change
                    </span>
                  )}

                  {item.warrantyDaysLeft !== null ? (
                    <span className={`badge ${item.warrantyDaysLeft <= 45 ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: 10 }}>
                      🛡️ {item.warrantyDaysLeft}d left
                    </span>
                  ) : (
                    <span className="badge badge-primary" style={{ fontSize: 10 }}>
                      {item.warrantyStatus || 'Tracked'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 8,
              fontSize: 11
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} />
                <span>Last scan: {item.afterDate || item.purchaseDate}</span>
              </span>

              <div style={{ display: 'flex', gap: 8 }}>
                {item.hasComparison && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCompare(item.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: 'var(--primary)',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: 'var(--primary-subtle)'
                    }}
                  >
                    <SplitSquareVertical size={12} />
                    <span>Compare</span>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenItem(item.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    color: 'var(--text-secondary)',
                    fontWeight: 500
                  }}
                >
                  <span>Details</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
