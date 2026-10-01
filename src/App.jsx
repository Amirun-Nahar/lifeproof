import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import WarrantyScreen from './components/WarrantyScreen';
import AddRecordModal from './components/AddRecordModal';
import ItemDetailModal from './components/ItemDetailModal';
import ComparisonModal from './components/ComparisonModal';
import AskMyStuffModal from './components/AskMyStuffModal';
import EvidenceReportModal from './components/EvidenceReportModal';
import RevenueCatPaywallModal from './components/RevenueCatPaywallModal';
import SettingsModal from './components/SettingsModal';
import OnboardingModal from './components/OnboardingModal';
import DemoWalkthroughBar from './components/DemoWalkthroughBar';
import AuthModal from './components/AuthModal';
import AccountProfileModal from './components/AccountProfileModal';
import { INITIAL_ITEMS, SMART_NOTIFICATIONS } from './data/mockData';

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('lifeproof_items');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lifeproof_auth_user');
    return saved ? JSON.parse(saved) : {
      name: 'Nahar',
      email: 'nahar@lifeproof.io',
      avatar: 'N',
      role: 'Owner'
    };
  });

  const [notifications, setNotifications] = useState(SMART_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('lifeproof_pro_entitlement') === 'true';
  });

  // Modal states
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [compareItemId, setCompareItemId] = useState(null);
  const [reportItem, setReportItem] = useState(null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist items
  useEffect(() => {
    localStorage.setItem('lifeproof_items', JSON.stringify(items));
  }, [items]);

  // Toast trigger
  const showToast = (title, body) => {
    setToast({ title, body });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleTriggerSimulatedNotification = (type) => {
    if (type === 'warranty') {
      showToast('🛡️ OneSignal: Warranty Alert', 'Sony WH-1000XM5 warranty expires in 42 days. Tap to review.');
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: '🛡️ Warranty ending in 42 days',
          body: 'Sony WH-1000XM5 expires on Nov 15, 2026. File any pending issues now.',
          time: 'Just now',
          unread: true,
          itemId: 'item-sony-headphones'
        },
        ...prev
      ]);
    } else {
      showToast('📸 OneSignal: Condition Check', 'Haven\'t checked Apartment #4B in 6 months. Time for a quick scan!');
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: '📸 Scheduled Condition Check',
          body: '6 months have elapsed since baseline. Run AI scan to check for changes.',
          time: 'Just now',
          unread: true,
          itemId: 'item-apartment-4b'
        },
        ...prev
      ]);
    }
  };

  const handleResetData = () => {
    setItems(INITIAL_ITEMS);
    localStorage.removeItem('lifeproof_items');
    showToast('Vault Reset', 'Data restored to initial demo condition.');
  };

  const handleSaveNewRecord = (newRecord) => {
    setItems([newRecord, ...items]);
    showToast('Record Created', `${newRecord.name} saved with AI condition baseline.`);
    setSelectedItemId(newRecord.id);
  };

  const handleDeleteItem = (itemId) => {
    const itemToDelete = items.find((i) => i.id === itemId);
    const updated = items.filter((i) => i.id !== itemId);
    setItems(updated);
    if (selectedItemId === itemId) setSelectedItemId(null);
    if (compareItemId === itemId) setCompareItemId(null);
    if (reportItem?.id === itemId) setReportItem(null);
    showToast('Record Deleted', `${itemToDelete ? itemToDelete.name : 'Record'} has been removed.`);
  };

  const handleDeleteTimelineEvent = (itemId, eventId) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        return {
          ...it,
          timeline: (it.timeline || []).filter((ev) => ev.id !== eventId)
        };
      })
    );
    showToast('Timeline Updated', 'Scan record removed from timeline.');
  };

  const handleLoginSuccess = (authUser) => {
    setUser(authUser);
    localStorage.setItem('lifeproof_auth_user', JSON.stringify(authUser));
    showToast('Signed In', `Welcome back, ${authUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lifeproof_auth_user');
    showToast('Signed Out', 'You have been logged out of LifeProof.');
  };

  const handleSwitchUser = (target) => {
    if (target === 'farhan') {
      const farhanUser = {
        name: 'Farhan Hamim',
        email: 'farhanhamim2001@gmail.com',
        avatar: 'F',
        role: 'Co-Owner',
        loginTime: new Date().toLocaleTimeString()
      };
      setUser(farhanUser);
      localStorage.setItem('lifeproof_auth_user', JSON.stringify(farhanUser));
      showToast('Switched Profile', 'Active user is now Farhan Hamim (Co-Owner)');
    } else {
      const naharUser = {
        name: 'Nahar',
        email: 'nahar@lifeproof.io',
        avatar: 'N',
        role: 'Co-Owner',
        loginTime: new Date().toLocaleTimeString()
      };
      setUser(naharUser);
      localStorage.setItem('lifeproof_auth_user', JSON.stringify(naharUser));
      showToast('Switched Profile', 'Active user is now Nahar (Co-Owner)');
    }
  };

  // Demo walkthrough jumper
  const handleSelectDemoStep = (stepId) => {
    if (stepId === 'home') {
      setActiveTab('home');
      setSelectedItemId(null);
    } else if (stepId === 'capture') {
      setIsAddModalOpen(true);
    } else if (stepId === 'compare') {
      const apt = items.find((i) => i.id === 'item-apartment-4b') || items[0];
      setCompareItemId(apt.id);
    } else if (stepId === 'timeline') {
      const mb = items.find((i) => i.id === 'item-macbook-pro') || items[0];
      setSelectedItemId(mb.id);
    } else if (stepId === 'ask') {
      setIsAskModalOpen(true);
    } else if (stepId === 'report') {
      const apt = items.find((i) => i.id === 'item-apartment-4b') || items[0];
      setReportItem(apt);
    } else if (stepId === 'paywall') {
      setIsPaywallOpen(true);
    }
  };

  const selectedItem = items.find((i) => i.id === selectedItemId);
  const compareItem = items.find((i) => i.id === compareItemId);

  // Filter items if searching
  const displayedItems = searchQuery.trim()
    ? items.filter((it) =>
        it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        it.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (it.room && it.room.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (it.warrantyStatus && it.warrantyStatus.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : items;

  return (
    <div className="app-container">
      {/* Pitch Flow & Demo Runner Control Ribbon */}
      <DemoWalkthroughBar
        onSelectStep={handleSelectDemoStep}
        currentStep={activeTab}
        isDesktopView={isDesktopView}
        setIsDesktopView={setIsDesktopView}
        isPro={isPro}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Push Notification Toast Simulator */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          background: 'rgba(18, 24, 41, 0.95)',
          border: '1px solid var(--primary)',
          boxShadow: '0 8px 30px var(--primary-glow)',
          padding: '12px 18px',
          borderRadius: 16,
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 380,
          animation: 'fadeIn 0.25s ease'
        }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              {toast.title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              {toast.body}
            </div>
          </div>
        </div>
      )}

      {/* Main Presentation Stage */}
      <div className={`stage-wrapper ${isDesktopView ? 'desktop-view-mode' : ''}`}>
        <div className="mobile-device-frame">
          {/* iOS Status Bar */}
          <div className="device-status-bar">
            <span>9:41</span>
            <div className="dynamic-island">
              <div className="island-camera" />
              <div className="island-sensor" />
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span>5G</span>
              <span style={{ fontSize: 11 }}>100%</span>
            </div>
          </div>

          {/* App Header */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            notifications={notifications}
            onOpenNotifications={() => {}}
            isPro={isPro}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onOpenItem={(id) => setSelectedItemId(id)}
            user={user}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />

          {/* Scrollable Viewport */}
          <div className="device-content-scroll">
            {activeTab === 'home' && (
              <HomeScreen
                items={displayedItems}
                onOpenItem={(id) => setSelectedItemId(id)}
                onOpenAdd={() => setIsAddModalOpen(true)}
                onOpenCompare={(id) => setCompareItemId(id)}
                onOpenPaywall={() => setIsPaywallOpen(true)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                user={user}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'items' && (
              <HomeScreen
                items={displayedItems}
                onOpenItem={(id) => setSelectedItemId(id)}
                onOpenAdd={() => setIsAddModalOpen(true)}
                onOpenCompare={(id) => setCompareItemId(id)}
                onOpenPaywall={() => setIsPaywallOpen(true)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                user={user}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'warranties' && (
              <WarrantyScreen
                items={items}
                onOpenItem={(id) => setSelectedItemId(id)}
                onOpenPaywall={() => setIsPaywallOpen(true)}
              />
            )}

            {activeTab === 'ask' && (
              <AskMyStuffModal
                isOpen={true}
                onClose={() => setActiveTab('home')}
                items={items}
                onOpenItem={(id) => setSelectedItemId(id)}
              />
            )}
          </div>

          {/* Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenAdd={() => setIsAddModalOpen(true)}
          />

          {/* iOS Home Indicator Bar */}
          <div className="device-home-bar">
            <div className="home-indicator-pill" />
          </div>
        </div>
      </div>

      {/* MODALS */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveRecord={handleSaveNewRecord}
      />

      <ItemDetailModal
        isOpen={!!selectedItemId}
        item={selectedItem}
        onClose={() => setSelectedItemId(null)}
        onOpenCompare={(id) => setCompareItemId(id)}
        onOpenAskAI={(item) => {
          setSelectedItemId(null);
          setIsAskModalOpen(true);
        }}
        onOpenReport={(item) => setReportItem(item)}
        onAddConditionCheck={() => {
          setSelectedItemId(null);
          setIsAddModalOpen(true);
        }}
        onDeleteItem={handleDeleteItem}
        onDeleteTimelineEvent={handleDeleteTimelineEvent}
      />

      <ComparisonModal
        isOpen={!!compareItemId}
        item={compareItem}
        onClose={() => setCompareItemId(null)}
        onOpenReport={(item) => setReportItem(item)}
      />

      {activeTab !== 'ask' && (
        <AskMyStuffModal
          isOpen={isAskModalOpen}
          onClose={() => setIsAskModalOpen(false)}
          items={items}
          onOpenItem={(id) => setSelectedItemId(id)}
        />
      )}

      <EvidenceReportModal
        isOpen={!!reportItem}
        item={reportItem}
        onClose={() => setReportItem(null)}
      />

      <RevenueCatPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        isPro={isPro}
        setIsPro={setIsPro}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        onTriggerNotification={handleTriggerSimulatedNotification}
        onResetData={handleResetData}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AccountProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        isPro={isPro}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onLogout={handleLogout}
        itemsCount={items.length}
        warrantiesCount={items.filter((i) => i.warrantyDaysLeft !== null).length}
        onSwitchUser={handleSwitchUser}
      />
    </div>
  );
}
