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
    value: '$4.2M',
    change: 'Realistic scenario',
    changeType: 'increase',
    icon: 'TrendingUp',
    color: 'success'
  },
  {
    title: 'Target Customers (Year 1)',
    value: '15',
    change: 'Conservative target',
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
  percentage: 75,
  factors: [
    { name: 'Market Analysis', score: 85, weight: 0.3 },
    { name: 'Team Capability', score: 80, weight: 0.25 },
    { name: 'Technical Feasibility', score: 70, weight: 0.2 },
    { name: 'Financial Resources', score: 80, weight: 0.15 },
    { name: 'Competition Level', score: 65, weight: 0.1 }
  ]
};

// Quick Stats Data
export const quickStats = [
  {
    label: 'Market Size',
    value: '$12.38B',
    description: 'Retail pricing software market',
    trend: 'growing',
    icon: 'TrendingUp'
  },
  {
    label: 'Annual Growth Rate',
    value: '8.41%',
    description: 'CAGR market growth',
    trend: 'stable',
    icon: 'BarChart3'
  },
  {
    label: 'Competition Level',
    value: 'Medium-High',
    description: 'Established players present',
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
    conservative: month <= 12 ? month * 29167 :  // Month 12: $350K
                 month <= 24 ? 350000 + (month - 12) * 70833 :  // Month 24: $1.2M
                 1200000 + (month - 24) * 133333,  // Month 36: $2.8M
    realistic: month <= 12 ? month * 37500 :  // Month 12: $450K
              month <= 24 ? 450000 + (month - 12) * 112500 :  // Month 24: $1.8M
              1800000 + (month - 24) * 200000,  // Month 36: $4.2M
    optimistic: month <= 12 ? month * 50000 :  // Month 12: $600K
               month <= 24 ? 600000 + (month - 12) * 150000 :  // Month 24: $2.4M
               2400000 + (month - 24) * 258333  // Month 36: $5.5M
  }));
})();

// Customer Acquisition Funnel Data
export const customerFunnelData = [
  { stage: 'Leads Generated', value: 400, percentage: 100, color: '#3b82f6' },
  { stage: 'Qualified Prospects', value: 80, percentage: 20, color: '#10b981' },
  { stage: 'Demos Scheduled', value: 32, percentage: 8, color: '#f59e0b' },
  { stage: 'Trials Started', value: 20, percentage: 5, color: '#ef4444' },
  { stage: 'Customers Acquired', value: 15, percentage: 3.75, color: '#8b5cf6' }
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

// Current vs Future State Data
export const currentVsFutureState = {
  currentState: {
    title: 'Current State',
    subtitle: 'Single Customer Solution',
    features: [
      { icon: 'User', title: 'Single Customer', description: 'Built for one specific client' },
      { icon: 'Code', title: 'Custom Code', description: 'Hardcoded business logic' },
      { icon: 'Upload', title: 'Manual Deployment', description: 'Manual server updates' },
      { icon: 'Database', title: 'Single Database', description: 'One database instance' },
      { icon: 'Settings', title: 'Fixed Configuration', description: 'No customization options' }
    ]
  },
  futureState: {
    title: 'Future State',
    subtitle: 'Multi-Tenant SaaS Platform',
    features: [
      { icon: 'Users', title: 'Multi-Tenant', description: 'Scalable for multiple clients' },
      { icon: 'Layers', title: 'Configurable', description: 'Flexible business rules' },
      { icon: 'Zap', title: 'Automated Deployment', description: 'CI/CD pipeline' },
      { icon: 'Cloud', title: 'Cloud Architecture', description: 'Scalable infrastructure' },
      { icon: 'Sliders', title: 'Customizable', description: 'Client-specific configurations' }
    ]
  }
};

// Product Module Architecture Data
export const productModules = {
  coreHub: {
    name: 'Chloe Core Platform',
    description: 'Central orchestration layer with tenant management and shared services',
    position: { x: 50, y: 50 }
  },
  modules: [
    {
      id: 'inventory',
      name: 'Inventory Management',
      description: 'Real-time inventory tracking, stock levels, and automated reordering',
      icon: 'Package',
      position: { x: 20, y: 20 },
      status: 'in_development',
      complexity: 'high'
    },
    {
      id: 'orders',
      name: 'Order Management',
      description: 'Order processing, fulfillment tracking, and customer communications',
      icon: 'ShoppingCart',
      position: { x: 80, y: 20 },
      status: 'planned',
      complexity: 'medium'
    },
    {
      id: 'pricing',
      name: 'Pricing & Promotions',
      description: 'Dynamic pricing rules, promotional campaigns, and discount management',
      icon: 'Tag',
      position: { x: 20, y: 80 },
      status: 'in_development',
      complexity: 'medium'
    },
    {
      id: 'reporting',
      name: 'Reporting & Analytics',
      description: 'Business intelligence, performance metrics, and custom dashboards',
      icon: 'BarChart3',
      position: { x: 80, y: 80 },
      status: 'completed',
      complexity: 'low'
    },
    {
      id: 'users',
      name: 'User Management',
      description: 'Role-based access control, user authentication, and tenant administration',
      icon: 'UserCog',
      position: { x: 50, y: 15 },
      status: 'completed',
      complexity: 'low'
    }
  ],
  integrations: [
    {
      name: 'Microsoft Business Central',
      description: 'ERP integration for financial data and business processes',
      icon: 'Database',
      position: { x: 50, y: 85 },
      type: 'primary'
    }
  ]
};

// Feature Prioritization Matrix Data
export const featurePrioritizationData = [
  {
    name: 'Multi-tenant Architecture',
    effort: 9,
    impact: 10,
    size: 120,
    category: 'Platform',
    description: 'Core multi-tenant foundation enabling scalable SaaS delivery',
    color: '#3b82f6'
  },
  {
    name: 'Inventory Management',
    effort: 6,
    impact: 9,
    size: 90,
    category: 'Core Features',
    description: 'Real-time inventory tracking and automated reordering',
    color: '#10b981'
  },
  {
    name: 'Reporting Dashboard',
    effort: 3,
    impact: 7,
    size: 60,
    category: 'Analytics',
    description: 'Business intelligence and performance metrics',
    color: '#f59e0b'
  },
  {
    name: 'Mobile App',
    effort: 8,
    impact: 6,
    size: 75,
    category: 'User Experience',
    description: 'Native mobile application for on-the-go management',
    color: '#ef4444'
  },
  {
    name: 'API Management',
    effort: 5,
    impact: 8,
    size: 70,
    category: 'Integration',
    description: 'Comprehensive API layer for third-party integrations',
    color: '#8b5cf6'
  },
  {
    name: 'Advanced Analytics',
    effort: 7,
    impact: 5,
    size: 55,
    category: 'Analytics',
    description: 'Machine learning powered business insights',
    color: '#06b6d4'
  },
  {
    name: 'User Management',
    effort: 4,
    impact: 8,
    size: 65,
    category: 'Platform',
    description: 'Role-based access control and tenant administration',
    color: '#84cc16'
  }
];

// Development Sprint Planning Data
export const sprintPlanningData = [
  {
    sprint: 'Sprint 1',
    duration: 'Weeks 1-2',
    features: ['Multi-tenant Architecture Design', 'Database Schema Planning'],
    progress: 85,
    status: 'completed',
    teamCapacity: 100,
    storyPoints: 34
  },
  {
    sprint: 'Sprint 2',
    duration: 'Weeks 3-4',
    features: ['Core Platform Development', 'Authentication System'],
    progress: 60,
    status: 'in_progress',
    teamCapacity: 95,
    storyPoints: 42
  },
  {
    sprint: 'Sprint 3',
    duration: 'Weeks 5-6',
    features: ['User Management', 'Basic Inventory Module'],
    progress: 20,
    status: 'planned',
    teamCapacity: 100,
    storyPoints: 38
  },
  {
    sprint: 'Sprint 4',
    duration: 'Weeks 7-8',
    features: ['API Development', 'Integration Framework'],
    progress: 0,
    status: 'planned',
    teamCapacity: 90,
    storyPoints: 45
  },
  {
    sprint: 'Sprint 5',
    duration: 'Weeks 9-10',
    features: ['Reporting Dashboard', 'Analytics Foundation'],
    progress: 0,
    status: 'planned',
    teamCapacity: 100,
    storyPoints: 35
  },
  {
    sprint: 'Sprint 6',
    duration: 'Weeks 11-12',
    features: ['Mobile App MVP', 'Performance Optimization'],
    progress: 0,
    status: 'planned',
    teamCapacity: 85,
    storyPoints: 40
  }
];

// Integration Complexity Heat Map Data
export const integrationComplexityData = [
  {
    integration: 'Microsoft Business Central',
    complexity: 'high',
    timeEstimate: '6-8 weeks',
    priority: 'critical',
    status: 'in_progress',
    dependencies: ['Authentication', 'API Framework'],
    riskLevel: 'medium'
  },
  {
    integration: 'Payment Processors',
    complexity: 'medium',
    timeEstimate: '3-4 weeks',
    priority: 'high',
    status: 'planned',
    dependencies: ['Security Framework'],
    riskLevel: 'low'
  },
  {
    integration: 'Inventory Systems',
    complexity: 'medium',
    timeEstimate: '4-5 weeks',
    priority: 'high',
    status: 'planned',
    dependencies: ['Core Platform', 'API Framework'],
    riskLevel: 'medium'
  },
  {
    integration: 'Email/SMS Services',
    complexity: 'low',
    timeEstimate: '1-2 weeks',
    priority: 'medium',
    status: 'planned',
    dependencies: ['User Management'],
    riskLevel: 'low'
  },
  {
    integration: 'Analytics Tools',
    complexity: 'medium',
    timeEstimate: '2-3 weeks',
    priority: 'medium',
    status: 'planned',
    dependencies: ['Reporting Dashboard'],
    riskLevel: 'low'
  },
  {
    integration: 'Backup Services',
    complexity: 'low',
    timeEstimate: '1-2 weeks',
    priority: 'low',
    status: 'planned',
    dependencies: ['Core Platform'],
    riskLevel: 'low'
  }
];

// Technical Transformation Roadmap Data
export const technicalRoadmap = [
  {
    phase: 'Phase 1',
    title: 'Architecture Design',
    duration: 'Months 1-2',
    progress: 85,
    status: 'in_progress',
    tasks: [
      'Multi-tenant architecture design',
      'Database schema planning',
      'Security framework design',
      'Integration architecture'
    ],
    deliverables: ['Architecture Documentation', 'Technical Specifications', 'Security Design']
  },
  {
    phase: 'Phase 2',
    title: 'Core Development',
    duration: 'Months 3-5',
    progress: 30,
    status: 'in_progress',
    tasks: [
      'Core platform development',
      'Tenant management system',
      'Authentication & authorization',
      'Basic module implementation'
    ],
    deliverables: ['Core Platform', 'Tenant Management', 'Auth System', 'MVP Modules']
  },
  {
    phase: 'Phase 3',
    title: 'Integration & Testing',
    duration: 'Months 6-7',
    progress: 10,
    status: 'planned',
    tasks: [
      'Business Central integration',
      'End-to-end testing',
      'Performance optimization',
      'Security testing'
    ],
    deliverables: ['Integration Layer', 'Test Suite', 'Performance Report', 'Security Audit']
  },
  {
    phase: 'Phase 4',
    title: 'Launch & Optimization',
    duration: 'Months 8-12',
    progress: 0,
    status: 'planned',
    tasks: [
      'Production deployment',
      'Customer onboarding',
      'Performance monitoring',
      'Feature enhancements'
    ],
    deliverables: ['Production System', 'Onboarding Process', 'Monitoring Dashboard', 'Enhancement Plan']
  }
];