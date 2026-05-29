import React, { useState } from 'react';
import { Save, Building, FileCheck, Users, Bell, Link2, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('office');
  const [remindDays, setRemindDays] = useState(3);
  const [lineConnected, setLineConnected] = useState(true);
  const [emailConnected, setEmailConnected] = useState(true);

  const tabs = [
    { id: 'office', label: 'ข้อมูลสำนักงาน', icon: Building },
    { id: 'templates', label: 'เทมเพลตเอกสาร', icon: FileCheck },
    { id: 'team', label: 'ทีมงานผู้ดูแล', icon: Users },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell },
    { id: 'integration', label: 'เชื่อมต่อระบบ', icon: Link2 },
  ];

  const handleSave = () => {
    alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-1">การตั้งค่า (Settings)</h2>
          <p className="text-sm text-slate-500">ปรับแต่งระบบและข้อมูลพื้นฐานของสำนักงานบัญชี</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[var(--color-primary-emerald)] hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Save className="w-4 h-4" /> บันทึกการเปลี่ยนแปลง
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Settings Nav */}
        <div className="w-64 shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 p-2 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive ? "bg-[var(--color-primary-navy)] text-white" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-[var(--color-accent-gold)]" : "text-slate-400")} />
                  {tab.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            
            {activeTab === 'office' && (
              <motion.div key="office" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">ข้อมูลสำนักงานบัญชี</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">ชื่อสำนักงาน</label>
                    <input type="text" defaultValue="Pattarakit Accounting" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">เลขประจำตัวผู้เสียภาษี</label>
                    <input type="text" defaultValue="0105560000000" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">ที่อยู่สำนักงาน</label>
                    <textarea rows={3} defaultValue="123 ถนนสุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'templates' && (
              <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">เทมเพลตหมวดหมู่เอกสารมาตรฐาน</h3>
                <p className="text-sm text-slate-500 mb-4">หมวดหมู่ที่จะแสดงให้ลูกค้าอัปโหลดในค่าเริ่มต้น</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-1">
                  {['รายการเคลื่อนไหวบัญชี (Statement)', 'ใบกำกับภาษีซื้อ/บิลซื้อ', 'ใบกำกับภาษีขาย/บิลขาย', 'เอกสารจ่ายเงินเดือน', 'เอกสารประกันสังคม', 'เอกสารอื่นๆ'].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border-b border-slate-200 last:border-b-0 bg-white rounded shadow-sm mb-1 last:mb-0">
                      <div className="flex items-center gap-3">
                        <div className="cursor-grab text-slate-300">⋮⋮</div>
                        <span className="text-sm font-medium text-slate-700">{cat}</span>
                      </div>
                      <button className="text-xs text-red-500 hover:text-red-700 font-medium">ลบ</button>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-sm font-medium text-[var(--color-primary-emerald)] hover:text-emerald-700">+ เพิ่มหมวดหมู่ใหม่</button>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
                 <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-2">
                   <h3 className="text-lg font-bold text-slate-800">ทีมงานผู้ดูแล</h3>
                   <button className="text-sm font-medium text-[var(--color-primary-emerald)] hover:text-emerald-700">+ เชิญสมาชิก</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                      <img src="https://ui-avatars.com/api/?name=Supawat+S&background=1E7A5E&color=fff" className="w-12 h-12 rounded-full" alt="" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">คุณศุภวัฒน์ ส.</p>
                        <p className="text-xs text-slate-500">ผู้ดูแลระบบ / นักบัญชี</p>
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                      <img src="https://ui-avatars.com/api/?name=Nuttaporn&background=E5E7EB&color=475569" className="w-12 h-12 rounded-full" alt="" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">คุณณัฐพร พ.</p>
                        <p className="text-xs text-slate-500">นักบัญชี</p>
                      </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notifications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
                 <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">การตั้งค่าการแจ้งเตือน</h3>
                 <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1">แจ้งเตือนลูกค้าล่วงหน้าก่อนครบกำหนด (วัน)</label>
                      <p className="text-xs text-slate-500 mb-3">ระบบส่งข้อความอัตโนมัติเตือนลูกค้าทางอีเมล และ LINE ก่อนถึง Deadline</p>
                      <div className="flex items-center gap-4">
                         <input 
                           type="range" 
                           min="1" 
                           max="14" 
                           value={remindDays} 
                           onChange={(e) => setRemindDays(parseInt(e.target.value))}
                           className="flex-1 accent-[var(--color-primary-emerald)]"
                         />
                         <div className="w-16 bg-slate-50 border border-slate-200 rounded p-2 text-center text-sm font-bold text-slate-800">
                            {remindDays} วัน
                         </div>
                      </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'integration' && (
              <motion.div key="integration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
                 <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">เชื่อมต่อระบบภายนอก</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#00B900] text-white rounded-lg flex items-center justify-center font-bold text-xl">L</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">LINE Official Account</p>
                          <p className="text-xs text-slate-500">สำหรับส่งแจ้งเตือนและลิงก์ขอเอกสารเข้า LINE ลูกค้า</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setLineConnected(!lineConnected)}
                        className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5", lineConnected ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600 border border-slate-200")}
                      >
                        {lineConnected ? <><Check className="w-3 h-3"/> เชื่อมต่อแล้ว</> : 'เชื่อมต่อ'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold"><Bell className="w-5 h-5"/></div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">ระบบส่งอีเมล (SMTP/SendGrid)</p>
                          <p className="text-xs text-slate-500">สำหรับส่งสรุปรายงานและแจ้งเตือนเข้าอีเมลลูกค้า</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setEmailConnected(!emailConnected)}
                        className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5", emailConnected ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600 border border-slate-200")}
                      >
                        {emailConnected ? <><Check className="w-3 h-3"/> เชื่อมต่อแล้ว</> : 'เชื่อมต่อ'}
                      </button>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
