import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, AlertTriangle, Zap } from 'lucide-react';
import Card from '../ui/Card';
import { financialModelingData } from '../../data/mockData';

const { cashFlowProjections } = financialModelingData;

export default function CashFlowProjections() {
  // Calculate cumulative cash flow
  const cumulativeCashFlow = [];
  let runningCumulative = 0;

  for (let index = 0; index < cashFlowProjections.monthlyData.length; index++) {
    const month = cashFlowProjections.monthlyData[index];
    runningCumulative += month.netCashFlow;

    cumulativeCashFlow.push({
      ...month,
      cumulativeCashFlow: runningCumulative,
      burnRate: month.operatingCosts,
      runway: month.runway || 0,
      cashBalance: month.revenue * (index + 1) * 0.15
    });
  }

  // Key metrics
  const currentCashBalance = cumulativeCashFlow[cumulativeCashFlow.length - 1]?.cashBalance || 0;
  const avgMonthlyBurn = cashFlowProjections.monthlyData.reduce((sum, m) => sum + m.operatingCosts, 0) / cashFlowProjections.monthlyData.length;
  const monthsToBreakeven = cumulativeCashFlow.findIndex(m => m.cumulativeCashFlow > 0) + 1;
  const minCashBalance = Math.min(...cumulativeCashFlow.map(m => m.cashBalance));

  // Quarterly aggregation
  const quarterlyData = [];
  for (let i = 0; i < cumulativeCashFlow.length; i += 3) {
    const quarterMonths = cumulativeCashFlow.slice(i, i + 3);
    const quarter = Math.floor(i / 3) + 1;
    const year = Math.floor(i / 12) + 1;

    quarterlyData.push({
      quarter: `Q${((quarter - 1) % 4) + 1} Y${year}`,
      revenue: quarterMonths.reduce((sum, m) => sum + m.revenue, 0),
      expenses: quarterMonths.reduce((sum, m) => sum + m.operatingCosts, 0),
      netCashFlow: quarterMonths.reduce((sum, m) => sum + m.netCashFlow, 0),
      cashBalance: quarterMonths[quarterMonths.length - 1]?.cashBalance || 0
    });
  }

  // Cash flow scenarios
  const scenarios = [
    { scenario: 'Conservative', multiplier: 0.8, color: '#ef4444' },
    { scenario: 'Base Case', multiplier: 1.0, color: '#3b82f6' },
    { scenario: 'Optimistic', multiplier: 1.3, color: '#10b981' }
  ];

  const scenarioData = cumulativeCashFlow.map(month => {
    const baseRevenue = month.revenue;
    return {
      month: month.month,
      conservative: Math.round(month.cashBalance + (baseRevenue * 0.8 - month.operatingCosts)),
      baseCase: month.cashBalance,
      optimistic: Math.round(month.cashBalance + (baseRevenue * 1.3 - month.operatingCosts))
    };
  });

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Cash Flow Projections
        </h2>
        <p className="text-sm text-secondary-600">
          Monthly cash flow analysis, runway calculations, and scenario planning
        </p>
      </div>

      {/* Cash Flow Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Current Cash</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">
            ${(currentCashBalance / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-primary-700">available balance</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Monthly Burn</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            ${(avgMonthlyBurn / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-warning-700">average expenses</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Breakeven</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            {monthsToBreakeven > 0 ? monthsToBreakeven : '∞'}
          </div>
          <div className="text-sm text-success-700">months to positive</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Min Cash</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            ${(minCashBalance / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-purple-700">lowest balance</div>
        </div>
      </div>

      {/* Monthly Cash Flow Chart */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Monthly Cash Flow Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={cumulativeCashFlow} margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              width={50}
            />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name === 'cashBalance' ? 'Cash Balance' :
                name === 'cumulativeCashFlow' ? 'Cumulative Cash Flow' :
                name === 'netCashFlow' ? 'Net Cash Flow' :
                name === 'revenue' ? 'Revenue' : 'Operating Expenses'
              ]}
              labelFormatter={(month) => `Month ${month}`}
            />
            <Line
              type="monotone"
              dataKey="cashBalance"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Cash Balance"
            />
            <Line
              type="monotone"
              dataKey="cumulativeCashFlow"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Cumulative Cash Flow"
            />
            <Line
              type="monotone"
              dataKey="netCashFlow"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Net Cash Flow"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue vs Expenses */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Revenue vs Operating Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cumulativeCashFlow} margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                width={50}
              />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `$${Number(value).toLocaleString()}`,
                  name === 'revenue' ? 'Revenue' : 'Operating Expenses'
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="operatingCosts"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                name="Operating Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Quarterly Cash Flow Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData} margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                width={50}
              />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `$${Number(value).toLocaleString()}`,
                  name === 'revenue' ? 'Revenue' :
                  name === 'expenses' ? 'Expenses' : 'Net Cash Flow'
                ]}
              />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Bar dataKey="netCashFlow" fill="#3b82f6" name="Net Cash Flow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow Scenarios */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Cash Balance Scenarios</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={scenarioData} margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              width={50}
            />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name === 'conservative' ? 'Conservative' :
                name === 'baseCase' ? 'Base Case' : 'Optimistic'
              ]}
              labelFormatter={(month) => `Month ${month}`}
            />
            <Line
              type="monotone"
              dataKey="conservative"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Conservative"
            />
            <Line
              type="monotone"
              dataKey="baseCase"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Base Case"
            />
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Optimistic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cash Flow Details Table */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Monthly Cash Flow Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-secondary-100">
                <th className="text-left p-2 border border-secondary-200">Month</th>
                <th className="text-right p-2 border border-secondary-200">Revenue</th>
                <th className="text-right p-2 border border-secondary-200">OpEx</th>
                <th className="text-right p-2 border border-secondary-200">Net Cash Flow</th>
                <th className="text-right p-2 border border-secondary-200">Cash Balance</th>
                <th className="text-right p-2 border border-secondary-200">Runway (months)</th>
              </tr>
            </thead>
            <tbody>
              {cumulativeCashFlow.slice(0, 12).map((month, index) => (
                <tr key={index} className="border-b border-secondary-200">
                  <td className="p-2 font-medium">{month.month}</td>
                  <td className="p-2 text-right text-success-700">
                    ${month.revenue.toLocaleString()}
                  </td>
                  <td className="p-2 text-right text-red-600">
                    ${month.operatingCosts.toLocaleString()}
                  </td>
                  <td className={`p-2 text-right ${month.netCashFlow >= 0 ? 'text-success-700' : 'text-red-600'}`}>
                    ${month.netCashFlow.toLocaleString()}
                  </td>
                  <td className="p-2 text-right font-medium">
                    ${(month.cashBalance / 1000000).toFixed(2)}M
                  </td>
                  <td className="p-2 text-right">
                    {month.runway > 0 ? month.runway.toFixed(1) : '∞'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cash Flow Insights */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Cash Flow Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Cash Management</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• ${(currentCashBalance / 1000000).toFixed(1)}M current cash balance</li>
              <li>• {monthsToBreakeven > 0 ? `${monthsToBreakeven} months` : 'No'} to breakeven</li>
              <li>• Minimum balance: ${(minCashBalance / 1000000).toFixed(1)}M</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Burn Rate Analysis</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• ${(avgMonthlyBurn / 1000).toFixed(0)}K average monthly burn</li>
              <li>• Burn rate decreasing with scale</li>
              <li>• Revenue growth outpacing costs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Strategic Recommendations</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Monitor cash runway closely</li>
              <li>• Plan fundraising 6 months ahead</li>
              <li>• Accelerate revenue generation</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}