import React, { useState } from 'react';
import { ShieldCheck, CloudUpload, Check, X, FileText, UploadCloud, MessageCircle, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ClientCompany, AppState } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ClientAppProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  company: ClientCompany;
  onClose: () => void;
}

export default function ClientApp({ appState, setAppState, company, onClose }: ClientAppProps) {
  const { requestData } = appState;
  
  const [docState, setDocState] = useState<AppState['clientDocState']>(
    requestData ? 'initial' : (company.status === 'ส่งครบ-รอตรวจ' || company.status === 'ส่งครบ-ตรวจแล้ว' ? 'success' : company.docsSubmitted > 0 ? 'uploading' : 'initial')
  );

  const initialDocs = requestData 
    ? requestData.docTypes.map((cat, i) => ({
        id: `fresh_${i}`,
        category: cat,
        status: 'รอ' as const,
        localStatus: 'pending' as const
      }))
    : company.docs.map(d => ({
        ...d,
        localStatus: d.status === 'รอ' ? 'pending' : (d.status === 'ตีกลับ' ? 'rejected' : 'uploaded'),
      }));

  const [localDocs, setLocalDocs] = useState(initialDocs);

  const total = localDocs.length;
  const deadlineStr = requestData ? requestData.deadline : company.deadline;
  const periodStr = requestData ? requestData.period : "เมษายน 2569";

  const handleSimulateUpload = (docId: string) => {
    setLocalDocs(prev => prev.map(d => {
      if (d.id === docId) {
         return {
           ...d,
           localStatus: 'uploaded',
           fileName: d.fileName || `IMG_${Math.floor(Math.random()*9000)+1000}.jpg`,
           fileSize: d.fileSize || '2.4 MB'
         };
      }
      return d;
    }));
    
    // Automatically transition to 'uploading' view state
    if (docState === 'initial') {
      setDocState('uploading');
    }
  };

  const remaining = localDocs.filter(d => d.localStatus !== 'uploaded').length;
  const isComplete = remaining === 0;

  const handleSubmitAll = () => {
    setDocState('success');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center font-sans py-10 relative px-4">
      
      {/* Mock "Close Viewer" button for the previewer */}
      <button 
         onClick={onClose}
         className="absolute top-4 left-4 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium z-50 hover:bg-slate-700 shadow-md flex items-center gap-2"
      >
        <X className="w-4 h-4" /> <span>จำลอง: กลับสู่หน้า Admin</span>
      </button>

      {/* Mobile Frame Container */}
      <div className="w-full max-w-[400px] min-h-[800px] bg-white rounded-[40px] shadow-2xl relative overflow-hidden border-8 border-slate-800 flex flex-col">
        
        {/* Dynamic Island Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
        </div>

        {/* --- Header --- */}
        <div className="pt-12 px-6 pb-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#C9A86A] flex items-center justify-center text-[#0F1B2D] font-bold text-xl font-serif">P</div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-800">PATTARAKIT</p>
              <p className="text-[8px] tracking-[0.2em] text-slate-500 uppercase">Accounting</p>
            </div>
          </div>
          <ShieldCheck className="w-5 h-5 text-slate-400" />
        </div>

        {/* --- Main Content Area --- */}
        <div className="flex-1 overflow-y-auto w-full relative bg-slate-50">
          <AnimatePresence mode="wait">
            
            {/* SUCCESS STATE */}
            {docState === 'success' && (
               <motion.div 
                 key="success"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-6 flex flex-col items-center pt-16 bg-white min-h-full"
               >
                 <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative">
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                     <Check className="w-12 h-12 text-emerald-600 stroke-[3]" />
                   </motion.div>
                   {/* Confetti specs */}
                   <span className="absolute top-0 -right-4 text-emerald-300 text-2xl">+</span>
                   <span className="absolute bottom-4 -left-6 text-amber-300 text-xl">✨</span>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800 mb-2">ได้รับเอกสารเรียบร้อย</h2>
                 <p className="text-emerald-600 font-medium mb-10 text-lg">ขอบคุณค่ะ!</p>

                 <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 w-full">
                    <p className="text-xs text-slate-500 mb-1">ส่งเมื่อ</p>
                    <p className="text-sm font-medium text-slate-800 mb-4">29 พ.ค. 2569, 10:42 AM</p>

                    <p className="text-xs text-slate-500 mb-1">บริษัท</p>
                    <p className="text-sm font-medium text-slate-800 mb-4">{company.name}</p>

                    <p className="text-xs text-slate-500 mb-1">ผู้ส่ง</p>
                    <p className="text-sm font-medium text-slate-800 mb-6">{company.contactName.split(' ')[0]}</p>

                    <div className="border-t border-slate-200 pt-4">
                       <p className="text-xs text-slate-600 mb-3">สรุปเอกสาร (6 รายการ)</p>
                       <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                         {localDocs.map(d => (
                           <div key={d.id} className="flex items-center gap-1.5 line-clamp-1">
                             <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                             <span className="text-xs text-slate-700 truncate">{d.category}</span>
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>

                 <p className="text-xs text-slate-500 mt-6 text-center leading-relaxed">
                   ทีมงานจะตรวจสอบเอกสารของท่านและแจ้งให้ทราบหากต้องการข้อมูลเพิ่มเติม
                 </p>

                 <a href="#" className="mt-8 w-full bg-[#00B900] text-white flex items-center justify-center gap-2 py-4 rounded-xl font-medium shadow-md shadow-green-200 hover:bg-[#009900] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    แชทกับเราทาง LINE
                 </a>
               </motion.div>
            )}

            {/* UPLOADING / INITIAL STATE */}
            {docState !== 'success' && (
               <motion.div 
                 key="upload"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="p-6 bg-white min-h-full flex flex-col"
               >
                 <h1 className="text-xl font-bold text-slate-800 mb-1">ส่งเอกสาร – {periodStr}</h1>
                 <p className="text-sm text-slate-600 mb-4">{company.name}</p>
                 <div className="flex items-center gap-2 text-sm text-amber-600 font-medium mb-6 bg-amber-50 px-3 py-2 rounded-lg">
                   <span>กำหนดส่ง: {deadlineStr}</span> 
                   <span className="opacity-75">(ในอีก 2 วัน)</span>
                 </div>

                 {/* Progress Stats */}
                 <div className="bg-slate-50 p-4 rounded-xl mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-sm font-semibold text-slate-800">ความคืบหน้า</p>
                      <p className="text-sm font-bold text-slate-800">{total - remaining} / {total}</p>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full bg-[var(--color-primary-emerald)]"
                         initial={{ width: 0 }}
                         animate={{ width: `${((total-remaining)/total)*100}%` }}
                       />
                    </div>
                 </div>

                 <p className="text-sm font-medium text-slate-700 mb-4">รายการเอกสารที่ต้องใช้:</p>

                 {/* Document List */}
                 <div className="space-y-3 pb-24">
                   {localDocs.map((doc, idx) => (
                      <div key={doc.id} className={cn(
                        "p-4 rounded-xl border transition-all",
                        doc.localStatus === 'uploaded' ? "bg-white border-emerald-200 shadow-sm" :
                        doc.localStatus === 'rejected' ? "bg-red-50 border-red-200" :
                        "bg-white border-slate-200"
                      )}>
                        <div className="flex items-center justify-between gap-3">
                           <div className="flex items-center gap-3 min-w-0">
                              <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                                doc.localStatus === 'uploaded' ? "bg-emerald-100 text-emerald-700" :
                                doc.localStatus === 'rejected' ? "bg-red-100 text-red-600" :
                                "bg-slate-100 text-slate-500"
                              )}>
                                {idx + 1}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{doc.category}</p>
                                <p className="text-xs text-slate-500">{periodStr}</p>
                              </div>
                           </div>
                           
                           {/* Action / State Area */}
                           <div className="shrink-0 flex items-center gap-2">
                             {doc.localStatus === 'uploaded' ? (
                                <>
                                  <div className="flex items-center bg-slate-50 rounded pl-1 pr-2 py-1 border border-slate-100 max-w-[120px]">
                                    <div className="bg-red-50 text-[8px] font-bold text-red-500 px-1 py-[1px] border border-red-100 rounded mr-1">PDF</div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-[10px] text-slate-700 truncate block w-16">{doc.fileName}</span>
                                      <span className="text-[8px] text-slate-400">{doc.fileSize}</span>
                                    </div>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm cursor-pointer" onClick={() => {
                                      // Revert for demo purposes
                                      setLocalDocs(prev => prev.map(d => d.id === doc.id ? {...d, localStatus: 'pending'} : d));
                                  }}>
                                    <Check className="w-4 h-4" />
                                  </div>
                                </>
                             ) : doc.localStatus === 'rejected' ? (
                                <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0 shadow-sm" onClick={() => handleSimulateUpload(doc.id)}>
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                             ) : (
                               <button 
                                 onClick={() => handleSimulateUpload(doc.id)}
                                 className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm"
                               >
                                 <CloudUpload className="w-4 h-4" /> อัปโหลด
                               </button>
                             )}
                           </div>
                        </div>

                        {/* Reject Message row */}
                        {doc.localStatus === 'rejected' && (
                          <div className="mt-3 text-xs text-red-600 font-medium flex items-center bg-white p-2 rounded border border-red-100">
                             <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                             {doc.rejectionReason || "กรุณาส่งใหม่: ภาพเบลอ อ่านไม่ออก"}
                          </div>
                        )}
                        
                      </div>
                   ))}
                 </div>

                 {/* Submit Button Sticky Area */}
                 <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
                   {isComplete ? (
                     <motion.button 
                       initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                       onClick={handleSubmitAll}
                       className="w-full py-4 bg-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-emerald-hover)] text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-colors"
                     >
                       ส่งเอกสารทั้งหมด
                     </motion.button>
                   ) : (
                     <div className="w-full py-4 bg-slate-100 text-slate-400 font-bold rounded-xl text-center">
                       กรุณาอัปโหลดเอกสารให้ครบ
                     </div>
                   )}
                 </div>
               </motion.div>
            )}
            
          </AnimatePresence>
        </div>

        {/* Footer Area */}
        <div className="h-10 bg-white border-t border-slate-100 flex items-center justify-center shrink-0">
           <p className="text-[10px] text-slate-400 flex items-center gap-1">
             <ShieldCheck className="w-3 h-3" /> ไฟล์ของคุณปลอดภัยและเข้ารหัส
           </p>
        </div>
      </div>
    </div>
  );
}
