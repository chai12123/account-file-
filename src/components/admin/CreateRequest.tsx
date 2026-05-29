import React, { useState } from 'react';
import { Send, Copy, Mail, ExternalLink, Calendar as CalendarIcon, Check } from 'lucide-react';
import { ClientCompany, AppState } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface CreateRequestProps {
  companies: ClientCompany[];
  activeCompanyId?: string | null;
  navToAdmin: (screen: AppState['adminScreen'], companyId?: string | null) => void;
  navToClient: (companyId: string) => void;
}

const CATEGORIES = [
  'ใบกำกับภาษีขาย',
  'ใบกำกับภาษีซื้อ',
  'Statement ธนาคาร',
  'บิลค่าใช้จ่าย',
  'เงินเดือนพนักงาน',
  'เอกสารอื่นๆ'
];

export default function CreateRequest({ companies, activeCompanyId, navToAdmin, navToClient }: CreateRequestProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>(activeCompanyId || ''); // Default to pre-selected or empty
  const [selectedCategories, setSelectedCategories] = useState<string[]>(CATEGORIES);
  const [deadline, setDeadline] = useState('2026-05-31');
  const [message, setMessage] = useState('รบกวนส่งเอกสารประจำเดือนเมษายน 2569 ขอบคุณค่ะ');
  
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  const handleGenerate = () => {
    if (!selectedCompany) return; // Must select a company
    const data = {
      companyId: selectedCompany,
      docTypes: selectedCategories,
      deadline,
      message,
      period: 'เมษายน 2569'
    };
    try {
      const code = btoa(encodeURIComponent(JSON.stringify(data)));
      const link = `${window.location.origin}${window.location.pathname}#request=${code}`;
      setGeneratedLink(link);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setCopyToast(true);
      setTimeout(() => { setCopied(false); setCopyToast(false); }, 2000);
    }
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col max-w-7xl mx-auto relative">
      <AnimatePresence>
        {copyToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} 
            animate={{ opacity: 1, y: 0, x: '-50%' }} 
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="absolute top-0 left-1/2 z-50 bg-slate-800 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-3 text-sm"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            คัดลอกลิงก์แล้ว
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">สร้างคำขอเอกสาร</h1>
        <p className="text-sm text-slate-500 mt-1">ส่งลิงก์เพื่อให้ลูกค้าอัปโหลดเอกสารด้วยตนเอง</p>
      </div>

      <div className="flex gap-6 items-start">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 max-w-2xl">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">1. เลือกบริษัทลูกค้า</label>
              <select 
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)] focus:border-transparent text-sm"
              >
                <option value="" disabled>-- กรุณาเลือกบริษัทลูกค้า --</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">2. เลือกหมวดเอกสารที่ต้องการ</label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                      selectedCategories.includes(cat) 
                        ? "bg-[var(--color-primary-emerald)] border-[var(--color-primary-emerald)] text-white" 
                        : "border-slate-300 bg-white group-hover:border-[var(--color-primary-emerald)]"
                    )}>
                      {selectedCategories.includes(cat) && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-sm text-slate-700 select-none group-hover:text-slate-900">{cat}</span>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">3. กำหนดส่ง</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="date" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-slate-700">4. ข้อความถึงลูกค้า (ตัวเลือก)</label>
                <span className="text-xs text-slate-400">{message.length}/500</span>
              </div>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)] resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button 
                onClick={handleGenerate}
                disabled={!selectedCompany}
                className={cn(
                  "w-auto px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm",
                  selectedCompany 
                    ? "bg-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald-hover)] text-white" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                สร้างลิงก์คำขอ
              </button>
            </div>
          </div>

        </div>

        {/* Result Panel */}
        <AnimatePresence>
          {generatedLink && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              className="w-80 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 p-6 flex flex-col"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-emerald-100 text-emerald-600 mb-4 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-center font-semibold text-slate-800 text-lg mb-1">สร้างลิงก์สำเร็จ</h3>
              <p className="text-center text-sm text-slate-600 mb-6">แชร์ลิงก์นี้ให้กับลูกค้าเพื่อเริ่มอัปโหลดเอกสาร</p>

              <div className="bg-white border border-slate-200 rounded-lg flex items-center p-1 hover:border-emerald-300 transition-colors">
                <div className="flex-1 overflow-hidden px-2 py-1">
                  <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-mono truncate block">{generatedLink}</a>
                </div>
                <button onClick={handleCopy} className="bg-slate-50 p-1.5 rounded text-slate-600 hover:text-emerald-600 border border-slate-100 cursor-pointer">
                   {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-4 bg-white/60 p-3 rounded-lg border border-emerald-100 text-xs text-slate-600">
                <p><span className="font-medium text-slate-800">ลิงก์จะหมดอายุ:</span> วันที่กำหนดส่ง</p>
                <p className="mt-1"><span className="font-medium text-slate-800">รายการ:</span> {selectedCategories.length} หมวดเอกสาร</p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Mail className="w-4 h-4 text-slate-500" />
                  ส่งทางอีเมล
                </button>
                <a 
                  href={generatedLink}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-navy)] hover:bg-[var(--color-primary-navy-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  ดูตัวอย่างลิงก์ลูกค้า
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
