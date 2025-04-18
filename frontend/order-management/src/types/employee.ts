export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string; // Primary role ID
  status: string;
  team?: string;
  avatar?: string;
  startDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  lastActivity?: {
    time: string;
    action: string;
  };
  performance?: {
    orderConfirmationRate: number;
    callSuccessRate: number;
    upsellRate: number;
    avgConfirmationTime: number;
  };
  compensation?: {
    baseSalary: number;
    bonuses: number;
    totalEarnings: number;
  };
}
