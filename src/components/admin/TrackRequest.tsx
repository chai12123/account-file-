import React, { useState } from 'react';
import { ChevronRight, FileText, UploadCloud, Bell, CheckCircle2, MessageSquare, Plus, Clock, ExternalLink, Paperclip, AlertCircle, RefreshCw, MoreHorizontal } from 'lucide-react';
import { ClientCompany, AppState } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TrackRequestProps {
  companies: ClientCompany[];
  activeCompanyId: string | null;
  navToAdmin: (screen: AppState['adminScreen'], companyId?: string | null) => void;
}

export default function TrackRequest({ companies, activeCompanyId, navToAdmin }: TrackRequestProps) {
  const company = companies.find(c => c.id === activeCompanyId) || companies[1];
  const [showToast, setShowToast] = useState(false);

  // Status counters
  const total = company.totalDocs;
  const received = company.docs.filter(d => ['รับแล้ว', 'ตรวจแล้ว'].includes(d.status)).length;
  const rejected = company.docs.filter(d => d.status === 'ตีกลับ').length;
  const pending = company.docs.filter(d => d.status === 'รอ').length;
  const progressPct = Math.round((received / total) * 100);

  const handleReminder = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getDocStatusChip = (s: string) => {
    switch(s) {
      case 'ตรวจแล้ว':
        return <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center border border-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" />ตรวจแล้ว</span>;
      case 'รับแล้ว':
        return <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center border border-blue-100"><UploadCloud className="w-3 h-3 mr-1" />รับแล้ว</span>;
      case 'ตีกลับ':
        return <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center border border-red-100"><RefreshCw className="w-3 h-3 mr-1" />ตีกลับ</span>;
      default:
        return <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center"><Clock className="w-3 h-3 mr-1" />รอ</span>;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col max-w-7xl mx-auto relative">
      
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} 
            animate={{ opacity: 1, y: 0, x: '-50%' }} 
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="absolute top-0 left-1/2 z-50 bg-slate-800 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-3 text-sm"
          >
            <Bell className="w-4 h-4 text-emerald-400" />
            ส่งการแจ้งเตือนไปยังลูกค้าเรียบร้อยแล้ว
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center text-xs text-slate-500 mb-2">
            <button onClick={() => navToAdmin('createRequest')} className="hover:underline hover:text-slate-800">คำขอเอกสาร</button>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-slate-800 font-medium">{company.name} - เมษายน 2569</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-800">{company.name} - เมษายน 2569</h1>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium mt-1">กำลังดำเนินการ</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500">สร้างเมื่อ 18 พ.ค. 2569</p>
          <button 
            onClick={handleReminder}
            className="flex items-center gap-2 bg-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ml-2"
          >
            <Bell className="w-4 h-4" /> ส่งการแจ้งเตือน
          </button>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* Progress Overall */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-sm font-semibold text-slate-800">ภาพรวมความคืบหน้า</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{received}/{total}</span>
                <span className="text-lg font-semibold text-slate-400">{progressPct}%</span>
              </div>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full transition-all" style={{ width: `${progressPct}%` }}></div>
              <div className="bg-red-500 h-full transition-all" style={{ width: `${(rejected/total)*100}%` }}></div>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> รับแล้ว {received}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full bg-slate-300"></span> รอ {pending}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> ตีกลับ {rejected}
              </div>
            </div>
          </div>

          {/* Checklist Tree */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-800 p-5 pb-0">รายการเอกสารที่ขอ</h3>
            <div className="p-0 mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs border-y border-slate-200">
                  <tr>
                    <th className="px-5 py-3 font-medium">#</th>
                    <th className="px-5 py-3 font-medium">หมวดเอกสาร</th>
                    <th className="px-5 py-3 font-medium">สถานะ</th>
                    <th className="px-5 py-3 font-medium">ไฟล์ที่อัปโหลด</th>
                    <th className="px-5 py-3 font-medium text-right">วันที่อัปโหลด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {company.docs.map((doc, i) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-5 py-4 text-slate-400">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-slate-700">{doc.category}</td>
                      <td className="px-5 py-4">{getDocStatusChip(doc.status)}</td>
                      <td className="px-5 py-4">
                        {doc.fileName ? (
                           <div className="flex flex-col">
                             <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 hover:underline">
                               <Paperclip className="w-3.5 h-3.5 mr-1" />
                               <span className="truncate max-w-[150px]">{doc.fileName}</span>
                             </a>
                             {doc.status === 'ตีกลับ' && Math.random() > 0.5 && ( // Mock the blurry image reject reason directly here for layout context
                               <span className="text-[10px] text-red-500 mt-1 flex items-center">
                                 <AlertCircle className="w-3 h-3 mr-1" /> {doc.rejectionReason || "ภาพเบลอ อ่านไม่ออก"}
                               </span>
                             )}
                           </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right text-slate-500">{doc.uploadedAt || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /> ข้อความจากลูกค้า</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm text-slate-600 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300"></div>
                <p>"กำลังเร่งรวบรวมส่วนที่เหลือให้อยู่นะคะ น่าจะส่งครบภายในพรุ่งนี้ค่ะ ขออภัยที่ล่าช้า"</p>
                <div className="mt-2 text-[10px] text-slate-400">— คุณนัท (20 พ.ค. 2569 เวลา 14:30)</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-semibold text-slate-800">โน้ตภายใน</h3>
                 <button className="text-xs bg-[var(--color-primary-emerald)] text-white px-2 py-1 rounded font-medium flex items-center"><Plus className="w-3 h-3 mr-1"/> เพิ่มโน้ต</button>
              </div>
              <textarea 
                className="w-full text-sm border border-slate-200 rounded p-2 text-slate-600 bg-slate-50 focus:outline-none focus:border-[var(--color-primary-emerald)] resize-none"
                rows={2}
                placeholder="พิมพ์โน้ตตรงนี้..."
              ></textarea>
            </div>
          </div>

        </div>

        {/* Timeline Right Rail */}
        <div className="w-72 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-full sticky top-0">
          <h3 className="text-sm font-semibold text-slate-800 mb-6">ไทม์ไลน์เตือนความจำ</h3>
          
          <div className="relative border-l border-slate-200 ml-3 space-y-6 flex-1 overflow-y-auto pr-2 pb-6">
            
            {/* Timeline Item 1 */}
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-50"></span>
              <p className="text-xs font-semibold text-slate-800 mb-0.5">ส่งคำขอสำเร็จ</p>
              <p className="text-[10px] text-slate-500">โดย ศุภวัฒน์ ส.</p>
              <p className="text-[10px] text-slate-400 mt-1">18 พ.ค. 2569 10:30</p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-50"></span>
              <p className="text-xs font-semibold text-slate-800 mb-0.5">การแจ้งเตือนอัตโนมัติ 1</p>
              <p className="text-[10px] text-slate-500">ระบบส่งอีเมล</p>
              <p className="text-[10px] text-slate-400 mt-1">20 พ.ค. 2569 09:15</p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white ring-2 ring-red-50"></span>
              <p className="text-xs font-semibold text-slate-800 mb-0.5">ตีกลับเอกสาร 1 รายการ</p>
              <p className="text-[10px] text-slate-500">โดย ศุภวัฒน์ ส.</p>
              <p className="text-[10px] text-slate-400 mt-1">20 พ.ค. 2569 14:22</p>
            </div>

            {/* Future Item */}
            <div className="relative pl-6 opacity-60 pt-4">
              <span className="absolute -left-[5px] top-[22px] w-2.5 h-2.5 rounded-full border-2 border-amber-400 bg-white"></span>
              <p className="text-xs font-semibold text-slate-500 mb-0.5">กำหนดการเตือนครั้งถัดไป</p>
              <p className="text-[10px] text-slate-400 mt-1">22 พ.ค. 2569 (ถ้ายังส่งไม่ครบ)</p>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
