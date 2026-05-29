import React, { useState } from 'react';
import { AlertCircle, FileText, CheckCircle2, Clock, UploadCloud, Bell } from 'lucide-react';
import { NotificationItem } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface NotificationsProps {
  notifications: NotificationItem[];
}

export default function Notifications({ notifications }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'important'>('all');
  const [notifs, setNotifs] = useState(notifications);

  const filteredNotifs = notifs.filter(n => {
    if (activeTab === 'unread') return !n.isRead;
    if (activeTab === 'important') return ['overdue', 'reject'].includes(n.type);
    return true;
  });

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'upload': return <UploadCloud className="w-5 h-5 text-blue-500" />;
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'reject': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'alert':
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 border-emerald-100';
      case 'upload': return 'bg-blue-50 border-blue-100';
      case 'overdue': return 'bg-red-50 border-red-100';
      case 'reject': return 'bg-red-50 border-red-100';
      case 'warning': return 'bg-amber-50 border-amber-100';
      case 'alert':
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">การแจ้งเตือน</h1>
          <p className="text-sm text-slate-500 mt-1">อัปเดตกิจกรรมล่าสุดจากบริษัทลูกค้า</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-[var(--color-primary-emerald)] hover:underline font-medium"
        >
          ทำเครื่องหมายอ่านแล้วทั้งหมด
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('all')}
            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'all' ? "border-[var(--color-primary-emerald)] text-[var(--color-primary-emerald)]" : "border-transparent text-slate-500 hover:text-slate-800")}
          >
            ทั้งหมด ({notifs.length})
          </button>
          <button 
            onClick={() => setActiveTab('unread')}
            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'unread' ? "border-[var(--color-primary-emerald)] text-[var(--color-primary-emerald)]" : "border-transparent text-slate-500 hover:text-slate-800")}
          >
            ยังไม่อ่าน ({notifs.filter(n=>!n.isRead).length})
          </button>
          <button 
            onClick={() => setActiveTab('important')}
            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'important' ? "border-[var(--color-primary-emerald)] text-[var(--color-primary-emerald)]" : "border-transparent text-slate-500 hover:text-slate-800")}
          >
            สำคัญ ({notifs.filter(n=>['overdue', 'reject'].includes(n.type)).length})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto w-full p-2">
          {filteredNotifs.length > 0 ? (
            <div className="space-y-2">
              {filteredNotifs.map(notif => (
                <div 
                  key={notif.id} 
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer hover:shadow-sm", 
                    notif.isRead ? "bg-white border-slate-100 opacity-70" : `border-transparent ${getBg(notif.type)}`
                  )}
                >
                  <div className="mt-0.5 shrink-0 bg-white rounded-full p-1.5 shadow-sm">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm mb-1 leading-snug", notif.isRead ? "text-slate-700" : "font-semibold text-slate-900")}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-slate-500">{notif.companyName}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 gap-2">
                    <span className="text-xs text-slate-400 whitespace-nowrap">{notif.time}</span>
                    {!notif.isRead && <span className="w-2.5 h-2.5 bg-[var(--color-primary-emerald)] rounded-full"></span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="h-40 flex flex-col items-center justify-center text-slate-400">
               <Bell className="w-8 h-8 mb-2 opacity-50" />
               <p className="text-sm">ไม่มีการแจ้งเตือน</p>
             </div>
          )}
        </div>
      </div>

    </motion.div>
  );
}
