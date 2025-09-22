import { salesMarketingData, pricingStrategyData } from '@/data/mockData';
import MarketSegmentationAnalysis from '@/components/sales/MarketSegmentationAnalysis';
import SalesPipelineVisualization from '@/components/sales/SalesPipelineVisualization';
import MarketingCampaignPerformance from '@/components/sales/MarketingCampaignPerformance';
import CompetitivePositioningMap from '@/components/sales/CompetitivePositioningMap';
import PricingStrategyComparison from '@/components/sales/PricingStrategyComparison';
import CustomerLifetimeValue from '@/components/sales/CustomerLifetimeValue';

export default function Sales() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-secondary-900">Sales & Marketing</h1>
        <div className="text-sm text-secondary-600">
          Go-to-market strategy, sales pipeline, and revenue optimization
        </div>
      </div>

      {/* Market Segmentation Analysis */}
      <MarketSegmentationAnalysis segments={salesMarketingData.marketSegmentation} />

      {/* Sales Pipeline Visualization */}
      <SalesPipelineVisualization pipeline={salesMarketingData.salesPipeline} />

      {/* Marketing Campaign Performance */}
      <MarketingCampaignPerformance campaigns={salesMarketingData.marketingCampaigns} />

      {/* Competitive Positioning Map */}
      <CompetitivePositioningMap positioning={salesMarketingData.competitivePositioning} />

      {/* Pricing Strategy Comparison */}
      <PricingStrategyComparison tiers={pricingStrategyData.pricingTiers} />

      {/* Customer Lifetime Value Calculator */}
      <CustomerLifetimeValue
        variables={pricingStrategyData.customerLifetimeValue.variables}
        calculations={pricingStrategyData.customerLifetimeValue.calculations}
      />
    </div>
  );
}