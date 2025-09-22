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

// Financial Modeling Data
export const financialModelingData = {
  revenueProjectionModels: {
    scenarios: [
      {
        scenario: 'Conservative',
        monthlyGrowthRate: 8,
        yearOneRevenue: 350000,
        yearTwoRevenue: 1200000,
        yearThreeRevenue: 2800000,
        customerCount: [15, 35, 75],
        avgRevenuePerCustomer: [1944, 2857, 3111]
      },
      {
        scenario: 'Realistic',
        monthlyGrowthRate: 12,
        yearOneRevenue: 450000,
        yearTwoRevenue: 1800000,
        yearThreeRevenue: 4200000,
        customerCount: [20, 50, 110],
        avgRevenuePerCustomer: [1875, 3000, 3182]
      },
      {
        scenario: 'Optimistic',
        monthlyGrowthRate: 18,
        yearOneRevenue: 600000,
        yearTwoRevenue: 2400000,
        yearThreeRevenue: 5500000,
        customerCount: [25, 65, 145],
        avgRevenuePerCustomer: [2000, 3077, 3172]
      }
    ],
    assumptions: {
      churnRate: 8,
      upsellRate: 15,
      avgContractLength: 28,
      seasonalityFactor: 0.85
    }
  },
  costStructureAnalysis: {
    operatingExpenses: [
      { category: 'Personnel', year1: 1200000, year2: 1800000, year3: 2400000, percentage: 58 },
      { category: 'Technology & Infrastructure', year1: 150000, year2: 280000, year3: 420000, percentage: 8 },
      { category: 'Sales & Marketing', year1: 200000, year2: 350000, year3: 525000, percentage: 12 },
      { category: 'Operations', year1: 100000, year2: 180000, year3: 270000, percentage: 6 },
      { category: 'Professional Services', year1: 75000, year2: 120000, year3: 180000, percentage: 4 },
      { category: 'Other', year1: 125000, year2: 190000, year3: 285000, percentage: 7 }
    ],
    customerAcquisitionCost: {
      blendedCAC: 2800,
      salesCAC: 3200,
      marketingCAC: 2400,
      organicCAC: 800,
      paybackPeriod: 14
    },
    grossMargin: {
      year1: 72,
      year2: 78,
      year3: 82,
      targetMargin: 85
    }
  },
  cashFlowProjections: {
    monthlyData: Array.from({ length: 36 }, (_, month) => {
      const baseRevenue = month <= 12 ? (month * 37500) :
                         month <= 24 ? (450000 + (month - 12) * 112500) :
                         (1800000 + (month - 24) * 200000);
      const operatingCosts = baseRevenue * 0.65;
      const netCashFlow = baseRevenue - operatingCosts;
      const cumulativeCashFlow = month === 0 ? netCashFlow : netCashFlow;

      return {
        month: month + 1,
        revenue: Math.round(baseRevenue),
        operatingCosts: Math.round(operatingCosts),
        netCashFlow: Math.round(netCashFlow),
        cumulativeCashFlow: Math.round(cumulativeCashFlow),
        runway: month > 12 ? Math.max(0, 24 - Math.floor(month / 2)) : 24
      };
    }),
    fundingRequirements: [
      { milestone: 'Seed Round', amount: 1650000, month: 0, purpose: 'Product development and team building' },
      { milestone: 'Series A', amount: 3500000, month: 18, purpose: 'Market expansion and sales acceleration' },
      { milestone: 'Series B', amount: 8000000, month: 36, purpose: 'National expansion and enterprise features' }
    ]
  },
  investmentROI: {
    initialInvestment: 1650000,
    projectedReturns: [
      { year: 1, valuation: 8000000, roi: 385 },
      { year: 2, valuation: 18000000, roi: 991 },
      { year: 3, valuation: 42000000, roi: 2445 },
      { year: 5, valuation: 125000000, roi: 7476 }
    ],
    exitScenarios: [
      { scenario: 'Conservative Exit', multiple: 8, valuation: 33600000, probability: 60 },
      { scenario: 'Realistic Exit', multiple: 12, valuation: 50400000, probability: 30 },
      { scenario: 'Optimistic Exit', multiple: 18, valuation: 75600000, probability: 10 }
    ],
    npvCalculation: {
      discountRate: 12,
      npv: 28450000,
      irr: 145,
      paybackPeriod: 2.3
    }
  }
};

// SaaS Metrics Data
export const saasMetricsData = {
  monthlyRecurringRevenue: {
    current: 125000,
    growth: [
      { month: 'Jan', mrr: 85000, newMRR: 25000, expansionMRR: 8000, churnMRR: -3000 },
      { month: 'Feb', mrr: 95000, newMRR: 30000, expansionMRR: 12000, churnMRR: -2000 },
      { month: 'Mar', mrr: 110000, newMRR: 35000, expansionMRR: 15000, churnMRR: -5000 },
      { month: 'Apr', mrr: 125000, newMRR: 28000, expansionMRR: 10000, churnMRR: -3000 },
      { month: 'May', mrr: 140000, newMRR: 32000, expansionMRR: 18000, churnMRR: -5000 },
      { month: 'Jun', mrr: 158000, newMRR: 38000, expansionMRR: 22000, churnMRR: -2000 }
    ]
  },
  customerMetrics: {
    totalCustomers: 65,
    newCustomers: 12,
    churnedCustomers: 2,
    netNewCustomers: 10,
    customerGrowthRate: 18.5,
    churnRate: 3.1,
    netRevenueRetention: 112
  },
  unitEconomics: {
    averageRevenuePerUser: 1923,
    customerLifetimeValue: 16068,
    customerAcquisitionCost: 2800,
    ltvCacRatio: 5.7,
    grossRevenueRetention: 97,
    netRevenueRetention: 112,
    paybackPeriod: 14,
    contributionMargin: 78
  },
  financialHealth: {
    burnRate: 185000,
    runway: 18,
    growthEfficiency: 2.4,
    ruleOf40: 42,
    cashPosition: 3300000,
    profitabilityTimeline: 28
  }
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

// Financial KPIs & Metrics Data
export const financialKPIsData = {
  revenueMetrics: {
    monthlyRecurringRevenue: {
      current: 158000,
      target: 200000,
      growth: 28.5,
      trend: [
        { month: 'Jan', value: 85000, target: 90000 },
        { month: 'Feb', value: 95000, target: 105000 },
        { month: 'Mar', value: 110000, target: 120000 },
        { month: 'Apr', value: 125000, target: 135000 },
        { month: 'May', value: 140000, target: 150000 },
        { month: 'Jun', value: 158000, target: 165000 }
      ]
    },
    annualRecurringRevenue: {
      current: 1896000,
      target: 2400000,
      growth: 45.2,
      projection: 3200000
    },
    revenueGrowthRate: {
      monthly: 12.9,
      quarterly: 43.6,
      annual: 68.2,
      target: 15.0
    }
  },

  profitabilityMetrics: {
    grossMargin: {
      current: 78.5,
      target: 80.0,
      trend: [78.2, 78.8, 78.1, 78.9, 78.7, 78.5],
      industry: 75.0
    },
    operatingMargin: {
      current: -12.3,
      target: 20.0,
      trend: [-18.5, -16.2, -14.8, -13.1, -12.9, -12.3],
      projectedBreakeven: 14
    },
    netMargin: {
      current: -15.8,
      target: 15.0,
      trend: [-22.1, -19.5, -17.2, -16.0, -15.9, -15.8],
      projectedPositive: 16
    },
    ebitda: {
      current: -23400,
      target: 40000,
      trend: [-35000, -28000, -26500, -25200, -24100, -23400],
      projectedPositive: 18
    }
  },

  cashFlowMetrics: {
    operatingCashFlow: {
      current: -18500,
      target: 50000,
      trend: [-28000, -24000, -21500, -20000, -19200, -18500],
      projectedPositive: 16
    },
    freeCashFlow: {
      current: -25000,
      target: 35000,
      trend: [-35000, -30000, -28000, -26500, -25800, -25000],
      projectedPositive: 18
    },
    cashBurnRate: {
      current: 185000,
      target: 120000,
      trend: [220000, 205000, 195000, 190000, 187000, 185000],
      efficiency: 'improving'
    },
    cashRunway: {
      current: 18,
      target: 24,
      withCurrentBurn: 18,
      withTargetEfficiency: 28
    }
  },

  customerMetrics: {
    customerAcquisitionCost: {
      current: 2800,
      target: 2200,
      trend: [3200, 3000, 2900, 2850, 2820, 2800],
      byChannel: {
        'Digital Marketing': 2400,
        'Content Marketing': 1800,
        'Direct Sales': 3200,
        'Referrals': 1200,
        'Partner Channel': 2800
      }
    },
    customerLifetimeValue: {
      current: 16068,
      target: 20000,
      trend: [14200, 14800, 15200, 15600, 15800, 16068],
      bySegment: {
        'Small Stores': 12800,
        'Medium Stores': 16068,
        'Large Stores': 24100
      }
    },
    ltvCacRatio: {
      current: 5.7,
      target: 9.0,
      trend: [4.4, 4.9, 5.2, 5.5, 5.6, 5.7],
      benchmark: 3.0
    },
    paybackPeriod: {
      current: 14,
      target: 8,
      trend: [18, 16, 15, 14.5, 14.2, 14],
      unit: 'months'
    }
  },

  saasMetrics: {
    churnRate: {
      current: 3.1,
      target: 2.0,
      trend: [4.2, 3.8, 3.5, 3.3, 3.2, 3.1],
      gross: 3.1,
      net: 2.4,
      bySegment: {
        'Small Stores': 4.5,
        'Medium Stores': 2.8,
        'Large Stores': 1.9
      }
    },
    netRevenueRetention: {
      current: 112,
      target: 120,
      trend: [105, 107, 108, 110, 111, 112],
      expansion: 15.1,
      contraction: 2.2
    },
    averageRevenuePerUser: {
      current: 1923,
      target: 2200,
      trend: [1750, 1820, 1865, 1890, 1905, 1923],
      bySegment: {
        'Small Stores': 1450,
        'Medium Stores': 1923,
        'Large Stores': 2890
      }
    },
    customerSatisfactionScore: {
      current: 8.7,
      target: 9.0,
      trend: [8.2, 8.4, 8.5, 8.6, 8.6, 8.7],
      scale: 10,
      responseRate: 78
    }
  },

  operationalMetrics: {
    ruleOf40: {
      current: 42,
      target: 50,
      revenueGrowth: 28.5,
      profitMargin: 13.5,
      trend: [35, 38, 39, 40, 41, 42]
    },
    grossRevenueRetention: {
      current: 97,
      target: 98,
      trend: [95, 96, 96.5, 96.8, 97, 97],
      benchmark: 95
    },
    salesEfficiency: {
      current: 2.4,
      target: 3.0,
      trend: [1.8, 2.0, 2.1, 2.2, 2.3, 2.4],
      calculation: 'New ARR / Sales & Marketing Spend'
    },
    magicNumber: {
      current: 1.2,
      target: 1.5,
      trend: [0.8, 0.9, 1.0, 1.1, 1.1, 1.2],
      benchmark: 1.0
    }
  },

  comparisonMetrics: {
    industryBenchmarks: {
      'Gross Margin': { our: 78.5, industry: 75.0, percentile: 75 },
      'Net Revenue Retention': { our: 112, industry: 108, percentile: 65 },
      'CAC Payback': { our: 14, industry: 12, percentile: 40 },
      'Churn Rate': { our: 3.1, industry: 5.2, percentile: 80 },
      'LTV:CAC Ratio': { our: 5.7, industry: 4.2, percentile: 70 },
      'Rule of 40': { our: 42, industry: 35, percentile: 75 }
    },
    competitorComparison: {
      'Revenue Growth': { us: 28.5, competitor1: 22, competitor2: 31, competitor3: 18 },
      'Gross Margin': { us: 78.5, competitor1: 72, competitor2: 80, competitor3: 69 },
      'Customer Count': { us: 65, competitor1: 120, competitor2: 45, competitor3: 200 },
      'ARPU': { us: 1923, competitor1: 1650, competitor2: 2100, competitor3: 1400 }
    }
  },

  financialHealth: {
    liquidityRatio: 4.2,
    debtToEquity: 0.15,
    workingCapital: 850000,
    quickRatio: 3.8,
    currentRatio: 4.2,
    cashConversionCycle: 25,
    creditRating: 'B+',
    riskProfile: 'Moderate'
  },

  forecastAccuracy: {
    revenueAccuracy: 92.5,
    expenseAccuracy: 96.2,
    customerCountAccuracy: 88.7,
    churnAccuracy: 91.3,
    confidenceInterval: 85
  }
};

// Project Timeline & Milestones Data
export const projectTimelineData = {
  projectOverview: {
    name: 'Chloe SaaS Transformation',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    duration: 365,
    totalBudget: 2500000,
    spentBudget: 1250000,
    completionPercentage: 45,
    status: 'on_track',
    riskLevel: 'medium',
    nextMilestone: 'Beta Launch',
    daysToNextMilestone: 28
  },

  phases: [
    {
      id: 'phase1',
      name: 'Architecture & Planning',
      startDate: '2024-01-01',
      endDate: '2024-03-15',
      duration: 74,
      progress: 100,
      status: 'completed',
      budget: 400000,
      spent: 380000,
      team: ['Architecture Team', 'Product Team'],
      keyDeliverables: [
        'Technical Architecture Document',
        'Database Design',
        'Security Framework',
        'Integration Strategy'
      ]
    },
    {
      id: 'phase2',
      name: 'Core Development',
      startDate: '2024-02-15',
      endDate: '2024-06-30',
      duration: 136,
      progress: 75,
      status: 'in_progress',
      budget: 800000,
      spent: 650000,
      team: ['Engineering Team', 'UI/UX Team'],
      keyDeliverables: [
        'Core Platform MVP',
        'User Authentication System',
        'Tenant Management',
        'Basic Modules Implementation'
      ]
    },
    {
      id: 'phase3',
      name: 'Integration & Testing',
      startDate: '2024-06-01',
      endDate: '2024-09-15',
      duration: 106,
      progress: 25,
      status: 'in_progress',
      budget: 600000,
      spent: 150000,
      team: ['Engineering Team', 'QA Team', 'DevOps Team'],
      keyDeliverables: [
        'Business Central Integration',
        'End-to-End Testing Suite',
        'Performance Optimization',
        'Security Testing & Audit'
      ]
    },
    {
      id: 'phase4',
      name: 'Beta Launch & Optimization',
      startDate: '2024-08-15',
      endDate: '2024-12-31',
      duration: 138,
      progress: 10,
      status: 'planned',
      budget: 700000,
      spent: 70000,
      team: ['Full Team', 'Customer Success'],
      keyDeliverables: [
        'Beta Platform Deployment',
        'Customer Onboarding Process',
        'Monitoring & Analytics',
        'Production Optimization'
      ]
    }
  ],

  milestones: [
    {
      id: 'ms1',
      name: 'Architecture Approval',
      date: '2024-03-15',
      phase: 'phase1',
      status: 'completed',
      priority: 'critical',
      dependencies: [],
      deliverables: ['Architecture Document', 'Technical Specifications'],
      stakeholders: ['CTO', 'Engineering Team', 'Board']
    },
    {
      id: 'ms2',
      name: 'MVP Core Complete',
      date: '2024-05-30',
      phase: 'phase2',
      status: 'completed',
      priority: 'critical',
      dependencies: ['ms1'],
      deliverables: ['Working MVP', 'Basic User Interface'],
      stakeholders: ['Product Team', 'Engineering Team']
    },
    {
      id: 'ms3',
      name: 'Security Audit Complete',
      date: '2024-07-15',
      phase: 'phase3',
      status: 'in_progress',
      priority: 'high',
      dependencies: ['ms2'],
      deliverables: ['Security Audit Report', 'Compliance Documentation'],
      stakeholders: ['Security Team', 'Compliance Officer']
    },
    {
      id: 'ms4',
      name: 'Beta Launch',
      date: '2024-09-01',
      phase: 'phase3',
      status: 'upcoming',
      priority: 'critical',
      dependencies: ['ms3'],
      deliverables: ['Beta Platform', 'Customer Onboarding'],
      stakeholders: ['Product Team', 'Sales Team', 'Customer Success']
    },
    {
      id: 'ms5',
      name: 'Production Launch',
      date: '2024-12-01',
      phase: 'phase4',
      status: 'planned',
      priority: 'critical',
      dependencies: ['ms4'],
      deliverables: ['Production Platform', 'Go-to-Market Execution'],
      stakeholders: ['All Teams', 'Executive Team']
    }
  ],

  tasks: [
    // Phase 2 - Core Development (Active)
    {
      id: 'task1',
      name: 'Multi-tenant Architecture Implementation',
      phase: 'phase2',
      startDate: '2024-02-15',
      endDate: '2024-04-30',
      duration: 75,
      progress: 90,
      status: 'in_progress',
      priority: 'critical',
      assignee: 'Senior Backend Engineer',
      estimatedHours: 320,
      actualHours: 295,
      dependencies: []
    },
    {
      id: 'task2',
      name: 'User Interface Development',
      phase: 'phase2',
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      duration: 75,
      progress: 85,
      status: 'in_progress',
      priority: 'high',
      assignee: 'UI/UX Team',
      estimatedHours: 240,
      actualHours: 220,
      dependencies: ['task1']
    },
    {
      id: 'task3',
      name: 'API Development',
      phase: 'phase2',
      startDate: '2024-03-15',
      endDate: '2024-06-01',
      duration: 78,
      progress: 70,
      status: 'in_progress',
      priority: 'high',
      assignee: 'Backend Team',
      estimatedHours: 400,
      actualHours: 280,
      dependencies: ['task1']
    },

    // Phase 3 - Integration & Testing (Starting)
    {
      id: 'task4',
      name: 'Business Central Integration',
      phase: 'phase3',
      startDate: '2024-06-01',
      endDate: '2024-08-15',
      duration: 75,
      progress: 30,
      status: 'in_progress',
      priority: 'critical',
      assignee: 'Integration Specialist',
      estimatedHours: 350,
      actualHours: 105,
      dependencies: ['task2', 'task3']
    },
    {
      id: 'task5',
      name: 'Automated Testing Suite',
      phase: 'phase3',
      startDate: '2024-06-15',
      endDate: '2024-08-30',
      duration: 76,
      progress: 20,
      status: 'in_progress',
      priority: 'high',
      assignee: 'QA Engineer',
      estimatedHours: 280,
      actualHours: 56,
      dependencies: ['task3']
    },
    {
      id: 'task6',
      name: 'Performance Optimization',
      phase: 'phase3',
      startDate: '2024-07-01',
      endDate: '2024-09-01',
      duration: 62,
      progress: 10,
      status: 'planned',
      priority: 'medium',
      assignee: 'Senior Engineer',
      estimatedHours: 160,
      actualHours: 16,
      dependencies: ['task4']
    },

    // Phase 4 - Beta Launch (Planned)
    {
      id: 'task7',
      name: 'Beta Customer Onboarding',
      phase: 'phase4',
      startDate: '2024-08-15',
      endDate: '2024-10-31',
      duration: 77,
      progress: 5,
      status: 'planned',
      priority: 'high',
      assignee: 'Customer Success Team',
      estimatedHours: 200,
      actualHours: 10,
      dependencies: ['task4', 'task5']
    },
    {
      id: 'task8',
      name: 'Production Deployment Preparation',
      phase: 'phase4',
      startDate: '2024-10-01',
      endDate: '2024-11-30',
      duration: 60,
      progress: 0,
      status: 'planned',
      priority: 'critical',
      assignee: 'DevOps Team',
      estimatedHours: 150,
      actualHours: 0,
      dependencies: ['task6']
    }
  ],

  risks: [
    {
      id: 'risk1',
      title: 'Business Central Integration Complexity',
      description: 'Integration with Business Central may take longer than expected due to API limitations',
      probability: 0.7,
      impact: 'high',
      riskLevel: 'high',
      mitigation: 'Dedicated integration specialist assigned, fallback plan prepared',
      owner: 'Technical Lead',
      status: 'active'
    },
    {
      id: 'risk2',
      title: 'Resource Availability',
      description: 'Key team members may not be available during critical phases',
      probability: 0.4,
      impact: 'medium',
      riskLevel: 'medium',
      mitigation: 'Cross-training initiated, backup resources identified',
      owner: 'Project Manager',
      status: 'monitoring'
    },
    {
      id: 'risk3',
      title: 'Scope Creep',
      description: 'Additional feature requests from stakeholders may impact timeline',
      probability: 0.6,
      impact: 'medium',
      riskLevel: 'medium',
      mitigation: 'Change control process implemented, regular stakeholder communication',
      owner: 'Product Manager',
      status: 'active'
    }
  ],

  resourceAllocation: [
    {
      phase: 'Architecture & Planning',
      engineers: 3,
      designers: 1,
      pm: 1,
      qa: 0,
      devops: 0,
      totalCost: 380000
    },
    {
      phase: 'Core Development',
      engineers: 5,
      designers: 2,
      pm: 1,
      qa: 1,
      devops: 1,
      totalCost: 650000
    },
    {
      phase: 'Integration & Testing',
      engineers: 4,
      designers: 1,
      pm: 1,
      qa: 2,
      devops: 2,
      totalCost: 150000
    },
    {
      phase: 'Beta Launch & Optimization',
      engineers: 3,
      designers: 1,
      pm: 1,
      qa: 1,
      devops: 1,
      totalCost: 70000
    }
  ],

  budgetTracking: {
    totalBudget: 2500000,
    spentToDate: 1250000,
    remainingBudget: 1250000,
    budgetUtilization: 50,
    forecasted: 2450000,
    variance: -50000,
    byPhase: [
      { phase: 'Architecture & Planning', budgeted: 400000, spent: 380000, variance: 20000 },
      { phase: 'Core Development', budgeted: 800000, spent: 650000, variance: 150000 },
      { phase: 'Integration & Testing', budgeted: 600000, spent: 150000, variance: 450000 },
      { phase: 'Beta Launch & Optimization', budgeted: 700000, spent: 70000, variance: 630000 }
    ]
  },

  teamVelocity: [
    { sprint: 'Sprint 1', plannedPoints: 40, completedPoints: 38, velocity: 95 },
    { sprint: 'Sprint 2', plannedPoints: 45, completedPoints: 44, velocity: 98 },
    { sprint: 'Sprint 3', plannedPoints: 42, completedPoints: 39, velocity: 93 },
    { sprint: 'Sprint 4', plannedPoints: 48, completedPoints: 47, velocity: 98 },
    { sprint: 'Sprint 5', plannedPoints: 50, completedPoints: 46, velocity: 92 },
    { sprint: 'Sprint 6', plannedPoints: 45, completedPoints: 43, velocity: 96 }
  ]
};

// Progress Monitoring Dashboard Data
export const progressMonitoringData = {
  overallProgress: {
    completionPercentage: 45,
    onTimeDelivery: 87,
    budgetAdherence: 98,
    qualityScore: 92,
    teamSatisfaction: 85,
    stakeholderSatisfaction: 89
  },

  weeklyProgress: [
    { week: 'Week 1', planned: 15, actual: 14, cumulative: 14 },
    { week: 'Week 2', planned: 18, actual: 17, cumulative: 31 },
    { week: 'Week 3', planned: 20, actual: 19, cumulative: 50 },
    { week: 'Week 4', planned: 16, actual: 15, cumulative: 65 },
    { week: 'Week 5', planned: 22, actual: 20, cumulative: 85 },
    { week: 'Week 6', planned: 19, actual: 18, cumulative: 103 },
    { week: 'Week 7', planned: 17, actual: 16, cumulative: 119 },
    { week: 'Week 8', planned: 21, actual: 19, cumulative: 138 }
  ],

  sprintMetrics: [
    {
      sprint: 'Sprint 1',
      startDate: '2024-01-01',
      endDate: '2024-01-14',
      plannedPoints: 40,
      completedPoints: 38,
      velocity: 95,
      burndownTrend: [40, 35, 28, 22, 18, 12, 8, 4, 2, 0],
      defects: 3,
      blockers: 1,
      teamMorale: 8.5
    },
    {
      sprint: 'Sprint 2',
      startDate: '2024-01-15',
      endDate: '2024-01-28',
      plannedPoints: 45,
      completedPoints: 44,
      velocity: 98,
      burndownTrend: [45, 40, 34, 27, 21, 15, 10, 6, 3, 1],
      defects: 2,
      blockers: 0,
      teamMorale: 9.0
    },
    {
      sprint: 'Sprint 3',
      startDate: '2024-01-29',
      endDate: '2024-02-11',
      plannedPoints: 42,
      completedPoints: 39,
      velocity: 93,
      burndownTrend: [42, 38, 32, 28, 23, 18, 14, 9, 6, 3],
      defects: 4,
      blockers: 2,
      teamMorale: 8.2
    },
    {
      sprint: 'Sprint 4',
      startDate: '2024-02-12',
      endDate: '2024-02-25',
      plannedPoints: 48,
      completedPoints: 47,
      velocity: 98,
      burndownTrend: [48, 43, 37, 31, 25, 19, 13, 8, 4, 1],
      defects: 1,
      blockers: 0,
      teamMorale: 9.2
    },
    {
      sprint: 'Sprint 5',
      startDate: '2024-02-26',
      endDate: '2024-03-10',
      plannedPoints: 50,
      completedPoints: 46,
      velocity: 92,
      burndownTrend: [50, 45, 39, 34, 28, 22, 17, 12, 7, 4],
      defects: 5,
      blockers: 1,
      teamMorale: 8.7
    },
    {
      sprint: 'Sprint 6',
      startDate: '2024-03-11',
      endDate: '2024-03-24',
      plannedPoints: 45,
      completedPoints: 43,
      velocity: 96,
      burndownTrend: [45, 40, 35, 29, 24, 18, 13, 8, 4, 2],
      defects: 2,
      blockers: 0,
      teamMorale: 8.9
    }
  ],

  qualityMetrics: {
    codeQuality: {
      codeReviewScore: 4.2,
      testCoverage: 87,
      codeComplexity: 3.1,
      technicalDebt: 12,
      bugDensity: 0.8
    },
    defectTrends: [
      { month: 'Jan', foundDefects: 8, resolvedDefects: 7, openDefects: 1 },
      { month: 'Feb', foundDefects: 12, resolvedDefects: 11, openDefects: 2 },
      { month: 'Mar', foundDefects: 9, resolvedDefects: 10, openDefects: 1 },
      { month: 'Apr', foundDefects: 6, resolvedDefects: 7, openDefects: 0 },
      { month: 'May', foundDefects: 5, resolvedDefects: 5, openDefects: 0 },
      { month: 'Jun', foundDefects: 7, resolvedDefects: 6, openDefects: 1 }
    ],
    performanceMetrics: {
      responseTime: 250,
      throughput: 1200,
      availability: 99.8,
      errorRate: 0.12
    }
  },

  resourceUtilization: [
    { department: 'Engineering', planned: 100, actual: 95, efficiency: 95 },
    { department: 'Design', planned: 80, actual: 85, efficiency: 106 },
    { department: 'QA', planned: 60, actual: 58, efficiency: 97 },
    { department: 'DevOps', planned: 40, actual: 42, efficiency: 105 },
    { department: 'Product', planned: 50, actual: 48, efficiency: 96 }
  ],

  riskIndicators: [
    {
      category: 'Schedule',
      current: 15,
      threshold: 20,
      trend: 'decreasing',
      status: 'green'
    },
    {
      category: 'Budget',
      current: 5,
      threshold: 15,
      trend: 'stable',
      status: 'green'
    },
    {
      category: 'Quality',
      current: 12,
      threshold: 25,
      trend: 'increasing',
      status: 'yellow'
    },
    {
      category: 'Resources',
      current: 18,
      threshold: 30,
      trend: 'stable',
      status: 'green'
    },
    {
      category: 'Technical',
      current: 22,
      threshold: 35,
      trend: 'decreasing',
      status: 'green'
    }
  ],

  blockers: [
    {
      id: 'blocker1',
      title: 'API Rate Limiting Issues',
      description: 'Business Central API has stricter rate limits than expected',
      severity: 'high',
      impact: 'Development velocity reduced by 20%',
      owner: 'Backend Team',
      createdDate: '2024-06-10',
      estimatedResolution: '2024-06-20',
      status: 'in_progress'
    },
    {
      id: 'blocker2',
      title: 'Design System Inconsistencies',
      description: 'Component library needs standardization across modules',
      severity: 'medium',
      impact: 'UI consistency issues affecting user experience',
      owner: 'Design Team',
      createdDate: '2024-06-12',
      estimatedResolution: '2024-06-18',
      status: 'planned'
    },
    {
      id: 'blocker3',
      title: 'Environment Setup Delays',
      description: 'Staging environment configuration taking longer than expected',
      severity: 'medium',
      impact: 'Testing delayed by 3 days',
      owner: 'DevOps Team',
      createdDate: '2024-06-08',
      estimatedResolution: '2024-06-15',
      status: 'resolved'
    }
  ],

  teamPerformance: {
    individualMetrics: [
      {
        name: 'Sarah Chen',
        role: 'Product Manager',
        tasksCompleted: 28,
        tasksPlanned: 30,
        efficiency: 93,
        qualityScore: 4.5,
        collaborationScore: 4.8
      },
      {
        name: 'Michael Rodriguez',
        role: 'Senior Engineer',
        tasksCompleted: 35,
        tasksPlanned: 38,
        efficiency: 92,
        qualityScore: 4.7,
        collaborationScore: 4.6
      },
      {
        name: 'Emily Johnson',
        role: 'UI/UX Designer',
        tasksCompleted: 22,
        tasksPlanned: 24,
        efficiency: 92,
        qualityScore: 4.8,
        collaborationScore: 4.9
      },
      {
        name: 'David Kim',
        role: 'QA Engineer',
        tasksCompleted: 18,
        tasksPlanned: 20,
        efficiency: 90,
        qualityScore: 4.6,
        collaborationScore: 4.4
      }
    ],
    teamHealth: {
      velocity: 95,
      predictability: 87,
      focusFactor: 0.85,
      happinessIndex: 4.6,
      retentionRate: 100
    }
  },

  stakeholderFeedback: [
    {
      stakeholder: 'Executive Team',
      satisfaction: 4.2,
      lastUpdate: '2024-06-10',
      concerns: ['Timeline adherence', 'Budget management'],
      positives: ['Quality delivery', 'Team performance']
    },
    {
      stakeholder: 'Customer Success',
      satisfaction: 4.5,
      lastUpdate: '2024-06-12',
      concerns: ['Feature completeness'],
      positives: ['User experience', 'Performance improvements']
    },
    {
      stakeholder: 'Sales Team',
      satisfaction: 4.0,
      lastUpdate: '2024-06-08',
      concerns: ['Demo readiness', 'Competitive features'],
      positives: ['Progress visibility', 'Regular updates']
    }
  ],

  alerts: [
    {
      id: 'alert1',
      type: 'warning',
      title: 'Sprint Velocity Below Target',
      message: 'Current sprint is tracking 8% below planned velocity',
      severity: 'medium',
      timestamp: '2024-06-15T10:30:00Z',
      dismissed: false
    },
    {
      id: 'alert2',
      type: 'info',
      title: 'Milestone Approaching',
      message: 'Security Audit Complete milestone due in 5 days',
      severity: 'low',
      timestamp: '2024-06-15T09:15:00Z',
      dismissed: false
    },
    {
      id: 'alert3',
      type: 'success',
      title: 'Quality Gate Passed',
      message: 'Code coverage threshold exceeded (87% vs 85% target)',
      severity: 'low',
      timestamp: '2024-06-14T16:45:00Z',
      dismissed: true
    }
  ]
};