import React, { useState } from 'react';
import { Search, Folder as FolderIcon, ChevronDown, ChevronRight, File, LayoutGrid, List, UploadCloud, DownloadCloud, Building2 } from 'lucide-react';
import { ClientCompany } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentsProps {
  companies: ClientCompany[];
}

export default function Documents({ companies }: DocumentsProps) {
  const [activeCompanyId, setActiveCompanyId] = useState<string>(companies[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCompany = companies.find(c => c.id === activeCompanyId);
  const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDownloadZip = () => {
    alert('กำลังเริ่มดาวน์โหลดไฟล์ทั้งหมดในงวดนี้ (ZIP)...');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-1">คลังเอกสาร (Documents)</h2>
          <p className="text-sm text-slate-500">จัดการและเรียกดูเอกสารของบริษัทลูกค้าทั้งหมดที่นี่</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex overflow-hidden">
        {/* Left Sidebar - Company Selector */}
        <div className="w-64 border-r border-slate-200 bg-slate-50/50 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหาบริษัท..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredCompanies.map(company => (
              <button
                key={company.id}
                onClick={() => setActiveCompanyId(company.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-3 transition-colors",
                  activeCompanyId === company.id 
                    ? "bg-[var(--color-primary-emerald)]/10 text-[var(--color-primary-emerald)] font-medium" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Building2 className={cn("w-4 h-4", activeCompanyId === company.id ? "text-[var(--color-primary-emerald)]" : "text-slate-400")} />
                <span className="truncate">{company.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Middle Sidebar - Folder Tree */}
        <div className="w-56 border-r border-slate-100 p-4 bg-white overflow-y-auto hidden md:block">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">แฟ้มเอกสาร</h3>
          {activeCompany ? (
             <div className="space-y-1">
               <div className="flex items-center gap-2 text-sm text-slate-700">
                 <FolderIcon className="w-4 h-4 text-amber-400" />
                 <span>2569</span>
               </div>
               <div className="pl-4 mt-1 space-y-1">
                 <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-slate-800">
                   <ChevronDown className="w-3 h-3 text-slate-400" />
                   <FolderIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                   <span>เมษายน 2569</span>
                 </div>
                 <div className="pl-6 space-y-2 mt-2">
                   {/* Standard 6 categories */}
                   {['รายการเคลื่อนไหวบัญชี (Statement)', 'ใบกำกับภาษีซื้อ/บิลซื้อ', 'ใบกำกับภาษีขาย/บิลขาย', 'เอกสารจ่ายเงินเดือน', 'เอกสารประกันสังคม', 'เอกสารอื่นๆ'].map((cat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 hover:text-[var(--color-primary-emerald)] cursor-pointer">
                        <FolderIcon className="w-3.5 h-3.5 text-slate-300" />
                        <span className="truncate">{cat}</span>
                      </div>
                   ))}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                   <ChevronRight className="w-3 h-3 text-slate-400" />
                   <FolderIcon className="w-4 h-4 text-slate-300" />
                   <span>มีนาคม 2569</span>
                 </div>
               </div>
             </div>
          ) : (
            <p className="text-sm text-slate-400">กรุณาเลือกบริษัท</p>
          )}
        </div>

        {/* Main Content - File Grid */}
        <div className="flex-1 p-6 flex flex-col overflow-y-auto bg-slate-50/30">
          {activeCompany ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700">{activeCompany.name} / เอกสาร / เมษายน 2569 / ใบกำกับภาษีขาย</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleDownloadZip} className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary-emerald)] bg-[var(--color-primary-emerald)]/10 px-3 py-1.5 rounded-lg hover:bg-[var(--color-primary-emerald)]/20 transition-colors">
                    <DownloadCloud className="w-4 h-4" /> ดาวน์โหลดทั้งงวด (ZIP)
                  </button>
                  <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-white">
                     <button className="p-1 rounded bg-slate-100 shadow-sm text-slate-700"><LayoutGrid className="w-4 h-4" /></button>
                     <button className="p-1 rounded text-slate-400 hover:text-slate-600"><List className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="border border-slate-200 rounded-lg p-3 hover:border-[var(--color-primary-emerald)] hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center bg-white aspect-[4/5] relative">
                    <div className="w-12 h-14 bg-red-50 relative flex items-center justify-center rounded-sm border border-red-100 mb-3">
                      <span className="text-[10px] font-bold text-red-500 bg-white px-1 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1">PDF</span>
                      <File className="w-8 h-8 text-red-300 absolute" />
                    </div>
                    <p className="text-xs font-medium text-slate-700 w-full text-center truncate px-2">{`ขาย_2569-04-00${i}.pdf`}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{i % 2 === 0 ? '1.2 MB' : '98 KB'}</p>
                    <div className="absolute inset-0 bg-slate-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button className="bg-white text-slate-800 text-xs font-medium px-3 py-1.5 rounded shadow-sm hover:bg-slate-50">ดูตัวอย่าง</button>
                    </div>
                  </div>
                ))}

                {/* Upload Placeholder */}
                <div className="border border-dashed border-slate-300 rounded-lg p-3 hover:border-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald)]/5 transition-all cursor-pointer flex flex-col items-center justify-center bg-slate-50 aspect-[4/5]">
                  <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-xs font-medium text-slate-600">อัปโหลดไฟล์</p>
                  <p className="text-[9px] text-slate-400 mt-1">หรือลากไฟล์มาวาง</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <FolderIcon className="w-16 h-16 mb-4 text-slate-200" />
              <p>เลือกบริษัทเพื่อดูเอกสาร</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
