import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface CapacityAllocation {
  department: string;
  hours: number;
  percentage: number;
}

interface ProjectPhase {
  phase: string;
  weeks: string;
  totalCapacity: number;
  allocations: CapacityAllocation[];
  utilization: number;
  bottlenecks: string[];
}

interface ResourceConflict {
  resource: string;
  conflict: string;
  impact: 'low' | 'medium' | 'high';
  resolution: string;
}

interface TeamCapacityPlanningProps {
  phases: ProjectPhase[];
  resourceConflicts: ResourceConflict[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const getUtilizationColor = (utilization: number) => {
  if (utilization >= 95) return 'text-danger-700 bg-danger-100';
  if (utilization >= 85) return 'text-warning-700 bg-warning-100';
  if (utilization >= 70) return 'text-success-700 bg-success-100';
  return 'text-secondary-700 bg-secondary-100';
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'text-danger-700 bg-danger-100 border-danger-300';
    case 'medium':
      return 'text-warning-700 bg-warning-100 border-warning-300';
    case 'low':
      return 'text-success-700 bg-success-100 border-success-300';
    default:
      return 'text-secondary-700 bg-secondary-100 border-secondary-300';
  }
};

const getImpactIcon = (impact: string) => {
  switch (impact) {
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-danger-600" />;
    case 'medium':
      return <Clock className="h-4 w-4 text-warning-600" />;
    case 'low':
      return <TrendingUp className="h-4 w-4 text-success-600" />;
    default:
      return <Users className="h-4 w-4 text-secondary-600" />;
  }
};

export default function TeamCapacityPlanning({ phases, resourceConflicts }: TeamCapacityPlanningProps) {
  // Prepare data for capacity utilization chart
  const utilizationData = phases.map(phase => ({
    phase: phase.phase.replace('Phase ', 'P').replace(': ', '\n'),
    utilization: phase.utilization,
    capacity: phase.totalCapacity,
    weeks: phase.weeks
  }));

  // Calculate overall statistics
  const totalCapacity = phases.reduce((sum, phase) => sum + phase.totalCapacity, 0);
  const avgUtilization = phases.reduce((sum, phase) => sum + phase.utilization, 0) / phases.length;
  const highRiskPhases = phases.filter(phase => phase.utilization >= 95).length;
  const totalBottlenecks = phases.reduce((sum, phase) => sum + phase.bottlenecks.length, 0);

  // Department allocation across all phases
  const departmentAllocations = phases.reduce((acc, phase) => {
    phase.allocations.forEach(allocation => {
      if (!acc[allocation.department]) {
        acc[allocation.department] = 0;
      }
      acc[allocation.department] += allocation.hours;
    });
    return acc;
  }, {} as Record<string, number>);

  const departmentData = Object.entries(departmentAllocations).map(([department, hours], index) => ({
    name: department,
    value: hours,
    percentage: Math.round((hours / totalCapacity) * 100),
    color: COLORS[index % COLORS.length]
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Team Capacity Planning
        </h2>
        <p className="text-sm text-secondary-600">
          Resource allocation analysis across project phases with bottleneck identification
        </p>
      </div>

      {/* Capacity Overview */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Total Capacity</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{totalCapacity}h</div>
          <div className="text-sm text-primary-700">across all phases</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Avg Utilization</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{avgUtilization.toFixed(1)}%</div>
          <div className="text-sm text-warning-700">team capacity</div>
        </div>

        <div className="p-4 bg-danger-50 rounded-lg border border-danger-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-danger-600" />
            <span className="font-medium text-danger-900">High Risk Phases</span>
          </div>
          <div className="text-2xl font-bold text-danger-900">{highRiskPhases}</div>
          <div className="text-sm text-danger-700">over 95% utilization</div>
        </div>

        <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-secondary-600" />
            <span className="font-medium text-secondary-900">Bottlenecks</span>
          </div>
          <div className="text-2xl font-bold text-secondary-900">{totalBottlenecks}</div>
          <div className="text-sm text-secondary-700">identified issues</div>
        </div>
      </div>

      {/* Phase-by-Phase Breakdown */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Phase Capacity Breakdown</h3>
        <div className="space-y-6">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-secondary-900">{phase.phase}</h4>
                  <p className="text-sm text-secondary-600">{phase.weeks} • {phase.totalCapacity}h total capacity</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getUtilizationColor(phase.utilization)
                  )}>
                    {phase.utilization}% utilized
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Allocation */}
                <div>
                  <h5 className="font-medium text-secondary-800 mb-3">Department Allocation</h5>
                  <div className="space-y-2">
                    {phase.allocations.map((allocation, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm text-secondary-700">{allocation.department}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-secondary-900">{allocation.hours}h</div>
                          <div className="text-xs text-secondary-600">{allocation.percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottlenecks */}
                <div>
                  <h5 className="font-medium text-secondary-800 mb-3">Identified Bottlenecks</h5>
                  {phase.bottlenecks.length > 0 ? (
                    <div className="space-y-2">
                      {phase.bottlenecks.map((bottleneck, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-warning-600 flex-shrink-0" />
                          <span className="text-secondary-700">{bottleneck}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-success-700">No bottlenecks identified</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Utilization Chart */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Capacity Utilization by Phase</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={utilizationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="phase" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `${value}%`,
                name === 'utilization' ? 'Utilization' : name
              ]}
              labelFormatter={(label) => `Phase: ${label.replace('\n', ' ')}`}
            />
            <Bar
              dataKey="utilization"
              fill="#3b82f6"
              name="Utilization %"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department Distribution */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Department Resource Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}h`, 'Hours']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Department Summary</h3>
          <div className="space-y-3">
            {departmentData.map((dept, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-secondary-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="font-medium text-secondary-900">{dept.name}</span>
                  </div>
                  <span className="text-sm font-medium text-secondary-600">{dept.percentage}%</span>
                </div>
                <div className="text-sm text-secondary-600">{dept.value} hours total allocation</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Conflicts */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Resource Conflicts & Resolutions</h3>
        <div className="space-y-4">
          {resourceConflicts.map((conflict, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border border-secondary-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getImpactIcon(conflict.impact)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-secondary-900">{conflict.resource}</h4>
                    <span className={clsx(
                      'px-2 py-1 rounded text-xs font-medium border',
                      getImpactColor(conflict.impact)
                    )}>
                      {conflict.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-secondary-700 mb-2">{conflict.conflict}</p>
                  <div className="p-2 bg-primary-50 rounded text-sm text-primary-800">
                    <strong>Resolution:</strong> {conflict.resolution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h3 className="font-semibold text-warning-900 mb-3">Capacity Planning Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Immediate Actions</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Hire DevOps engineer before Phase 3 (Week 21)</li>
              <li>• Consider extending Phase 2 timeline by 2 weeks</li>
              <li>• Cross-train developers on testing procedures</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Long-term Strategy</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Build redundancy in critical skill areas</li>
              <li>• Implement knowledge sharing sessions</li>
              <li>• Plan for 20% capacity buffer in future phases</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}