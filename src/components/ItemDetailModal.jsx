import React, { useState } from 'react';
import { X, SplitSquareVertical, MessageSquareText, FileText, Plus, Trash2, Shield, Calendar, MapPin, Tag, Wrench, ChevronRight, Download, AlertTriangle } from 'lucide-react';

export default function ItemDetailModal({
  isOpen,
  onClose,
  item,
  onOpenCompare,
  onOpenAskAI,
  onOpenReport,
  onAddConditionCheck,
  onDeleteItem,
  onDeleteTimelineEvent
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteEventTarget, setDeleteEventTarget] = useState(null);

  if (!isOpen || !item) return null;

  const handleDeleteItemConfirmed = () => {
    setShowConfirmDelete(false);
    onDeleteItem(item.id);
    onClose();
  };

  const handleDeleteEventConfirmed = () => {
    if (deleteEventTarget) {
      onDeleteTimelineEvent(item.id, deleteEventTarget);
      setDeleteEventTarget(null);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-sheet" style={{ maxWidth: 460, maxHeight: '92vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span>{item.categoryIcon}</span>
            <span>{item.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="close-btn"
              style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }}
              title="Delete this record"
            >
              <Trash2 size={16} />
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Delete Confirmation Alert Banner */}
          {showConfirmDelete && (
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--danger)', fontWeight: 700, fontSize: 13 }}>
                <AlertTriangle size={16} />
                <span>Delete {item.name}?</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                This will permanently delete this {item.category.toLowerCase()} record, including all baseline photos, AI condition scans, comparison records, and documents.
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  className="btn-secondary"
                  onClick={() => setShowConfirmDelete(false)}
                  style={{ padding: '6px 12px', fontSize: 12 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteItemConfirmed}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 10,
                    background: 'var(--danger)',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Yes, Delete Record
                </button>
              </div>
            </div>
          )}

          {/* Delete Timeline Event Confirmation */}
          {deleteEventTarget && (
            <div style={{
              padding: 12,
              borderRadius: 12,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10
            }}>
              <span style={{ fontSize: 11, color: 'var(--danger)', fontWeight: 600 }}>
                Delete this scan entry from timeline?
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className="btn-secondary"
                  onClick={() => setDeleteEventTarget(null)}
                  style={{ padding: '4px 8px', fontSize: 11 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEventConfirmed}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: 'var(--danger)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Hero Image Card */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: 200,
            borderRadius: 18,
            overflow: 'hidden',
            background: '#0B1020',
            boxShadow: 'var(--shadow-md)'
          }}>
            <img
              src={item.currentImage}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Condition Score Badge */}
            <div style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 12,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Score:</span>
              <span style={{
                fontSize: 14,
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: item.conditionScore >= 90 ? 'var(--success)' : item.conditionScore >= 80 ? 'var(--warning)' : 'var(--danger)'
              }}>
                {item.conditionScore}/100
              </span>
            </div>

            {/* Category / Room Pill */}
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {item.category} {item.room ? `• ${item.room}` : ''}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Condition</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                {item.conditionStatus}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Warranty</div>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: item.warrantyDaysLeft && item.warrantyDaysLeft <= 45 ? 'var(--warning)' : 'var(--success)',
                marginTop: 2
              }}>
                {item.warrantyDaysLeft !== null ? `${item.warrantyDaysLeft} Days` : item.warrantyStatus}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Acquired</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                {item.beforeDate || item.purchaseDate}
              </div>
            </div>
          </div>

          {/* Action Button Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: item.hasComparison ? '1fr 1fr 1fr' : '1fr 1fr', gap: 8 }}>
            {item.hasComparison && (
              <button
                className="btn-secondary"
                onClick={() => {
                  onClose();
                  onOpenCompare(item.id);
                }}
                style={{ padding: '9px 10px', fontSize: 12, background: 'var(--primary-subtle)', color: 'var(--primary)' }}
              >
                <SplitSquareVertical size={14} />
                <span>Compare</span>
              </button>
            )}

            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onOpenAskAI(item);
              }}
              style={{ padding: '9px 10px', fontSize: 12 }}
            >
              <MessageSquareText size={14} color="var(--accent-cyan)" />
              <span>Ask AI</span>
            </button>

            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onOpenReport(item);
              }}
              style={{ padding: '9px 10px', fontSize: 12 }}
            >
              <FileText size={14} color="var(--success)" />
              <span>Report</span>
            </button>
          </div>

          {/* Description */}
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {item.description}
          </p>

          {/* SECTION 6: Visual Timeline */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12
            }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span>🕐</span>
                <span>Visual Timeline ({item.timeline?.length || 0})</span>
              </h4>
              <button
                onClick={onAddConditionCheck}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <Plus size={12} />
                <span>Add Check</span>
              </button>
            </div>

            {/* Timeline Tree Component */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              paddingLeft: 18
            }}>
              {/* Vertical line indicator */}
              <div style={{
                position: 'absolute',
                top: 8,
                bottom: 8,
                left: 6,
                width: 2,
                background: 'var(--border-subtle)'
              }} />

              {item.timeline?.map((ev, i) => (
                <div key={ev.id || i} style={{ position: 'relative', marginBottom: 16 }}>
                  {/* Timeline Node dot */}
                  <div style={{
                    position: 'absolute',
                    left: -18,
                    top: 2,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: ev.type === 'check' ? 'var(--primary)' : ev.type === 'repair' ? 'var(--warning)' : 'var(--success)',
                    border: '3px solid var(--bg-surface)',
                    boxShadow: '0 0 8px rgba(108, 99, 255, 0.3)'
                  }} />

                  <div style={{ paddingLeft: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {ev.date}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className={`badge ${ev.type === 'repair' ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: 9, padding: '1px 6px' }}>
                          {ev.badge || ev.icon}
                        </span>
                        {/* Delete entry button */}
                        <button
                          onClick={() => setDeleteEventTarget(ev.id)}
                          style={{
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 2,
                            borderRadius: 4
                          }}
                          title="Delete this timeline scan"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                      {ev.title}
                    </div>

                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                      {ev.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Documents Vault */}
          {item.documents && item.documents.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span>📄</span>
                <span>Document Vault ({item.documents.length})</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {item.documents.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      padding: 10,
                      borderRadius: 12,
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(108, 99, 255, 0.15)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14
                      }}>
                        📑
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                          {doc.title}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                          {doc.date} • {doc.size}
                        </div>
                      </div>
                    </div>
                    <button style={{ color: 'var(--text-muted)' }} title="Download / View">
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delete Record Button at Bottom */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, textAlign: 'center' }}>
            <button
              onClick={() => setShowConfirmDelete(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--danger)',
                fontSize: 12,
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: 10,
                background: 'rgba(239, 68, 68, 0.08)'
              }}
            >
              <Trash2 size={14} />
              <span>Delete Entire {item.category} Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
