import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

interface RevenueDataPoint {
  month: number;
  conservative: number;
  realistic: number;
  optimistic: number;
}

interface RevenueGrowthChartProps {
  data: RevenueDataPoint[];
}

export default function RevenueGrowthChart({ data }: RevenueGrowthChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-medium text-secondary-900">{`Month ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Revenue Growth Projection
        </h2>
        <p className="text-sm text-secondary-600">
          36-month revenue projections across three scenarios
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `M${value}`}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="conservative"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Conservative"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="realistic"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 3 }}
              name="Realistic"
            />
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Optimistic"
              strokeDasharray="2 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Milestones */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-secondary-50 rounded-lg">
          <div className="text-sm text-secondary-600">Month 12</div>
          <div className="text-lg font-semibold text-secondary-900">$600K</div>
          <div className="text-xs text-secondary-500">Realistic Target</div>
        </div>
        <div className="p-3 bg-secondary-50 rounded-lg">
          <div className="text-sm text-secondary-600">Month 24</div>
          <div className="text-lg font-semibold text-secondary-900">$2.4M</div>
          <div className="text-xs text-secondary-500">Realistic Target</div>
        </div>
        <div className="p-3 bg-secondary-50 rounded-lg">
          <div className="text-sm text-secondary-600">Month 36</div>
          <div className="text-lg font-semibold text-secondary-900">$5.5M</div>
          <div className="text-xs text-secondary-500">Realistic Target</div>
        </div>
      </div>
    </Card>
  );
}