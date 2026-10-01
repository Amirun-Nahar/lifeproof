import React, { useState } from 'react';
import { X, Send, Sparkles, MessageSquare, ChevronRight, CornerDownLeft, Bot } from 'lucide-react';
import { PRESET_QUESTIONS } from '../data/mockData';
import { askMyStuff } from '../services/geminiService';

export default function AskMyStuffModal({
  isOpen,
  onClose,
  items,
  onOpenItem
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hi! I'm **Ask My Stuff**, your personal ownership & condition memory. Ask me anything about your items, warranties, repairs, move-in inspections, or damage proof!",
      relatedItems: []
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText) => {
    const q = queryText || inputVal;
    if (!q.trim() || isLoading) return;

    const userMsg = { role: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await askMyStuff(q, items);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.text,
          relatedItems: response.relatedItems || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "I couldn't process that query right now. Please try asking again.",
          relatedItems: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-sheet" style={{ maxWidth: 460, height: '88vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span style={{ fontSize: 20 }}>🧠</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>Ask My Stuff</span>
                <span className="badge badge-primary" style={{ fontSize: 9 }}>AI MEMORY</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 400 }}>
                Multimodal memory across {items.length} items & documents
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Chat message history */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 14
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                gap: 6
              }}
            >
              <div
                style={{
                  maxWidth: '88%',
                  padding: '12px 16px',
                  borderRadius: 18,
                  borderBottomRightRadius: msg.role === 'user' ? 4 : 18,
                  borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 18,
                  background: msg.role === 'user' ? 'var(--primary-gradient)' : 'var(--bg-input)',
                  color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: 13,
                  lineHeight: 1.5,
                  border: msg.role === 'assistant' ? '1px solid var(--border-subtle)' : 'none',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.text}
              </div>

              {/* Related Items Rich Embeds */}
              {msg.relatedItems && msg.relatedItems.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: '88%', marginTop: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Linked Vault Records
                  </span>
                  {msg.relatedItems.map((rit) => (
                    <div
                      key={rit.id}
                      onClick={() => {
                        onClose();
                        onOpenItem(rit.id);
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 12,
                        background: 'rgba(108, 99, 255, 0.08)',
                        border: '1px solid rgba(108, 99, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{rit.categoryIcon}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                            {rit.name}
                          </div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                            Condition: {rit.conditionScore}% • {rit.warrantyDaysLeft !== null ? `${rit.warrantyDaysLeft}d warranty` : 'Documented'}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} color="var(--primary)" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontSize: 12 }}>
              <Sparkles size={14} className="spin" />
              <span>Querying ownership knowledge graph...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 6,
          overflowX: 'auto'
        }}>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              style={{
                padding: '5px 10px',
                borderRadius: 99,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: 11,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)'
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '6px 8px 6px 14px'
            }}
          >
            <input
              type="text"
              placeholder="Ask anything: warranties, damages, repairs..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: 13,
                color: 'var(--text-primary)'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: inputVal.trim() ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
