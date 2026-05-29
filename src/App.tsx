import React, { useState } from 'react';
import AdminApp from './components/admin/AdminApp';
import ClientApp from './components/client/ClientApp';
import { MOCK_COMPANIES, MOCK_NOTIFICATIONS } from './data';
import { ClientCompany, NotificationItem, AppState } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#request=')) {
      try {
        const dataStr = decodeURIComponent(atob(hash.replace('#request=', '')));
        const data = JSON.parse(dataStr);
        return {
          view: 'client',
          adminScreen: 'dashboard',
          activeCompanyId: data.companyId,
          clientDocState: 'initial',
          requestData: data
        };
      } catch (e) {
        console.error('Failed to parse request data from URL', e);
      }
    }
    return {
      view: 'admin',
      adminScreen: 'dashboard',
      activeCompanyId: null,
      clientDocState: 'initial'
    };
  });

  const [companies, setCompanies] = useState<ClientCompany[]>(MOCK_COMPANIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Expose methods to deeply change state
  const navToClient = (companyId: string) => {
    setAppState(prev => ({ ...prev, view: 'client', activeCompanyId: companyId, clientDocState: 'initial' }));
  };

  const navToAdmin = (screen: AppState['adminScreen'], companyId: string | null = null) => {
    setAppState(prev => ({ ...prev, view: 'admin', adminScreen: screen, activeCompanyId: companyId || prev.activeCompanyId }));
  };

  if (appState.view === 'client') {
    return (
      <ClientApp 
        appState={appState} 
        setAppState={setAppState} 
        company={companies.find(c => c.id === appState.activeCompanyId) || companies[9]}
        onClose={() => navToAdmin('dashboard')}
      />
    );
  }

  return (
    <AdminApp 
      appState={appState} 
      navToAdmin={navToAdmin} 
      navToClient={navToClient}
      companies={companies}
      setCompanies={setCompanies}
      notifications={notifications}
      setNotifications={setNotifications}
    />
  );
}
