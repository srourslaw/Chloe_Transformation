import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Target, Zap, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import { progressMonitoringData } from '../../data/mockData';

const { overallProgress, weeklyProgress, sprintMetrics, qualityMetrics, resourceUtilization, riskIndicators, blockers, teamPerformance, stakeholderFeedback, alerts } = progressMonitoringData;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'green':
      return 'text-success-600 bg-success-50 border-success-200';
    case 'yellow':
      return 'text-warning-600 bg-warning-50 border-warning-200';
    case 'red':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-secondary-600 bg-secondary-50 border-secondary-200';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-warning-600 bg-warning-50 border-warning-200';
    case 'low':
      return 'text-success-600 bg-success-50 border-success-200';
    default:
      return 'text-secondary-600 bg-secondary-50 border-secondary-200';
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'success':
      return <CheckCircle className="h-4 w-4" />;
    case 'info':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export default function ProgressMonitoringDashboard() {
  // Prepare current sprint data
  const currentSprint = sprintMetrics[sprintMetrics.length - 1];
  const burndownData = currentSprint.burndownTrend.map((points, day) => ({
    day: day + 1,
    remaining: points,
    ideal: Math.max(0, currentSprint.plannedPoints - (currentSprint.plannedPoints / 10) * day)
  }));

  // Risk indicators chart data
  const riskChartData = riskIndicators.map(risk => ({
    category: risk.category,
    current: risk.current,
    threshold: risk.threshold,
    status: risk.status
  }));

  // Team performance radar data
  const teamRadarData = [
    { metric: 'Velocity', value: teamPerformance.teamHealth.velocity, fullMark: 100 },
    { metric: 'Predictability', value: teamPerformance.teamHealth.predictability, fullMark: 100 },
    { metric: 'Quality', value: qualityMetrics.codeQuality.codeReviewScore * 20, fullMark: 100 },
    { metric: 'Satisfaction', value: teamPerformance.teamHealth.happinessIndex * 20, fullMark: 100 },
    { metric: 'Efficiency', value: (teamPerformance.teamHealth.focusFactor * 100), fullMark: 100 },
    { metric: 'Retention', value: teamPerformance.teamHealth.retentionRate, fullMark: 100 }
  ];

  // Active alerts (not dismissed)
  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Progress Monitoring Dashboard
        </h2>
        <p className="text-sm text-secondary-600">
          Real-time project progress tracking with quality metrics, team performance, and risk monitoring
        </p>
      </div>

      {/* Overall Progress Overview */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Completion</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{overallProgress.completionPercentage}%</div>
          <div className="text-sm text-primary-700">overall progress</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">On-Time</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{overallProgress.onTimeDelivery}%</div>
          <div className="text-sm text-success-700">delivery rate</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Budget</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{overallProgress.budgetAdherence}%</div>
          <div className="text-sm text-warning-700">adherence</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Quality</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{overallProgress.qualityScore}%</div>
          <div className="text-sm text-purple-700">score</div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">Team</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{overallProgress.teamSatisfaction}%</div>
          <div className="text-sm text-blue-700">satisfaction</div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-indigo-600" />
            <span className="font-medium text-indigo-900">Stakeholder</span>
          </div>
          <div className="text-2xl font-bold text-indigo-900">{overallProgress.stakeholderSatisfaction}%</div>
          <div className="text-sm text-indigo-700">satisfaction</div>
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-secondary-900 mb-4">Active Alerts</h3>
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-3 p-4 rounded-lg border ${
                alert.type === 'warning' ? 'bg-warning-50 border-warning-200' :
                alert.type === 'success' ? 'bg-success-50 border-success-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className={`${
                  alert.type === 'warning' ? 'text-warning-600' :
                  alert.type === 'success' ? 'text-success-600' :
                  'text-blue-600'
                }`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    alert.type === 'warning' ? 'text-warning-900' :
                    alert.type === 'success' ? 'text-success-900' :
                    'text-blue-900'
                  }`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm ${
                    alert.type === 'warning' ? 'text-warning-700' :
                    alert.type === 'success' ? 'text-success-700' :
                    'text-blue-700'
                  }`}>
                    {alert.message}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Progress Tracking */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Weekly Progress Tracking</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="planned" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Planned" />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual" />
              <Line type="monotone" dataKey="cumulative" stroke="#10b981" strokeWidth={2} name="Cumulative" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Current Sprint Burndown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Ideal" />
              <Line type="monotone" dataKey="remaining" stroke="#3b82f6" strokeWidth={3} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resource Utilization & Risk Indicators */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Resource Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip formatter={(value: any, name: string) => [value + '%', name]} />
              <Bar dataKey="planned" fill="#94a3b8" name="Planned" />
              <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
              <Bar dataKey="efficiency" fill="#10b981" name="Efficiency" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Indicators</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="threshold" fill="#ef4444" name="Threshold" />
              <Bar dataKey="current" fill="#3b82f6" name="Current Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance Radar */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Team Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={teamRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Quality Metrics Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityMetrics.defectTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="foundDefects" stroke="#ef4444" strokeWidth={2} name="Found" />
              <Line type="monotone" dataKey="resolvedDefects" stroke="#10b981" strokeWidth={2} name="Resolved" />
              <Line type="monotone" dataKey="openDefects" stroke="#f59e0b" strokeWidth={2} name="Open" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Blockers */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Active Blockers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blockers.filter(blocker => blocker.status !== 'resolved').map((blocker) => (
            <div key={blocker.id} className={`p-4 rounded-lg border ${getSeverityColor(blocker.severity)}`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{blocker.title}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(blocker.severity)}`}>
                  {blocker.severity}
                </span>
              </div>
              <p className="text-sm mb-3">{blocker.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Owner:</span> {blocker.owner}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {blocker.status.replace('_', ' ')}
                </div>
                <div>
                  <span className="font-medium">Created:</span> {new Date(blocker.createdDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Est. Resolution:</span> {new Date(blocker.estimatedResolution).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-3">
                <span className="font-medium text-sm">Impact:</span>
                <p className="text-sm text-secondary-600">{blocker.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Team Performance */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Individual Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamPerformance.individualMetrics.map((member, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="text-center mb-3">
                <h4 className="font-medium text-secondary-900">{member.name}</h4>
                <p className="text-sm text-secondary-600">{member.role}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tasks Completed:</span>
                  <span className="font-medium">{member.tasksCompleted}/{member.tasksPlanned}</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-medium">{member.efficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality Score:</span>
                  <span className="font-medium">{member.qualityScore}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Collaboration:</span>
                  <span className="font-medium">{member.collaborationScore}/5</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${member.efficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Feedback */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Stakeholder Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stakeholderFeedback.map((feedback, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-secondary-900">{feedback.stakeholder}</h4>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-secondary-900">{feedback.satisfaction}</span>
                  <span className="text-sm text-secondary-600">/5</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium text-red-700 mb-1">Concerns:</div>
                <ul className="text-sm text-red-600 space-y-1">
                  {feedback.concerns.map((concern, idx) => (
                    <li key={idx}>• {concern}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium text-success-700 mb-1">Positives:</div>
                <ul className="text-sm text-success-600 space-y-1">
                  {feedback.positives.map((positive, idx) => (
                    <li key={idx}>• {positive}</li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-secondary-500">
                Last Updated: {new Date(feedback.lastUpdate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Progress Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Current Status</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Project {overallProgress.completionPercentage}% complete</li>
              <li>• Sprint velocity at {currentSprint.velocity}%</li>
              <li>• {blockers.filter(b => b.status !== 'resolved').length} active blockers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Quality & Performance</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Code coverage: {qualityMetrics.codeQuality.testCoverage}%</li>
              <li>• Quality score: {overallProgress.qualityScore}%</li>
              <li>• Team satisfaction: {overallProgress.teamSatisfaction}%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Risk & Delivery</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• On-time delivery: {overallProgress.onTimeDelivery}%</li>
              <li>• Budget adherence: {overallProgress.budgetAdherence}%</li>
              <li>• {riskIndicators.filter(r => r.status === 'green').length} of {riskIndicators.length} risks green</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}