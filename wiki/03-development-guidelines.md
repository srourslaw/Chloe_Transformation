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