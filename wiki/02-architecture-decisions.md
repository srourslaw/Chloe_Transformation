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