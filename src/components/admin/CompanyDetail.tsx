import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder as FolderIcon, MapPin, Phone, Mail, FileCheck, FileX, Clock, UploadCloud, LayoutGrid, List, Plus, Link, Copy, CheckCircle2, History, Check, Building, CreditCard } from 'lucide-react';
import { ClientCompany, AppState } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface CompanyDetailProps {
  companies: ClientCompany[];
  activeCompanyId: string | null;
  navToAdmin: (screen: AppState['adminScreen'], companyId?: string | null) => void;
  navToClient: (companyId: string) => void;
}

export default function CompanyDetail({ companies, activeCompanyId, navToAdmin, navToClient }: CompanyDetailProps) {
  const company = companies.find(c => c.id === activeCompanyId) || companies[0];
  const [activeTab, setActiveTab] = useState('documents');

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

  const tabs = [
    { id: 'documents', label: 'เอกสาร' },
    { id: 'requests', label: 'คำขอ' },
    { id: 'info', label: 'ข้อมูล' },
    { id: 'history', label: 'ประวัติ' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center text-xs text-slate-500 mb-2">
          <button onClick={() => navToAdmin('companies')} className="hover:underline hover:text-slate-800">บริษัทลูกค้า</button>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-slate-800 font-medium">{company.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-800">{company.name}</h1>
            {getStatusChip(company.status)}
            <button 
              onClick={() => navToAdmin('createRequest', company.id)}
              className="ml-2 text-xs bg-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald-hover)] text-white px-3 py-1.5 rounded-lg shadow-sm font-medium transition-colors"
            >
              ขอเอกสาร
            </button>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => navToAdmin('trackRequest', company.id)} className="text-sm text-[var(--color-primary-emerald)] hover:underline">ติดตามคำขอเอกสาร</button>
             <button onClick={() => navToClient(company.id)} className="text-sm text-blue-600 hover:underline">ดูหน้าจอของลูกค้า</button>
             <div className="relative">
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  เมษายน 2569 <ChevronDown className="w-4 h-4 ml-2" />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex-1 flex gap-6 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-6 border-b border-slate-200 mb-4 px-1">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-2.5 text-sm font-medium border-b-2 transition-colors relative",
                  activeTab === tab.id 
                    ? "text-[var(--color-primary-emerald)]" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary-emerald)]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'documents' && (
                <motion.div key="documents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 flex h-full">
                  {/* Tree Sidebar */}
                  <div className="w-56 border-r border-slate-100 p-4 bg-slate-50/50 overflow-y-auto">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Folder Tree</h3>
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
                          {company.docs.map(doc => (
                             <div key={doc.id} className="flex items-center gap-2 text-xs text-slate-600 hover:text-[var(--color-primary-emerald)] cursor-pointer">
                               <FolderIcon className="w-3.5 h-3.5 text-slate-300" />
                               <span className="truncate">{doc.category}</span>
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
                  </div>

                  {/* File Area */}
                  <div className="flex-1 p-6 flex flex-col overflow-y-auto relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-medium text-slate-700">เอกสาร / เมษายน 2569 / ใบกำกับภาษีขาย</h3>
                      <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                         <button className="p-1 rounded bg-white shadow-sm text-slate-700"><LayoutGrid className="w-4 h-4" /></button>
                         <button className="p-1 rounded text-slate-400 hover:text-slate-600"><List className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="border border-slate-200 rounded-lg p-3 hover:border-[var(--color-primary-emerald)] hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center bg-white aspect-[4/5] relative">
                          <div className="w-12 h-14 bg-red-50 relative flex items-center justify-center rounded-sm border border-red-100 mb-3">
                            <span className="text-[10px] font-bold text-red-500 bg-white px-1 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1">PDF</span>
                            <File className="w-8 h-8 text-red-300 absolute" />
                          </div>
                          <p className="text-xs font-medium text-slate-700 w-full text-center truncate px-2">{`ขาย_2569-04-00${i}.pdf`}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{i % 2 === 0 ? '1.2 MB' : '98 KB'}</p>
                          {/* Hover actions */}
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
                  </div>
                </motion.div>
              )}

              {activeTab === 'requests' && (
                <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 flex flex-col p-6 h-full overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-slate-800">ประวัติคำขอคำขอเอกสาร</h3>
                    <button 
                      onClick={() => navToAdmin('createRequest', company.id)}
                      className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> สร้างคำขอใหม่
                    </button>
                  </div>
                  <div className="flex-1 overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500 text-xs border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3 font-medium">งวด</th>
                          <th className="px-5 py-3 font-medium">วันที่สร้าง</th>
                          <th className="px-5 py-3 font-medium">กำหนดส่ง</th>
                          <th className="px-5 py-3 font-medium">สถานะ</th>
                          <th className="px-5 py-3 font-medium">ความคืบหน้า</th>
                          <th className="px-5 py-3 font-medium">ลิงก์</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => navToAdmin('trackRequest', company.id)}>
                          <td className="px-5 py-4 font-medium text-slate-800">เมษายน 2569</td>
                          <td className="px-5 py-4 text-slate-500">18 เม.ย. 2569</td>
                          <td className="px-5 py-4 text-slate-500">{company.deadline}</td>
                          <td className="px-5 py-4">{getStatusChip(company.status)}</td>
                          <td className="px-5 py-4 text-slate-600">{company.docsSubmitted}/{company.totalDocs}</td>
                          <td className="px-5 py-4">
                            <button className="text-slate-400 hover:text-[var(--color-primary-emerald)] p-1" onClick={(e) => { e.stopPropagation(); /* copy link */ }}>
                              <Copy className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => navToAdmin('trackRequest', company.id)}>
                          <td className="px-5 py-4 font-medium text-slate-800">มีนาคม 2569</td>
                          <td className="px-5 py-4 text-slate-500">18 มี.ค. 2569</td>
                          <td className="px-5 py-4 text-slate-500">25 เม.ย. 2569</td>
                          <td className="px-5 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">ปิดแล้ว</span></td>
                          <td className="px-5 py-4 text-slate-600">6/6</td>
                          <td className="px-5 py-4">
                            <button className="text-slate-300 hover:text-slate-500 p-1" onClick={(e) => e.stopPropagation()}>
                              <Copy className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'info' && (
                <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 p-6 h-full overflow-y-auto">
                  <h3 className="text-sm font-semibold text-slate-800 mb-6">ข้อมูลบริษัท</h3>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-3xl">
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">ชื่อบริษัท</p>
                      <p className="text-sm font-medium text-slate-800">{company.name}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">เลขประจำตัวผู้เสียภาษี</p>
                      <p className="text-sm text-slate-800 font-mono">0105556001234</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">ประเภทธุรกิจ</p>
                      <p className="text-sm text-slate-800"><Building className="w-3 h-3 inline-block mr-1 text-slate-400"/> {company.industry}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">แพ็กเกจบัญชี</p>
                      <p className="text-sm text-slate-800"><CreditCard className="w-3 h-3 inline-block mr-1 text-[var(--color-accent-gold)]"/> {company.package}</p>
                    </div>
                    <div className="col-span-2">
                       <p className="text-xs text-slate-500 mb-1">ที่อยู่</p>
                       <p className="text-sm text-slate-800">123/45 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110</p>
                    </div>

                    <div className="col-span-2 border-t border-slate-100 pt-6 mt-2">
                      <h4 className="text-sm font-semibold text-slate-800 mb-4">ข้อมูลผู้ติดต่อ</h4>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">ผู้ติดต่อหลัก</p>
                      <p className="text-sm font-medium text-slate-800">{company.contactName}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">เบอร์โทรศัพท์</p>
                      <p className="text-sm text-slate-800 font-mono">{company.contactPhone}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">อีเมล</p>
                      <p className="text-sm text-slate-800">contact@{company.id}.com</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">LINE ID</p>
                      <p className="text-sm text-slate-800">{company.contactLineId}</p>
                    </div>

                    <div className="col-span-2 border-t border-slate-100 pt-6 mt-2">
                      <h4 className="text-sm font-semibold text-slate-800 mb-4">รายละเอียดบริการ</h4>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">ผู้ดูแล (Account Manager)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <img src={`https://ui-avatars.com/api/?name=${company.accountManager}&background=1E7A5E&color=fff`} className="w-5 h-5 rounded-full" alt="AM" />
                        <p className="text-sm text-slate-800">{company.accountManager}</p>
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">กำหนดส่งเอกสารประจำเดือน</p>
                      <p className="text-sm text-slate-800 pl-1">ทุกวันที่ 25 ของเดือนถัดไป (โดยประมาณ)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 p-6 h-full overflow-y-auto">
                   <h3 className="text-sm font-semibold text-slate-800 mb-6">ประวัติกิจกรรมล่าสุด</h3>
                   <div className="relative border-l border-slate-200 ml-4 space-y-8 max-w-2xl py-2">
                     <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">ตรวจเอกสารงวดเมษายนเสร็จสมบูรณ์</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2"><span>23 พ.ค. 2569 14:05</span> &middot; <span>โดย {company.accountManager}</span></p>
                     </div>
                     <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
                          <UploadCloud className="w-3 h-3 text-blue-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">ลูกค้าส่งเอกสารครบ {company.totalDocs}/{company.totalDocs}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2"><span>22 พ.ค. 2569 09:30</span> &middot; <span>โดย ระบบลูกค้า</span></p>
                     </div>
                     <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center border-2 border-white">
                          <Clock className="w-3 h-3 text-amber-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">ส่งการแจ้งเตือนเตือนกำหนดส่ง</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2"><span>20 พ.ค. 2569 10:00</span> &middot; <span>โดย ระบบอัตโนมัติ</span></p>
                     </div>
                     <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white">
                          <Plus className="w-3 h-3 text-slate-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">สร้างและส่งลิงก์ขอเอกสารงวดเมษายน</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2"><span>18 เม.ย. 2569 11:00</span> &middot; <span>โดย {company.accountManager}</span></p>
                     </div>
                     <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3 h-3 text-slate-400" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">ปิดงวดมีนาคม</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2"><span>25 เม.ย. 2569 15:20</span> &middot; <span>โดย {company.accountManager}</span></p>
                     </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar (Contact & Notes) */}
        <div className="w-72 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">ผู้ติดต่อ</h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${company.contactName.split(' ')[0]}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{company.contactName}</p>
                <p className="text-xs text-slate-500">ติดต่อหลัก</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-xs">{company.contactPhone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center text-white font-bold text-[8px]">L</div>
                <span className="font-mono text-xs">{company.contactLineId}</span>
              </div>
               <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-xs truncate">contact@{company.id}.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex-1 flex flex-col">
             <h3 className="text-sm font-semibold text-slate-800 mb-4">โน้ตภายใน</h3>
             <textarea 
               placeholder="เพิ่มโน้ต..." 
               className="w-full h-24 text-sm bg-slate-50 border border-slate-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-emerald)] mb-3"
             ></textarea>
             
             <div className="flex-1 overflow-y-auto space-y-3 pr-1">
               {company.note && company.note !== '-' && (
                 <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                   <p className="text-xs text-slate-700 leading-relaxed">{company.note}</p>
                   <p className="text-[10px] text-amber-600 mt-2 font-medium">ปักหมุดไว้</p>
                 </div>
               )}
               <div className="border-l-2 border-slate-200 pl-3 py-1">
                 <p className="text-[10px] text-slate-400 mb-1">21 พ.ค. 2569, โดย ณัฐพร</p>
                 <p className="text-xs text-slate-700">ตามเรื่อง ภ.พ.30 ของเดือนก่อน ลูกค้าบอกจะส่งพร้อมเดือนนี้</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

