import { Calendar, User, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface HiringPosition {
  position: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'not_started' | 'sourcing' | 'interviewing' | 'offer_made' | 'hired';
  startWeek: number;
  endWeek: number;
  progress: number;
  candidates: number;
}

interface TeamHiringTimelineProps {
  positions: HiringPosition[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-danger-500 border-danger-600';
    case 'high':
      return 'bg-warning-500 border-warning-600';
    case 'medium':
      return 'bg-primary-500 border-primary-600';
    case 'low':
      return 'bg-secondary-500 border-secondary-600';
    default:
      return 'bg-secondary-500 border-secondary-600';
  }
};

const getPriorityBgColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-danger-50 border-danger-200';
    case 'high':
      return 'bg-warning-50 border-warning-200';
    case 'medium':
      return 'bg-primary-50 border-primary-200';
    case 'low':
      return 'bg-secondary-50 border-secondary-200';
    default:
      return 'bg-secondary-50 border-secondary-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'hired':
      return <CheckCircle className="h-4 w-4 text-success-600" />;
    case 'offer_made':
      return <CheckCircle className="h-4 w-4 text-primary-600" />;
    case 'interviewing':
      return <Clock className="h-4 w-4 text-warning-600" />;
    case 'sourcing':
      return <User className="h-4 w-4 text-secondary-600" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-secondary-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'hired':
      return 'text-success-700 bg-success-100';
    case 'offer_made':
      return 'text-primary-700 bg-primary-100';
    case 'interviewing':
      return 'text-warning-700 bg-warning-100';
    case 'sourcing':
      return 'text-secondary-700 bg-secondary-100';
    default:
      return 'text-secondary-600 bg-secondary-50';
  }
};

const getDepartmentColor = (department: string) => {
  switch (department) {
    case 'Product':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Engineering':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Sales':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Operations':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-secondary-100 text-secondary-700 border-secondary-200';
  }
};

export default function TeamHiringTimeline({ positions }: TeamHiringTimelineProps) {
  const maxWeek = Math.max(...positions.map(p => p.endWeek));
  const weeks = Array.from({ length: maxWeek }, (_, i) => i + 1);

  const statusCounts = {
    not_started: positions.filter(p => p.status === 'not_started').length,
    sourcing: positions.filter(p => p.status === 'sourcing').length,
    interviewing: positions.filter(p => p.status === 'interviewing').length,
    offer_made: positions.filter(p => p.status === 'offer_made').length,
    hired: positions.filter(p => p.status === 'hired').length
  };

  const priorityCounts = {
    critical: positions.filter(p => p.priority === 'critical').length,
    high: positions.filter(p => p.priority === 'high').length,
    medium: positions.filter(p => p.priority === 'medium').length,
    low: positions.filter(p => p.priority === 'low').length
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Team Hiring Timeline
        </h2>
        <p className="text-sm text-secondary-600">
          Gantt chart showing hiring progress and timeline for all open positions
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5 text-primary-600" />
            <h3 className="font-medium text-primary-900">Total Positions</h3>
          </div>
          <div className="text-2xl font-bold text-primary-900">{positions.length}</div>
          <div className="text-sm text-primary-700">
            {statusCounts.hired} hired, {positions.length - statusCounts.hired} open
          </div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-warning-600" />
            <h3 className="font-medium text-warning-900">In Progress</h3>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            {statusCounts.sourcing + statusCounts.interviewing + statusCounts.offer_made}
          </div>
          <div className="text-sm text-warning-700">
            {Math.round(((statusCounts.sourcing + statusCounts.interviewing + statusCounts.offer_made) / positions.length) * 100)}% of total
          </div>
        </div>

        <div className="p-4 bg-danger-50 rounded-lg border border-danger-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-danger-600" />
            <h3 className="font-medium text-danger-900">Critical Priority</h3>
          </div>
          <div className="text-2xl font-bold text-danger-900">{priorityCounts.critical}</div>
          <div className="text-sm text-danger-700">positions need immediate attention</div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Week Headers */}
          <div className="grid grid-cols-[300px_1fr] gap-2 mb-4">
            <div className="font-medium text-secondary-900">Position</div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${maxWeek}, 1fr)` }}>
              {weeks.map(week => (
                <div key={week} className="text-center text-xs font-medium text-secondary-600 p-1">
                  W{week}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-3">
            {positions.map((position, index) => (
              <div key={index} className="grid grid-cols-[300px_1fr] gap-2 items-center">
                {/* Position Info */}
                <div className={clsx('p-3 rounded-lg border', getPriorityBgColor(position.priority))}>
                  <h4 className="font-medium text-secondary-900 text-sm">{position.position}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={clsx(
                      'px-2 py-1 rounded text-xs font-medium border',
                      getDepartmentColor(position.department)
                    )}>
                      {position.department}
                    </span>
                    <span className={clsx(
                      'px-2 py-1 rounded text-xs font-medium',
                      getStatusColor(position.status)
                    )}>
                      {position.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-secondary-600">
                    {getStatusIcon(position.status)}
                    <span>{position.progress}% complete</span>
                    <span>• {position.candidates} candidates</span>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div className="grid gap-1 h-12" style={{ gridTemplateColumns: `repeat(${maxWeek}, 1fr)` }}>
                  {weeks.map(week => {
                    const isInRange = week >= position.startWeek && week <= position.endWeek;
                    const isProgress = isInRange && week <= position.startWeek + (position.endWeek - position.startWeek) * (position.progress / 100);

                    return (
                      <div key={week} className="relative flex items-center">
                        {isInRange && (
                          <div
                            className={clsx(
                              'h-6 w-full rounded border-2',
                              isProgress ? getPriorityColor(position.priority) : 'bg-secondary-200 border-secondary-300'
                            )}
                          />
                        )}
                        {week === position.startWeek && (
                          <div className="absolute -left-1 top-0 w-2 h-2 bg-secondary-800 rounded-full" />
                        )}
                        {week === position.endWeek && (
                          <div className="absolute -right-1 top-0 w-2 h-2 bg-secondary-800 rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-secondary-900 mb-3">Hiring Status</h3>
          <div className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(status)}
                  <span className="text-sm capitalize">{status.replace('_', ' ')}</span>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-secondary-900 mb-3">Priority Levels</h3>
          <div className="space-y-2">
            {Object.entries(priorityCounts).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={clsx('w-4 h-4 rounded border-2', getPriorityColor(priority))} />
                  <span className="text-sm capitalize">{priority}</span>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-secondary-50 rounded-lg">
        <h3 className="font-medium text-secondary-900 mb-3">Hiring Progress Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">
              {Math.round((statusCounts.hired / positions.length) * 100)}%
            </div>
            <div className="text-secondary-600">Positions Filled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">
              {Math.round(((statusCounts.interviewing + statusCounts.offer_made) / positions.length) * 100)}%
            </div>
            <div className="text-secondary-600">Near Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {maxWeek}
            </div>
            <div className="text-secondary-600">Weeks Timeline</div>
          </div>
        </div>
      </div>
    </Card>
  );
}