import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Target, TrendingUp, DollarSign, Clock } from 'lucide-react';
import Card from '../ui/Card';

// Monte Carlo simulation results for project completion scenarios
const completionProbabilityData = [
  { month: 10, probability: 5, cumulativeProbability: 5 },
  { month: 11, probability: 15, cumulativeProbability: 20 },
  { month: 12, probability: 35, cumulativeProbability: 55 },
  { month: 13, probability: 25, cumulativeProbability: 80 },
  { month: 14, probability: 15, cumulativeProbability: 95 },
  { month: 15, probability: 5, cumulativeProbability: 100 }
];

// Budget variance simulation
const budgetVarianceData = [
  { variance: '-20%', probability: 5, budget: 1320000 },
  { variance: '-10%', probability: 15, budget: 1485000 },
  { variance: 'Baseline', probability: 40, budget: 1650000 },
  { variance: '+10%', probability: 25, budget: 1815000 },
  { variance: '+20%', probability: 10, budget: 1980000 },
  { variance: '+30%', probability: 5, budget: 2145000 }
];

// Revenue scenario analysis
const revenueScenarioData = [
  { scenario: 'Pessimistic (10%)', revenue: 2100000, probability: 10, customers: 8 },
  { scenario: 'Conservative (25%)', revenue: 2800000, probability: 25, customers: 12 },
  { scenario: 'Realistic (40%)', revenue: 4200000, probability: 40, customers: 15 },
  { scenario: 'Optimistic (20%)', revenue: 5500000, probability: 20, customers: 20 },
  { scenario: 'Best Case (5%)', revenue: 7000000, probability: 5, customers: 25 }
];

// Success probability factors
const successFactors = [
  { factor: 'Technical Execution', baselineProbability: 75, bestCase: 90, worstCase: 60 },
  { factor: 'Market Acceptance', baselineProbability: 80, bestCase: 95, worstCase: 65 },
  { factor: 'Team Performance', baselineProbability: 85, bestCase: 95, worstCase: 70 },
  { factor: 'Funding Availability', baselineProbability: 90, bestCase: 95, worstCase: 80 },
  { factor: 'Competitive Position', baselineProbability: 70, bestCase: 85, worstCase: 55 }
];

export default function MonteCarloSimulation() {
  // Calculate overall success probability (geometric mean approach)
  const overallSuccessProbability = successFactors.reduce((acc, factor) =>
    acc * (factor.baselineProbability / 100), 1) * 100;

  const expectedCompletionMonth = completionProbabilityData.reduce((acc, data) =>
    acc + (data.month * data.probability / 100), 0);

  const expectedBudget = budgetVarianceData.reduce((acc, data) =>
    acc + (data.budget * data.probability / 100), 0);

  const expectedRevenue = revenueScenarioData.reduce((acc, data) =>
    acc + (data.revenue * data.probability / 100), 0);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Monte Carlo Simulation
        </h2>
        <p className="text-sm text-secondary-600">
          Probabilistic analysis of project outcomes under different scenarios
        </p>
      </div>

      {/* Key Simulation Results */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Success Probability</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">
            {overallSuccessProbability.toFixed(0)}%
          </div>
          <div className="text-sm text-primary-700">overall project success</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Expected Completion</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            {expectedCompletionMonth.toFixed(1)} mo
          </div>
          <div className="text-sm text-success-700">weighted average</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Expected Budget</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            ${(expectedBudget / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-warning-700">probabilistic estimate</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Expected Revenue</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            ${(expectedRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-purple-700">Year 3 projection</div>
        </div>
      </div>

      {/* Project Completion Probability */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Project Completion Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionProbabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{ value: 'Completion Month', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `${value}%`,
                  name === 'probability' ? 'Probability' : 'Cumulative Probability'
                ]}
                labelFormatter={(month) => `Month ${month}`}
              />
              <Area
                type="monotone"
                dataKey="probability"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Probability"
              />
              <Area
                type="monotone"
                dataKey="cumulativeProbability"
                stroke="#10b981"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Cumulative"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Budget Variance Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetVarianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="variance" />
              <YAxis />
              <Tooltip
                formatter={(value: any, name: string) => [
                  name === 'probability' ? `${value}%` : `$${(value / 1000000).toFixed(1)}M`,
                  name === 'probability' ? 'Probability' : 'Budget'
                ]}
              />
              <Bar
                dataKey="probability"
                fill="#f59e0b"
                fillOpacity={0.7}
                name="Probability"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Scenario Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Revenue Scenario Analysis (Year 3)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {revenueScenarioData.map((scenario, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                scenario.scenario.includes('Realistic')
                  ? 'bg-primary-50 border-primary-200'
                  : scenario.scenario.includes('Pessimistic')
                  ? 'bg-red-50 border-red-200'
                  : scenario.scenario.includes('Best')
                  ? 'bg-green-50 border-green-200'
                  : 'bg-secondary-50 border-secondary-200'
              }`}
            >
              <div className="text-center">
                <div className={`text-sm font-medium mb-2 ${
                  scenario.scenario.includes('Realistic')
                    ? 'text-primary-900'
                    : scenario.scenario.includes('Pessimistic')
                    ? 'text-red-900'
                    : scenario.scenario.includes('Best')
                    ? 'text-green-900'
                    : 'text-secondary-900'
                }`}>
                  {scenario.scenario}
                </div>
                <div className={`text-xl font-bold mb-1 ${
                  scenario.scenario.includes('Realistic')
                    ? 'text-primary-900'
                    : scenario.scenario.includes('Pessimistic')
                    ? 'text-red-900'
                    : scenario.scenario.includes('Best')
                    ? 'text-green-900'
                    : 'text-secondary-900'
                }`}>
                  ${(scenario.revenue / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-secondary-600">
                  {scenario.customers} customers
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Factor Analysis */}
      <div className="mb-6">
        <h3 className="font-semibold text-secondary-900 mb-4">Success Factor Analysis</h3>
        <div className="space-y-4">
          {successFactors.map((factor, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-secondary-900">{factor.factor}</span>
                <span className="text-lg font-bold text-secondary-900">
                  {factor.baselineProbability}%
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-secondary-600">Worst: {factor.worstCase}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-secondary-600">Baseline: {factor.baselineProbability}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-secondary-600">Best: {factor.bestCase}%</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${factor.baselineProbability}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Summary */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Simulation Summary & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Key Insights</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• 80% chance of completion within 13 months</li>
              <li>• Budget variance mostly within ±20%</li>
              <li>• {overallSuccessProbability.toFixed(0)}% overall success probability</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Risk Mitigation</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Focus on technical execution early</li>
              <li>• Secure additional contingency funding</li>
              <li>• Strengthen competitive positioning</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Decision Points</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Month 6: Market readiness assessment</li>
              <li>• Month 9: Funding runway evaluation</li>
              <li>• Month 12: Success criteria review</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}