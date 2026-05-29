import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Filter } from 'lucide-react';
import { ClientCompany, AppState } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface CompaniesProps {
  companies: ClientCompany[];
  navToAdmin: (screen: AppState['adminScreen'], companyId?: string | null) => void;
}

export default function Companies({ companies, navToAdmin }: CompaniesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'ส่งครบ-ตรวจแล้ว':
      case 'ส่งครบ-รอตรวจ':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">ส่งครบแล้ว</span>;
      case 'กำลังส่ง':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">กำลังส่ง</span>;
      case 'เลยกำหนด':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">เลยกำหนด</span>;
      case 'ยังไม่เริ่ม':
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">ยังไม่เริ่ม</span>;
    }
  };

  const getProgressBar = (submitted: number, total: number, status: string) => {
    const pct = (submitted / total) * 100;
    let color = 'bg-slate-200';
    if (status.includes('ส่งครบ')) color = 'bg-emerald-500';
    else if (status === 'เลยกำหนด') color = 'bg-red-500';
    else if (status === 'กำลังส่ง') color = 'bg-amber-500';

    return (
      <div className="flex items-center gap-3">
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }}></div>
        </div>
        <span className="text-xs font-medium text-slate-600">{submitted}/{total}</span>
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">บริษัทลูกค้า</h1>
          <p className="text-sm text-slate-500 mt-1">รายชื่อบริษัทสถานะการส่งเอกสารรายเดือน</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาบริษัท..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)] focus:border-transparent w-64"
            />
          </div>
          <button className="flex items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-600" />
          </button>
          <button className="flex items-center gap-2 bg-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            เพิ่มบริษัท
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ชื่อบริษัท</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ธุรกิจ</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ความคืบหน้า</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">กำหนดส่ง</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ผู้ดูแล</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-right">การกระทำ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((company, index) => (
                <tr 
                  key={company.id} 
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navToAdmin('companyDetail', company.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-slate-800">{company.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusChip(company.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getProgressBar(company.docsSubmitted, company.totalDocs, company.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company.deadline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">{company.accountManager}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navToAdmin('createRequest', company.id); }}
                      className="text-xs text-[var(--color-primary-emerald)] bg-emerald-50 hover:bg-emerald-100 rounded px-2 py-1 font-medium transition-colors"
                    >
                      + ขอเอกสาร
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center p-1">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={8} className="px-6 py-12 text-center text-slate-500 text-sm">ไม่พบบริษัทที่ค้นหา</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">แสดง {filtered.length} จาก {companies.length} รายการ</p>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-slate-200 rounded text-slate-500 text-xs bg-white cursor-not-allowed opacity-50">&lt;</button>
            <button className="px-2.5 py-1 border border-[var(--color-primary-emerald)] bg-[var(--color-primary-emerald)] rounded text-white text-xs">1</button>
            <button className="px-2 py-1 border border-slate-200 rounded text-slate-500 text-xs bg-white cursor-not-allowed opacity-50">&gt;</button>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
