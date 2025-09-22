import { MetricCardData, TeamMember, FinancialData, Risk, ActionItem } from './types';

export const dashboardMetrics: MetricCardData[] = [
  {
    title: 'Total Investment Required',
    value: '$1.65M',
    change: 'Secured funding',
    changeType: 'increase',
    icon: 'DollarSign',
    color: 'primary'
  },
  {
    title: 'Projected Year 3 Revenue',
    value: '$5.5M',
    change: '+450% growth',
    changeType: 'increase',
    icon: 'TrendingUp',
    color: 'success'
  },
  {
    title: 'Target Customers (Year 1)',
    value: '20',
    change: 'Pilot customers',
    changeType: 'increase',
    icon: 'Users',
    color: 'primary'
  },
  {
    title: 'Team Size',
    value: '11',
    change: 'Cross-functional',
    changeType: 'increase',
    icon: 'UserPlus',
    color: 'warning'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    department: 'Product',
    status: 'active'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Lead Developer',
    department: 'Engineering',
    status: 'active'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    department: 'Design',
    status: 'pending'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Sales Director',
    department: 'Sales',
    status: 'active'
  }
];

export const financialData: FinancialData = {
  revenue: 8200000,
  costs: 3800000,
  profit: 4400000,
  projectedRevenue: [1200000, 1800000, 2400000, 3200000, 4100000, 5200000],
  projectedCosts: [800000, 1000000, 1200000, 1400000, 1600000, 1800000],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
};

export const risks: Risk[] = [
  {
    id: '1',
    title: 'Market Competition',
    description: 'New competitors entering the grocery tech space',
    probability: 'medium',
    impact: 'high',
    status: 'monitoring',
    mitigation: 'Accelerate feature development and strengthen partnerships'
  },
  {
    id: '2',
    title: 'Technical Debt',
    description: 'Legacy code requires significant refactoring',
    probability: 'high',
    impact: 'medium',
    status: 'mitigating',
    mitigation: 'Dedicated sprint for code refactoring'
  },
  {
    id: '3',
    title: 'Talent Acquisition',
    description: 'Difficulty hiring senior developers',
    probability: 'medium',
    impact: 'medium',
    status: 'identified',
    mitigation: 'Partner with recruiting agencies and improve compensation'
  }
];

export const actionItems: ActionItem[] = [
  {
    id: '1',
    title: 'Complete Market Research',
    description: 'Analyze competitor pricing and feature sets',
    assignee: 'Sarah Johnson',
    dueDate: '2024-10-15',
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Setup CI/CD Pipeline',
    description: 'Implement automated testing and deployment',
    assignee: 'Michael Chen',
    dueDate: '2024-10-20',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Design System Documentation',
    description: 'Create comprehensive design system guidelines',
    assignee: 'Emily Rodriguez',
    dueDate: '2024-10-25',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Sales Playbook',
    description: 'Develop sales process and training materials',
    assignee: 'David Kim',
    dueDate: '2024-10-30',
    status: 'completed',
    priority: 'high'
  }
];

// Transformation Timeline Data
export const transformationTimeline = [
  {
    phase: 'Current State',
    title: 'Custom Solution',
    description: 'Single customer, manual deployment',
    status: 'completed',
    months: 'Baseline'
  },
  {
    phase: 'Phase 1',
    title: 'Architecture Design',
    description: 'Multi-tenant foundation',
    status: 'in_progress',
    months: 'Months 1-2'
  },
  {
    phase: 'Phase 2',
    title: 'Core Development',
    description: 'Platform modules',
    status: 'pending',
    months: 'Months 3-5'
  },
  {
    phase: 'Phase 3',
    title: 'Integration & Testing',
    description: 'Business Central integration',
    status: 'pending',
    months: 'Months 6-8'
  },
  {
    phase: 'Phase 4',
    title: 'Pilot Deployment',
    description: 'Initial customers',
    status: 'pending',
    months: 'Months 9-10'
  },
  {
    phase: 'Target State',
    title: 'Multi-tenant SaaS',
    description: 'Automated deployment, scalable',
    status: 'pending',
    months: 'Month 12'
  }
];

// Success Probability Data
export const successProbability = {
  percentage: 85,
  factors: [
    { name: 'Market Analysis', score: 90, weight: 0.3 },
    { name: 'Team Capability', score: 85, weight: 0.25 },
    { name: 'Technical Feasibility', score: 80, weight: 0.2 },
    { name: 'Financial Resources', score: 90, weight: 0.15 },
    { name: 'Competition Level', score: 75, weight: 0.1 }
  ]
};

// Quick Stats Data
export const quickStats = [
  {
    label: 'Market Size',
    value: '$2.3B',
    description: 'Grocery tech market',
    trend: 'growing',
    icon: 'TrendingUp'
  },
  {
    label: 'Competition Level',
    value: 'Medium',
    description: '12 direct competitors',
    trend: 'stable',
    icon: 'BarChart3'
  },
  {
    label: 'Technical Complexity',
    value: 'High',
    description: 'Enterprise integration',
    trend: 'manageable',
    icon: 'Settings'
  },
  {
    label: 'Market Readiness',
    value: 'High',
    description: 'Strong demand signals',
    trend: 'positive',
    icon: 'CheckCircle'
  }
];

// Revenue Growth Projection Data
export const revenueProjectionData = (() => {
  const months = Array.from({ length: 36 }, (_, i) => i + 1);
  return months.map(month => ({
    month,
    conservative: month <= 12 ? month * 35000 :
                 month <= 24 ? 420000 + (month - 12) * 120000 :
                 1860000 + (month - 24) * 220000,
    realistic: month <= 12 ? month * 50000 :
              month <= 24 ? 600000 + (month - 12) * 150000 :
              2400000 + (month - 24) * 258333,
    optimistic: month <= 12 ? month * 70000 :
               month <= 24 ? 840000 + (month - 12) * 200000 :
               3240000 + (month - 24) * 355000
  }));
})();

// Customer Acquisition Funnel Data
export const customerFunnelData = [
  { stage: 'Leads Generated', value: 500, percentage: 100, color: '#3b82f6' },
  { stage: 'Qualified Prospects', value: 100, percentage: 20, color: '#10b981' },
  { stage: 'Demos Scheduled', value: 40, percentage: 8, color: '#f59e0b' },
  { stage: 'Trials Started', value: 25, percentage: 5, color: '#ef4444' },
  { stage: 'Customers Acquired', value: 20, percentage: 4, color: '#8b5cf6' }
];

// Investment Breakdown Data
export const investmentBreakdownData = [
  { name: 'Personnel', value: 1200000, percentage: 73, color: '#3b82f6' },
  { name: 'Marketing', value: 200000, percentage: 12, color: '#10b981' },
  { name: 'Technology', value: 150000, percentage: 9, color: '#f59e0b' },
  { name: 'Operations', value: 100000, percentage: 6, color: '#ef4444' }
];

// Market Positioning Radar Data
export const marketPositioningData = [
  {
    company: 'Chloe',
    features: 85,
    price: 80,
    support: 90,
    integration: 95,
    scalability: 88,
    color: '#3b82f6'
  },
  {
    company: 'Competitor A',
    features: 75,
    price: 70,
    support: 85,
    integration: 70,
    scalability: 75,
    color: '#ef4444'
  },
  {
    company: 'Competitor B',
    features: 80,
    price: 85,
    support: 75,
    integration: 80,
    scalability: 70,
    color: '#f59e0b'
  },
  {
    company: 'Competitor C',
    features: 70,
    price: 90,
    support: 80,
    integration: 65,
    scalability: 80,
    color: '#10b981'
  }
];