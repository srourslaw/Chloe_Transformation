import { CheckCircle, Clock, AlertCircle, Calendar, Users, FileText } from 'lucide-react';
import Card from '../ui/Card';
import { projectTimelineData } from '../../data/mockData';

const { milestones, phases, tasks } = projectTimelineData;

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-success-600" />;
    case 'in_progress':
      return <Clock className="h-5 w-5 text-primary-600" />;
    case 'upcoming':
      return <Calendar className="h-5 w-5 text-warning-600" />;
    case 'planned':
      return <AlertCircle className="h-5 w-5 text-secondary-600" />;
    default:
      return <AlertCircle className="h-5 w-5 text-secondary-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-success-50 border-success-200 text-success-800';
    case 'in_progress':
      return 'bg-primary-50 border-primary-200 text-primary-800';
    case 'upcoming':
      return 'bg-warning-50 border-warning-200 text-warning-800';
    case 'planned':
      return 'bg-secondary-50 border-secondary-200 text-secondary-800';
    default:
      return 'bg-secondary-50 border-secondary-200 text-secondary-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-secondary-100 text-secondary-800 border-secondary-200';
  }
};

const getDaysUntil = (dateString: string) => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0) {
    return `${Math.abs(daysDiff)} days ago`;
  } else if (daysDiff === 0) {
    return 'Today';
  } else {
    return `${daysDiff} days`;
  }
};

export default function MilestoneTracking() {
  // Group milestones by status
  const completedMilestones = milestones.filter(m => m.status === 'completed');
  const activeMilestones = milestones.filter(m => m.status === 'in_progress');
  const upcomingMilestones = milestones.filter(m => m.status === 'upcoming' || m.status === 'planned');

  // Get associated tasks for each milestone
  const getMilestoneTasks = (milestonePhase: string) => {
    return tasks.filter(task => task.phase === milestonePhase);
  };

  // Calculate completion percentage for current milestone
  const getCurrentMilestoneProgress = () => {
    const currentMilestone = milestones.find(m => m.status === 'in_progress');
    if (!currentMilestone) return 0;

    const milestoneTasks = getMilestoneTasks(currentMilestone.phase);
    if (milestoneTasks.length === 0) return 0;

    const totalProgress = milestoneTasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / milestoneTasks.length);
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Milestone Tracking
        </h2>
        <p className="text-sm text-secondary-600">
          Track project milestones, deliverables, and critical dependencies
        </p>
      </div>

      {/* Milestone Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Completed</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{completedMilestones.length}</div>
          <div className="text-sm text-success-700">milestones</div>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">In Progress</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{activeMilestones.length}</div>
          <div className="text-sm text-primary-700">{getCurrentMilestoneProgress()}% complete</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Upcoming</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{upcomingMilestones.length}</div>
          <div className="text-sm text-warning-700">milestones</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Critical</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {milestones.filter(m => m.priority === 'critical').length}
          </div>
          <div className="text-sm text-purple-700">critical milestones</div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Milestone Timeline</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-secondary-300"></div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-start gap-6">
                {/* Timeline dot */}
                <div className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-success-100 border-success-500' :
                  milestone.status === 'in_progress' ? 'bg-primary-100 border-primary-500' :
                  milestone.status === 'upcoming' ? 'bg-warning-100 border-warning-500' :
                  'bg-secondary-100 border-secondary-400'
                }`}>
                  {getStatusIcon(milestone.status)}
                </div>

                {/* Milestone content */}
                <div className="flex-1">
                  <div className={`p-6 rounded-lg border ${getStatusColor(milestone.status)}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h4 className="text-lg font-semibold">{milestone.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(milestone.priority)}`}>
                        {milestone.priority}
                      </span>
                      <span className="text-sm text-secondary-600">
                        {getDaysUntil(milestone.date)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-secondary-600" />
                          <span className="text-sm font-medium text-secondary-700">Target Date</span>
                        </div>
                        <p className="text-sm text-secondary-600">
                          {new Date(milestone.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-secondary-600" />
                          <span className="text-sm font-medium text-secondary-700">Deliverables</span>
                        </div>
                        <ul className="text-sm text-secondary-600 space-y-1">
                          {milestone.deliverables.map((deliverable, idx) => (
                            <li key={idx}>• {deliverable}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-secondary-600" />
                          <span className="text-sm font-medium text-secondary-700">Stakeholders</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {milestone.stakeholders.map((stakeholder, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs"
                            >
                              {stakeholder}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dependencies */}
                    {milestone.dependencies.length > 0 && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-secondary-700">Dependencies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {milestone.dependencies.map((depId, idx) => {
                            const dep = milestones.find(m => m.id === depId);
                            return (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                              >
                                {dep?.name || depId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Associated Tasks Progress */}
                    {milestone.status === 'in_progress' && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-secondary-700">Associated Tasks</span>
                          <span className="text-sm text-secondary-600">{getCurrentMilestoneProgress()}% complete</span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getCurrentMilestoneProgress()}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Path Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Critical Path Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-3">Critical Milestones</h4>
            <div className="space-y-3">
              {milestones.filter(m => m.priority === 'critical').map((milestone) => (
                <div key={milestone.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-red-800">{milestone.name}</div>
                    <div className="text-sm text-red-600">{new Date(milestone.date).toLocaleDateString()}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {milestone.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <h4 className="font-medium text-warning-900 mb-3">Upcoming Deadlines</h4>
            <div className="space-y-3">
              {upcomingMilestones.slice(0, 3).map((milestone) => (
                <div key={milestone.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-warning-800">{milestone.name}</div>
                    <div className="text-sm text-warning-600">{getDaysUntil(milestone.date)}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(milestone.priority)}`}>
                    {milestone.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Success Metrics */}
      <div className="p-4 bg-success-50 rounded-lg border border-success-200">
        <h3 className="font-semibold text-success-900 mb-3">Milestone Success Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-success-800 mb-2">Completion Rate</h4>
            <ul className="space-y-1 text-success-700">
              <li>• {completedMilestones.length} of {milestones.length} milestones completed</li>
              <li>• {Math.round((completedMilestones.length / milestones.length) * 100)}% completion rate</li>
              <li>• On track for project delivery</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Timeline Performance</h4>
            <ul className="space-y-1 text-success-700">
              <li>• All completed milestones delivered on time</li>
              <li>• Current milestone {getCurrentMilestoneProgress()}% complete</li>
              <li>• No delays in critical path</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Quality Metrics</h4>
            <ul className="space-y-1 text-success-700">
              <li>• All deliverables meet quality standards</li>
              <li>• Stakeholder approval rate: 100%</li>
              <li>• Zero rework required for completed milestones</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}