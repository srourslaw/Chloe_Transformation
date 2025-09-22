import { dashboardMetrics } from '@/data/mockData';
import MetricsCard from '@/components/charts/MetricsCard';
import Card from '@/components/ui/Card';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-secondary-900">Executive Overview</h1>
        <div className="text-sm text-secondary-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, index) => (
          <MetricsCard key={index} data={metric} />
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-secondary-900">
            Transformation Progress
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Product Strategy</span>
              <span className="text-sm font-medium text-success-600">85% Complete</span>
            </div>
            <div className="h-2 rounded-full bg-secondary-200">
              <div className="h-2 w-[85%] rounded-full bg-success-500"></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Team Building</span>
              <span className="text-sm font-medium text-warning-600">60% Complete</span>
            </div>
            <div className="h-2 rounded-full bg-secondary-200">
              <div className="h-2 w-[60%] rounded-full bg-warning-500"></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Market Analysis</span>
              <span className="text-sm font-medium text-primary-600">70% Complete</span>
            </div>
            <div className="h-2 rounded-full bg-secondary-200">
              <div className="h-2 w-[70%] rounded-full bg-primary-500"></div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold text-secondary-900">
            Market Statistics
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-secondary-100 pb-2">
              <span className="text-sm text-secondary-600">Total Addressable Market</span>
              <span className="text-sm font-medium text-secondary-900">$24.5B</span>
            </div>
            <div className="flex items-center justify-between border-b border-secondary-100 pb-2">
              <span className="text-sm text-secondary-600">Target Market Share</span>
              <span className="text-sm font-medium text-secondary-900">2.5%</span>
            </div>
            <div className="flex items-center justify-between border-b border-secondary-100 pb-2">
              <span className="text-sm text-secondary-600">Competitor Count</span>
              <span className="text-sm font-medium text-secondary-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Growth Rate</span>
              <span className="text-sm font-medium text-success-600">+18% YoY</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50">
            <h3 className="font-medium text-secondary-900">Review Financial Model</h3>
            <p className="text-sm text-secondary-600">Check latest projections and ROI</p>
          </button>
          <button className="rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50">
            <h3 className="font-medium text-secondary-900">Update Team Status</h3>
            <p className="text-sm text-secondary-600">Review hiring progress and capacity</p>
          </button>
          <button className="rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50">
            <h3 className="font-medium text-secondary-900">Risk Assessment</h3>
            <p className="text-sm text-secondary-600">Monitor and mitigate project risks</p>
          </button>
        </div>
      </Card>
    </div>
  );
}