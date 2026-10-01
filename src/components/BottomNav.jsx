import React from 'react';
import { Home, Layers, Plus, ShieldAlert, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onOpenAdd }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={19} />
        <span>Home</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'items' ? 'active' : ''}`}
        onClick={() => setActiveTab('items')}
      >
        <Layers size={19} />
        <span>Items</span>
      </button>

      <div className="nav-add-btn-wrapper">
        <button
          className="nav-add-btn"
          onClick={onOpenAdd}
          title="Add New Record"
        >
          <Plus size={26} strokeWidth={2.5} />
        </button>
      </div>

      <button
        className={`nav-item ${activeTab === 'warranties' ? 'active' : ''}`}
        onClick={() => setActiveTab('warranties')}
      >
        <ShieldAlert size={19} />
        <span>Vault</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'ask' ? 'active' : ''}`}
        onClick={() => setActiveTab('ask')}
      >
        <Sparkles size={19} />
        <span>Ask AI</span>
      </button>
    </nav>
  );
}
