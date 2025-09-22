import { useState } from 'react';
import {
  Package, ShoppingCart, Tag, BarChart3, UserCog, Database
} from 'lucide-react';
import Card from '../ui/Card';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  position: { x: number; y: number };
  status: 'completed' | 'in_development' | 'planned';
  complexity: 'low' | 'medium' | 'high';
}

interface Integration {
  name: string;
  description: string;
  icon: string;
  position: { x: number; y: number };
  type: string;
}

interface ProductArchitectureProps {
  coreHub: {
    name: string;
    description: string;
    position: { x: number; y: number };
  };
  modules: Module[];
  integrations: Integration[];
}

const iconMap = {
  Package, ShoppingCart, Tag, BarChart3, UserCog, Database
};

export default function ProductArchitecture({ coreHub, modules, integrations }: ProductArchitectureProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-success-300 bg-success-100 text-success-700';
      case 'in_development':
        return 'border-warning-300 bg-warning-100 text-warning-700';
      case 'planned':
        return 'border-secondary-300 bg-secondary-100 text-secondary-700';
      default:
        return 'border-secondary-300 bg-secondary-100 text-secondary-700';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'bg-success-500';
      case 'medium':
        return 'bg-warning-500';
      case 'high':
        return 'bg-danger-500';
      default:
        return 'bg-secondary-500';
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Product Module Architecture
        </h2>
        <p className="text-sm text-secondary-600">
          Interactive architecture diagram showing core platform and connected modules
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="relative h-96 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border-2 border-secondary-200 overflow-hidden">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {modules.map((module, index) => (
            <line
              key={index}
              x1={`${coreHub.position.x}%`}
              y1={`${coreHub.position.y}%`}
              x2={`${module.position.x}%`}
              y2={`${module.position.y}%`}
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
          {integrations.map((integration, index) => (
            <line
              key={`integration-${index}`}
              x1={`${coreHub.position.x}%`}
              y1={`${coreHub.position.y}%`}
              x2={`${integration.position.x}%`}
              y2={`${integration.position.y}%`}
              stroke="#3b82f6"
              strokeWidth="3"
            />
          ))}
        </svg>

        {/* Core Hub */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 p-4 bg-primary-600 text-white rounded-xl shadow-lg border-4 border-primary-200"
          style={{
            left: `${coreHub.position.x}%`,
            top: `${coreHub.position.y}%`
          }}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
              <Database className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-bold text-sm">{coreHub.name}</h3>
          </div>
        </div>

        {/* Modules */}
        {modules.map((module) => (
          <div
            key={module.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              hoveredModule === module.id ? 'scale-110 shadow-lg z-10' : 'shadow-md'
            } ${getStatusColor(module.status)}`}
            style={{
              left: `${module.position.x}%`,
              top: `${module.position.y}%`
            }}
            onMouseEnter={() => setHoveredModule(module.id)}
            onMouseLeave={() => setHoveredModule(null)}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getIcon(module.icon)}
              </div>
              <h4 className="font-semibold text-xs mb-1">{module.name}</h4>
              <div className="flex items-center justify-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getComplexityColor(module.complexity)}`} />
                <span className="text-xs capitalize">{module.status}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Integrations */}
        {integrations.map((integration, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg shadow-md border-2 border-blue-200"
            style={{
              left: `${integration.position.x}%`,
              top: `${integration.position.y}%`
            }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                {getIcon(integration.icon)}
              </div>
              <h4 className="font-semibold text-xs">{integration.name}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Module Details */}
      <div className="mt-6">
        {hoveredModule && (
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200 animate-fade-in">
            {(() => {
              const module = modules.find(m => m.id === hoveredModule);
              return module ? (
                <div>
                  <h4 className="font-semibold text-primary-900 mb-2">{module.name}</h4>
                  <p className="text-sm text-primary-800 mb-3">{module.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${getComplexityColor(module.complexity)}`} />
                      <span className="capitalize">{module.complexity} complexity</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                      {module.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {!hoveredModule && (
          <div className="text-center py-4 text-secondary-600">
            <p className="text-sm">Hover over modules to see detailed information</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-sm text-secondary-600">Low Complexity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning-500" />
          <span className="text-sm text-secondary-600">Medium Complexity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger-500" />
          <span className="text-sm text-secondary-600">High Complexity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-primary-600 bg-primary-600" />
          <span className="text-sm text-secondary-600">Business Central</span>
        </div>
      </div>
    </Card>
  );
}