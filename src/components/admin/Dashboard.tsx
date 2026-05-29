import React from 'react';
import { motion } from 'motion/react';
import { Building2, CheckCircle2, Clock, AlertCircle, FileText, Bell, ChevronRight } from 'lucide-react';
import { ClientCompany, NotificationItem, AppState } from '../../types';

interface DashboardProps {
  companies: ClientCompany[];
  notifications: NotificationItem[];
  navToAdmin: (screen: AppState['adminScreen'], companyId?: string | null) => void;
}

export default function Dashboard({ companies, notifications, navToAdmin }: DashboardProps) {
  const completedCount = companies.filter(c => c.status.includes('ส่งครบ')).length;
  const inProgressCount = companies.filter(c => c.status === 'กำลังส่ง').length;
  const overdueCount = companies.filter(c => c.status === 'เลยกำหนด').length;
  
  const progressPercent = Math.round((completedCount / companies.length) * 100);

  const kpis = [
    { title: 'บริษัททั้งหมด', value: companies.length, subtitle: 'ทั้งหมด', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'ส่งครบ', value: completedCount, subtitle: 'เดือนนี้', icon: CheckCircle2, color: 'text-[var(--color-primary-emerald)]', bg: 'bg-emerald-50' },
    { title: 'กำลังส่ง', value: inProgressCount, subtitle: 'กำลังดำเนินการ', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'เลยกำหนด', value: overdueCount, subtitle: 'ต้องติดตาม', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col gap-6 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">แดชบอร์ด</h1>
          <p className="text-sm text-slate-500 mt-1">ศูนย์ควบคุม (งวดเดือนเมษายน 2569)</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navToAdmin('createRequest', null)}
            className="flex items-center bg-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            + สร้างคำขอ
          </button>
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--color-bg-ivory)]"></span>
          </div>
          <p className="text-sm font-medium text-slate-600">ศุกร์ 29 พ.ค. 2569</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-start justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navToAdmin('companies')}
          >
            <div>
              <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
              <h3 className="text-3xl font-semibold text-slate-800 mt-2">{kpi.value}</h3>
              <p className="text-xs text-slate-400 mt-1">{kpi.subtitle}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${kpi.bg}`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Progress Donut */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="text-md font-semibold text-slate-800 mb-6">ความคืบหน้าปิดงบ</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Fake SVG donut chart */}
            <svg viewBox="0 0 36 36" className="w-48 h-48 circular-chart transform -rotate-90">
              <path className="text-slate-100 stroke-current" strokeWidth="3" fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[var(--color-primary-emerald)] stroke-current" strokeWidth="3" strokeDasharray={`${progressPercent}, 100`} strokeLinecap="round" fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-800">{progressPercent}%</span>
              <span className="text-sm text-slate-500 mt-1">ส่งครบแล้ว</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary-emerald)]"></span><span className="text-sm text-slate-600">ส่งครบ {completedCount}</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span className="text-sm text-slate-600">กำลังส่ง {inProgressCount}</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span><span className="text-sm text-slate-600">เลยกำหนด {overdueCount}</span></div>
          </div>
        </div>

        {/* Overdue List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-slate-800">รายการเลยกำหนด ({overdueCount})</h3>
            <button className="text-xs text-[var(--color-primary-emerald)] font-medium hover:underline" onClick={() => navToAdmin('companies')}>ดูทั้งหมด</button>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2">
            {companies.filter(c => c.status === 'เลยกำหนด').map((company, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-red-100 bg-red-50/30">
                <div>
                  <p className="font-medium text-slate-800 text-sm mb-1">{company.name}</p>
                  <p className="text-xs text-slate-500">{company.deadline}</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-red-600 bg-red-100/80 px-2 py-1 rounded">
                  เลยกำหนด
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-slate-800">บันทึกกิจกรรมล่าสุด</h3>
            <button className="text-xs text-[var(--color-primary-emerald)] font-medium hover:underline" onClick={() => navToAdmin('notifications')}>ดูทั้งหมด</button>
          </div>
          <div className="space-y-5 overflow-y-auto pr-2">
            {notifications.slice(0, 5).map((notif, i) => {
              let Icon = FileText;
              let bg = "bg-blue-50 text-blue-500";
              if (notif.type === 'overdue') { Icon = AlertCircle; bg = "bg-red-50 text-red-500"; }
              else if (notif.type === 'success') { Icon = CheckCircle2; bg = "bg-emerald-50 text-emerald-500"; }
              else if (notif.type === 'upload') { Icon = CheckCircle2; bg = "bg-blue-50 text-blue-500"; }
              else if (notif.type === 'reject') { Icon = AlertCircle; bg = "bg-red-50 text-red-500"; }
              
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 leading-tight mb-0.5">{notif.message}</p>
                    <p className="text-xs text-slate-500 truncate">{notif.companyName}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time.split(' ')[2]}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
