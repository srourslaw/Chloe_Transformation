import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BarChart3,
  Target,
  Users,
  Megaphone,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckSquare,
  Menu,
  X
} from 'lucide-react';
import { NavigationItem } from '@/data/types';

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    name: 'Executive Overview',
    href: '/dashboard',
    icon: 'BarChart3',
    description: 'Key metrics and project status'
  },
  {
    id: 'strategy',
    name: 'Product Strategy',
    href: '/strategy',
    icon: 'Target',
    description: 'Technical transformation details'
  },
  {
    id: 'team',
    name: 'Team Structure',
    href: '/team',
    icon: 'Users',
    description: 'Organizational planning'
  },
  {
    id: 'marketing',
    name: 'Sales & Marketing',
    href: '/marketing',
    icon: 'Megaphone',
    description: 'Go-to-market strategy'
  },
  {
    id: 'financial',
    name: 'Financial Projections',
    href: '/financial',
    icon: 'DollarSign',
    description: 'Financial modeling and ROI'
  },
  {
    id: 'project',
    name: 'Timeline & Milestones',
    href: '/project',
    icon: 'Calendar',
    description: 'Project management'
  },
  {
    id: 'risk',
    name: 'Risk Management',
    href: '/risk',
    icon: 'AlertTriangle',
    description: 'Risk assessment'
  }
];

const iconMap = {
  BarChart3,
  Target,
  Users,
  Megaphone,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckSquare
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 border-r border-secondary-200 bg-white
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-semibold text-secondary-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2 pt-12 lg:pt-12">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    title={item.description}
                  >
                    {getIcon(item.icon)}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.description && (
                        <span className="text-xs text-secondary-500">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-secondary-200 p-4">
            <div className="text-xs text-secondary-500">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}