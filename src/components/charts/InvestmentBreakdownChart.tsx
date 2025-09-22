import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../ui/Card';

interface InvestmentItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface InvestmentBreakdownChartProps {
  data: InvestmentItem[];
}

export default function InvestmentBreakdownChart({ data }: InvestmentBreakdownChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-medium text-secondary-900">{data.name}</p>
          <p className="text-sm text-secondary-600">
            Amount: <span className="font-medium">{formatCurrency(data.value)}</span>
          </p>
          <p className="text-sm text-secondary-600">
            Percentage: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const totalInvestment = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Investment Breakdown
        </h2>
        <p className="text-sm text-secondary-600">
          Total investment allocation across categories
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="h-64 w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Details */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="text-center lg:text-left">
            <div className="text-2xl font-bold text-secondary-900">
              {formatCurrency(totalInvestment)}
            </div>
            <div className="text-sm text-secondary-600">Total Investment</div>
          </div>

          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-secondary-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-secondary-900">
                    {formatCurrency(item.value)}
                  </div>
                  <div className="text-sm text-secondary-600">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Insights */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h4 className="font-medium text-primary-900 mb-2">Investment Strategy</h4>
        <p className="text-sm text-primary-800">
          Personnel represents 73% of total investment, reflecting our focus on building a strong team.
          Marketing (12%) and Technology (9%) investments support rapid market entry and platform development.
        </p>
      </div>
    </Card>
  );
}