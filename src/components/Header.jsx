import React, { useState } from 'react';
import { Search, Bell, Sparkles, X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import LifeProofLogo from './LifeProofLogo';

export default function Header({
  searchQuery,
  setSearchQuery,
  notifications,
  onOpenNotifications,
  isPro,
  onOpenPaywall,
  onOpenClaim,
  onOpenItem,
  user,
  onOpenProfile,
  onOpenAuth
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header style={{
      padding: '14px 20px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LifeProofLogo size={40} showText={true} showTagline={true} />
          <span
            className="badge badge-primary"
            onClick={onOpenClaim || onOpenPaywall}
            style={{ fontSize: 9, padding: '2px 8px', cursor: 'pointer', alignSelf: 'flex-start', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}
            title="Open Smart Claim & Dispute Dispatcher"
          >
            <span>⚖️</span>
            <span>CLAIMS</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: showSearch ? 'var(--primary-subtle)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: showSearch ? 'var(--primary)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Search records"
          >
            <Search size={16} />
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              title="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--danger)',
                  boxShadow: '0 0 6px var(--danger)'
                }} />
              )}
            </button>

            {showNotifMenu && (
              <div style={{
                position: 'absolute',
                top: 44,
                right: 0,
                width: 290,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                boxShadow: 'var(--shadow-lg)',
                padding: 12,
                zIndex: 100
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    Smart Alerts ({unreadCount})
                  </span>
                  <button onClick={() => setShowNotifMenu(false)} style={{ color: 'var(--text-muted)' }}>
                    <X size={14} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        setShowNotifMenu(false);
                        if (notif.itemId) onOpenItem(notif.itemId);
                      }}
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        background: notif.unread ? 'rgba(108, 99, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                        {notif.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                        {notif.body}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                        {notif.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {user ? (
            <div
              onClick={onOpenProfile}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}
              title={`${user.name} - View Account Profile / Log Out`}
            >
              {user.avatar || user.name.charAt(0)}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                padding: '7px 12px',
                borderRadius: 10,
                background: 'var(--primary-subtle)',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {showSearch && (
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search items, warranties, repairs, receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 34px',
              borderRadius: 12,
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              fontSize: 13,
              outline: 'none'
            }}
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: 10, top: 10, color: 'var(--text-muted)' }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
