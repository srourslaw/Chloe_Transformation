import { TrendingUp, TrendingDown, Minus, DollarSign, Users, UserPlus } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';
import { MetricCardData } from '@/data/types';

interface MetricsCardProps {
  data: MetricCardData;
}

const iconMap = {
  DollarSign,
  TrendingUp,
  Users,
  UserPlus
};

export default function MetricsCard({ data }: MetricsCardProps) {
  const { title, value, change, changeType, icon, color = 'primary' } = data;

  const Icon = icon ? iconMap[icon as keyof typeof iconMap] : null;

  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-success-600 bg-success-50',
    warning: 'text-warning-600 bg-warning-50',
    danger: 'text-danger-600 bg-danger-50'
  };

  const changeIcon = {
    increase: TrendingUp,
    decrease: TrendingDown,
    neutral: Minus
  };

  const changeColorClasses = {
    increase: 'text-success-600',
    decrease: 'text-danger-600',
    neutral: 'text-secondary-500'
  };

  const ChangeIcon = changeType ? changeIcon[changeType] : null;

  return (
    <Card className="animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          <p className="text-2xl font-bold text-secondary-900">{value}</p>
          {change && changeType && ChangeIcon && (
            <div className={clsx('flex items-center gap-1 text-sm', changeColorClasses[changeType])}>
              <ChangeIcon className="h-4 w-4" />
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx('rounded-lg p-3', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
}