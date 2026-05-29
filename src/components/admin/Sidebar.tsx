import React from 'react';
import { LayoutDashboard, Building2, Send, FileText, Calendar, BarChart3, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';
import { AppState } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { id: 'companies', label: 'บริษัทลูกค้า', icon: Building2 },
  { id: 'createRequest', label: 'คำขอเอกสาร', icon: Send },
  { id: 'companyDetail', label: 'เอกสาร', icon: FileText },
  { id: 'calendar', label: 'ปฏิทิน', icon: Calendar },
  { id: 'reports', label: 'รายงาน', icon: BarChart3 },
  { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell, badge: 8 },
  { id: 'settings', label: 'ตั้งค่า', icon: Settings },
];

interface SidebarProps {
  currentScreen: AppState['adminScreen'];
  navToAdmin: (screen: AppState['adminScreen']) => void;
}

export default function Sidebar({ currentScreen, navToAdmin }: SidebarProps) {
  return (
    <div className="w-[260px] h-full bg-[var(--color-primary-navy)] text-slate-300 flex flex-col pt-8 pb-6 px-4 shrink-0 transition-all z-20">
      
      <div className="flex items-center gap-3 px-3 mb-10">
        <div className="w-10 h-10 rounded shadow-md bg-[var(--color-accent-gold)] flex items-center justify-center text-[var(--color-primary-navy)] font-bold text-2xl font-serif">P</div>
        <div className="leading-tight">
          <h1 className="text-white font-medium tracking-wide">PATTARAKIT</h1>
          <p className="text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase">Accounting</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = currentScreen === item.id || 
                           (currentScreen === 'trackRequest' && item.id === 'createRequest');
          return (
            <button
              key={item.id}
              onClick={() => navToAdmin(item.id as AppState['adminScreen'])}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-[rgba(255,255,255,0.1)] text-white" 
                  : "hover:bg-[var(--color-primary-navy-hover)] hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-[var(--color-accent-gold)]" : "text-slate-400")} />
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto px-3 pt-6 border-t border-[rgba(255,255,255,0.1)] hover:bg-[var(--color-primary-navy-hover)] rounded-lg p-2 cursor-pointer transition-colors flex items-center gap-3">
        <img src="https://ui-avatars.com/api/?name=Supawat+S&background=1E7A5E&color=fff" className="w-10 h-10 rounded-full border-2 border-white/10" alt="Supawat S." />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium text-white truncate">คุณศุภวัฒน์ ส.</p>
          <p className="text-xs text-slate-400 truncate">นักบัญชีอาวุโส</p>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}
