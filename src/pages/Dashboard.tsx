import {
  dashboardMetrics,
  transformationTimeline,
  successProbability,
  quickStats,
  revenueProjectionData,
  customerFunnelData,
  investmentBreakdownData,
  marketPositioningData
} from '@/data/mockData';
import MetricsCard from '@/components/charts/MetricsCard';
import TransformationTimeline from '@/components/charts/TransformationTimeline';
import SuccessProbabilityGauge from '@/components/charts/SuccessProbabilityGauge';
import QuickStatsGrid from '@/components/charts/QuickStatsGrid';
import RevenueGrowthChart from '@/components/charts/RevenueGrowthChart';
import CustomerFunnelChart from '@/components/charts/CustomerFunnelChart';
import InvestmentBreakdownChart from '@/components/charts/InvestmentBreakdownChart';
import MarketPositioningChart from '@/components/charts/MarketPositioningChart';
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

      {/* Transformation Timeline */}
      <TransformationTimeline data={transformationTimeline} />

      {/* Success Probability & Quick Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SuccessProbabilityGauge
          percentage={successProbability.percentage}
          factors={successProbability.factors}
        />
        <QuickStatsGrid data={quickStats} />
      </div>

      {/* Strategic Overview Charts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-secondary-900 border-b border-secondary-200 pb-3">
          Strategic Overview & Analysis
        </h2>

        {/* Revenue Growth Projection */}
        <RevenueGrowthChart data={revenueProjectionData} />

        {/* Customer Funnel & Investment Breakdown */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <CustomerFunnelChart data={customerFunnelData} />
          <InvestmentBreakdownChart data={investmentBreakdownData} />
        </div>

        {/* Market Positioning */}
        <MarketPositioningChart data={marketPositioningData} />
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