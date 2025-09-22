import { TrendingUp, BarChart3, Settings, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface QuickStat {
  label: string;
  value: string;
  description: string;
  trend: 'growing' | 'stable' | 'manageable' | 'positive';
  icon: string;
}

interface QuickStatsGridProps {
  data: QuickStat[];
}

const iconMap = {
  TrendingUp,
  BarChart3,
  Settings,
  CheckCircle
};

export default function QuickStatsGrid({ data }: QuickStatsGridProps) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'growing':
      case 'positive':
        return 'text-success-600 bg-success-100';
      case 'stable':
        return 'text-primary-600 bg-primary-100';
      case 'manageable':
        return 'text-warning-600 bg-warning-100';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-secondary-900">
        Market Statistics
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg border border-secondary-200 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-secondary-900 mb-1">{stat.label}</h3>
                <div className="text-2xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <p className="text-sm text-secondary-600">{stat.description}</p>
              </div>
              <div className={clsx('p-2 rounded-lg', getTrendColor(stat.trend))}>
                {getIcon(stat.icon)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={clsx(
                'px-2 py-1 rounded-full text-xs font-medium capitalize',
                getTrendColor(stat.trend)
              )}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary insights */}
      <div className="mt-6 p-4 rounded-lg bg-primary-50 border border-primary-200">
        <h4 className="font-medium text-primary-900 mb-2">Market Analysis Summary</h4>
        <p className="text-sm text-primary-800">
          Strong market opportunity with manageable competition. High technical complexity offset by excellent market readiness and team capability.
        </p>
      </div>
    </Card>
  );
}