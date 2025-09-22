import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Target, TrendingUp, DollarSign, Users } from 'lucide-react';
import Card from '../ui/Card';

interface MarketSegment {
  segment: string;
  percentage: number;
  size: number;
  opportunity: number;
}

interface MarketSegmentationAnalysisProps {
  segments: MarketSegment[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function MarketSegmentationAnalysis({ segments }: MarketSegmentationAnalysisProps) {
  const totalMarketSize = segments.reduce((sum, segment) => sum + segment.size, 0);
  const totalOpportunity = segments.reduce((sum, segment) => sum + segment.opportunity, 0);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Market Segmentation Analysis
        </h2>
        <p className="text-sm text-secondary-600">
          Target market breakdown with addressable market size and revenue opportunity
        </p>
      </div>

      {/* Market Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Market Segments</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{segments.length}</div>
          <div className="text-sm text-primary-700">target verticals</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Total Market</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{totalMarketSize.toLocaleString()}</div>
          <div className="text-sm text-success-700">potential customers</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Revenue Opportunity</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">${(totalOpportunity / 1000).toFixed(0)}K</div>
          <div className="text-sm text-warning-700">annual potential</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Primary Focus</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{segments[0].percentage}%</div>
          <div className="text-sm text-purple-700">{segments[0].segment}</div>
        </div>
      </div>

      {/* Market Segmentation Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Market Share Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="percentage"
                label={({ segment, percentage }) => `${segment}: ${percentage}%`}
              >
                {segments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Revenue Opportunity by Segment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segments} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="segment" width={100} />
              <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Opportunity']} />
              <Bar dataKey="opportunity" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Segment Breakdown */}
      <div className="mt-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Segment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {segments.map((segment, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <h4 className="font-semibold text-secondary-900">{segment.segment}</h4>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Market Share</span>
                  <span className="text-sm font-medium text-secondary-900">{segment.percentage}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Market Size</span>
                  <span className="text-sm font-medium text-secondary-900">{segment.size.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Revenue Opportunity</span>
                  <span className="text-sm font-medium text-secondary-900">${(segment.opportunity / 1000).toFixed(0)}K</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Avg Revenue/Customer</span>
                  <span className="text-sm font-medium text-secondary-900">
                    ${Math.round(segment.opportunity / segment.size)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Strategic Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Primary Target</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Independent grocery stores represent 60% of our focus</li>
              <li>• Largest addressable market with 7,400 potential customers</li>
              <li>• Lower average revenue but higher volume opportunity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Growth Strategy</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Regional chains offer highest revenue per customer</li>
              <li>• Specialty retailers provide niche market expansion</li>
              <li>• Focus on high-value segments for initial growth</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}