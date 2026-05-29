import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { ClientCompany } from '../../types';

interface ReportsProps {
  companies: ClientCompany[];
}

const barData = [
  { name: 'พ.ย.', value: 65 },
  { name: 'ธ.ค.', value: 68 },
  { name: 'ม.ค.', value: 75 },
  { name: 'ก.พ.', value: 72 },
  { name: 'มี.ค.', value: 80 },
  { name: 'เม.ย.', value: 85 },
];

const pieData = [
  { name: 'ปิดงบเสร็จแล้ว', value: 60, color: '#10B981' }, // 60%
  { name: 'รอเอกสาร/กำลังดำเนินการ', value: 40, color: '#F1F5F9' },
];

export default function Reports({ companies }: ReportsProps) {
  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-1">รายงานสถิติ (Reports)</h2>
          <p className="text-sm text-slate-500">ภาพรวมเชิงวิเคราะห์ของประสิทธิภาพการส่งเอกสาร</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">อัตราส่งตรงเวลาเดือนนี้</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-800">70%</h3>
              <span className="text-xs text-slate-400 font-medium">(7/10 บริษัท)</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">บริษัทที่ส่งเลท</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-800">2</h3>
              <span className="text-xs text-slate-400 font-medium">บริษัท</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">เฉลี่ยเวลาที่ใช้ส่งเอกสาร</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-800">6</h3>
              <span className="text-xs text-slate-400 font-medium">วัน</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-sm font-bold text-slate-800">อัตราส่งตรงเวลา 6 เดือนย้อนหลัง (%)</h3>
             <select className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-600">
               <option>6 เดือนล่าสุด</option>
               <option>ปีนี้</option>
             </select>
           </div>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                 <RechartsTooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="value" fill="var(--color-primary-navy)" radius={[4, 4, 0, 0]} barSize={32} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
           <h3 className="text-sm font-bold text-slate-800 mb-6">ความคืบหน้าปิดงบ งวด เม.ย. 2569</h3>
           <div className="flex items-center justify-center h-[250px] relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={pieData}
                   innerRadius={80}
                   outerRadius={105}
                   paddingAngle={2}
                   dataKey="value"
                   stroke="none"
                 >
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <RechartsTooltip />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-3xl font-bold text-slate-800">60%</span>
               <span className="text-xs text-slate-500 font-medium">ปิดงบเสร็จแล้ว</span>
             </div>
           </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800">บริษัทที่ส่งเลทบ่อย (Top Late Submitters)</h3>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-xs border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 font-medium">ชื่อบริษัท</th>
              <th className="px-5 py-3 font-medium text-center">ส่งเลทใน 6 เดือน</th>
              <th className="px-5 py-3 font-medium text-center">ล่าช้าเฉลี่ย (วัน)</th>
              <th className="px-5 py-3 font-medium">ผู้ติดต่อ</th>
              <th className="px-5 py-3 font-medium">ผู้ดูแล</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-5 py-3 font-medium text-slate-800">หจก. รุ่งเรืองก่อสร้าง</td>
              <td className="px-5 py-3 text-center">
                 <span className="inline-flex items-center justify-center bg-red-100 text-red-700 font-bold w-6 h-6 rounded-full text-xs">4</span>
              </td>
              <td className="px-5 py-3 text-center text-slate-600">8.5</td>
              <td className="px-5 py-3 text-slate-500">คุณสมชาย</td>
              <td className="px-5 py-3 text-slate-600">คุณณัฐพร</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-5 py-3 font-medium text-slate-800">หจก. ครัวคุณยาย</td>
              <td className="px-5 py-3 text-center">
                 <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 font-bold w-6 h-6 rounded-full text-xs">3</span>
              </td>
              <td className="px-5 py-3 text-center text-slate-600">4.2</td>
              <td className="px-5 py-3 text-slate-500">คุณวิภา</td>
              <td className="px-5 py-3 text-slate-600">คุณศุภวัฒน์</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
