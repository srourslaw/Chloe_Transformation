import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../ui/Card';

interface PositioningData {
  company: string;
  features: number;
  price: number;
  support: number;
  integration: number;
  scalability: number;
  color: string;
}

interface MarketPositioningChartProps {
  data: PositioningData[];
}

export default function MarketPositioningChart({ data }: MarketPositioningChartProps) {
  // Transform data for radar chart
  const radarData = [
    {
      axis: 'Features',
      ...data.reduce((acc, company) => ({ ...acc, [company.company]: company.features }), {})
    },
    {
      axis: 'Price',
      ...data.reduce((acc, company) => ({ ...acc, [company.company]: company.price }), {})
    },
    {
      axis: 'Support',
      ...data.reduce((acc, company) => ({ ...acc, [company.company]: company.support }), {})
    },
    {
      axis: 'Integration',
      ...data.reduce((acc, company) => ({ ...acc, [company.company]: company.integration }), {})
    },
    {
      axis: 'Scalability',
      ...data.reduce((acc, company) => ({ ...acc, [company.company]: company.scalability }), {})
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-medium text-secondary-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}/100`}
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
          Market Positioning Analysis
        </h2>
        <p className="text-sm text-secondary-600">
          Competitive positioning across key evaluation criteria
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Radar Chart */}
        <div className="h-96 w-full lg:w-3/4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickCount={6}
              />
              {data.map((company, index) => (
                <Radar
                  key={index}
                  name={company.company}
                  dataKey={company.company}
                  stroke={company.color}
                  fill={company.color}
                  fillOpacity={company.company === 'Chloe' ? 0.2 : 0.1}
                  strokeWidth={company.company === 'Chloe' ? 3 : 2}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Competitive Scores */}
        <div className="w-full lg:w-1/4 space-y-4">
          <h3 className="font-medium text-secondary-900">Competitive Scores</h3>
          {data.map((company, index) => {
            const avgScore = Math.round(
              (company.features + company.price + company.support + company.integration + company.scalability) / 5
            );

            return (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: company.color }}
                    />
                    <span className="font-medium text-secondary-900">{company.company}</span>
                  </div>
                  <span className="text-lg font-bold text-secondary-900">{avgScore}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-secondary-600">
                  <div>Features: {company.features}</div>
                  <div>Price: {company.price}</div>
                  <div>Support: {company.support}</div>
                  <div>Integration: {company.integration}</div>
                  <div className="col-span-2">Scalability: {company.scalability}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitive Insights */}
      <div className="mt-6 p-4 bg-success-50 rounded-lg border border-success-200">
        <h4 className="font-medium text-success-900 mb-2">Competitive Advantage</h4>
        <p className="text-sm text-success-800">
          Chloe leads in Integration (95) and Support (90), with strong performance across all categories.
          Our competitive advantage lies in superior Business Central integration and customer support excellence.
        </p>
      </div>
    </Card>
  );
}