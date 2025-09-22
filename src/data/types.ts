export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  description?: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export interface DashboardData {
  metrics: MetricCardData[];
  lastUpdated: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'pending' | 'inactive';
  avatar?: string;
}

export interface FinancialData {
  revenue: number;
  costs: number;
  profit: number;
  projectedRevenue: number[];
  projectedCosts: number[];
  months: string[];
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved';
  mitigation?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
}