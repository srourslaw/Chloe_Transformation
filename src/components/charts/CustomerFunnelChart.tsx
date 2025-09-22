import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown } from 'lucide-react';
import Card from '../ui/Card';

interface FunnelStage {
  stage: string;
  value: number;
  percentage: number;
  color: string;
}

interface CustomerFunnelChartProps {
  data: FunnelStage[];
}

export default function CustomerFunnelChart({ data }: CustomerFunnelChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-medium text-secondary-900">{label}</p>
          <p className="text-sm text-secondary-600">
            Count: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-sm text-secondary-600">
            Conversion: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Customer Acquisition Funnel
        </h2>
        <p className="text-sm text-secondary-600">
          Lead conversion pipeline and customer acquisition metrics
        </p>
      </div>

      {/* Funnel Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="10%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="stage"
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Metrics */}
      <div className="space-y-3">
        {data.map((stage, index) => {
          const nextStage = data[index + 1];
          const conversionRate = nextStage
            ? ((nextStage.value / stage.value) * 100).toFixed(1)
            : null;

          return (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <div>
                  <span className="font-medium text-secondary-900">{stage.stage}</span>
                  <div className="text-sm text-secondary-600">{stage.value} prospects</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-secondary-900">{stage.percentage}%</div>
                {conversionRate && (
                  <div className="flex items-center gap-1 text-sm text-secondary-600">
                    <TrendingDown className="h-3 w-3" />
                    {conversionRate}% convert
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-primary-50 rounded-lg">
          <div className="text-sm text-primary-600">Overall Conversion</div>
          <div className="text-lg font-semibold text-primary-900">4.0%</div>
          <div className="text-xs text-primary-600">Leads to Customers</div>
        </div>
        <div className="p-3 bg-success-50 rounded-lg">
          <div className="text-sm text-success-600">Demo Success Rate</div>
          <div className="text-lg font-semibold text-success-900">62.5%</div>
          <div className="text-xs text-success-600">Demos to Trials</div>
        </div>
      </div>
    </Card>
  );
}