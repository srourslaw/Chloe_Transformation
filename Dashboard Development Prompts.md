# Claude Code Dashboard Development Prompts
## Comprehensive Chloe Transformation Dashboard - Step by Step Guide

---

## Phase 1: Project Setup & Foundation

### Prompt 1: Project Initialization
```
Create a new React-based dashboard project for "Chloe Product Transformation Dashboard". 

Requirements:
- Use Vite + React + TypeScript
- Install and configure: tailwindcss, recharts, lucide-react, date-fns
- Set up a clean folder structure with components, pages, utils, and data folders
- Create a modern, professional color scheme suitable for business presentations
- Set up responsive layout with sidebar navigation
- Include these main sections: Overview, Product Strategy, Team Structure, Sales & Marketing, Financial Projections, Timeline & Milestones, Risk Management
```

### Prompt 2: Dashboard Layout & Navigation
```
Build the main dashboard layout with:

1. Top header with:
   - Company logo placeholder
   - "Chloe Product Transformation Dashboard" title
   - Date/time display
   - Export options (PDF, Excel)

2. Sidebar navigation with icons:
   - 📊 Overview Dashboard
   - 🛠️ Product Strategy
   - 👥 Team Structure
   - 📈 Sales & Marketing
   - 💰 Financial Projections
   - 🗓️ Timeline & Milestones
   - ⚠️ Risk Management
   - 📋 Action Items

3. Main content area with breadcrumb navigation
4. Use modern design with cards, shadows, and smooth transitions
5. Ensure mobile responsiveness
```

---

## Phase 2: Overview Dashboard

### Prompt 3: Executive Summary Dashboard
```
Create an executive overview dashboard page that includes:

1. Key Metrics Cards (4 cards in a row):
   - Total Investment Required: $1.65M
   - Projected Year 3 Revenue: $4.2M (realistic scenario)
   - Target Customers (Year 1): 15
   - Team Size: 11 members

2. Transformation Progress Timeline (visual timeline):
   - Current State: Custom Solution
   - Target State: Multi-tenant SaaS
   - Key milestones from months 1-12

3. Success Probability Gauge:
   - Visual gauge showing 75% success probability (more conservative)
   - Based on market analysis and realistic execution challenges

4. Quick Stats Grid:
   - Market Size: $12.38B retail pricing software market
   - Annual Growth Rate: 8.41% CAGR
   - Competition Level: Medium-High
   - Technical Complexity: High
   - Market Readiness: High

Use professional charts from recharts and make it visually appealing with proper spacing and colors.
```

### Prompt 4: Strategic Overview Charts
```
Add to the overview dashboard:

1. Revenue Growth Projection Chart (Line Chart):
   - X-axis: Months 1-36
   - Y-axis: Revenue ($)
   - Show three scenarios: 
     * Conservative: Month 12: $350K, Month 24: $1.2M, Month 36: $2.8M
     * Realistic: Month 12: $450K, Month 24: $1.8M, Month 36: $4.2M
     * Optimistic: Month 12: $600K, Month 24: $2.4M, Month 36: $5.5M

2. Customer Acquisition Funnel (Funnel Chart):
   - Leads Generated: 400
   - Qualified Prospects: 80
   - Demos Scheduled: 32
   - Trials Started: 20
   - Customers Acquired: 15 (realistic target)

3. Investment Breakdown Pie Chart:
   - Personnel: $1.2M (73%)
   - Technology: $150K (9%)
   - Marketing: $200K (12%)
   - Operations: $100K (6%)

4. Market Positioning Radar Chart:
   - Axes: Features, Price, Support, Integration, Scalability
   - Show Chloe vs 3 competitors (LS Central, Toast POS, Square for Retail)
```

---

## Phase 3: Product Strategy Dashboard

### Prompt 5: Product Architecture Visualization
```
Create a product strategy page with:

1. Current vs Future State Comparison:
   - Left side: "Current State" - Single customer, custom code, manual deployment
   - Right side: "Future State" - Multi-tenant, configurable, automated deployment
   - Use visual icons and arrows to show transformation

2. Product Module Architecture Diagram:
   - Central hub: "Chloe Core Platform"
   - Connected modules: Inventory Management, Order Management, Pricing & Promotions, Reporting & Analytics, User Management
   - Show integration points with Microsoft Business Central
   - Use interactive hover effects to show module details

3. Technical Transformation Roadmap:
   - Phase 1: Architecture Design (Months 1-2)
   - Phase 2: Core Development (Months 3-5)
   - Phase 3: Integration & Testing (Months 6-7)
   - Phase 4: Launch & Optimization (Months 8-12)
   - Visual progress bars for each phase
```

### Prompt 6: Feature Prioritization Matrix
```
Add to product strategy page:

1. Feature Prioritization Matrix (Scatter Plot):
   - X-axis: Implementation Effort (Low to High)
   - Y-axis: Business Impact (Low to High)
   - Plot key features as bubbles:
     - Multi-tenant Architecture (High Impact, High Effort)
     - Inventory Management (High Impact, Medium Effort)
     - Reporting Dashboard (Medium Impact, Low Effort)
     - Mobile App (Medium Impact, High Effort)
     - API Management (High Impact, Medium Effort)

2. Development Sprint Planning:
   - 6 sprints visualization
   - Each sprint showing planned features and estimated completion
   - Progress indicators

3. Integration Complexity Heat Map:
   - Show different integration points
   - Color-coded by complexity level
   - Time estimates for each integration
```

---

## Phase 4: Team Structure Dashboard

### Prompt 7: Organizational Chart & Team Structure
```
Build a team structure page with:

1. Interactive Organizational Chart:
   - CEO/Founder at top
   - Department heads: Product, Engineering, Sales/Marketing, Operations
   - Team members under each department
   - Clickable nodes showing role details, responsibilities, and hiring status

2. Team Hiring Timeline:
   - Gantt chart showing when each position needs to be filled
   - Current status: Hired, In Progress, Not Started
   - Color-coded by priority level

3. Skills Matrix:
   - Table showing required skills vs current team capabilities
   - Gap analysis with recommendations
   - Skills: React, .NET, Azure, Business Central, Sales, Marketing, etc.

4. Team Capacity Planning:
   - Resource allocation chart
   - Show team utilization across different project phases
   - Identify potential bottlenecks
```

### Prompt 8: Team Performance Metrics
```
Add team performance tracking:

1. Weekly Team Metrics Dashboard:
   - Development velocity (story points)
   - Bug resolution rate
   - Code review turnaround time
   - Customer implementation progress

2. Monthly Team Review Cards:
   - Team satisfaction scores
   - Productivity metrics
   - Training completion rates
   - Retention indicators

3. Quarterly Assessment Matrix:
   - Performance vs goals
   - Skill development progress
   - Career progression tracking
   - Team expansion needs

4. Budget Allocation for Team:
   - Personnel costs by role
   - Training and development budget
   - Equipment and tools budget
   - Performance bonus allocation
```

---

## Phase 5: Sales & Marketing Dashboard

### Prompt 9: Go-to-Market Strategy Dashboard
```
Create sales and marketing dashboard:

1. Market Segmentation Analysis:
   - Pie chart showing target segments:
     - Independent Grocery Stores: 60%
     - Regional Chains: 25%
     - Specialty Retailers: 15%
   - Market size and opportunity for each segment

2. Sales Pipeline Visualization:
   - Funnel showing progression from leads to customers
   - Conversion rates at each stage
   - Time in each stage
   - Revenue potential by stage

3. Marketing Campaign Performance:
   - Campaign ROI tracker
   - Lead generation by channel
   - Cost per lead analysis
   - Campaign timeline and results

4. Competitive Positioning Map:
   - 2D plot: Price vs Features
   - Show Chloe and 4-5 competitors
   - Market opportunity gaps highlighted
```

### Prompt 10: Revenue & Pricing Strategy
```
Add revenue and pricing components:

1. Pricing Strategy Comparison Table:
   - Three tiers: Starter ($299), Professional ($499), Enterprise ($799)
   - Feature comparison matrix
   - Revenue projection per tier
   - Customer distribution across tiers
   - Setup fees: $1,000-$3,000 (reduced from original)

2. Customer Lifetime Value (LTV) Calculator:
   - Interactive calculator with sliders
   - Variables: Monthly fee, retention rate (85-90%), upsell rate
   - Realistic LTV/CAC ratio of 4:1 to 6:1
   - Visual representation of LTV across customer segments

3. Market Penetration Strategy:
   - Geographic expansion plan
   - Timeline for entering new markets
   - Resource requirements per market
   - Expected customer acquisition: 3-4 customers/month by Month 8

4. Partnership Program Dashboard:
   - Partner types and revenue sharing
   - Partner performance metrics
   - Pipeline from partners
   - Partner onboarding status
```

---

## Phase 6: Financial Projections Dashboard

### Prompt 11: Financial Modeling Dashboard
```
Build comprehensive financial dashboard:

1. Revenue Projection Models:
   - Monthly recurring revenue (MRR) growth
   - Three scenario modeling: Conservative, Realistic, Aggressive
   - Customer count and average revenue per customer
   - Interactive sliders to adjust assumptions

2. Cost Structure Analysis:
   - Operating expenses breakdown
   - Cost per customer acquisition
   - Gross margin analysis
   - Break-even analysis with visual timeline

3. Cash Flow Projections:
   - Monthly cash flow for 36 months
   - Funding requirements timeline
   - Runway calculation
   - Sensitivity analysis

4. Investment ROI Dashboard:
   - Initial investment breakdown
   - Return on investment timeline
   - Payback period calculation
   - Net present value (NPV) calculation
```

### Prompt 12: Financial KPIs & Metrics
```
Add financial KPIs tracking:

1. SaaS Metrics Dashboard:
   - Monthly Recurring Revenue (MRR)
   - Annual Recurring Revenue (ARR)
   - Customer Acquisition Cost (CAC)
   - Lifetime Value (LTV)
   - Churn rate
   - Revenue per employee

2. Unit Economics:
   - Cost per customer
   - Revenue per customer
   - Gross margin per customer
   - Contribution margin analysis

3. Funding Requirements:
   - Funding timeline and amounts
   - Use of funds breakdown
   - Milestone-based funding gates
   - Investor ROI projections

4. Financial Health Indicators:
   - Burn rate tracking
   - Growth efficiency metrics
   - Profitability timeline
   - Market valuation estimates
```

---

## Phase 7: Timeline & Milestones Dashboard

### Prompt 13: Project Timeline & Milestones
```
Create comprehensive timeline dashboard:

1. Master Project Timeline (Gantt Chart):
   - 12-month view with all major workstreams
   - Product Development, Team Building, Marketing, Sales
   - Dependencies and critical path highlighted
   - Milestone markers with success criteria
   - Realistic customer acquisition: 15 customers by Month 12

2. Sprint Planning Board:
   - Kanban-style board for development sprints
   - To Do, In Progress, Review, Done columns
   - Sprint burndown charts
   - Velocity tracking

3. Milestone Achievement Tracker:
   - Key milestones with target and actual dates
   - Success criteria: 85-90% customer retention, 3-4 customers/month by Month 8
   - Risk indicators for delayed milestones
   - Impact analysis of delays

4. Resource Allocation Timeline:
   - Team member allocation across projects
   - Budget allocation over time
   - Resource conflicts and resolutions
   - Capacity planning adjustments
```

### Prompt 14: Progress Monitoring Dashboard
```
Add progress monitoring features:

1. Overall Project Health Dashboard:
   - Traffic light system for different workstreams
   - Progress percentage by major category
   - Trend analysis of progress over time
   - Predictive completion dates

2. Weekly Progress Reports:
   - Automated progress calculation
   - Accomplishments and blockers
   - Next week's priorities
   - Resource needs and constraints

3. Stakeholder Update Dashboard:
   - Executive summary of progress
   - Key achievements and challenges
   - Financial performance vs plan
   - Strategic adjustments and decisions

4. Risk-Adjusted Timeline:
   - Timeline with risk factors included
   - Probability-weighted completion dates
   - Contingency plans and triggers
   - Decision points and go/no-go gates
```

---

## Phase 8: Risk Management Dashboard

### Prompt 15: Risk Assessment & Management
```
Build risk management dashboard:

1. Risk Heat Map:
   - 2D matrix: Probability vs Impact
   - Color-coded risk levels
   - Risk categories: Technical, Market, Operational, Financial
   - Clickable risks showing mitigation strategies

2. Risk Register Table:
   - Risk description and category
   - Probability and impact scores
   - Current mitigation status
   - Owner and due dates
   - Cost of mitigation

3. Risk Timeline:
   - When risks are most likely to occur
   - Risk evolution over project timeline
   - Mitigation milestones
   - Decision points for risk response

4. Monte Carlo Simulation:
   - Project completion probability distribution
   - Budget variance analysis
   - Schedule variance analysis
   - Success probability under different scenarios
```

### Prompt 16: Contingency Planning Dashboard
```
Add contingency planning features:

1. Scenario Planning Matrix:
   - Best case, worst case, most likely scenarios
   - Impact on timeline, budget, and resources
   - Trigger events for each scenario
   - Response strategies for each scenario

2. Decision Tree Visualization:
   - Key decision points in the project
   - Options and outcomes for each decision
   - Probability and value of each outcome
   - Recommended decision path

3. Early Warning System:
   - KPIs that indicate potential problems
   - Threshold values for alerts
   - Escalation procedures
   - Automated monitoring and notifications

4. Recovery Planning:
   - Recovery strategies for major setbacks
   - Resource reallocation options
   - Timeline compression techniques
   - Quality vs speed trade-offs
```

---

## Phase 9: Action Items & Reporting

### Prompt 17: Action Items Management
```
Create action items and task management:

1. Action Items Dashboard:
   - All action items from the transformation plan
   - Priority levels and due dates
   - Assigned owners and status
   - Dependencies and blocking items

2. Task Management Board:
   - Kanban board for all tasks
   - Filter by owner, priority, category
   - Time tracking and effort estimates
   - Integration with timeline dashboard

3. Deliverables Tracker:
   - All deliverables from the plan
   - Completion status and quality gates
   - Review and approval workflow
   - Client presentation materials

4. Communication Plan:
   - Stakeholder communication schedule
   - Meeting cadence and agendas
   - Report distribution lists
   - Escalation procedures
```

### Prompt 18: Reporting & Export Features
```
Add comprehensive reporting capabilities:

1. Executive Report Generator:
   - One-page executive summary
   - Key metrics and progress indicators
   - Risk assessment summary
   - Next actions and decisions needed

2. Detailed Progress Reports:
   - Multi-page detailed reports
   - Charts and graphs from all dashboards
   - Commentary and analysis
   - Recommendations and next steps

3. Export Capabilities:
   - PDF export of all dashboards
   - Excel export of data tables
   - PowerPoint slides for presentations
   - CSV data exports for analysis

4. Dashboard Sharing:
   - Shareable links for stakeholders
   - Permission-based access control
   - Real-time vs snapshot sharing
   - Mobile-optimized views
```

---

## Phase 10: Final Polish & Deployment

### Prompt 19: UI/UX Enhancement
```
Polish the dashboard for professional presentation:

1. Visual Design Enhancement:
   - Consistent color scheme and typography
   - Professional icons and imagery
   - Smooth animations and transitions
   - Loading states and error handling

2. Responsive Design:
   - Mobile-first approach
   - Tablet and desktop optimization
   - Touch-friendly interactions
   - Accessible design principles

3. Performance Optimization:
   - Fast loading times
   - Smooth scrolling and navigation
   - Efficient data rendering
   - Memory usage optimization

4. User Experience:
   - Intuitive navigation
   - Clear information hierarchy
   - Contextual help and tooltips
   - Keyboard shortcuts
```

### Prompt 20: Deployment & Documentation
```
Prepare for deployment and handover:

1. Build Configuration:
   - Production build optimization
   - Environment variable setup
   - Security considerations
   - Performance monitoring

2. Deployment Package:
   - Docker containerization
   - Cloud deployment scripts
   - Database setup scripts
   - Configuration documentation

3. User Documentation:
   - Dashboard user guide
   - Feature explanations
   - Troubleshooting guide
   - FAQ section

4. Client Handover Package:
   - Source code with documentation
   - Deployment instructions
   - Maintenance guide
   - Enhancement roadmap

Include instructions for hosting on Vercel, Netlify, or similar platforms for easy client access.
```

---

## Usage Instructions

1. **Use these prompts sequentially** - Each prompt builds on the previous ones
2. **Customize as needed** - Adjust prompts based on your client's specific requirements
3. **Test thoroughly** - Each phase should be tested before moving to the next
4. **Document everything** - Keep track of changes and customizations
5. **Get client feedback** - Review each major phase with your client before proceeding

## Expected Timeline
- **Phase 1-2**: 2-3 days (Foundation and layout)
- **Phase 3-4**: 3-4 days (Core dashboards)
- **Phase 5-6**: 3-4 days (Business intelligence)
- **Phase 7-8**: 2-3 days (Project management)
- **Phase 9-10**: 2-3 days (Polish and deployment)

**Total**: 12-17 days for complete dashboard development

## Tips for Success
- Start with Phase 1 and don't skip ahead
- Test each component thoroughly before adding the next
- Use real data where possible for demonstration
- Focus on professional visual design throughout
- Ensure mobile responsiveness from the beginning
- Plan for easy updates and maintenance