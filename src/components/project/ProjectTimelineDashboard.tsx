import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, Target, AlertTriangle, Users, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import { projectTimelineData } from '../../data/mockData';

const { projectOverview, phases, milestones, tasks, budgetTracking, teamVelocity } = projectTimelineData;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-success-100 text-success-800 border-success-200';
    case 'in_progress':
      return 'bg-primary-100 text-primary-800 border-primary-200';
    case 'planned':
      return 'bg-secondary-100 text-secondary-800 border-secondary-200';
    case 'upcoming':
      return 'bg-warning-100 text-warning-800 border-warning-200';
    default:
      return 'bg-secondary-100 text-secondary-800 border-secondary-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'text-red-600';
    case 'high':
      return 'text-orange-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-secondary-600';
  }
};

export default function ProjectTimelineDashboard() {
  // Calculate phase progress for timeline visualization
  const phaseProgressData = phases.map(phase => ({
    name: phase.name,
    progress: phase.progress,
    budget: phase.budget / 1000000,
    spent: phase.spent / 1000000,
    status: phase.status
  }));

  // Milestone timeline data
  const milestoneTimelineData = milestones.map(milestone => ({
    name: milestone.name,
    date: new Date(milestone.date).getTime(),
    status: milestone.status,
    priority: milestone.priority,
    phase: milestone.phase
  }));

  // Budget utilization data
  const budgetData = budgetTracking.byPhase.map(item => ({
    phase: item.phase.replace(' & ', '\n& '),
    budgeted: item.budgeted / 1000000,
    spent: item.spent / 1000000,
    variance: item.variance / 1000000
  }));

  // Active tasks data
  const activeTasks = tasks.filter(task => task.status === 'in_progress');
  const taskProgressData = activeTasks.map(task => ({
    name: task.name.substring(0, 20) + '...',
    progress: task.progress,
    estimatedHours: task.estimatedHours,
    actualHours: task.actualHours,
    efficiency: (task.actualHours / task.estimatedHours) * 100
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Project Timeline Dashboard
        </h2>
        <p className="text-sm text-secondary-600">
          Comprehensive project tracking including phases, milestones, budget, and team performance
        </p>
      </div>

      {/* Project Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Project Progress</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{projectOverview.completionPercentage}%</div>
          <div className="text-sm text-primary-700">overall completion</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Budget Status</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            ${(budgetTracking.spentToDate / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-success-700">
            of ${(budgetTracking.totalBudget / 1000000).toFixed(1)}M budget
          </div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Next Milestone</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{projectOverview.daysToNextMilestone}</div>
          <div className="text-sm text-warning-700">days to {projectOverview.nextMilestone}</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Team Velocity</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {teamVelocity[teamVelocity.length - 1]?.velocity || 0}%
          </div>
          <div className="text-sm text-purple-700">current sprint performance</div>
        </div>
      </div>

      {/* Project Phase Progress */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Project Phases Progress</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={phaseProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: any, name: string) => [
                name === 'progress' ? `${value}%` : `$${Number(value).toFixed(1)}M`,
                name === 'progress' ? 'Progress' :
                name === 'budget' ? 'Budget' : 'Spent'
              ]}
            />
            <Bar dataKey="progress" fill="#3b82f6" name="Progress %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Milestone Timeline */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Project Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className={`w-4 h-4 rounded-full ${
                milestone.status === 'completed' ? 'bg-success-500' :
                milestone.status === 'in_progress' ? 'bg-primary-500' :
                milestone.status === 'upcoming' ? 'bg-warning-500' :
                'bg-secondary-400'
              }`} />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-secondary-900">{milestone.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(milestone.status)}`}>
                    {milestone.status.replace('_', ' ')}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(milestone.priority)}`}>
                    {milestone.priority}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary-600">
                  <div>
                    <span className="font-medium">Date:</span> {new Date(milestone.date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Deliverables:</span> {milestone.deliverables.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Stakeholders:</span> {milestone.stakeholders.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Tracking */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Budget vs Actual Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="phase" />
              <YAxis tickFormatter={(value) => `$${value}M`} />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `$${Number(value).toFixed(1)}M`,
                  name === 'budgeted' ? 'Budgeted' :
                  name === 'spent' ? 'Spent' : 'Variance'
                ]}
              />
              <Bar dataKey="budgeted" fill="#94a3b8" name="Budgeted" />
              <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
              <Bar dataKey="variance" fill="#10b981" name="Variance" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Team Velocity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teamVelocity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sprint" />
              <YAxis domain={[80, 100]} />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `${value}${name === 'velocity' ? '%' : ' points'}`,
                  name === 'velocity' ? 'Velocity' :
                  name === 'plannedPoints' ? 'Planned Points' : 'Completed Points'
                ]}
              />
              <Line type="monotone" dataKey="velocity" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="plannedPoints" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="completedPoints" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Tasks */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Active Tasks Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={taskProgressData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip
              formatter={(value: any, name: string) => [
                name === 'progress' ? `${value}%` : `${value} hours`,
                name === 'progress' ? 'Progress' :
                name === 'estimatedHours' ? 'Estimated Hours' : 'Actual Hours'
              ]}
            />
            <Bar dataKey="progress" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Critical Path & Upcoming Tasks */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Critical Path & Upcoming Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.filter(task => task.priority === 'critical' && task.status !== 'completed').map((task, index) => (
            <div key={task.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <h4 className="font-medium text-red-900">{task.name}</h4>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Progress:</span>
                  <span className="font-medium text-red-900">{task.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Assignee:</span>
                  <span className="font-medium text-red-900">{task.assignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">End Date:</span>
                  <span className="font-medium text-red-900">
                    {new Date(task.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Health Summary */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Project Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Timeline Status</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Overall progress: {projectOverview.completionPercentage}% complete</li>
              <li>• {projectOverview.daysToNextMilestone} days to {projectOverview.nextMilestone}</li>
              <li>• {phases.filter(p => p.status === 'completed').length} of {phases.length} phases completed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Budget Health</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• ${(budgetTracking.spentToDate / 1000000).toFixed(1)}M of ${(budgetTracking.totalBudget / 1000000).toFixed(1)}M spent</li>
              <li>• {budgetTracking.budgetUtilization}% budget utilization</li>
              <li>• Forecasted: ${(budgetTracking.forecasted / 1000000).toFixed(1)}M</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Team Performance</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Average velocity: {Math.round(teamVelocity.reduce((sum, v) => sum + v.velocity, 0) / teamVelocity.length)}%</li>
              <li>• {activeTasks.length} active tasks in progress</li>
              <li>• Risk level: {projectOverview.riskLevel}</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}