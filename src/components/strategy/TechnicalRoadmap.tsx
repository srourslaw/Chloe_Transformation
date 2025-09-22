import { CheckCircle, Clock, Circle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface RoadmapPhase {
  phase: string;
  title: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in_progress' | 'planned';
  tasks: string[];
  deliverables: string[];
}

interface TechnicalRoadmapProps {
  phases: RoadmapPhase[];
}

export default function TechnicalRoadmap({ phases }: TechnicalRoadmapProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-warning-600" />;
      default:
        return <Circle className="h-5 w-5 text-secondary-400" />;
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

  const togglePhase = (phase: string) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Technical Transformation Roadmap
        </h2>
        <p className="text-sm text-secondary-600">
          Development phases with progress tracking and deliverable milestones
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-primary-900">Overall Progress</h3>
          <span className="text-lg font-bold text-primary-900">
            {Math.round(phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length)}%
          </span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length}%`
            }}
          />
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.phase} className="relative">
            {/* Timeline Line */}
            {index < phases.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-8 bg-secondary-200" />
            )}

            <div className={clsx(
              'border-2 rounded-lg transition-all duration-200',
              getStatusColor(phase.status),
              expandedPhase === phase.phase ? 'shadow-lg' : 'shadow-sm'
            )}>
              {/* Phase Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => togglePhase(phase.phase)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-secondary-200">
                      {getStatusIcon(phase.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">
                        {phase.phase}: {phase.title}
                      </h3>
                      <p className="text-sm text-secondary-600">{phase.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-secondary-900">{phase.progress}%</div>
                      <div className="text-sm text-secondary-600">Complete</div>
                    </div>
                    {expandedPhase === phase.phase ? (
                      <ChevronDown className="h-5 w-5 text-secondary-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-secondary-400" />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className={clsx(
                        'h-2 rounded-full transition-all duration-500',
                        getProgressColor(phase.status)
                      )}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPhase === phase.phase && (
                <div className="px-4 pb-4 animate-slide-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Tasks */}
                    <div>
                      <h4 className="font-medium text-secondary-900 mb-3">Key Tasks</h4>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="font-medium text-secondary-900 mb-3">Key Deliverables</h4>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                            <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Phase Summary */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <div key={phase.phase} className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-2xl font-bold text-secondary-900">{phase.progress}%</div>
            <div className="text-sm text-secondary-600">{phase.phase}</div>
            <div className={clsx(
              'text-xs px-2 py-1 rounded-full mt-1 inline-block',
              phase.status === 'completed' ? 'bg-success-100 text-success-700' :
              phase.status === 'in_progress' ? 'bg-warning-100 text-warning-700' :
              'bg-secondary-100 text-secondary-700'
            )}>
              {phase.status.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}