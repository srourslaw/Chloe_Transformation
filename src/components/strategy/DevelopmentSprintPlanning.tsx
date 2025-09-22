import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, Circle, TrendingUp, Users } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface Sprint {
  sprint: string;
  duration: string;
  features: string[];
  progress: number;
  status: 'completed' | 'in_progress' | 'planned';
  teamCapacity: number;
  storyPoints: number;
}

interface DevelopmentSprintPlanningProps {
  sprints: Sprint[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success-600" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-warning-600" />;
    default:
      return <Circle className="h-4 w-4 text-secondary-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'border-success-200 bg-success-50';
    case 'in_progress':
      return 'border-warning-200 bg-warning-50';
    default:
      return 'border-secondary-200 bg-secondary-50';
  }
};

const getProgressColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-success-500';
    case 'in_progress':
      return 'bg-warning-500';
    default:
      return 'bg-secondary-300';
  }
};

export default function DevelopmentSprintPlanning({ sprints }: DevelopmentSprintPlanningProps) {
  const velocityData = sprints.map((sprint, index) => ({
    sprint: sprint.sprint,
    planned: sprint.storyPoints,
    completed: sprint.status === 'completed' ? sprint.storyPoints :
               sprint.status === 'in_progress' ? Math.round(sprint.storyPoints * sprint.progress / 100) : 0,
    capacity: sprint.teamCapacity
  }));

  const totalStoryPoints = sprints.reduce((acc, sprint) => acc + sprint.storyPoints, 0);
  const completedStoryPoints = sprints.reduce((acc, sprint) => {
    if (sprint.status === 'completed') return acc + sprint.storyPoints;
    if (sprint.status === 'in_progress') return acc + Math.round(sprint.storyPoints * sprint.progress / 100);
    return acc;
  }, 0);

  const overallProgress = Math.round((completedStoryPoints / totalStoryPoints) * 100);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Development Sprint Planning
        </h2>
        <p className="text-sm text-secondary-600">
          Sprint progress tracking with velocity and capacity planning
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <h3 className="font-medium text-primary-900">Overall Progress</h3>
          </div>
          <div className="text-2xl font-bold text-primary-900">{overallProgress}%</div>
          <div className="text-sm text-primary-700">{completedStoryPoints} / {totalStoryPoints} story points</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <h3 className="font-medium text-success-900">Completed Sprints</h3>
          </div>
          <div className="text-2xl font-bold text-success-900">
            {sprints.filter(s => s.status === 'completed').length}
          </div>
          <div className="text-sm text-success-700">out of {sprints.length} sprints</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-warning-600" />
            <h3 className="font-medium text-warning-900">Avg Team Capacity</h3>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            {Math.round(sprints.reduce((acc, s) => acc + s.teamCapacity, 0) / sprints.length)}%
          </div>
          <div className="text-sm text-warning-700">team utilization</div>
        </div>
      </div>

      {/* Sprint Timeline */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Sprint Timeline</h3>
        <div className="space-y-4">
          {sprints.map((sprint, index) => (
            <div key={sprint.sprint} className="relative">
              {/* Timeline Line */}
              {index < sprints.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-secondary-200" />
              )}

              <div className={clsx(
                'border-2 rounded-lg p-4 transition-all duration-200',
                getStatusColor(sprint.status)
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-secondary-200">
                      {getStatusIcon(sprint.status)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">{sprint.sprint}</h4>
                      <p className="text-sm text-secondary-600">{sprint.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-secondary-900">{sprint.progress}%</div>
                    <div className="text-sm text-secondary-600">{sprint.storyPoints} SP</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className={clsx(
                        'h-2 rounded-full transition-all duration-500',
                        getProgressColor(sprint.status)
                      )}
                      style={{ width: `${sprint.progress}%` }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4">
                  <h5 className="font-medium text-secondary-800 mb-2">Planned Features:</h5>
                  <div className="flex flex-wrap gap-2">
                    {sprint.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Capacity Indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary-500" />
                  <span className="text-sm text-secondary-600">
                    Team Capacity: {sprint.teamCapacity}%
                  </span>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-secondary-200 rounded-full h-1">
                      <div
                        className="bg-primary-500 h-1 rounded-full"
                        style={{ width: `${sprint.teamCapacity}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Velocity Chart */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Sprint Velocity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sprint" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="planned" fill="#e2e8f0" name="Planned Story Points" />
            <Bar dataKey="completed" fill="#3b82f6" name="Completed Story Points" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Capacity Trend */}
      <div>
        <h3 className="font-semibold text-secondary-900 mb-4">Team Capacity Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sprint" />
            <YAxis domain={[70, 105]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="capacity"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Team Capacity %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sprint Summary */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
        {sprints.map((sprint) => (
          <div key={sprint.sprint} className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-secondary-900">{sprint.progress}%</div>
            <div className="text-sm text-secondary-600">{sprint.sprint}</div>
            <div className={clsx(
              'text-xs px-2 py-1 rounded-full mt-1 inline-block',
              sprint.status === 'completed' ? 'bg-success-100 text-success-700' :
              sprint.status === 'in_progress' ? 'bg-warning-100 text-warning-700' :
              'bg-secondary-100 text-secondary-700'
            )}>
              {sprint.status.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}