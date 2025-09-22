import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Target, AlertTriangle, Award } from 'lucide-react';
import Card from '../ui/Card';
import { financialKPIsData } from '../../data/mockData';

const { revenueMetrics, profitabilityMetrics, cashFlowMetrics, customerMetrics, saasMetrics, operationalMetrics } = financialKPIsData;

const getStatusColor = (current: number, target: number, isReverse = false) => {
  const ratio = current / target;
  if (isReverse) {
    if (ratio <= 0.8) return 'text-success-600 bg-success-50 border-success-200';
    if (ratio <= 1.0) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-red-600 bg-red-50 border-red-200';
  } else {
    if (ratio >= 0.9) return 'text-success-600 bg-success-50 border-success-200';
    if (ratio >= 0.7) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-red-600 bg-red-50 border-red-200';
  }
};

const getTrendIcon = (trend: number[]) => {
  const recent = trend.slice(-2);
  const isIncreasing = recent[1] > recent[0];
  return isIncreasing ? '↗️' : '↘️';
};

export default function FinancialKPIDashboard() {
  // Prepare MRR trend data
  const mrrTrendData = revenueMetrics.monthlyRecurringRevenue.trend;

  // Prepare profitability trend data
  const profitabilityTrendData = profitabilityMetrics.grossMargin.trend.map((value, index) => ({
    month: index + 1,
    grossMargin: value,
    operatingMargin: profitabilityMetrics.operatingMargin.trend[index],
    netMargin: profitabilityMetrics.netMargin.trend[index]
  }));

  // Prepare customer metrics data
  const customerMetricsData = [
    { metric: 'CAC', value: customerMetrics.customerAcquisitionCost.current, target: customerMetrics.customerAcquisitionCost.target },
    { metric: 'LTV', value: customerMetrics.customerLifetimeValue.current, target: customerMetrics.customerLifetimeValue.target },
    { metric: 'Payback', value: customerMetrics.paybackPeriod.current, target: customerMetrics.paybackPeriod.target }
  ];

  // Cash flow trend data
  const cashFlowTrendData = cashFlowMetrics.operatingCashFlow.trend.map((value, index) => ({
    month: index + 1,
    operatingCashFlow: value,
    freeCashFlow: cashFlowMetrics.freeCashFlow.trend[index],
    burnRate: -cashFlowMetrics.cashBurnRate.trend[index]
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Financial KPIs Dashboard
        </h2>
        <p className="text-sm text-secondary-600">
          Key performance indicators tracking revenue, profitability, cash flow, and customer metrics
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${getStatusColor(revenueMetrics.monthlyRecurringRevenue.current, revenueMetrics.monthlyRecurringRevenue.target)}`}>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5" />
            <span className="font-medium">MRR</span>
            <span className="text-xs">{getTrendIcon(revenueMetrics.monthlyRecurringRevenue.trend.map(t => t.value))}</span>
          </div>
          <div className="text-2xl font-bold">
            ${(revenueMetrics.monthlyRecurringRevenue.current / 1000).toFixed(0)}K
          </div>
          <div className="text-sm flex justify-between">
            <span>Target: ${(revenueMetrics.monthlyRecurringRevenue.target / 1000).toFixed(0)}K</span>
            <span>{revenueMetrics.monthlyRecurringRevenue.growth.toFixed(1)}% growth</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${getStatusColor(Math.abs(profitabilityMetrics.operatingMargin.current), profitabilityMetrics.operatingMargin.target, true)}`}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">Operating Margin</span>
            <span className="text-xs">{getTrendIcon(profitabilityMetrics.operatingMargin.trend)}</span>
          </div>
          <div className="text-2xl font-bold">
            {profitabilityMetrics.operatingMargin.current.toFixed(1)}%
          </div>
          <div className="text-sm flex justify-between">
            <span>Target: {profitabilityMetrics.operatingMargin.target.toFixed(1)}%</span>
            <span>Breakeven: {profitabilityMetrics.operatingMargin.projectedBreakeven}mo</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${getStatusColor(customerMetrics.ltvCacRatio.current, customerMetrics.ltvCacRatio.target)}`}>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5" />
            <span className="font-medium">LTV:CAC</span>
            <span className="text-xs">{getTrendIcon(customerMetrics.ltvCacRatio.trend)}</span>
          </div>
          <div className="text-2xl font-bold">
            {customerMetrics.ltvCacRatio.current.toFixed(1)}:1
          </div>
          <div className="text-sm flex justify-between">
            <span>Target: {customerMetrics.ltvCacRatio.target.toFixed(1)}:1</span>
            <span>Benchmark: {customerMetrics.ltvCacRatio.benchmark.toFixed(1)}:1</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${getStatusColor(cashFlowMetrics.cashRunway.current, cashFlowMetrics.cashRunway.target)}`}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Cash Runway</span>
          </div>
          <div className="text-2xl font-bold">
            {cashFlowMetrics.cashRunway.current}mo
          </div>
          <div className="text-sm flex justify-between">
            <span>Target: {cashFlowMetrics.cashRunway.target}mo</span>
            <span>Burn: ${(cashFlowMetrics.cashBurnRate.current / 1000).toFixed(0)}K</span>
          </div>
        </div>
      </div>

      {/* Revenue Growth Tracking */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Monthly Recurring Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mrrTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name === 'value' ? 'Actual MRR' : 'Target MRR'
              ]}
            />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} name="Actual MRR" />
            <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target MRR" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Profitability Trends */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Profitability Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitabilityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: any, name: string) => [`${Number(value).toFixed(1)}%`, name]} />
              <Line type="monotone" dataKey="grossMargin" stroke="#10b981" strokeWidth={2} name="Gross Margin" />
              <Line type="monotone" dataKey="operatingMargin" stroke="#3b82f6" strokeWidth={2} name="Operating Margin" />
              <Line type="monotone" dataKey="netMargin" stroke="#f59e0b" strokeWidth={2} name="Net Margin" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Customer Metrics vs Targets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerMetricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip formatter={(value: any, name: string) => [Number(value).toLocaleString(), name]} />
              <Bar dataKey="value" fill="#3b82f6" name="Current" />
              <Bar dataKey="target" fill="#10b981" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Cash Flow Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={cashFlowTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name === 'operatingCashFlow' ? 'Operating Cash Flow' :
                name === 'freeCashFlow' ? 'Free Cash Flow' : 'Burn Rate'
              ]}
            />
            <Line type="monotone" dataKey="operatingCashFlow" stroke="#3b82f6" strokeWidth={2} name="Operating Cash Flow" />
            <Line type="monotone" dataKey="freeCashFlow" stroke="#10b981" strokeWidth={2} name="Free Cash Flow" />
            <Line type="monotone" dataKey="burnRate" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Burn Rate" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SaaS Metrics Grid */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">SaaS Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-secondary-900">Churn Rate</h4>
              <span className="text-xs text-secondary-600">{getTrendIcon(saasMetrics.churnRate.trend)}</span>
            </div>
            <div className="text-2xl font-bold text-secondary-900">{saasMetrics.churnRate.current}%</div>
            <div className="text-sm text-secondary-600">Target: {saasMetrics.churnRate.target}%</div>
            <div className="text-xs text-secondary-500 mt-1">
              Gross: {saasMetrics.churnRate.gross}% | Net: {saasMetrics.churnRate.net}%
            </div>
          </div>

          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-secondary-900">NRR</h4>
              <span className="text-xs text-secondary-600">{getTrendIcon(saasMetrics.netRevenueRetention.trend)}</span>
            </div>
            <div className="text-2xl font-bold text-secondary-900">{saasMetrics.netRevenueRetention.current}%</div>
            <div className="text-sm text-secondary-600">Target: {saasMetrics.netRevenueRetention.target}%</div>
            <div className="text-xs text-secondary-500 mt-1">
              Expansion: {saasMetrics.netRevenueRetention.expansion}%
            </div>
          </div>

          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-secondary-900">ARPU</h4>
              <span className="text-xs text-secondary-600">{getTrendIcon(saasMetrics.averageRevenuePerUser.trend)}</span>
            </div>
            <div className="text-2xl font-bold text-secondary-900">${saasMetrics.averageRevenuePerUser.current}</div>
            <div className="text-sm text-secondary-600">Target: ${saasMetrics.averageRevenuePerUser.target}</div>
          </div>

          <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-secondary-900">CSAT</h4>
              <span className="text-xs text-secondary-600">{getTrendIcon(saasMetrics.customerSatisfactionScore.trend)}</span>
            </div>
            <div className="text-2xl font-bold text-secondary-900">{saasMetrics.customerSatisfactionScore.current}/10</div>
            <div className="text-sm text-secondary-600">Target: {saasMetrics.customerSatisfactionScore.target}/10</div>
            <div className="text-xs text-secondary-500 mt-1">
              Response Rate: {saasMetrics.customerSatisfactionScore.responseRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Operational Efficiency */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Operational Efficiency Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-primary-900">Rule of 40</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">{operationalMetrics.ruleOf40.current}</div>
            <div className="text-sm text-primary-700">Target: {operationalMetrics.ruleOf40.target}</div>
            <div className="text-xs text-primary-600 mt-1">
              Growth: {operationalMetrics.ruleOf40.revenueGrowth}% + Margin: {operationalMetrics.ruleOf40.profitMargin}%
            </div>
          </div>

          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-5 w-5 text-success-600" />
              <span className="font-medium text-success-900">GRR</span>
            </div>
            <div className="text-2xl font-bold text-success-900">{operationalMetrics.grossRevenueRetention.current}%</div>
            <div className="text-sm text-success-700">Target: {operationalMetrics.grossRevenueRetention.target}%</div>
            <div className="text-xs text-success-600 mt-1">
              Benchmark: {operationalMetrics.grossRevenueRetention.benchmark}%
            </div>
          </div>

          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-5 w-5 text-warning-600" />
              <span className="font-medium text-warning-900">Sales Efficiency</span>
            </div>
            <div className="text-2xl font-bold text-warning-900">{operationalMetrics.salesEfficiency.current}</div>
            <div className="text-sm text-warning-700">Target: {operationalMetrics.salesEfficiency.target}</div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Magic Number</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">{operationalMetrics.magicNumber.current}</div>
            <div className="text-sm text-purple-700">Target: {operationalMetrics.magicNumber.target}</div>
            <div className="text-xs text-purple-600 mt-1">
              Benchmark: {operationalMetrics.magicNumber.benchmark}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
        <h3 className="font-semibold text-secondary-900 mb-3">KPI Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Revenue Performance</h4>
            <ul className="space-y-1 text-secondary-700">
              <li>• MRR: ${(revenueMetrics.monthlyRecurringRevenue.current / 1000).toFixed(0)}K ({revenueMetrics.monthlyRecurringRevenue.growth.toFixed(1)}% growth)</li>
              <li>• ARR: ${(revenueMetrics.annualRecurringRevenue.current / 1000000).toFixed(1)}M</li>
              <li>• On track for ${(revenueMetrics.annualRecurringRevenue.projection / 1000000).toFixed(1)}M projection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Customer Health</h4>
            <ul className="space-y-1 text-secondary-700">
              <li>• LTV:CAC ratio at {customerMetrics.ltvCacRatio.current}:1</li>
              <li>• Churn rate: {saasMetrics.churnRate.current}% (improving)</li>
              <li>• NRR: {saasMetrics.netRevenueRetention.current}% (strong expansion)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Financial Health</h4>
            <ul className="space-y-1 text-secondary-700">
              <li>• {cashFlowMetrics.cashRunway.current} months runway remaining</li>
              <li>• Rule of 40: {operationalMetrics.ruleOf40.current} (excellent)</li>
              <li>• Path to profitability in {profitabilityMetrics.operatingMargin.projectedBreakeven} months</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}