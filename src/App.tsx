import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import PasswordProtection from './components/auth/PasswordProtection';
import Dashboard from './pages/Dashboard';
import Strategy from './pages/Strategy';
import Team from './pages/Team';
import Sales from './pages/Sales';
import Financial from './pages/Financial';
import Project from './pages/Project';
import Risk from './pages/Risk';

function App() {
  return (
    <PasswordProtection>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/team" element={<Team />} />
          <Route path="/marketing" element={<Sales />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/project" element={<Project />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </PasswordProtection>
  );
}

export default App;