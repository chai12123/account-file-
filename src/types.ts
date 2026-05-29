export type DocStatus = "รับแล้ว" | "ตรวจแล้ว" | "รอ" | "ตีกลับ";
export type CompanyStatus = "ส่งครบ-ตรวจแล้ว" | "ส่งครบ-รอตรวจ" | "กำลังส่ง" | "เลยกำหนด" | "ยังไม่เริ่ม";

export interface DocItem {
  id: string;
  category: string;
  status: DocStatus;
  fileName?: string;
  fileSize?: string;
  rejectionReason?: string;
  uploadedAt?: string;
}

export interface ClientCompany {
  id: string;
  name: string;
  industry: string;
  package: "Starter" | "Pro" | "Growth";
  status: CompanyStatus;
  docsSubmitted: number;
  totalDocs: number;
  deadline: string;
  accountManager: string;
  contactName: string;
  contactPhone: string;
  contactLineId: string;
  docs: DocItem[];
  note: string;
}

export interface NotificationItem {
  id: string;
  type: "overdue" | "alert" | "reject" | "upload" | "success" | "warning";
  companyName: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface RequestData {
  companyId: string;
  docTypes: string[];
  deadline: string;
  message: string;
  period: string;
}

export interface AppState {
  view: "admin" | "client";
  adminScreen: "dashboard" | "companies" | "companyDetail" | "createRequest" | "trackRequest" | "notifications" | "documents" | "calendar" | "reports" | "settings";
  activeCompanyId: string | null;
  clientDocState: "initial" | "uploading" | "success";
  requestData?: RequestData;
}
