import React, { useState } from 'react';
import { X, LogOut, Crown, Shield, Mail, Key, CheckCircle2, Cloud, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';
import LifeProofLogo from './LifeProofLogo';

export default function AccountProfileModal({
  isOpen,
  onClose,
  user,
  isPro,
  onOpenPaywall,
  onOpenClaim,
  onLogout,
  itemsCount,
  warrantiesCount,
  onSwitchUser
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!isOpen || !user) return null;

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1250 }}>
      <div className="modal-sheet" style={{ maxWidth: 440, maxHeight: '92vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span style={{ fontSize: 18 }}>👤</span>
            <span>Account & Profile</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* User Profile Card */}
          <div style={{
            padding: 16,
            borderRadius: 18,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 14
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #6C63FF 100%)',
              color: '#FFFFFF',
              fontSize: 22,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(108, 99, 255, 0.35)',
              flexShrink: 0
            }}>
              {user.avatar || user.name.charAt(0)}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.name}
                </h3>
                {isPro ? (
                  <span className="badge badge-success" style={{ fontSize: 9, padding: '2px 6px' }}>
                    PRO
                  </span>
                ) : (
                  <span className="badge badge-primary" style={{ fontSize: 9, padding: '2px 6px' }}>
                    FREE
                  </span>
                )}
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Mail size={12} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.email}</span>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                Role: {user.role || 'Member'}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="glass-card" style={{ padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {itemsCount}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                Items Owned
              </div>
            </div>

            <div className="glass-card" style={{ padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                {warrantiesCount}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                Active Warranties
              </div>
            </div>
          </div>

          {/* Subscription Status Card */}
          {/* Smart Claim & Dispute Protection Section */}
          <div className="glass-card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>⚖️</span>
                  <span>Smart Claim & Dispute Protection</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  Automated warranty claims & legal dispute packets active
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenClaim) onOpenClaim();
                  else if (onOpenPaywall) onOpenPaywall();
                }}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: 11, background: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)', color: '#fff' }}
              >
                File Claim
              </button>
            </div>
          </div>

          {/* Vault Co-Owners & Family Sharing Section (Section 14 of PRD) */}
          <div className="glass-card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>👥</span>
                <span>Vault Co-Owners & Access</span>
              </div>
              <span className="badge badge-success" style={{ fontSize: 9 }}>
                2 Owners Active
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Nahar (Owner) */}
              <div style={{
                padding: '8px 10px',
                borderRadius: 10,
                background: user.email === 'naharamina68@gmail.com' ? 'var(--primary-subtle)' : 'var(--bg-input)',
                border: '1px solid ' + (user.email === 'naharamina68@gmail.com' ? 'var(--primary)' : 'var(--border-subtle)'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    N
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                        Nahar
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--primary)', background: 'rgba(108, 99, 255, 0.12)', padding: '1px 5px', borderRadius: 4 }}>
                        Owner
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      naharamina68@gmail.com
                    </div>
                  </div>
                </div>

                {user.email === 'naharamina68@gmail.com' ? (
                  <span className="badge badge-success" style={{ fontSize: 9 }}>Current</span>
                ) : (
                  <button
                    onClick={() => onSwitchUser && onSwitchUser('nahar')}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--primary)',
                      background: 'var(--primary-subtle)',
                      border: '1px solid var(--primary)',
                      padding: '3px 8px',
                      borderRadius: 6
                    }}
                  >
                    Switch
                  </button>
                )}
              </div>

              {/* Farhan Hamim (Co-Owner) */}
              <div style={{
                padding: '8px 10px',
                borderRadius: 10,
                background: user.email === 'farhanhamim2001@gmail.com' ? 'var(--primary-subtle)' : 'var(--bg-input)',
                border: '1px solid ' + (user.email === 'farhanhamim2001@gmail.com' ? 'var(--primary)' : 'var(--border-subtle)'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    F
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                        Farhan Hamim
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.12)', padding: '1px 5px', borderRadius: 4 }}>
                        Co-Owner
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      farhanhamim2001@gmail.com
                    </div>
                  </div>
                </div>

                {user.email === 'farhanhamim2001@gmail.com' ? (
                  <span className="badge badge-success" style={{ fontSize: 9 }}>Current</span>
                ) : (
                  <button
                    onClick={() => onSwitchUser && onSwitchUser('farhan')}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--accent-cyan)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      padding: '3px 8px',
                      borderRadius: 6
                    }}
                  >
                    Switch
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cloud Sync & Encryption Badge (Section 27) */}
          <div style={{
            padding: 12,
            borderRadius: 14,
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <Cloud size={18} color="var(--success)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
              <strong>Cloud Vault Sync:</strong> All condition baseline hashes and documents are encrypted with AES-256 before synchronization.
            </div>
          </div>

          {/* Logout Confirmation Prompt */}
          {showLogoutConfirm ? (
            <div style={{
              padding: 14,
              borderRadius: 14,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <LogOut size={14} />
                <span>Confirm Sign Out</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Are you sure you want to log out of your LifeProof vault on this device?
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  className="btn-secondary"
                  onClick={() => setShowLogoutConfirm(false)}
                  style={{ padding: '6px 12px', fontSize: 11 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 10,
                    background: 'var(--danger)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px',
                borderRadius: 12,
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: 'var(--danger)',
                fontSize: 13,
                fontWeight: 600,
                marginTop: 4,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <LogOut size={16} />
              <span>Log Out of LifeProof</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
