import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, Users, Calculator } from 'lucide-react';
import Card from '../ui/Card';

interface LTVVariables {
  monthlyFee: number;
  retentionRate: number;
  upsellRate: number;
  averageLifespan: number;
}

interface LTVCalculations {
  baseLTV: number;
  upsellLTV: number;
  totalLTV: number;
  acquisitionCost: number;
  ltvCacRatio: number;
}

interface CustomerLifetimeValueProps {
  variables: LTVVariables;
  calculations: LTVCalculations;
}

export default function CustomerLifetimeValue({ variables, calculations }: CustomerLifetimeValueProps) {
  const [sliders, setSliders] = useState(variables);

  // Calculate LTV based on slider values
  const calculateLTV = (vars: LTVVariables) => {
    const baseLTV = (vars.monthlyFee * 12 * vars.averageLifespan) * (vars.retentionRate / 100);
    const upsellLTV = baseLTV * (vars.upsellRate / 100) * 0.3; // 30% revenue increase from upsells
    const totalLTV = baseLTV + upsellLTV;
    const ltvCacRatio = totalLTV / calculations.acquisitionCost;

    return {
      baseLTV: Math.round(baseLTV),
      upsellLTV: Math.round(upsellLTV),
      totalLTV: Math.round(totalLTV),
      ltvCacRatio: Number(ltvCacRatio.toFixed(1))
    };
  };

  const dynamicCalcs = calculateLTV(sliders);

  // Generate LTV projection over time
  const ltvProjection = Array.from({ length: 60 }, (_, month) => {
    const retentionFactor = Math.pow(sliders.retentionRate / 100, month / 12);
    const cumulativeLTV = (sliders.monthlyFee * month) * retentionFactor;
    const withUpsells = cumulativeLTV * (1 + sliders.upsellRate / 100 * 0.3);

    return {
      month: month + 1,
      baseLTV: Math.round(cumulativeLTV),
      totalLTV: Math.round(withUpsells),
      retentionRate: retentionFactor * 100
    };
  });

  // LTV by customer segment (mock data)
  const segmentLTV = [
    { segment: 'Small Stores', ltv: dynamicCalcs.totalLTV * 0.8, customers: 45 },
    { segment: 'Medium Stores', ltv: dynamicCalcs.totalLTV * 1.0, customers: 35 },
    { segment: 'Large Stores', ltv: dynamicCalcs.totalLTV * 1.5, customers: 20 }
  ];

  const handleSliderChange = (key: keyof LTVVariables, value: number) => {
    setSliders(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Customer Lifetime Value Calculator
        </h2>
        <p className="text-sm text-secondary-600">
          Interactive LTV analysis with retention modeling and segment breakdown
        </p>
      </div>

      {/* LTV Summary Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Total LTV</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">${dynamicCalcs.totalLTV.toLocaleString()}</div>
          <div className="text-sm text-primary-700">lifetime value</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">LTV:CAC Ratio</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{dynamicCalcs.ltvCacRatio}:1</div>
          <div className="text-sm text-success-700">healthy ratio &gt; 3:1</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Retention Rate</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{sliders.retentionRate}%</div>
          <div className="text-sm text-warning-700">annual retention</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Payback Period</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {Math.round(calculations.acquisitionCost / sliders.monthlyFee)}
          </div>
          <div className="text-sm text-purple-700">months</div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mb-8 p-6 bg-secondary-50 rounded-lg border border-secondary-200">
        <h3 className="font-semibold text-secondary-900 mb-4">LTV Calculator Variables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Monthly Fee: ${sliders.monthlyFee}
            </label>
            <input
              type="range"
              min="200"
              max="800"
              value={sliders.monthlyFee}
              onChange={(e) => handleSliderChange('monthlyFee', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-secondary-500 mt-1">
              <span>$200</span>
              <span>$800</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Retention Rate: {sliders.retentionRate}%
            </label>
            <input
              type="range"
              min="70"
              max="95"
              value={sliders.retentionRate}
              onChange={(e) => handleSliderChange('retentionRate', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-secondary-500 mt-1">
              <span>70%</span>
              <span>95%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Upsell Rate: {sliders.upsellRate}%
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={sliders.upsellRate}
              onChange={(e) => handleSliderChange('upsellRate', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-secondary-500 mt-1">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Lifespan: {sliders.averageLifespan} months
            </label>
            <input
              type="range"
              min="12"
              max="48"
              value={sliders.averageLifespan}
              onChange={(e) => handleSliderChange('averageLifespan', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-secondary-500 mt-1">
              <span>1yr</span>
              <span>4yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* LTV Projection Chart */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">LTV Accumulation Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={ltvProjection.filter((_, index) => index % 3 === 0)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name === 'baseLTV' ? 'Base LTV' : 'Total LTV'
              ]}
            />
            <Line type="monotone" dataKey="baseLTV" stroke="#10b981" strokeWidth={2} name="Base LTV" />
            <Line type="monotone" dataKey="totalLTV" stroke="#3b82f6" strokeWidth={3} name="Total LTV" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LTV by Customer Segment */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">LTV by Customer Segment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={segmentLTV}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'LTV']} />
              <Bar dataKey="ltv" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Segment Analysis</h3>
          <div className="space-y-4">
            {segmentLTV.map((segment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-secondary-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-secondary-900">{segment.segment}</h4>
                  <span className="text-lg font-bold text-primary-600">
                    ${Math.round(segment.ltv).toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-600">Customers:</span>
                    <span className="font-medium text-secondary-900 ml-2">{segment.customers}%</span>
                  </div>
                  <div>
                    <span className="text-secondary-600">Total Value:</span>
                    <span className="font-medium text-secondary-900 ml-2">
                      ${Math.round(segment.ltv * segment.customers * 0.15).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LTV Calculation Breakdown */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">LTV Calculation Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-3">Base LTV Components</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-700">Monthly Revenue:</span>
                <span className="font-medium">${sliders.monthlyFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-700">Annual Revenue:</span>
                <span className="font-medium">${(sliders.monthlyFee * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-700">Lifespan (months):</span>
                <span className="font-medium">{sliders.averageLifespan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-700">Retention Factor:</span>
                <span className="font-medium">{sliders.retentionRate}%</span>
              </div>
              <div className="border-t border-primary-300 pt-2 flex justify-between font-semibold">
                <span className="text-primary-800">Base LTV:</span>
                <span>${dynamicCalcs.baseLTV.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <h4 className="font-semibold text-success-900 mb-3">Enhanced LTV</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-success-700">Base LTV:</span>
                <span className="font-medium">${dynamicCalcs.baseLTV.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-success-700">Upsell Rate:</span>
                <span className="font-medium">{sliders.upsellRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-success-700">Upsell Value:</span>
                <span className="font-medium">${dynamicCalcs.upsellLTV.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-success-700">CAC:</span>
                <span className="font-medium">${calculations.acquisitionCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-success-300 pt-2 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-success-800">Total LTV:</span>
                  <span>${dynamicCalcs.totalLTV.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-success-800">LTV:CAC Ratio:</span>
                  <span>{dynamicCalcs.ltvCacRatio}:1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LTV Optimization Insights */}
      <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h3 className="font-semibold text-warning-900 mb-3">LTV Optimization Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Current Performance</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Strong LTV:CAC ratio of {dynamicCalcs.ltvCacRatio}:1</li>
              <li>• {sliders.retentionRate}% retention rate is competitive</li>
              <li>• Payback period: {Math.round(calculations.acquisitionCost / sliders.monthlyFee)} months</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Improvement Opportunities</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Increase retention rate to 90%+ (currently {sliders.retentionRate}%)</li>
              <li>• Expand upsell rate beyond {sliders.upsellRate}%</li>
              <li>• Focus on high-value customer segments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Strategic Actions</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Implement customer success programs</li>
              <li>• Develop premium feature add-ons</li>
              <li>• Optimize onboarding for retention</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}