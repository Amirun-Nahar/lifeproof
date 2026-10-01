import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import LifeProofLogo from './LifeProofLogo';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isFarhan = email.toLowerCase().includes('farhanhamim2001@gmail.com');
      const displayName = isFarhan
        ? 'Farhan Hamim'
        : name.trim() || email.split('@')[0];

      const authUser = {
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email: email.trim(),
        avatar: (displayName ? displayName.charAt(0) : email.charAt(0)).toUpperCase(),
        role: isFarhan ? 'Co-Owner' : 'Owner',
        loginTime: new Date().toLocaleTimeString()
      };
      onLoginSuccess(authUser);
      onClose();
    }, 600);
  };

  const handleQuickLogin = (type) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let authUser;
      if (type === 'farhan') {
        authUser = {
          name: 'Farhan Hamim',
          email: 'farhanhamim2001@gmail.com',
          avatar: 'F',
          role: 'Co-Owner',
          loginTime: new Date().toLocaleTimeString()
        };
      } else if (type === 'vault') {
        authUser = {
          name: 'Team Vault',
          email: 'vault@lifeproof.io',
          avatar: 'V',
          role: 'Co-Owner',
          loginTime: new Date().toLocaleTimeString()
        };
      } else if (type === 'judge') {
        authUser = {
          name: 'Shipaton Judge',
          email: 'judge@shipaton.org',
          avatar: 'J',
          role: 'VIP Evaluator',
          loginTime: new Date().toLocaleTimeString()
        };
      } else {
        authUser = {
          name: 'Guest User',
          email: 'guest@lifeproof.local',
          avatar: 'G',
          role: 'Guest',
          loginTime: new Date().toLocaleTimeString()
        };
      }
      onLoginSuccess(authUser);
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1300 }}>
      <div className="modal-sheet" style={{ maxWidth: 430, maxHeight: '92vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <LifeProofLogo size={24} showText={false} />
            <span>{isSignUp ? 'Create LifeProof Account' : 'Sign in to LifeProof'}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Logo Hero */}
          <div style={{ textAlign: 'center', padding: '6px 0 10px' }}>
            <LifeProofLogo size={52} showText={true} showTagline={true} />
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
              {isSignUp
                ? 'Create a secure visual record for your belongings & spaces.'
                : 'Welcome back! Access your visual ownership timeline & warranties.'}
            </p>
          </div>

          {/* Quick 1-Click Demo Profiles (Great for judges/demoers) */}
          <div style={{
            padding: 12,
            borderRadius: 14,
            background: 'var(--primary-subtle)',
            border: '1px solid rgba(108, 99, 255, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              <Sparkles size={13} />
              <span>1-Click Instant Demo Login:</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('farhan')}
                className="btn-secondary"
                style={{
                  padding: '8px 8px',
                  fontSize: 11,
                  borderRadius: 10,
                  justifyContent: 'center',
                  background: 'rgba(6, 182, 212, 0.1)',
                  borderColor: 'var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700
                }}
              >
                👑 Farhan Hamim (Owner)
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('vault')}
                className="btn-secondary"
                style={{
                  padding: '8px 8px',
                  fontSize: 11,
                  borderRadius: 10,
                  justifyContent: 'center',
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  fontWeight: 700
                }}
              >
                🔐 Team Vault
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('judge')}
                className="btn-secondary"
                style={{
                  padding: '8px 8px',
                  fontSize: 11,
                  borderRadius: 10,
                  justifyContent: 'center',
                  borderColor: 'var(--warning)',
                  color: 'var(--warning)',
                  gridColumn: 'span 2'
                }}
              >
                ⚖️ Shipaton Judge (VIP Evaluator)
              </button>
            </div>
          </div>

          {/* Segmented Sign In / Sign Up toggle */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--bg-input)',
            borderRadius: 12,
            padding: 3,
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
              }}
              style={{
                padding: '8px',
                borderRadius: 9,
                fontSize: 12,
                fontWeight: 700,
                background: !isSignUp ? 'var(--bg-surface)' : 'transparent',
                color: !isSignUp ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: !isSignUp ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              style={{
                padding: '8px',
                borderRadius: 9,
                fontSize: 12,
                fontWeight: 700,
                background: isSignUp ? 'var(--bg-surface)' : 'transparent',
                color: isSignUp ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: isSignUp ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {isSignUp && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative', marginTop: 4 }}>
                  <User size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="e.g. Farhan Hamim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: 12,
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: 13,
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', marginTop: 4 }}>
                <Mail size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: 12,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative', marginTop: 4 }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: 12,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 2 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: 6, padding: '12px', fontSize: 13 }}
            >
              <span>{loading ? 'Authenticating...' : isSignUp ? 'Create My Account' : 'Sign In'}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Guest fallback */}
          <div style={{ textAlign: 'center', marginTop: -4 }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('guest')}
              style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
