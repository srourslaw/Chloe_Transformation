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

// Organizational Chart Data
export const organizationalChart = {
  ceo: {
    id: 'ceo',
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    department: 'Executive',
    status: 'hired',
    email: 'sarah@chloe.com',
    experience: '12 years',
    skills: ['Leadership', 'Strategy', 'Fundraising'],
    reports: ['product-head', 'engineering-head', 'sales-head', 'operations-head']
  },
  departments: [
    {
      head: {
        id: 'product-head',
        name: 'Michael Rodriguez',
        role: 'VP of Product',
        department: 'Product',
        status: 'hired',
        email: 'michael@chloe.com',
        experience: '8 years',
        skills: ['Product Strategy', 'UX/UI', 'Analytics'],
        reports: ['pm-1', 'designer-1']
      },
      members: [
        {
          id: 'pm-1',
          name: 'Emily Johnson',
          role: 'Senior Product Manager',
          department: 'Product',
          status: 'hired',
          email: 'emily@chloe.com',
          experience: '5 years',
          skills: ['Product Management', 'User Research', 'Data Analysis'],
          reports: []
        },
        {
          id: 'designer-1',
          name: 'Alex Kim',
          role: 'UX/UI Designer',
          department: 'Product',
          status: 'interviewing',
          email: 'alex@chloe.com',
          experience: '4 years',
          skills: ['UI/UX Design', 'Prototyping', 'User Testing'],
          reports: []
        }
      ]
    },
    {
      head: {
        id: 'engineering-head',
        name: 'David Zhang',
        role: 'VP of Engineering',
        department: 'Engineering',
        status: 'hired',
        email: 'david@chloe.com',
        experience: '10 years',
        skills: ['System Architecture', 'Team Leadership', 'Cloud Infrastructure'],
        reports: ['senior-dev-1', 'senior-dev-2', 'dev-1']
      },
      members: [
        {
          id: 'senior-dev-1',
          name: 'Jessica Williams',
          role: 'Senior Full-Stack Developer',
          department: 'Engineering',
          status: 'hired',
          email: 'jessica@chloe.com',
          experience: '7 years',
          skills: ['React', 'Node.js', 'Azure', 'TypeScript'],
          reports: []
        },
        {
          id: 'senior-dev-2',
          name: 'Marcus Thompson',
          role: 'Senior Backend Developer',
          department: 'Engineering',
          status: 'hired',
          email: 'marcus@chloe.com',
          experience: '6 years',
          skills: ['.NET Core', 'SQL Server', 'Microservices', 'Docker'],
          reports: []
        },
        {
          id: 'dev-1',
          name: 'Lisa Garcia',
          role: 'Frontend Developer',
          department: 'Engineering',
          status: 'offer_made',
          email: 'lisa@chloe.com',
          experience: '3 years',
          skills: ['React', 'TypeScript', 'CSS', 'Testing'],
          reports: []
        }
      ]
    },
    {
      head: {
        id: 'sales-head',
        name: 'Robert Johnson',
        role: 'VP of Sales & Marketing',
        department: 'Sales',
        status: 'hired',
        email: 'robert@chloe.com',
        experience: '9 years',
        skills: ['B2B Sales', 'Marketing Strategy', 'Customer Success'],
        reports: ['sales-1', 'marketing-1']
      },
      members: [
        {
          id: 'sales-1',
          name: 'Amanda Davis',
          role: 'Senior Sales Manager',
          department: 'Sales',
          status: 'sourcing',
          email: 'amanda@chloe.com',
          experience: '5 years',
          skills: ['Enterprise Sales', 'Relationship Building', 'CRM'],
          reports: []
        },
        {
          id: 'marketing-1',
          name: 'Thomas Wilson',
          role: 'Marketing Manager',
          department: 'Sales',
          status: 'sourcing',
          email: 'thomas@chloe.com',
          experience: '4 years',
          skills: ['Digital Marketing', 'Content Strategy', 'Analytics'],
          reports: []
        }
      ]
    },
    {
      head: {
        id: 'operations-head',
        name: 'Jennifer Lee',
        role: 'VP of Operations',
        department: 'Operations',
        status: 'hired',
        email: 'jennifer@chloe.com',
        experience: '8 years',
        skills: ['Operations Management', 'Finance', 'HR'],
        reports: ['finance-1']
      },
      members: [
        {
          id: 'finance-1',
          name: 'Kevin Brown',
          role: 'Finance Manager',
          department: 'Operations',
          status: 'interviewing',
          email: 'kevin@chloe.com',
          experience: '6 years',
          skills: ['Financial Planning', 'Accounting', 'Budgeting'],
          reports: []
        }
      ]
    }
  ]
};

// Team Hiring Timeline Data
export const teamHiringTimeline = [
  {
    position: 'UX/UI Designer',
    department: 'Product',
    priority: 'high',
    status: 'interviewing',
    startWeek: 1,
    endWeek: 3,
    progress: 70,
    candidates: 3
  },
  {
    position: 'Frontend Developer',
    department: 'Engineering',
    priority: 'high',
    status: 'offer_made',
    startWeek: 2,
    endWeek: 4,
    progress: 90,
    candidates: 1
  },
  {
    position: 'Senior Sales Manager',
    department: 'Sales',
    priority: 'critical',
    status: 'sourcing',
    startWeek: 3,
    endWeek: 7,
    progress: 20,
    candidates: 0
  },
  {
    position: 'Marketing Manager',
    department: 'Sales',
    priority: 'medium',
    status: 'sourcing',
    startWeek: 4,
    endWeek: 8,
    progress: 15,
    candidates: 2
  },
  {
    position: 'Finance Manager',
    department: 'Operations',
    priority: 'medium',
    status: 'interviewing',
    startWeek: 5,
    endWeek: 8,
    progress: 60,
    candidates: 4
  },
  {
    position: 'DevOps Engineer',
    department: 'Engineering',
    priority: 'medium',
    status: 'not_started',
    startWeek: 8,
    endWeek: 12,
    progress: 0,
    candidates: 0
  },
  {
    position: 'Customer Success Manager',
    department: 'Sales',
    priority: 'medium',
    status: 'not_started',
    startWeek: 10,
    endWeek: 14,
    progress: 0,
    candidates: 0
  }
];

// Skills Matrix Data
export const skillsMatrix = {
  requiredSkills: [
    'React', 'TypeScript', '.NET Core', 'SQL Server', 'Azure', 'Node.js',
    'UI/UX Design', 'Product Management', 'Sales', 'Marketing', 'Finance',
    'DevOps', 'Testing', 'API Development', 'Microservices', 'Docker'
  ],
  currentTeam: [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      skills: {
        'React': 0, 'TypeScript': 0, '.NET Core': 0, 'SQL Server': 0, 'Azure': 2,
        'Node.js': 0, 'UI/UX Design': 2, 'Product Management': 4, 'Sales': 4,
        'Marketing': 3, 'Finance': 3, 'DevOps': 0, 'Testing': 0, 'API Development': 0,
        'Microservices': 0, 'Docker': 0
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'VP of Product',
      skills: {
        'React': 3, 'TypeScript': 2, '.NET Core': 0, 'SQL Server': 1, 'Azure': 2,
        'Node.js': 2, 'UI/UX Design': 4, 'Product Management': 5, 'Sales': 2,
        'Marketing': 3, 'Finance': 1, 'DevOps': 0, 'Testing': 3, 'API Development': 2,
        'Microservices': 1, 'Docker': 0
      }
    },
    {
      name: 'David Zhang',
      role: 'VP of Engineering',
      skills: {
        'React': 3, 'TypeScript': 4, '.NET Core': 4, 'SQL Server': 4, 'Azure': 5,
        'Node.js': 4, 'UI/UX Design': 1, 'Product Management': 2, 'Sales': 1,
        'Marketing': 1, 'Finance': 1, 'DevOps': 5, 'Testing': 4, 'API Development': 5,
        'Microservices': 5, 'Docker': 5
      }
    },
    {
      name: 'Jessica Williams',
      role: 'Senior Full-Stack Developer',
      skills: {
        'React': 5, 'TypeScript': 4, '.NET Core': 3, 'SQL Server': 3, 'Azure': 4,
        'Node.js': 4, 'UI/UX Design': 2, 'Product Management': 1, 'Sales': 0,
        'Marketing': 0, 'Finance': 0, 'DevOps': 2, 'Testing': 4, 'API Development': 4,
        'Microservices': 3, 'Docker': 2
      }
    },
    {
      name: 'Marcus Thompson',
      role: 'Senior Backend Developer',
      skills: {
        'React': 2, 'TypeScript': 3, '.NET Core': 5, 'SQL Server': 5, 'Azure': 4,
        'Node.js': 3, 'UI/UX Design': 0, 'Product Management': 1, 'Sales': 0,
        'Marketing': 0, 'Finance': 0, 'DevOps': 4, 'Testing': 4, 'API Development': 5,
        'Microservices': 5, 'Docker': 4
      }
    },
    {
      name: 'Robert Johnson',
      role: 'VP of Sales & Marketing',
      skills: {
        'React': 0, 'TypeScript': 0, '.NET Core': 0, 'SQL Server': 1, 'Azure': 1,
        'Node.js': 0, 'UI/UX Design': 2, 'Product Management': 3, 'Sales': 5,
        'Marketing': 5, 'Finance': 2, 'DevOps': 0, 'Testing': 0, 'API Development': 0,
        'Microservices': 0, 'Docker': 0
      }
    },
    {
      name: 'Jennifer Lee',
      role: 'VP of Operations',
      skills: {
        'React': 0, 'TypeScript': 0, '.NET Core': 0, 'SQL Server': 2, 'Azure': 1,
        'Node.js': 0, 'UI/UX Design': 1, 'Product Management': 2, 'Sales': 2,
        'Marketing': 2, 'Finance': 5, 'DevOps': 0, 'Testing': 0, 'API Development': 0,
        'Microservices': 0, 'Docker': 0
      }
    }
  ],
  skillGaps: [
    { skill: 'DevOps', currentLevel: 3.1, requiredLevel: 4, gap: 0.9, priority: 'high' },
    { skill: 'UI/UX Design', currentLevel: 1.7, requiredLevel: 4, gap: 2.3, priority: 'critical' },
    { skill: 'Sales', currentLevel: 2.0, requiredLevel: 4, gap: 2.0, priority: 'high' },
    { skill: 'Marketing', currentLevel: 2.1, requiredLevel: 4, gap: 1.9, priority: 'high' },
    { skill: 'Testing', currentLevel: 2.1, requiredLevel: 4, gap: 1.9, priority: 'medium' },
    { skill: 'Docker', currentLevel: 1.6, requiredLevel: 3, gap: 1.4, priority: 'medium' }
  ]
};

// Team Capacity Planning Data
export const teamCapacityPlanning = {
  phases: [
    {
      phase: 'Phase 1: Architecture',
      weeks: '1-8',
      totalCapacity: 320, // 8 people * 40 hours * 8 weeks / 8
      allocations: [
        { department: 'Engineering', hours: 240, percentage: 75 },
        { department: 'Product', hours: 60, percentage: 18.75 },
        { department: 'Operations', hours: 20, percentage: 6.25 }
      ],
      utilization: 85,
      bottlenecks: ['Senior Engineering capacity']
    },
    {
      phase: 'Phase 2: Core Development',
      weeks: '9-20',
      totalCapacity: 480,
      allocations: [
        { department: 'Engineering', hours: 360, percentage: 75 },
        { department: 'Product', hours: 80, percentage: 16.67 },
        { department: 'Sales', hours: 40, percentage: 8.33 }
      ],
      utilization: 95,
      bottlenecks: ['Frontend development', 'Testing resources']
    },
    {
      phase: 'Phase 3: Integration',
      weeks: '21-28',
      totalCapacity: 320,
      allocations: [
        { department: 'Engineering', hours: 200, percentage: 62.5 },
        { department: 'Product', hours: 80, percentage: 25 },
        { department: 'Sales', hours: 40, percentage: 12.5 }
      ],
      utilization: 90,
      bottlenecks: ['Business Central expertise']
    },
    {
      phase: 'Phase 4: Launch',
      weeks: '29-40',
      totalCapacity: 480,
      allocations: [
        { department: 'Sales', hours: 200, percentage: 41.67 },
        { department: 'Engineering', hours: 160, percentage: 33.33 },
        { department: 'Product', hours: 80, percentage: 16.67 },
        { department: 'Operations', hours: 40, percentage: 8.33 }
      ],
      utilization: 88,
      bottlenecks: ['Sales team capacity', 'Customer support']
    }
  ],
  resourceConflicts: [
    {
      resource: 'Senior Engineering',
      conflict: 'Overallocated in Phase 2',
      impact: 'high',
      resolution: 'Hire additional senior developer or extend timeline'
    },
    {
      resource: 'Product Management',
      conflict: 'Split between feature development and customer onboarding',
      impact: 'medium',
      resolution: 'Hire customer success manager'
    },
    {
      resource: 'DevOps',
      conflict: 'Missing expertise for scaling infrastructure',
      impact: 'high',
      resolution: 'Hire DevOps engineer before Phase 3'
    }
  ]
};

// Team Performance Metrics Data
export const teamPerformanceMetrics = {
  weeklyMetrics: [
    {
      week: 'Week 1',
      storyPoints: 34,
      bugResolution: 92,
      codeReviewTime: 8.5,
      customerProgress: 85
    },
    {
      week: 'Week 2',
      storyPoints: 38,
      bugResolution: 88,
      codeReviewTime: 6.2,
      customerProgress: 90
    },
    {
      week: 'Week 3',
      storyPoints: 42,
      bugResolution: 95,
      codeReviewTime: 7.1,
      customerProgress: 88
    },
    {
      week: 'Week 4',
      storyPoints: 36,
      bugResolution: 90,
      codeReviewTime: 9.3,
      customerProgress: 92
    },
    {
      week: 'Week 5',
      storyPoints: 40,
      bugResolution: 94,
      codeReviewTime: 5.8,
      customerProgress: 87
    },
    {
      week: 'Week 6',
      storyPoints: 45,
      bugResolution: 91,
      codeReviewTime: 7.7,
      customerProgress: 94
    }
  ],
  monthlyReviews: [
    {
      month: 'Month 1',
      teamSatisfaction: 4.2,
      productivity: 88,
      trainingCompletion: 75,
      retention: 100
    },
    {
      month: 'Month 2',
      teamSatisfaction: 4.4,
      productivity: 92,
      trainingCompletion: 82,
      retention: 100
    },
    {
      month: 'Month 3',
      teamSatisfaction: 4.1,
      productivity: 85,
      trainingCompletion: 88,
      retention: 95
    }
  ],
  quarterlyAssessment: [
    {
      quarter: 'Q1 2024',
      performanceVsGoals: 92,
      skillDevelopment: 78,
      careerProgression: 85,
      teamExpansion: 3
    }
  ],
  budgetAllocation: {
    personnelCosts: [
      { role: 'CEO & Founder', cost: 180000, percentage: 15 },
      { role: 'VP Positions', cost: 480000, percentage: 40 },
      { role: 'Senior Developers', cost: 360000, percentage: 30 },
      { role: 'Other Roles', cost: 180000, percentage: 15 }
    ],
    trainingBudget: 25000,
    equipmentBudget: 35000,
    performanceBonus: 60000
  }
};

// Sales & Marketing Data
export const salesMarketingData = {
  marketSegmentation: [
    { segment: 'Independent Grocery Stores', percentage: 60, size: 7400, opportunity: 145000 },
    { segment: 'Regional Chains', percentage: 25, size: 850, opportunity: 85000 },
    { segment: 'Specialty Retailers', percentage: 15, size: 1200, opportunity: 48000 }
  ],
  salesPipeline: [
    { stage: 'Leads', count: 400, value: 0, conversionRate: 20 },
    { stage: 'Qualified', count: 80, value: 240000, conversionRate: 40 },
    { stage: 'Demo', count: 32, value: 192000, conversionRate: 62.5 },
    { stage: 'Trial', count: 20, value: 160000, conversionRate: 75 },
    { stage: 'Closed', count: 15, value: 135000, conversionRate: 100 }
  ],
  marketingCampaigns: [
    {
      campaign: 'Content Marketing',
      spend: 25000,
      leads: 180,
      costPerLead: 139,
      roi: 3.2,
      period: 'Q1 2024'
    },
    {
      campaign: 'Digital Advertising',
      spend: 40000,
      leads: 220,
      costPerLead: 182,
      roi: 2.8,
      period: 'Q1 2024'
    },
    {
      campaign: 'Trade Shows',
      spend: 35000,
      leads: 95,
      costPerLead: 368,
      roi: 4.1,
      period: 'Q1 2024'
    },
    {
      campaign: 'Referral Program',
      spend: 15000,
      leads: 45,
      costPerLead: 333,
      roi: 5.2,
      period: 'Q1 2024'
    }
  ],
  competitivePositioning: [
    { company: 'Chloe', price: 499, features: 85, marketShare: 2 },
    { company: 'LS Central', price: 650, features: 90, marketShare: 25 },
    { company: 'Toast POS', price: 425, features: 75, marketShare: 18 },
    { company: 'Square Retail', price: 350, features: 70, marketShare: 22 },
    { company: 'Shopify POS', price: 275, features: 65, marketShare: 15 }
  ]
};

// Pricing Strategy Data
export const pricingStrategyData = {
  pricingTiers: [
    {
      tier: 'Starter',
      price: 299,
      setupFee: 1000,
      features: ['Basic Inventory', 'Simple Reporting', 'Email Support'],
      targetCustomers: 'Small independent stores',
      projectedRevenue: 89700,
      customerDistribution: 30
    },
    {
      tier: 'Professional',
      price: 499,
      setupFee: 2000,
      features: ['Advanced Inventory', 'Custom Reports', 'Phone Support', 'Basic Analytics'],
      targetCustomers: 'Medium-sized retailers',
      projectedRevenue: 199600,
      customerDistribution: 40
    },
    {
      tier: 'Enterprise',
      price: 799,
      setupFee: 3000,
      features: ['Full Platform', 'Advanced Analytics', 'Priority Support', 'Custom Integrations'],
      targetCustomers: 'Regional chains',
      projectedRevenue: 191760,
      customerDistribution: 30
    }
  ],
  customerLifetimeValue: {
    variables: {
      monthlyFee: 499,
      retentionRate: 87,
      upsellRate: 15,
      averageLifespan: 28
    },
    calculations: {
      baseLTV: 13972,
      upsellLTV: 2096,
      totalLTV: 16068,
      acquisitionCost: 2800,
      ltvCacRatio: 5.7
    }
  },
  marketPenetration: {
    geographicExpansion: [
      { region: 'Northeast US', timeline: 'Month 1-6', customers: 8, investment: 45000 },
      { region: 'Southeast US', timeline: 'Month 4-9', customers: 12, investment: 55000 },
      { region: 'Midwest US', timeline: 'Month 7-12', customers: 15, investment: 60000 },
      { region: 'West Coast US', timeline: 'Month 10-15', customers: 18, investment: 75000 }
    ],
    acquisitionRate: 3.5
  },
  partnerProgram: [
    { partnerType: 'System Integrators', revenueShare: 20, pipelineValue: 180000, status: 'active' },
    { partnerType: 'Resellers', revenueShare: 15, pipelineValue: 120000, status: 'recruiting' },
    { partnerType: 'Consultants', revenueShare: 10, pipelineValue: 80000, status: 'planned' }
  ]
};

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