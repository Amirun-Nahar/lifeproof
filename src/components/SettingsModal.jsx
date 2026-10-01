import React, { useState } from 'react';
import { X, Key, Moon, Sun, Bell, RefreshCw, Check, Sparkles } from 'lucide-react';
import { getStoredGeminiKey, setStoredGeminiKey } from '../services/geminiService';

export default function SettingsModal({
  isOpen,
  onClose,
  theme,
  setTheme,
  onTriggerNotification,
  onResetData
}) {
  const [apiKey, setApiKey] = useState(getStoredGeminiKey());
  const [saveStatus, setSaveStatus] = useState('');

  if (!isOpen) return null;

  const handleSaveKey = () => {
    setStoredGeminiKey(apiKey);
    setSaveStatus('Gemini API Key saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }}>
      <div className="modal-sheet" style={{ maxWidth: 440 }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span>⚙️</span>
            <span>Settings & Preferences</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Gemini Multimodal Vision API Config */}
          <div className="glass-card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Key size={16} color="var(--primary)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                Google Gemini API Key
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 10 }}>
              Optional. Enter your Gemini API key to run live multimodal vision analysis. If blank, LIFEProof uses the pre-configured high-fidelity local engine.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 10,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 12,
                  outline: 'none',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                className="btn-primary"
                onClick={handleSaveKey}
                style={{ padding: '8px 14px', fontSize: 12 }}
              >
                Save
              </button>
            </div>
            {saveStatus && (
              <div style={{ fontSize: 11, color: 'var(--success)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={12} />
                <span>{saveStatus}</span>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="glass-card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                Appearance Theme
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Toggle sleek dark mode or clean light mode
              </div>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {theme === 'dark' ? <Moon size={14} color="var(--primary)" /> : <Sun size={14} color="var(--warning)" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          {/* Notification Simulator (OneSignal Category test) */}
          <div className="glass-card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Bell size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                Push Notification Simulator
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 10 }}>
              Test OneSignal retention re-engagement loops: simulate a 30-day warranty reminder or condition scan prompt.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => onTriggerNotification('warranty')}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px 10px', fontSize: 11 }}
              >
                🛡️ Expiry Alert
              </button>
              <button
                onClick={() => onTriggerNotification('check')}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px 10px', fontSize: 11 }}
              >
                📸 Condition Check
              </button>
            </div>
          </div>

          {/* Reset Demo Data */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
            <button
              onClick={onResetData}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--text-muted)',
                fontSize: 12
              }}
            >
              <RefreshCw size={13} />
              <span>Reset to Clean Demo Baseline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
