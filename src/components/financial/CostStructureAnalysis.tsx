import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { DollarSign, TrendingDown, Users, Server } from 'lucide-react';
import Card from '../ui/Card';
import { financialModelingData } from '../../data/mockData';

const { costStructureAnalysis } = financialModelingData;

const COST_COLORS = {
  'Engineering': '#3b82f6',
  'Sales & Marketing': '#10b981',
  'Customer Success': '#f59e0b',
  'Infrastructure': '#ef4444',
  'General & Admin': '#8b5cf6',
  'Support': '#06b6d4'
};

export default function CostStructureAnalysis() {
  // Calculate total costs for current year (year1)
  const totalOperatingCosts = costStructureAnalysis.operatingExpenses.reduce(
    (sum, expense) => sum + expense.year1, 0
  );

  const totalCAC = costStructureAnalysis.customerAcquisitionCost.blendedCAC;

  // Prepare data for charts
  const operatingExpensesData = costStructureAnalysis.operatingExpenses.map(expense => ({
    ...expense,
    monthlyAmount: expense.year1 / 12, // Convert annual to monthly
    color: COST_COLORS[expense.category as keyof typeof COST_COLORS] || '#8b5cf6'
  }));

  // Generate monthly cost projection
  const monthlyCostProjection = Array.from({ length: 36 }, (_, month) => {
    const monthNumber = month + 1;
    const year = Math.floor(month / 12) + 1;
    const growthFactor = Math.pow(1.15, month / 12); // 15% annual cost growth

    const engineering = 35000 * growthFactor;
    const salesMarketing = 28000 * growthFactor;
    const customerSuccess = 18000 * growthFactor;
    const infrastructure = 12000 * growthFactor;
    const generalAdmin = 15000 * growthFactor;
    const support = 8000 * growthFactor;

    const totalCosts = engineering + salesMarketing + customerSuccess + infrastructure + generalAdmin + support;

    return {
      month: monthNumber,
      engineering: Math.round(engineering),
      salesMarketing: Math.round(salesMarketing),
      customerSuccess: Math.round(customerSuccess),
      infrastructure: Math.round(infrastructure),
      generalAdmin: Math.round(generalAdmin),
      support: Math.round(support),
      totalCosts: Math.round(totalCosts),
      year
    };
  });

  // CAC trend data
  const cacTrendData = [
    { channel: 'Blended CAC', cost: costStructureAnalysis.customerAcquisitionCost.blendedCAC, customersAcquired: 10, month: 1 },
    { channel: 'Sales CAC', cost: costStructureAnalysis.customerAcquisitionCost.salesCAC, customersAcquired: 8, month: 2 },
    { channel: 'Marketing CAC', cost: costStructureAnalysis.customerAcquisitionCost.marketingCAC, customersAcquired: 12, month: 3 },
    { channel: 'Organic CAC', cost: costStructureAnalysis.customerAcquisitionCost.organicCAC, customersAcquired: 15, month: 4 }
  ].map(cac => ({
    ...cac,
    efficiency: (cac.customersAcquired / (cac.cost / 1000)).toFixed(1) // customers per $1K
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Cost Structure Analysis
        </h2>
        <p className="text-sm text-secondary-600">
          Operating expenses breakdown, customer acquisition costs, and cost optimization insights
        </p>
      </div>

      {/* Cost Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Monthly OpEx</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">
            ${(totalOperatingCosts / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-primary-700">operating expenses</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Avg CAC</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            ${Math.round(totalCAC / cacTrendData.length).toLocaleString()}
          </div>
          <div className="text-sm text-warning-700">customer acquisition</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Cost Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            {(cacTrendData[cacTrendData.length - 1]?.efficiency || 0)}
          </div>
          <div className="text-sm text-success-700">customers per $1K</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Server className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Infrastructure</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            ${Math.round((costStructureAnalysis.operatingExpenses.find(e => e.category === 'Technology & Infrastructure')?.year1 || 150000) / 12 / 1000)}K
          </div>
          <div className="text-sm text-purple-700">monthly hosting</div>
        </div>
      </div>

      {/* Operating Expenses Breakdown */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Operating Expenses Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={operatingExpensesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="monthlyAmount"
                label={({ category, percentage }) => `${category}: ${percentage}%`}
              >
                {operatingExpensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Monthly Cost']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Cost Categories Breakdown</h3>
          <div className="space-y-4">
            {operatingExpensesData.map((expense, index) => (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: expense.color }}
                    />
                    <h4 className="font-medium text-secondary-900">{expense.category}</h4>
                  </div>
                  <span className="text-lg font-bold text-secondary-900">
                    ${expense.monthlyAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-secondary-600 mb-2">{expense.description}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-600">Monthly:</span>
                    <span className="font-medium text-secondary-900 ml-2">
                      ${expense.monthlyAmount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-600">Annual:</span>
                    <span className="font-medium text-secondary-900 ml-2">
                      ${(expense.monthlyAmount * 12).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Cost Projection */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Monthly Cost Projection (36 Months)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyCostProjection}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name === 'totalCosts' ? 'Total Costs' :
                name === 'salesMarketing' ? 'Sales & Marketing' :
                name === 'customerSuccess' ? 'Customer Success' :
                name === 'generalAdmin' ? 'General & Admin' :
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
              labelFormatter={(month) => `Month ${month}`}
            />
            <Line type="monotone" dataKey="totalCosts" stroke="#1f2937" strokeWidth={3} name="Total Costs" />
            <Line type="monotone" dataKey="engineering" stroke="#3b82f6" strokeWidth={2} name="Engineering" />
            <Line type="monotone" dataKey="salesMarketing" stroke="#10b981" strokeWidth={2} name="Sales & Marketing" />
            <Line type="monotone" dataKey="infrastructure" stroke="#ef4444" strokeWidth={2} name="Infrastructure" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Acquisition Cost Analysis */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">CAC Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cacTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
              <Tooltip
                formatter={(value: any, name: string) => [
                  name === 'cost' ? `$${Number(value).toLocaleString()}` : Number(value),
                  name === 'cost' ? 'CAC' : 'Customers Acquired'
                ]}
              />
              <Bar dataKey="cost" fill="#f59e0b" name="CAC" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">CAC Efficiency Metrics</h3>
          <div className="space-y-4">
            {cacTrendData.slice(-6).map((cac, index) => (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-secondary-900">{cac.channel}</h4>
                  <span className="text-lg font-bold text-secondary-900">
                    ${cac.cost.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-600">Customers:</span>
                    <span className="font-medium text-secondary-900 ml-2">{cac.customersAcquired}</span>
                  </div>
                  <div>
                    <span className="text-secondary-600">CAC:</span>
                    <span className="font-medium text-secondary-900 ml-2">
                      ${Math.round(cac.cost / cac.customersAcquired)}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-600">Efficiency:</span>
                    <span className="font-medium text-secondary-900 ml-2">{cac.efficiency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Structure Insights */}
      <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h3 className="font-semibold text-warning-900 mb-3">Cost Structure Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Cost Optimization</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Engineering costs: 30% of total OpEx</li>
              <li>• CAC trending down with scale</li>
              <li>• Infrastructure scales efficiently</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Key Metrics</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• ${(totalOperatingCosts / 1000).toFixed(0)}K monthly burn rate</li>
              <li>• 15% annual cost growth planned</li>
              <li>• CAC payback in 6-8 months</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Strategic Focus</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Optimize sales & marketing efficiency</li>
              <li>• Scale infrastructure cost-effectively</li>
              <li>• Improve CAC through better targeting</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}