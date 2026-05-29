import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Companies from './Companies';
import CompanyDetail from './CompanyDetail';
import CreateRequest from './CreateRequest';
import TrackRequest from './TrackRequest';
import Notifications from './Notifications';
import { AppState, ClientCompany, NotificationItem } from '../../types';

interface AdminAppProps {
  appState: AppState;
  navToAdmin: (screen: AppState['adminScreen'], companyId?: string | null) => void;
  navToClient: (companyId: string) => void;
  companies: ClientCompany[];
  setCompanies: React.Dispatch<React.SetStateAction<ClientCompany[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export default function AdminApp({ appState, navToAdmin, navToClient, companies, setCompanies, notifications, setNotifications }: AdminAppProps) {
  
  const renderScreen = () => {
    switch (appState.adminScreen) {
      case 'dashboard':
        return <Dashboard companies={companies} notifications={notifications} navToAdmin={navToAdmin} />;
      case 'companies':
        return <Companies companies={companies} navToAdmin={navToAdmin} />;
      case 'companyDetail':
        return <CompanyDetail companies={companies} activeCompanyId={appState.activeCompanyId} navToAdmin={navToAdmin} navToClient={navToClient} />;
      case 'createRequest':
        return <CreateRequest companies={companies} activeCompanyId={appState.activeCompanyId} navToAdmin={navToAdmin} navToClient={navToClient} />;
      case 'trackRequest':
        return <TrackRequest companies={companies} activeCompanyId={appState.activeCompanyId} navToAdmin={navToAdmin} />;
      case 'notifications':
        return <Notifications notifications={notifications} />;
      default:
        return <Dashboard companies={companies} notifications={notifications} navToAdmin={navToAdmin} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-ivory)] font-sans">
      <Sidebar currentScreen={appState.adminScreen} navToAdmin={navToAdmin} />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {renderScreen()}
      </main>
    </div>
  );
}
