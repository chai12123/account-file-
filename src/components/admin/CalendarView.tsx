import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { ClientCompany } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface CalendarViewProps {
  companies: ClientCompany[];
}

export default function CalendarView({ companies }: CalendarViewProps) {
  // simple mock for May 2026 (พฤษภาคม 2569)
  const daysInMonth = 31;
  const startDayOfWeek = 5; // Friday 1st May 2026
  
  const mockDeadlines = [
    { date: 20, name: "บริษัท บ้านสวย จำกัด", status: "success" },
    { date: 25, name: "บจก. กรีนการ์เด้น", status: "warning" },
    { date: 25, name: "หจก. รุ่งเรืองก่อสร้าง", status: "danger" },
    { date: 25, name: "หจก. ครัวคุณยาย", status: "danger" },
    { date: 28, name: "สปา ลีลาวดี", status: "warning" },
    { date: 28, name: "ครีเอทีฟ มีเดีย กรุ๊ป", status: "warning" },
    { date: 31, name: "บมจ. สมาร์ทเทค โซลูชั่น", status: "default" },
    { date: 31, name: "ช้อปปี้เดย์ ออนไลน์", status: "default" },
  ];

  const upcomingDeadlines = [
    ...mockDeadlines,
    { date: 33, name: "เอเชีย อิมพอร์ต", status: "default" }, // 2 มิ.ย. map to May 33 for sorting simple
    { date: 36, name: "ไทยเฮิร์บ โปรดักส์", status: "default" }, // 5 มิ.ย.
  ].sort((a,b) => a.date - b.date);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'danger': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'success': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-1">ปฏิทินงาน (Calendar)</h2>
          <p className="text-sm text-slate-500">ดูภาพรวมกำหนดการส่งเอกสารของลูกค้าทั้งหมด</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Calendar Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">พฤษภาคม 2569</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">วันนี้</button>
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-200 text-xs font-semibold text-slate-500 bg-slate-50">
              {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map((day, i) => (
                <div key={day} className="p-2.5 text-center border-r border-slate-200 last:border-r-0">{day}</div>
              ))}
            </div>
            <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-slate-200 gap-px">
              {Array.from({ length: 35 }).map((_, i) => {
                const date = i - startDayOfWeek + 1;
                const isCurrentMonth = date > 0 && date <= daysInMonth;
                const displayDate = isCurrentMonth ? date : (date <= 0 ? 30 + date : date - daysInMonth); // simple mock for prev/next month
                
                const dayEvents = isCurrentMonth ? mockDeadlines.filter(m => m.date === date) : [];
                const isToday = isCurrentMonth && date === 18;

                return (
                  <div key={i} className={cn("bg-white p-2 flex flex-col", !isCurrentMonth && "bg-slate-50/50 text-slate-400")}>
                    <div className="flex items-start justify-between">
                      <span className={cn(
                        "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full leading-none",
                        isToday ? "bg-[var(--color-primary-navy)] text-white" : "",
                        !isCurrentMonth ? "text-slate-400" : "text-slate-700"
                      )}>
                        {displayDate}
                      </span>
                    </div>
                    <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
                      {dayEvents.map((evt, idx) => (
                        <div key={idx} className={cn("text-[10px] px-1.5 py-0.5 rounded border truncate flex items-center gap-1.5", getStatusColor(evt.status))}>
                          <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", getStatusDot(evt.status))} />
                          <span className="truncate">{evt.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming List Side */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-accent-gold)]" /> กำหนดส่งที่กำลังจะถึง
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <div className="space-y-4">
                {upcomingDeadlines.map((evt, idx) => {
                  let dateStr = evt.date <= 31 ? `${evt.date} พ.ค. 2569` : `${evt.date - 31} มิ.ย. 2569`;
                  const isPast = evt.date < 18;
                  const isToday = evt.date === 18;

                  return (
                    <div key={idx} className="flex gap-3 relative">
                      <div className="w-12 text-right pt-0.5">
                        <div className={cn("text-xs font-bold leading-tight", isPast ? "text-slate-400" : (isToday ? "text-[var(--color-primary-emerald)]" : "text-slate-700"))}>{evt.date <= 31 ? evt.date : evt.date - 31}</div>
                        <div className="text-[10px] text-slate-500">{evt.date <= 31 ? 'พ.ค.' : 'มิ.ย.'}</div>
                      </div>
                      
                      <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-slate-800 truncate pr-2">{evt.name}</p>
                          <div className={cn("w-2 h-2 rounded-full", getStatusDot(evt.status))} />
                        </div>
                        <p className="text-[10px] text-slate-500">{isPast ? 'เลยกำหนดแล้ว' : 'รอส่งเอกสาร'}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
