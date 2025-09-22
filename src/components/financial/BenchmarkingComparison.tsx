import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, Cell } from 'recharts';
import { TrendingUp, Award, Target, Users } from 'lucide-react';
import Card from '../ui/Card';
import { financialKPIsData } from '../../data/mockData';

const { comparisonMetrics, operationalMetrics, customerMetrics, saasMetrics, profitabilityMetrics } = financialKPIsData;

const PERCENTILE_COLORS = {
  excellent: '#10b981', // 75th percentile+
  good: '#3b82f6',      // 50-75th percentile
  average: '#f59e0b',   // 25-50th percentile
  poor: '#ef4444'       // Below 25th percentile
};

const getPercentileColor = (percentile: number) => {
  if (percentile >= 75) return PERCENTILE_COLORS.excellent;
  if (percentile >= 50) return PERCENTILE_COLORS.good;
  if (percentile >= 25) return PERCENTILE_COLORS.average;
  return PERCENTILE_COLORS.poor;
};

const getPercentileLabel = (percentile: number) => {
  if (percentile >= 75) return 'Excellent';
  if (percentile >= 50) return 'Good';
  if (percentile >= 25) return 'Average';
  return 'Needs Improvement';
};

export default function BenchmarkingComparison() {
  // Prepare industry benchmarks data
  const industryBenchmarksData = Object.entries(comparisonMetrics.industryBenchmarks).map(([metric, data]) => ({
    metric,
    ...data
  }));

  // Prepare competitor comparison data
  const competitorData = Object.entries(comparisonMetrics.competitorComparison).map(([metric, data]) => ({
    metric,
    ...data
  }));

  // Radar chart data for overall performance
  const performanceRadarData = [
    { metric: 'Revenue Growth', value: operationalMetrics.ruleOf40.revenueGrowth, fullMark: 40 },
    { metric: 'Profitability', value: Math.abs(profitabilityMetrics.operatingMargin.current), fullMark: 25 },
    { metric: 'Customer Retention', value: saasMetrics.netRevenueRetention.current, fullMark: 130 },
    { metric: 'Unit Economics', value: customerMetrics.ltvCacRatio.current * 10, fullMark: 100 },
    { metric: 'Market Position', value: 65, fullMark: 100 },
    { metric: 'Operational Efficiency', value: operationalMetrics.salesEfficiency.current * 20, fullMark: 100 }
  ];

  // Percentile performance data
  const percentileData = industryBenchmarksData.map(item => ({
    metric: item.metric.replace(/ /g, '\n'),
    percentile: item.percentile,
    color: getPercentileColor(item.percentile),
    label: getPercentileLabel(item.percentile)
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Benchmarking & Industry Comparison
        </h2>
        <p className="text-sm text-secondary-600">
          Performance analysis against industry benchmarks and competitor comparison
        </p>
      </div>

      {/* Performance Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Overall Ranking</span>
          </div>
          <div className="text-2xl font-bold text-success-900">67th</div>
          <div className="text-sm text-success-700">percentile</div>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Top Metrics</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">4/6</div>
          <div className="text-sm text-primary-700">above benchmark</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Improvement Areas</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">2</div>
          <div className="text-sm text-warning-700">metrics to focus</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Competitive Position</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">2nd</div>
          <div className="text-sm text-purple-700">of 4 players</div>
        </div>
      </div>

      {/* Industry Benchmarks Comparison */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Industry Benchmarks Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={industryBenchmarksData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="metric" type="category" width={120} />
            <Tooltip
              formatter={(value: any, name: string) => [
                Number(value).toFixed(1),
                name === 'our' ? 'Our Performance' : 'Industry Average'
              ]}
            />
            <Bar dataKey="our" fill="#3b82f6" name="Our Performance" />
            <Bar dataKey="industry" fill="#94a3b8" name="Industry Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Percentile Performance */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Percentile Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={percentileData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value: any, name: string, props: any) => [
                  `${value}th percentile (${props.payload.label})`,
                  'Performance'
                ]}
              />
              <Bar dataKey="percentile">
                {percentileData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor Comparison */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Competitor Comparison</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={competitorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip formatter={(value: any, name: string) => [Number(value).toLocaleString(), name]} />
            <Bar dataKey="us" fill="#3b82f6" name="Chloe" />
            <Bar dataKey="competitor1" fill="#10b981" name="Competitor 1" />
            <Bar dataKey="competitor2" fill="#f59e0b" name="Competitor 2" />
            <Bar dataKey="competitor3" fill="#ef4444" name="Competitor 3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Benchmarks Table */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Detailed Performance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary-100">
                <th className="text-left p-3 border border-secondary-200">Metric</th>
                <th className="text-right p-3 border border-secondary-200">Our Value</th>
                <th className="text-right p-3 border border-secondary-200">Industry Avg</th>
                <th className="text-right p-3 border border-secondary-200">Percentile</th>
                <th className="text-center p-3 border border-secondary-200">Status</th>
                <th className="text-left p-3 border border-secondary-200">Gap Analysis</th>
              </tr>
            </thead>
            <tbody>
              {industryBenchmarksData.map((item, index) => {
                const gap = ((item.our - item.industry) / item.industry * 100);
                const isPositive = gap > 0;

                return (
                  <tr key={index} className="border-b border-secondary-200">
                    <td className="p-3 font-medium text-secondary-900">{item.metric}</td>
                    <td className="p-3 text-right text-secondary-700">
                      {item.metric.includes('Rate') || item.metric.includes('Margin') ?
                        `${item.our}%` :
                        item.metric.includes('Payback') ?
                          `${item.our} months` :
                          `${item.our}`}
                    </td>
                    <td className="p-3 text-right text-secondary-600">
                      {item.metric.includes('Rate') || item.metric.includes('Margin') ?
                        `${item.industry}%` :
                        item.metric.includes('Payback') ?
                          `${item.industry} months` :
                          `${item.industry}`}
                    </td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.percentile >= 75 ? 'bg-success-100 text-success-800' :
                        item.percentile >= 50 ? 'bg-primary-100 text-primary-800' :
                        item.percentile >= 25 ? 'bg-warning-100 text-warning-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.percentile}th
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.percentile >= 75 ? 'bg-success-100 text-success-800' :
                        item.percentile >= 50 ? 'bg-primary-100 text-primary-800' :
                        item.percentile >= 25 ? 'bg-warning-100 text-warning-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getPercentileLabel(item.percentile)}
                      </span>
                    </td>
                    <td className={`p-3 text-sm ${isPositive ? 'text-success-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{gap.toFixed(1)}% vs industry
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <h3 className="font-semibold text-success-900 mb-3">Competitive Strengths</h3>
          <ul className="space-y-2 text-sm text-success-800">
            <li>• <strong>Gross Margin:</strong> 78.5% vs 75% industry (75th percentile)</li>
            <li>• <strong>Churn Rate:</strong> 3.1% vs 5.2% industry (80th percentile)</li>
            <li>• <strong>LTV:CAC Ratio:</strong> 5.7:1 vs 4.2:1 industry (70th percentile)</li>
            <li>• <strong>Rule of 40:</strong> 42 vs 35 industry (75th percentile)</li>
          </ul>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <h3 className="font-semibold text-warning-900 mb-3">Improvement Opportunities</h3>
          <ul className="space-y-2 text-sm text-warning-800">
            <li>• <strong>CAC Payback:</strong> 14 months vs 12 industry (40th percentile)</li>
            <li>• <strong>NRR:</strong> 112% vs 108% industry but could reach 120%+</li>
            <li>• <strong>Market Share:</strong> Opportunity to capture more market</li>
            <li>• <strong>Sales Efficiency:</strong> Focus on improving CAC and conversion</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}