# Claude Code Initial Setup Prompts
## Step-by-Step Project Initialization

---

## Prompt 1: Project Context & GitHub Setup

```
# Claude Code Project Kickoff Statement

For this project, we will use **GitHub** as the single source of truth and your persistent context. Treat the repository's commit history, branch structure, and file changes as your "memory" of the project.

## GitHub Repository
- Repository: https://github.com/srourslaw/Chloe_Transformation
- This will be our central source of truth for all project decisions, code changes, and documentation

## How to Use GitHub Context
- **Commit History as Living Documentation**  
  Always read and interpret commit messages to understand what changed, why, and when. Use `git log`, `git diff`, and branch comparisons to track the evolution of the codebase and architecture decisions.

- **Pattern Recognition & Reuse**  
  Identify and reuse established coding, architecture, and testing patterns. When adding new features, APIs, or modules, follow these patterns unless explicitly told otherwise. Maintain consistent approaches to error handling, authentication, and integration.

- **Error Resolution via Comparison**  
  When something breaks, compare the current implementation to previously working versions and suggest fixes based on proven solutions from earlier commits.

- **Architecture Continuity**  
  For new integrations, follow the same structure and conventions used in similar past work, keeping error handling, logging, and testing strategies consistent.

## Development Workflow
- **Commit Strategy**  
  Commit after each successful test checkpoint with clear, descriptive messages. Use "fix" or "debug" commits when investigating failed tests.

- **Branch Strategy**  
  Create feature branches for major phases or complex features. Merge into `main` only after all tests pass.

## Your Role
- **Before starting a new phase**: Review the README and recent commits to understand the current state.  
- **During development**: Suggest next steps based on commit history and established patterns.  
- **When debugging**: Compare broken code to working implementations.  
- **When validating changes**: Ensure new work does not break existing functionality by referencing and running the test suite.

## Key Principles
1. **Persistent Context** – Always leverage GitHub history before making suggestions.  
2. **Consistency** – Maintain coding, testing, and architecture patterns.  
3. **Continuity** – Ensure smooth integration without regressions.  
4. **Documentation** – Treat commit messages as part of the project's knowledge base.  
5. **Safety Net** – Use Git history for quick rollbacks if needed.  
6. **Testing Discipline** – Ensure all tests pass before merging or moving to the next phase.

**Bottom Line:** GitHub is your "memory" for this project. Always reference commit history, branch structure, and past implementations before making recommendations. Use established patterns for architecture, testing, and error handling. Ensure every change is documented, tested, and consistent with the project's evolution. Your guidance should always be context‑aware, pattern‑aligned, and quality‑driven.

## CRITICAL REQUIREMENTS
1. **Always commit changes** to GitHub after any code modification
2. **Document everything** in the wiki directory
3. **Follow established patterns** from previous commits
4. **Test before committing** to ensure quality

Now, let's start by setting up the project structure and initializing the repository properly.
```

---

## Prompt 2: Repository Initialization & Structure

```
Initialize the Chloe Transformation Dashboard project with the following structure:

## Step 1: Repository Setup
1. Clone or initialize the repository: https://github.com/srourslaw/Chloe_Transformation
2. Set up proper Git configuration with your credentials
3. Create initial branch structure if needed

## Step 2: Project Structure Creation
Create the following directory structure:

```
Chloe_Transformation/
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── index.html
├── .gitignore
├── .env.example
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── dashboard/
│   │   │   ├── OverviewDashboard.tsx
│   │   │   ├── ProductStrategy.tsx
│   │   │   ├── TeamStructure.tsx
│   │   │   ├── SalesMarketing.tsx
│   │   │   ├── FinancialProjections.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── RiskManagement.tsx
│   │   │   └── ActionItems.tsx
│   │   ├── charts/
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── MetricsCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Timeline.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── Loading.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Strategy.tsx
│   │   ├── Team.tsx
│   │   ├── Marketing.tsx
│   │   ├── Financial.tsx
│   │   ├── Project.tsx
│   │   └── Risk.tsx
│   ├── data/
│   │   ├── mockData.ts
│   │   ├── constants.ts
│   │   └── types.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── formatters.ts
│   │   └── api.ts
│   └── hooks/
│       ├── useData.ts
│       └── useAuth.ts
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       └── icons/
├── tests/
│   ├── setup.ts
│   ├── components/
│   └── integration/
├── docs/
│   ├── architecture.md
│   ├── api-documentation.md
│   └── deployment.md
└── wiki/
    ├── 01-project-overview.md
    ├── 02-architecture-decisions.md
    ├── 03-development-guidelines.md
    ├── 04-feature-specifications.md
    ├── 05-testing-strategy.md
    ├── 06-deployment-guide.md
    ├── 07-maintenance-procedures.md
    └── 99-changelog.md
```

## Step 3: Initial Commit
After creating the structure, make an initial commit with message:
"feat: initial project structure for Chloe Transformation Dashboard"

## Step 4: Technology Stack Setup
Initialize the project with:
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons
- Date-fns for date handling
- React Router for navigation

Please create this structure and initialize the repository properly.
```

---

## Prompt 3: Wiki Documentation Setup

```
Create comprehensive documentation in the wiki directory. This will serve as our project knowledge base and should be updated with every significant change.

## Create the following wiki files:

### 1. wiki/01-project-overview.md
```markdown
# Chloe Transformation Dashboard - Project Overview

## Project Description
Comprehensive dashboard for transforming Chloe from a single-customer consulting solution into a multi-tenant SaaS product for grocery retailers.

## Business Context
- **Client**: WMS Company
- **Current State**: Custom-built grocery store management app for one customer
- **Target State**: Scalable, multi-tenant SaaS product
- **Market**: Grocery stores and retail chains

## Key Objectives
1. Product transformation strategy
2. Team structure and delivery framework
3. Sales and marketing strategy
4. Leadership execution framework

## Dashboard Sections
- Executive Overview
- Product Strategy
- Team Structure
- Sales & Marketing
- Financial Projections
- Timeline & Milestones
- Risk Management
- Action Items

## Success Metrics
- Professional presentation-ready dashboard
- Interactive data visualizations
- Export capabilities (PDF, Excel, PowerPoint)
- Mobile-responsive design
- Real-time progress tracking

## Timeline
12-17 days for complete development
```

### 2. wiki/02-architecture-decisions.md
```markdown
# Architecture Decision Record (ADR)

## Technology Stack Decisions

### Frontend Framework: React + TypeScript
**Decision**: Use React 18 with TypeScript
**Rationale**: 
- Type safety for complex data structures
- Component reusability
- Large ecosystem for business dashboards
- Client team likely familiar with React

### Build Tool: Vite
**Decision**: Use Vite instead of Create React App
**Rationale**:
- Faster development server
- Better build performance
- Modern tooling
- TypeScript support out of the box

### Styling: Tailwind CSS
**Decision**: Use Tailwind CSS
**Rationale**:
- Rapid development
- Consistent design system
- Responsive design utilities
- Small bundle size

### Charts: Recharts
**Decision**: Use Recharts for data visualization
**Rationale**:
- React-first charting library
- Good TypeScript support
- Responsive charts
- Business dashboard friendly

### State Management: React State + Context
**Decision**: Use built-in React state management
**Rationale**:
- Dashboard doesn't require complex state management
- Simpler architecture
- Less dependencies
- Easier maintenance

## Architectural Patterns

### Component Structure
- **Layout Components**: Header, Sidebar, MainLayout
- **Dashboard Components**: One per major section
- **Chart Components**: Reusable visualization components
- **UI Components**: Basic reusable elements

### Data Flow
- Mock data in `data/mockData.ts`
- Custom hooks for data fetching
- Props drilling for simple state
- Context for global state when needed

### File Organization
- Feature-based organization
- Shared components in `components/ui/`
- Business logic in custom hooks
- Types centralized in `data/types.ts`
```

### 3. wiki/03-development-guidelines.md
```markdown
# Development Guidelines

## Git Workflow

### Commit Message Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/[feature-name]`: Feature development
- `fix/[bug-name]`: Bug fixes

### Code Quality Standards
- TypeScript strict mode
- ESLint + Prettier configuration
- Component documentation with JSDoc
- Meaningful variable and function names
- Consistent file naming conventions

## Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for data flows
- Visual regression testing for charts

## Documentation Requirements
- Update wiki after major changes
- Component documentation with examples
- API documentation for data structures
- Architecture decisions recorded in ADR
```

### 4. wiki/04-feature-specifications.md
```markdown
# Feature Specifications

## Dashboard Sections

### 1. Executive Overview
**Purpose**: High-level metrics and project status
**Components**:
- Key metrics cards (Investment, Revenue, Customers, Team Size)
- Transformation progress timeline
- Success probability gauge
- Market statistics grid

### 2. Product Strategy
**Purpose**: Technical transformation details
**Components**:
- Current vs Future state comparison
- Product module architecture diagram
- Technical roadmap
- Feature prioritization matrix

### 3. Team Structure
**Purpose**: Organizational planning and tracking
**Components**:
- Interactive organizational chart
- Hiring timeline
- Skills matrix and gap analysis
- Team capacity planning

### 4. Sales & Marketing
**Purpose**: Go-to-market strategy and performance
**Components**:
- Market segmentation analysis
- Sales pipeline visualization
- Marketing campaign performance
- Competitive positioning map

### 5. Financial Projections
**Purpose**: Financial modeling and ROI analysis
**Components**:
- Revenue projection models
- Cost structure analysis
- Cash flow projections
- SaaS metrics dashboard

### 6. Timeline & Milestones
**Purpose**: Project management and progress tracking
**Components**:
- Master project timeline (Gantt)
- Sprint planning board
- Milestone achievement tracker
- Progress monitoring dashboard

### 7. Risk Management
**Purpose**: Risk assessment and mitigation
**Components**:
- Risk heat map
- Risk register table
- Scenario planning matrix
- Early warning system

### 8. Action Items
**Purpose**: Task management and deliverables
**Components**:
- Action items dashboard
- Task management board
- Deliverables tracker
- Communication plan
```

### 5. wiki/05-testing-strategy.md
```markdown
# Testing Strategy

## Testing Pyramid

### Unit Tests (70%)
- Utility functions
- Data transformations
- Custom hooks
- Pure components

### Integration Tests (20%)
- Component interactions
- Data flow testing
- Navigation testing
- Chart rendering

### End-to-End Tests (10%)
- User workflows
- Export functionality
- Responsive design
- Performance testing

## Testing Tools
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Playwright**: E2E testing

## Test Coverage Goals
- Minimum 80% code coverage
- 100% coverage for utility functions
- Critical path testing for all user workflows

## Testing Checklist
- [ ] All new components have tests
- [ ] Data transformations are tested
- [ ] Error states are tested
- [ ] Loading states are tested
- [ ] Responsive design is tested
- [ ] Accessibility is tested
```

After creating these wiki files, commit them with message:
"docs: initial wiki documentation and project guidelines"

Please create this wiki structure and initial documentation.
```

---

## Prompt 4: Package.json and Dependencies Setup

```
Create the package.json file and install all necessary dependencies for the Chloe Transformation Dashboard.

## Required Dependencies

### Core Framework
- react@^18.2.0
- react-dom@^18.2.0
- react-router-dom@^6.8.0

### Build Tools
- vite@^4.1.0
- @vitejs/plugin-react@^3.1.0
- typescript@^4.9.3

### Styling
- tailwindcss@^3.2.0
- autoprefixer@^10.4.13
- postcss@^8.4.21

### Data Visualization
- recharts@^2.5.0
- d3@^7.8.0 (for advanced charts)

### Icons & UI
- lucide-react@^0.263.1
- @headlessui/react@^1.7.0 (for accessible components)

### Utilities
- date-fns@^2.29.0
- clsx@^1.2.0 (for conditional classes)
- react-hot-toast@^2.4.0 (for notifications)

### Development Dependencies
- @types/react@^18.0.27
- @types/react-dom@^18.0.10
- @types/d3@^7.4.0
- eslint@^8.35.0
- @typescript-eslint/eslint-plugin@^5.54.0
- @typescript-eslint/parser@^5.54.0
- prettier@^2.8.4
- @testing-library/react@^14.0.0
- @testing-library/jest-dom@^5.16.5
- jest@^29.5.0
- vitest@^0.28.5

## Package.json Structure
Create a comprehensive package.json with:
- Proper project metadata
- Script commands for development, build, test, lint
- Proper dependency versions
- Engine requirements

## Configuration Files
Also create:
- tsconfig.json (TypeScript configuration)
- vite.config.ts (Vite configuration)
- tailwind.config.js (Tailwind configuration)
- .eslintrc.json (ESLint configuration)
- .prettierrc (Prettier configuration)
- .gitignore (Git ignore rules)

After creating all configuration files, run npm install and commit with message:
"chore: setup project dependencies and configuration files"

Please create these files and ensure all dependencies are properly configured.
```

---

## Prompt 5: Initial Application Structure

```
Create the basic application structure with routing, layout components, and initial dashboard pages.

## Tasks to Complete:

### 1. Main Application Files
Create the following core files:
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Main app component with routing
- `src/index.css` - Global styles with Tailwind imports

### 2. Layout Components
Create layout components in `src/components/layout/`:
- `Header.tsx` - Top navigation bar with title, date, export options
- `Sidebar.tsx` - Side navigation menu with dashboard sections
- `MainLayout.tsx` - Main layout wrapper combining header and sidebar

### 3. Dashboard Page Components
Create placeholder components in `src/components/dashboard/`:
- `OverviewDashboard.tsx` - Executive summary and key metrics
- `ProductStrategy.tsx` - Product transformation details
- `TeamStructure.tsx` - Team organization and planning
- `SalesMarketing.tsx` - Go-to-market strategy
- `FinancialProjections.tsx` - Financial modeling
- `Timeline.tsx` - Project timeline and milestones
- `RiskManagement.tsx` - Risk assessment
- `ActionItems.tsx` - Task management

### 4. Basic UI Components
Create reusable components in `src/components/ui/`:
- `Card.tsx` - Card container component
- `Button.tsx` - Button component with variants
- `Loading.tsx` - Loading spinner component
- `MetricsCard.tsx` - Card for displaying key metrics

### 5. Type Definitions
Create `src/data/types.ts` with TypeScript interfaces for:
- Dashboard data structures
- Navigation items
- Metrics and KPIs
- Team members
- Financial data

### 6. Mock Data
Create `src/data/mockData.ts` with sample data for:
- Key performance indicators
- Financial projections
- Team structure
- Timeline milestones
- Risk assessments

### 7. Routing Setup
Implement React Router with:
- Protected routes
- Navigation between dashboard sections
- Breadcrumb navigation
- 404 error handling

## Requirements:
- Use TypeScript for all components
- Implement responsive design with Tailwind
- Follow consistent component structure
- Add proper error boundaries
- Include loading states
- Ensure accessibility standards

## Testing:
- Create basic tests for each component
- Test routing functionality
- Verify responsive design
- Check accessibility compliance

After completing this structure, commit with message:
"feat: implement basic application structure with routing and layout components"

The application should be runnable with `npm run dev` and display a functional dashboard with navigation between sections.
```

---

## Summary

Use these 5 prompts in sequence before starting the main dashboard development. This will ensure:

1. ✅ **Proper GitHub integration** and context awareness
2. ✅ **Complete project structure** following best practices  
3. ✅ **Comprehensive documentation** in the wiki directory
4. ✅ **All dependencies configured** correctly
5. ✅ **Basic application running** with navigation

After completing these initial setup prompts, you can then proceed with the 20 detailed dashboard development prompts I provided earlier. Claude will have full context, proper documentation, and a solid foundation to build upon.

**Each prompt should result in a Git commit**, building up the project history that Claude will use as its "memory" for future development decisions.