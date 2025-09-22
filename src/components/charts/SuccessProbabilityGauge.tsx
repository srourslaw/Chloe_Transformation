import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

interface SuccessProbabilityProps {
  percentage: number;
  factors: Array<{
    name: string;
    score: number;
    weight: number;
  }>;
}

export default function SuccessProbabilityGauge({ percentage, factors }: SuccessProbabilityProps) {
  // Data for the gauge (pie chart)
  const data = [
    { name: 'Success', value: percentage, color: '#22c55e' },
    { name: 'Risk', value: 100 - percentage, color: '#e5e7eb' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success-600 bg-success-100';
    if (score >= 70) return 'text-warning-600 bg-warning-100';
    return 'text-danger-600 bg-danger-100';
  };

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-secondary-900">
        Success Probability Assessment
      </h2>

      <div className="flex flex-col items-center mb-6">
        {/* Gauge Chart */}
        <div className="relative w-48 h-24 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Percentage display */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <div className="text-3xl font-bold text-success-600">{percentage}%</div>
            <div className="text-sm text-secondary-600">Success Probability</div>
          </div>
        </div>

        <p className="text-center text-sm text-secondary-600">
          Based on market analysis and team capability assessment
        </p>
      </div>

      {/* Contributing Factors */}
      <div className="space-y-3">
        <h3 className="font-medium text-secondary-900 mb-3">Contributing Factors</h3>
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary-50">
            <div className="flex-1">
              <span className="text-sm font-medium text-secondary-900">{factor.name}</span>
              <div className="text-xs text-secondary-600">Weight: {(factor.weight * 100).toFixed(0)}%</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(factor.score)}`}>
              {factor.score}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}