import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Target, Award } from 'lucide-react';
import Card from '../ui/Card';
import { financialModelingData } from '../../data/mockData';

const { investmentROI } = financialModelingData;

const EXIT_COLORS = {
  'IPO': '#3b82f6',
  'Strategic Acquisition': '#10b981',
  'Management Buyout': '#f59e0b'
};

export default function InvestmentROIDashboard() {
  // Calculate investment stages summary
  const totalInvestment = investmentROI.investmentStages.reduce((sum, stage) => sum + stage.amount, 0);
  const currentValuation = investmentROI.investmentStages[investmentROI.investmentStages.length - 1]?.postMoneyValuation || 0;

  // Prepare investment stages data for chart
  const investmentStagesData = investmentROI.investmentStages.map((stage, index) => ({
    ...stage,
    cumulativeInvestment: investmentROI.investmentStages
      .slice(0, index + 1)
      .reduce((sum, s) => sum + s.amount, 0),
    valuationMultiple: stage.postMoneyValuation / stage.amount
  }));

  // Exit scenarios comparison
  const exitScenariosData = investmentROI.exitScenarios.map(scenario => ({
    ...scenario,
    investorReturns: scenario.exitValuation - totalInvestment,
    returnMultiple: scenario.exitValuation / totalInvestment
  }));

  // ROI metrics over time (simulated)
  const roiTimelineData = Array.from({ length: 60 }, (_, month) => {
    const monthNumber = month + 1;
    const year = Math.floor(month / 12) + 1;

    // Simulate company valuation growth
    const baseValuation = 5000000; // Starting at $5M
    const growthFactor = Math.pow(1.15, month / 12); // 15% annual growth
    const currentVal = baseValuation * growthFactor;

    // Calculate returns for different scenarios
    const conservativeReturn = (currentVal * 0.8 - totalInvestment) / totalInvestment * 100;
    const baseReturn = (currentVal - totalInvestment) / totalInvestment * 100;
    const optimisticReturn = (currentVal * 1.5 - totalInvestment) / totalInvestment * 100;

    return {
      month: monthNumber,
      year,
      valuation: Math.round(currentVal),
      conservativeROI: Math.max(conservativeReturn, -100),
      baseROI: Math.max(baseReturn, -100),
      optimisticROI: Math.max(optimisticReturn, -100)
    };
  });

  // Investment allocation breakdown
  const investmentAllocation = [
    { category: 'Product Development', amount: 2500000, percentage: 35 },
    { category: 'Sales & Marketing', amount: 2000000, percentage: 28 },
    { category: 'Team Expansion', amount: 1500000, percentage: 21 },
    { category: 'Infrastructure', amount: 700000, percentage: 10 },
    { category: 'Working Capital', amount: 430000, percentage: 6 }
  ];

  const ALLOCATION_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Investment ROI Dashboard
        </h2>
        <p className="text-sm text-secondary-600">
          Investment tracking, valuation modeling, and exit scenario analysis
        </p>
      </div>

      {/* Investment Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Total Investment</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">
            ${(totalInvestment / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-primary-700">across all rounds</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Current Valuation</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            ${(currentValuation / 1000000).toFixed(0)}M
          </div>
          <div className="text-sm text-success-700">post-money value</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Target Exit</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            ${(exitScenariosData.find(e => e.scenario === 'Strategic Acquisition')?.exitValuation / 1000000 || 0).toFixed(0)}M
          </div>
          <div className="text-sm text-warning-700">strategic acquisition</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Expected ROI</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {(exitScenariosData.find(e => e.scenario === 'Strategic Acquisition')?.returnMultiple || 0).toFixed(1)}x
          </div>
          <div className="text-sm text-purple-700">return multiple</div>
        </div>
      </div>

      {/* Investment Stages Timeline */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Investment Stages & Valuation Growth</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={investmentStagesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
            />
            <Tooltip
              formatter={(value: any, name: string) => [
                name === 'amount' || name === 'cumulativeInvestment' ?
                  `$${(Number(value) / 1000000).toFixed(1)}M` :
                  `$${(Number(value) / 1000000).toFixed(0)}M`,
                name === 'amount' ? 'Investment Amount' :
                name === 'cumulativeInvestment' ? 'Cumulative Investment' :
                'Post-Money Valuation'
              ]}
            />
            <Bar yAxisId="left" dataKey="amount" fill="#3b82f6" name="Investment Amount" />
            <Bar yAxisId="left" dataKey="cumulativeInvestment" fill="#10b981" name="Cumulative Investment" />
            <Bar yAxisId="right" dataKey="postMoneyValuation" fill="#f59e0b" name="Post-Money Valuation" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ROI Timeline Projections */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">ROI Projections Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={roiTimelineData.filter((_, index) => index % 3 === 0)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `${Number(value).toFixed(1)}%`,
                name === 'conservativeROI' ? 'Conservative ROI' :
                name === 'baseROI' ? 'Base Case ROI' : 'Optimistic ROI'
              ]}
              labelFormatter={(month) => `Month ${month}`}
            />
            <Line
              type="monotone"
              dataKey="conservativeROI"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Conservative ROI"
            />
            <Line
              type="monotone"
              dataKey="baseROI"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Base Case ROI"
            />
            <Line
              type="monotone"
              dataKey="optimisticROI"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Optimistic ROI"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Exit Scenarios & Investment Allocation */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Exit Scenarios Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exitScenariosData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `$${(Number(value) / 1000000).toFixed(1)}M`,
                  name === 'exitValuation' ? 'Exit Valuation' : 'Investor Returns'
                ]}
              />
              <Bar dataKey="exitValuation" fill="#3b82f6" name="Exit Valuation" />
              <Bar dataKey="investorReturns" fill="#10b981" name="Investor Returns" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Investment Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={investmentAllocation}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="amount"
                label={({ category, percentage }) => `${category}: ${percentage}%`}
              >
                {investmentAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ALLOCATION_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`$${(Number(value) / 1000000).toFixed(1)}M`, 'Investment']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Details Table */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Investment Round Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary-100">
                <th className="text-left p-3 border border-secondary-200">Stage</th>
                <th className="text-right p-3 border border-secondary-200">Investment</th>
                <th className="text-right p-3 border border-secondary-200">Pre-Money</th>
                <th className="text-right p-3 border border-secondary-200">Post-Money</th>
                <th className="text-right p-3 border border-secondary-200">Equity %</th>
                <th className="text-left p-3 border border-secondary-200">Lead Investor</th>
              </tr>
            </thead>
            <tbody>
              {investmentStagesData.map((stage, index) => (
                <tr key={index} className="border-b border-secondary-200">
                  <td className="p-3 font-medium text-secondary-900">{stage.stage}</td>
                  <td className="p-3 text-right text-secondary-700">
                    ${(stage.amount / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-right text-secondary-700">
                    ${((stage.postMoneyValuation - stage.amount) / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-right text-secondary-700">
                    ${(stage.postMoneyValuation / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-right text-secondary-700">
                    {((stage.amount / stage.postMoneyValuation) * 100).toFixed(1)}%
                  </td>
                  <td className="p-3 text-secondary-700">{stage.leadInvestor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exit Scenarios Details */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Exit Scenarios Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exitScenariosData.map((scenario, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: EXIT_COLORS[scenario.scenario as keyof typeof EXIT_COLORS] || '#8b5cf6'
                  }}
                />
                <h4 className="font-semibold text-secondary-900">{scenario.scenario}</h4>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Exit Valuation:</span>
                  <span className="font-medium text-secondary-900">
                    ${(scenario.exitValuation / 1000000).toFixed(0)}M
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-600">Investor Returns:</span>
                  <span className="font-medium text-secondary-900">
                    ${(scenario.investorReturns / 1000000).toFixed(1)}M
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-600">Return Multiple:</span>
                  <span className="font-medium text-secondary-900">
                    {scenario.returnMultiple.toFixed(1)}x
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-600">Timeline:</span>
                  <span className="font-medium text-secondary-900">{scenario.timeframe}</span>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-secondary-600 mb-1">Probability</div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${scenario.probability}%`,
                        backgroundColor: EXIT_COLORS[scenario.scenario as keyof typeof EXIT_COLORS] || '#8b5cf6'
                      }}
                    />
                  </div>
                  <div className="text-xs text-secondary-600 mt-1">{scenario.probability}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment ROI Insights */}
      <div className="p-4 bg-success-50 rounded-lg border border-success-200">
        <h3 className="font-semibold text-success-900 mb-3">Investment ROI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-success-800 mb-2">Investment Performance</h4>
            <ul className="space-y-1 text-success-700">
              <li>• ${(totalInvestment / 1000000).toFixed(1)}M total capital invested</li>
              <li>• Current valuation: ${(currentValuation / 1000000).toFixed(0)}M</li>
              <li>• Strong growth trajectory maintained</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Exit Strategy</h4>
            <ul className="space-y-1 text-success-700">
              <li>• Multiple exit paths available</li>
              <li>• Strategic acquisition most likely</li>
              <li>• Target 5-7x investor returns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Value Creation</h4>
            <ul className="space-y-1 text-success-700">
              <li>• 35% focus on product development</li>
              <li>• 28% allocated to growth marketing</li>
              <li>• Strong team expansion planned</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}