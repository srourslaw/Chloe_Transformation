import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingDown, Clock, DollarSign, Users } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface PipelineStage {
  stage: string;
  count: number;
  value: number;
  conversionRate: number;
}

interface SalesPipelineVisualizationProps {
  pipeline: PipelineStage[];
}

const getStageColor = (index: number) => {
  const colors = ['#e2e8f0', '#94a3b8', '#64748b', '#475569', '#334155'];
  return colors[index] || '#334155';
};

const getStageWidth = (count: number, maxCount: number) => {
  return Math.max((count / maxCount) * 100, 10);
};

export default function SalesPipelineVisualization({ pipeline }: SalesPipelineVisualizationProps) {
  const maxCount = Math.max(...pipeline.map(stage => stage.count));
  const totalValue = pipeline.reduce((sum, stage) => sum + stage.value, 0);
  const avgConversionRate = pipeline.reduce((sum, stage) => sum + stage.conversionRate, 0) / pipeline.length;

  // Calculate time in stage (mock data)
  const timeInStage = [
    { stage: 'Leads', avgDays: 5 },
    { stage: 'Qualified', avgDays: 14 },
    { stage: 'Demo', avgDays: 21 },
    { stage: 'Trial', avgDays: 30 },
    { stage: 'Closed', avgDays: 0 }
  ];

  const conversionData = pipeline.map((stage, index) => ({
    stage: stage.stage,
    conversionRate: stage.conversionRate,
    previousRate: index > 0 ? pipeline[index - 1].conversionRate : 100
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Sales Pipeline Visualization
        </h2>
        <p className="text-sm text-secondary-600">
          Sales funnel progression with conversion rates and revenue potential
        </p>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Total Leads</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{pipeline[0]?.count || 0}</div>
          <div className="text-sm text-primary-700">in pipeline</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Pipeline Value</span>
          </div>
          <div className="text-2xl font-bold text-success-900">${(totalValue / 1000).toFixed(0)}K</div>
          <div className="text-sm text-success-700">potential revenue</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Avg Conversion</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{avgConversionRate.toFixed(1)}%</div>
          <div className="text-sm text-warning-700">overall rate</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Sales Cycle</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">70</div>
          <div className="text-sm text-purple-700">avg days</div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Sales Funnel</h3>
        <div className="space-y-3">
          {pipeline.map((stage, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-secondary-900">{stage.stage}</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-secondary-600">{stage.count} prospects</span>
                  <span className="text-secondary-600">${stage.value.toLocaleString()}</span>
                  <span className="font-medium text-secondary-900">{stage.conversionRate}%</span>
                </div>
              </div>

              <div className="relative h-12 bg-secondary-100 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center justify-center text-white font-medium transition-all duration-500"
                  style={{
                    width: `${getStageWidth(stage.count, maxCount)}%`,
                    backgroundColor: getStageColor(index)
                  }}
                >
                  {stage.count} ({stage.conversionRate}%)
                </div>
              </div>

              {/* Conversion Arrow */}
              {index < pipeline.length - 1 && (
                <div className="flex items-center justify-center mt-2 mb-1">
                  <div className="flex items-center gap-2 px-3 py-1 bg-secondary-50 rounded-full border">
                    <TrendingDown className="h-4 w-4 text-secondary-600" />
                    <span className="text-xs text-secondary-600">
                      {((pipeline[index + 1].count / stage.count) * 100).toFixed(1)}% convert
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Rates Chart */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Conversion Rates by Stage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Conversion Rate']} />
              <Bar dataKey="conversionRate" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Time in Each Stage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timeInStage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value} days`, 'Average Time']} />
              <Line type="monotone" dataKey="avgDays" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pipeline Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {pipeline.map((stage, index) => (
          <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <h4 className="font-medium text-secondary-900 mb-3">{stage.stage}</h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-600">Count</span>
                <span className="font-medium text-secondary-900">{stage.count}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-600">Value</span>
                <span className="font-medium text-secondary-900">${(stage.value / 1000).toFixed(0)}K</span>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-600">Conversion</span>
                <span className={clsx(
                  'font-medium',
                  stage.conversionRate >= 50 ? 'text-success-700' :
                  stage.conversionRate >= 25 ? 'text-warning-700' :
                  'text-danger-700'
                )}>{stage.conversionRate}%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-600">Avg Value</span>
                <span className="font-medium text-secondary-900">
                  ${stage.count > 0 ? Math.round(stage.value / stage.count).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights and Recommendations */}
      <div className="mt-8 p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h3 className="font-semibold text-warning-900 mb-3">Pipeline Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Strengths</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Strong qualification rate (20% leads to qualified)</li>
              <li>• High trial-to-close conversion (75%)</li>
              <li>• Good average deal size across pipeline</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Improvement Areas</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Increase demo-to-trial conversion (currently 62.5%)</li>
              <li>• Reduce time in qualification stage</li>
              <li>• Expand top-of-funnel lead generation</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}