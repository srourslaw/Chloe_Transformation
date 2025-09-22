import { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface Integration {
  integration: string;
  complexity: 'low' | 'medium' | 'high';
  timeEstimate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planned' | 'in_progress' | 'completed';
  dependencies: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface IntegrationComplexityHeatMapProps {
  integrations: Integration[];
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'low':
      return 'bg-success-500';
    case 'medium':
      return 'bg-warning-500';
    case 'high':
      return 'bg-danger-500';
    default:
      return 'bg-secondary-400';
  }
};

const getComplexityBgColor = (complexity: string) => {
  switch (complexity) {
    case 'low':
      return 'bg-success-50 border-success-200';
    case 'medium':
      return 'bg-warning-50 border-warning-200';
    case 'high':
      return 'bg-danger-50 border-danger-200';
    default:
      return 'bg-secondary-50 border-secondary-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-danger-100 text-danger-700 border-danger-300';
    case 'high':
      return 'bg-warning-100 text-warning-700 border-warning-300';
    case 'medium':
      return 'bg-primary-100 text-primary-700 border-primary-300';
    case 'low':
      return 'bg-secondary-100 text-secondary-700 border-secondary-300';
    default:
      return 'bg-secondary-100 text-secondary-700 border-secondary-300';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success-600" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-warning-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-secondary-400" />;
  }
};

const getRiskIcon = (riskLevel: string) => {
  switch (riskLevel) {
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-danger-600" />;
    case 'medium':
      return <AlertTriangle className="h-4 w-4 text-warning-600" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-success-600" />;
  }
};

export default function IntegrationComplexityHeatMap({ integrations }: IntegrationComplexityHeatMapProps) {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const complexityLevels = ['low', 'medium', 'high'];
  const priorityLevels = ['low', 'medium', 'high', 'critical'];

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Integration Complexity Heat Map
        </h2>
        <p className="text-sm text-secondary-600">
          Integration complexity analysis with time estimates and risk assessment
        </p>
      </div>

      {/* Heat Map Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-1 mb-4">
          {/* Header */}
          <div className="p-2 bg-secondary-100 text-center font-medium text-secondary-700">Integration</div>
          <div className="p-2 bg-secondary-100 text-center font-medium text-secondary-700">Complexity</div>
          <div className="p-2 bg-secondary-100 text-center font-medium text-secondary-700">Priority</div>
          <div className="p-2 bg-secondary-100 text-center font-medium text-secondary-700">Status</div>

          {/* Data Rows */}
          {integrations.map((integration, index) => (
            <>
              <div
                key={`${index}-name`}
                className="p-3 bg-white border border-secondary-200 cursor-pointer hover:bg-secondary-50 transition-colors"
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="font-medium text-secondary-900 text-sm">{integration.integration}</div>
                <div className="text-xs text-secondary-600">{integration.timeEstimate}</div>
              </div>
              <div
                key={`${index}-complexity`}
                className={clsx(
                  'p-3 border cursor-pointer hover:opacity-80 transition-opacity',
                  getComplexityBgColor(integration.complexity)
                )}
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className={clsx('w-3 h-3 rounded-full', getComplexityColor(integration.complexity))} />
                  <span className="text-sm font-medium capitalize">{integration.complexity}</span>
                </div>
              </div>
              <div
                key={`${index}-priority`}
                className="p-3 bg-white border border-secondary-200 cursor-pointer hover:bg-secondary-50 transition-colors"
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="flex justify-center">
                  <span className={clsx(
                    'px-2 py-1 rounded-full text-xs font-medium border',
                    getPriorityColor(integration.priority)
                  )}>
                    {integration.priority}
                  </span>
                </div>
              </div>
              <div
                key={`${index}-status`}
                className="p-3 bg-white border border-secondary-200 cursor-pointer hover:bg-secondary-50 transition-colors"
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="flex items-center justify-center gap-2">
                  {getStatusIcon(integration.status)}
                  <span className="text-sm capitalize">{integration.status.replace('_', ' ')}</span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Selected Integration Details */}
      {selectedIntegration && (
        <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="font-semibold text-primary-900 mb-4">{selectedIntegration.integration}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-primary-800 mb-3">Integration Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-700">Complexity:</span>
                  <div className="flex items-center gap-2">
                    <div className={clsx('w-3 h-3 rounded-full', getComplexityColor(selectedIntegration.complexity))} />
                    <span className="font-medium capitalize">{selectedIntegration.complexity}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Time Estimate:</span>
                  <span className="font-medium">{selectedIntegration.timeEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Priority:</span>
                  <span className={clsx(
                    'px-2 py-1 rounded text-xs font-medium',
                    getPriorityColor(selectedIntegration.priority)
                  )}>
                    {selectedIntegration.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Risk Level:</span>
                  <div className="flex items-center gap-1">
                    {getRiskIcon(selectedIntegration.riskLevel)}
                    <span className="font-medium capitalize">{selectedIntegration.riskLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-primary-800 mb-3">Dependencies</h4>
              <div className="space-y-2">
                {selectedIntegration.dependencies.map((dependency, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary-400" />
                    <span className="text-primary-700">{dependency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-secondary-50 rounded-lg">
          <h3 className="font-medium text-secondary-900 mb-3">Complexity Distribution</h3>
          <div className="space-y-2">
            {complexityLevels.map(level => {
              const count = integrations.filter(i => i.complexity === level).length;
              const percentage = Math.round((count / integrations.length) * 100);
              return (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={clsx('w-3 h-3 rounded-full', getComplexityColor(level))} />
                    <span className="text-sm capitalize">{level}</span>
                  </div>
                  <span className="text-sm font-medium">{count} ({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-secondary-50 rounded-lg">
          <h3 className="font-medium text-secondary-900 mb-3">Priority Distribution</h3>
          <div className="space-y-2">
            {priorityLevels.map(level => {
              const count = integrations.filter(i => i.priority === level).length;
              const percentage = Math.round((count / integrations.length) * 100);
              return (
                <div key={level} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{level}</span>
                  <span className="text-sm font-medium">{count} ({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-secondary-50 rounded-lg">
          <h3 className="font-medium text-secondary-900 mb-3">Timeline Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-600">Total Integrations:</span>
              <span className="font-medium">{integrations.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">In Progress:</span>
              <span className="font-medium">{integrations.filter(i => i.status === 'in_progress').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Planned:</span>
              <span className="font-medium">{integrations.filter(i => i.status === 'planned').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Completed:</span>
              <span className="font-medium">{integrations.filter(i => i.status === 'completed').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-medium text-secondary-900 mb-2">Complexity Levels</h4>
          <div className="space-y-1">
            {complexityLevels.map(level => (
              <div key={level} className="flex items-center gap-2 text-sm">
                <div className={clsx('w-3 h-3 rounded-full', getComplexityColor(level))} />
                <span className="capitalize">{level} complexity</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-secondary-900 mb-2">Priority Levels</h4>
          <div className="space-y-1">
            {priorityLevels.map(level => (
              <div key={level} className="flex items-center gap-2 text-sm">
                <div className={clsx('w-3 h-3 rounded border', getPriorityColor(level))} />
                <span className="capitalize">{level} priority</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-secondary-900 mb-2">Status Indicators</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-3 w-3 text-success-600" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-warning-600" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-3 w-3 text-secondary-400" />
              <span>Planned</span>
            </div>
          </div>
        </div>
      </div>

      {!selectedIntegration && (
        <div className="mt-6 text-center py-4 text-secondary-600">
          <p className="text-sm">Click on any integration row to see detailed information</p>
        </div>
      )}
    </Card>
  );
}