import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface PricingTier {
  tier: string;
  price: number;
  setupFee: number;
  features: string[];
  targetCustomers: string;
  projectedRevenue: number;
  customerDistribution: number;
}

interface PricingStrategyComparisonProps {
  tiers: PricingTier[];
}

const TIER_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Starter':
      return 'border-primary-300 bg-primary-50';
    case 'Professional':
      return 'border-success-300 bg-success-50';
    case 'Enterprise':
      return 'border-warning-300 bg-warning-50';
    default:
      return 'border-secondary-300 bg-secondary-50';
  }
};

const getTierAccentColor = (tier: string) => {
  switch (tier) {
    case 'Starter':
      return 'text-primary-700';
    case 'Professional':
      return 'text-success-700';
    case 'Enterprise':
      return 'text-warning-700';
    default:
      return 'text-secondary-700';
  }
};

export default function PricingStrategyComparison({ tiers }: PricingStrategyComparisonProps) {
  const totalRevenue = tiers.reduce((sum, tier) => sum + tier.projectedRevenue, 0);
  const avgPrice = tiers.reduce((sum, tier) => sum + tier.price, 0) / tiers.length;
  const avgSetupFee = tiers.reduce((sum, tier) => sum + tier.setupFee, 0) / tiers.length;

  // Prepare data for charts
  const revenueData = tiers.map((tier, index) => ({
    ...tier,
    color: TIER_COLORS[index]
  }));

  const distributionData = tiers.map((tier, index) => ({
    name: tier.tier,
    value: tier.customerDistribution,
    revenue: tier.projectedRevenue,
    color: TIER_COLORS[index]
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Pricing Strategy Comparison
        </h2>
        <p className="text-sm text-secondary-600">
          Three-tier pricing model with feature comparison and revenue projections
        </p>
      </div>

      {/* Pricing Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Total Revenue</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">${(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="text-sm text-primary-700">projected annual</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Avg Monthly</span>
          </div>
          <div className="text-2xl font-bold text-success-900">${Math.round(avgPrice)}</div>
          <div className="text-sm text-success-700">across tiers</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Avg Setup</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">${(avgSetupFee / 1000).toFixed(1)}K</div>
          <div className="text-sm text-warning-700">implementation fee</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Pricing Tiers</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{tiers.length}</div>
          <div className="text-sm text-purple-700">options available</div>
        </div>
      </div>

      {/* Pricing Tiers Comparison */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Pricing Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <div key={index} className={clsx(
              'p-6 rounded-lg border-2 relative',
              getTierColor(tier.tier),
              tier.tier === 'Professional' ? 'ring-2 ring-success-300 transform scale-105' : ''
            )}>
              {tier.tier === 'Professional' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-success-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={clsx('text-xl font-bold mb-2', getTierAccentColor(tier.tier))}>
                  {tier.tier}
                </h3>
                <div className="text-3xl font-bold text-secondary-900 mb-1">
                  ${tier.price}<span className="text-lg font-normal text-secondary-600">/month</span>
                </div>
                <div className="text-sm text-secondary-600">
                  ${tier.setupFee.toLocaleString()} setup fee
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-secondary-600 mb-2">Target: {tier.targetCustomers}</div>
                <div className="text-sm font-medium text-secondary-900">
                  ${(tier.projectedRevenue / 1000).toFixed(0)}K projected revenue
                </div>
                <div className="text-sm text-secondary-600">
                  {tier.customerDistribution}% customer distribution
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={clsx('font-medium', getTierAccentColor(tier.tier))}>Features Included:</h4>
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success-600 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Analysis Charts */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Revenue by Tier</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tier" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="projectedRevenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Customer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}%`, 'Distribution']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pricing Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Pricing Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <h4 className="font-medium text-secondary-900 mb-3">Monthly Pricing</h4>
            <div className="space-y-2">
              {tiers.map((tier, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-secondary-600">{tier.tier}</span>
                  <span className="font-medium text-secondary-900">${tier.price}/mo</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <h4 className="font-medium text-secondary-900 mb-3">Setup Fees</h4>
            <div className="space-y-2">
              {tiers.map((tier, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-secondary-600">{tier.tier}</span>
                  <span className="font-medium text-secondary-900">${tier.setupFee.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <h4 className="font-medium text-secondary-900 mb-3">Revenue per Customer</h4>
            <div className="space-y-2">
              {tiers.map((tier, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-secondary-600">{tier.tier}</span>
                  <span className="font-medium text-secondary-900">
                    ${Math.round(tier.projectedRevenue / (tier.customerDistribution * 0.15))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Feature Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary-100">
                <th className="text-left p-3 border border-secondary-200">Feature</th>
                {tiers.map((tier, index) => (
                  <th key={index} className="text-center p-3 border border-secondary-200">
                    {tier.tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Extract all unique features */}
              {Array.from(new Set(tiers.flatMap(tier => tier.features))).map((feature, index) => (
                <tr key={index} className="border-b border-secondary-200">
                  <td className="p-3 text-sm text-secondary-700">{feature}</td>
                  {tiers.map((tier, tierIndex) => (
                    <td key={tierIndex} className="p-3 text-center">
                      {tier.features.includes(feature) ? (
                        <CheckCircle className="h-5 w-5 text-success-600 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Strategy Insights */}
      <div className="p-4 bg-success-50 rounded-lg border border-success-200">
        <h3 className="font-semibold text-success-900 mb-3">Pricing Strategy Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-success-800 mb-2">Market Positioning</h4>
            <ul className="space-y-1 text-success-700">
              <li>• Professional tier targets sweet spot (40% distribution)</li>
              <li>• Enterprise tier captures high-value customers</li>
              <li>• Starter tier enables market penetration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Revenue Optimization</h4>
            <ul className="space-y-1 text-success-700">
              <li>• Professional tier generates highest revenue</li>
              <li>• Setup fees offset implementation costs</li>
              <li>• Tiered pricing captures customer segments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Growth Strategy</h4>
            <ul className="space-y-1 text-success-700">
              <li>• Focus Professional tier marketing</li>
              <li>• Upsell path from Starter to Professional</li>
              <li>• Enterprise tier for strategic accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}