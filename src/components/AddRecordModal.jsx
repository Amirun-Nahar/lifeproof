import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, Sparkles, Check, AlertTriangle, RefreshCw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/mockData';
import { analyzeImageCondition } from '../services/geminiService';

export default function AddRecordModal({ isOpen, onClose, onSaveRecord }) {
  const [step, setStep] = useState(1); // 1: Category & Details, 2: Camera/Photo, 3: AI Scanning, 4: Results & Confirm
  const [category, setCategory] = useState('Home');
  const [title, setTitle] = useState('');
  const [room, setRoom] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStageText, setScanStageText] = useState('Initializing AI Vision...');
  const [aiResult, setAiResult] = useState(null);
  const [isLiveCamera, setIsLiveCamera] = useState(false);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'Home', label: 'Home', icon: '🏠', placeholder: 'e.g. Master Bedroom Wall' },
    { id: 'Electronics', label: 'Electronics', icon: '💻', placeholder: 'e.g. MacBook Pro M3' },
    { id: 'Vehicle', label: 'Vehicle', icon: '🚗', placeholder: 'e.g. Honda Civic Bumper' },
    { id: 'Package', label: 'Package', icon: '📦', placeholder: 'e.g. Priority Express Parcel' },
    { id: 'Furniture', label: 'Furniture', icon: '🪑', placeholder: 'e.g. Living Room Leather Sofa' },
    { id: 'Other', label: 'Other', icon: '📁', placeholder: 'e.g. Designer Watch' }
  ];

  // Stop camera stream when unmounting or switching steps
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsLiveCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable, fallback to presets:", err);
      setIsLiveCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsLiveCamera(false);
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    stopCamera();
    handleSelectImage(dataUrl);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleSelectImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectScenario = (scenario) => {
    setSelectedImage(scenario.image);
    if (!title) setTitle(scenario.suggestedName);
    setCategory(scenario.category);
    startScanning(scenario.image, scenario.category);
  };

  const handleSelectImage = (imgSrc) => {
    setSelectedImage(imgSrc);
    startScanning(imgSrc, category);
  };

  const startScanning = async (imgSrc, cat) => {
    setStep(3);
    setIsScanning(true);
    setScanProgress(15);
    setScanStageText("Analyzing image pixels & lighting...");

    setTimeout(() => {
      setScanProgress(45);
      setScanStageText("Detecting objects & architectural planes...");
    }, 600);

    setTimeout(() => {
      setScanProgress(75);
      setScanStageText("Evaluating surface anomalies & scuffs...");
    }, 1200);

    const result = await analyzeImageCondition(imgSrc, cat);

    setScanProgress(100);
    setScanStageText("Condition structured. Ready for confirmation.");
    setTimeout(() => {
      setAiResult(result);
      if (!title && result.suggestedTitle) {
        setTitle(result.suggestedTitle);
      }
      setIsScanning(false);
      setStep(4);
    }, 400);
  };

  const handleConfirmAndSave = () => {
    const newRecord = {
      id: `item-${Date.now()}`,
      name: title || `${category} Record`,
      category,
      categoryIcon: categories.find((c) => c.id === category)?.icon || '📁',
      room: room || 'Main Area',
      conditionScore: aiResult?.conditionScore || 90,
      conditionStatus: aiResult?.observations?.some((o) => o.severity === 'high' || o.severity === 'medium')
        ? 'Attention Needed'
        : 'Good Condition',
      statusBadge: 'New Record',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyDaysLeft: category === 'Electronics' ? 365 : null,
      warrantyStatus: category === 'Electronics' ? '1-Year Warranty' : 'Active Record',
      description: `AI condition analysis confirmed by user on ${new Date().toLocaleDateString()}.`,
      currentImage: selectedImage,
      imageBefore: selectedImage,
      hasComparison: false,
      timeline: [
        {
          id: `t-${Date.now()}`,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          title: 'Condition Baseline Established',
          type: 'baseline',
          icon: '📸',
          desc: aiResult?.observations?.map((o) => o.description).join('. ') || 'Baseline photos verified.',
          badge: 'Baseline'
        }
      ],
      documents: []
    };

    onSaveRecord(newRecord);
    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setStep(1);
    setTitle('');
    setRoom('');
    setSelectedImage(null);
    setAiResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-sheet" style={{ maxWidth: 440 }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span style={{ fontSize: 20 }}>📸</span>
            <span>{step === 1 ? 'Add Record' : step === 2 ? 'Capture Photo' : step === 3 ? 'AI Vision Scan' : 'Review & Confirm'}</span>
          </div>
          <button className="close-btn" onClick={handleClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 18 }}>
          {/* STEP 1: Category & Info */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. Select Category
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: 14,
                        background: category === cat.id ? 'var(--primary-subtle)' : 'var(--bg-input)',
                        border: '1px solid ' + (category === cat.id ? 'var(--primary)' : 'var(--border-subtle)'),
                        color: category === cat.id ? 'var(--primary)' : 'var(--text-primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{cat.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  2. Record Name
                </label>
                <input
                  type="text"
                  placeholder={categories.find((c) => c.id === category)?.placeholder || 'Item or room name'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 12,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 14,
                    marginTop: 6,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  3. Location / Room (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master Bedroom, Office, Garage"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 12,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 14,
                    marginTop: 6,
                    outline: 'none'
                  }}
                />
              </div>

              <button
                className="btn-primary"
                onClick={() => setStep(2)}
                style={{ marginTop: 8 }}
              >
                <span>Continue to Photo Scan</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: Photo Capture or Instant Preset */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {isLiveCamera ? (
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: 260, objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 12
                  }}>
                    <button
                      onClick={takePhoto}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '4px solid var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
                      }}
                    >
                      <Camera size={24} color="#111827" />
                    </button>
                    <button
                      onClick={stopCamera}
                      style={{
                        padding: '8px 14px',
                        background: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        borderRadius: 10,
                        fontSize: 12
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    onClick={startCamera}
                    style={{
                      padding: '24px 14px',
                      borderRadius: 16,
                      background: 'var(--bg-input)',
                      border: '1px dashed var(--border-hover)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Camera size={26} color="var(--primary)" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Open Camera</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Live mobile capture</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '24px 14px',
                      borderRadius: 16,
                      background: 'var(--bg-input)',
                      border: '1px dashed var(--border-hover)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Upload size={26} color="var(--accent-cyan)" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Upload Image</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>From gallery / device</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </div>
              )}

              {/* Instant Hackathon Scenarios */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  textTransform: 'uppercase',
                  marginBottom: 10
                }}>
                  <Sparkles size={13} />
                  <span>Instant Pitch Presets (1-Click Demo)</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {DEMO_SCENARIOS.map((sc) => (
                    <div
                      key={sc.id}
                      onClick={() => handleSelectScenario(sc)}
                      style={{
                        padding: 10,
                        borderRadius: 12,
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <img
                        src={sc.image}
                        alt={sc.name}
                        style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                          {sc.name}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sc.conditions[0]?.label}
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Real-time Scanning Radar & Animation */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: 240,
                borderRadius: 18,
                overflow: 'hidden',
                background: '#000',
                boxShadow: 'var(--shadow-md)'
              }}>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Scanning"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />
                )}

                {/* Laser Sweep line */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, #06B6D4, #6C63FF, #06B6D4, transparent)',
                  boxShadow: '0 0 12px #06B6D4, 0 0 24px #6C63FF',
                  animation: 'laserSweep 1.8s ease-in-out infinite',
                  zIndex: 10
                }} />

                {/* Radar Grid overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(108, 99, 255, 0.25) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  pointerEvents: 'none'
                }} />

                {/* Bounding box simulation during scan */}
                {scanProgress > 40 && (
                  <div className="detect-box danger" style={{ top: '45%', left: '20%', width: '35%', height: '22%' }}>
                    <span className="detect-box-tag">Detecting Anomaly...</span>
                  </div>
                )}
              </div>

              {/* Progress info */}
              <div style={{ width: '100%', marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{scanStageText}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>{scanProgress}%</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    width: `${scanProgress}%`,
                    height: '100%',
                    background: 'var(--primary-gradient)',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AI Analysis Results (Section 5 & 6) */}
          {step === 4 && aiResult && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Thumbnail header */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <img
                  src={selectedImage}
                  alt="Record"
                  style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    {title || 'Scanned Item'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span className="badge badge-primary">{category}</span>
                    <span className="badge badge-success">Score: {aiResult.conditionScore}%</span>
                  </div>
                </div>
              </div>

              {/* Objects detected */}
              <div className="glass-card" style={{ padding: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Detected Objects ({aiResult.objects?.length || 0})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {aiResult.objects?.map((obj, i) => (
                    <span key={i} className="badge badge-success" style={{ fontSize: 11 }}>
                      ✓ {obj.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Observations */}
              <div className="glass-card" style={{ padding: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Visible Condition Findings
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {aiResult.observations?.map((obs, i) => {
                    const isHazard = obs.severity === 'high' || obs.severity === 'medium';
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          fontSize: 12,
                          color: isHazard ? 'var(--warning)' : 'var(--text-primary)'
                        }}
                      >
                        <span>{isHazard ? '⚠️' : '✓'}</span>
                        <span style={{ lineHeight: 1.4 }}>{obs.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* UX Rule Notice (Section 5) */}
              <div style={{
                padding: '10px 12px',
                borderRadius: 12,
                background: 'rgba(108, 99, 255, 0.08)',
                border: '1px solid rgba(108, 99, 255, 0.2)',
                fontSize: 11,
                color: 'var(--text-secondary)',
                lineHeight: 1.4
              }}>
                💡 <strong>Important UX Rule:</strong> AI observations are suggestions, not legal inspection. Please verify before saving.
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button
                  className="btn-secondary"
                  onClick={() => setStep(1)}
                  style={{ flex: 1, padding: '10px' }}
                >
                  Edit Details
                </button>
                <button
                  className="btn-primary"
                  onClick={handleConfirmAndSave}
                  style={{ flex: 2, padding: '10px' }}
                >
                  <Check size={16} />
                  <span>Confirm & Save</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
