import { CheckCircle, Clock, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface TimelineItem {
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  months: string;
}

interface TransformationTimelineProps {
  data: TimelineItem[];
}

export default function TransformationTimeline({ data }: TransformationTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success-600" />;
      case 'in_progress':
        return <Clock className="h-6 w-6 text-warning-600" />;
      default:
        return <Circle className="h-6 w-6 text-secondary-400" />;
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

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-secondary-900">
        Transformation Progress Timeline
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-secondary-200"></div>

        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Status icon */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-secondary-200">
                {getStatusIcon(item.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={clsx(
                  'rounded-lg border-2 p-4 transition-all',
                  getStatusColor(item.status)
                )}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-secondary-900">{item.phase}</h3>
                    <span className="text-sm font-medium text-secondary-600">{item.months}</span>
                  </div>
                  <h4 className="font-medium text-secondary-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-secondary-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}