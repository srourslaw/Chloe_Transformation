import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Users, Calculator } from 'lucide-react';
import Card from '../ui/Card';
import { financialModelingData } from '../../data/mockData';

const { revenueProjectionModels } = financialModelingData;

export default function RevenueProjectionModels() {
  const [selectedScenario, setSelectedScenario] = useState('Realistic');

  const currentScenario = revenueProjectionModels.scenarios.find(s => s.scenario === selectedScenario) || revenueProjectionModels.scenarios[1];

  // Generate monthly revenue data for the selected scenario
  const monthlyRevenueData = Array.from({ length: 36 }, (_, month) => {
    const monthNumber = month + 1;
    const year = Math.floor(month / 12) + 1;
    const monthInYear = month % 12 + 1;

    let baseRevenue: number;
    if (year === 1) {
      baseRevenue = currentScenario.yearOneRevenue / 12;
    } else if (year === 2) {
      baseRevenue = currentScenario.yearTwoRevenue / 12;
    } else {
      baseRevenue = currentScenario.yearThreeRevenue / 12;
    }

    const growthFactor = Math.pow(1 + currentScenario.monthlyGrowthRate / 100, month);
    const revenue = baseRevenue * growthFactor;

    const customers = Math.round(currentScenario.customerCount[year - 1] * growthFactor * 0.8);
    const arpu = revenue / customers;

    return {
      month: monthNumber,
      revenue: Math.round(revenue),
      customers,
      arpu: Math.round(arpu),
      year,
      monthInYear,
      cumulativeRevenue: Math.round(revenue * monthNumber / 3)
    };
  });

  // Customer acquisition data
  const customerAcquisitionData = revenueProjectionModels.scenarios.map(scenario => ({
    scenario: scenario.scenario,
    year1: scenario.customerCount[0],
    year2: scenario.customerCount[1],
    year3: scenario.customerCount[2]
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Revenue Projection Models
        </h2>
        <p className="text-sm text-secondary-600">
          Multi-scenario revenue forecasting with customer acquisition and ARPU analysis
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {revenueProjectionModels.scenarios.map((scenario) => (
            <button
              key={scenario.scenario}
              onClick={() => setSelectedScenario(scenario.scenario)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedScenario === scenario.scenario
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {scenario.scenario}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Year 3 Revenue</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">
            ${(currentScenario.yearThreeRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-primary-700">{currentScenario.scenario.toLowerCase()} projection</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Growth Rate</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{currentScenario.monthlyGrowthRate}%</div>
          <div className="text-sm text-success-700">monthly growth</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Year 3 Customers</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{currentScenario.customerCount[2]}</div>
          <div className="text-sm text-warning-700">total customers</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Year 3 ARPU</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            ${currentScenario.avgRevenuePerCustomer[2].toLocaleString()}
          </div>
          <div className="text-sm text-purple-700">per customer/month</div>
        </div>
      </div>

      {/* Revenue Projection Chart */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Monthly Revenue Projection - {selectedScenario}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyRevenueData} margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              width={50}
            />
            <Tooltip
              formatter={(value: any, name: string) => [
                name === 'revenue' ? `$${Number(value).toLocaleString()}` : Number(value).toLocaleString(),
                name === 'revenue' ? 'Monthly Revenue' : name === 'customers' ? 'Customers' : 'ARPU'
              ]}
              labelFormatter={(month) => `Month ${month}`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Growth Analysis */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Customer Acquisition by Scenario</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerAcquisitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="year1" fill="#10b981" name="Year 1" />
              <Bar dataKey="year2" fill="#3b82f6" name="Year 2" />
              <Bar dataKey="year3" fill="#f59e0b" name="Year 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">ARPU Development - {selectedScenario}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData.filter((_, index) => index % 3 === 0)} margin={{ top: 20, right: 30, bottom: 20, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                width={50}
              />
              <Tooltip
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'ARPU']}
                labelFormatter={(month) => `Month ${month}`}
              />
              <Line
                type="monotone"
                dataKey="arpu"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scenario Comparison Table */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Scenario Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary-100">
                <th className="text-left p-3 border border-secondary-200">Scenario</th>
                <th className="text-center p-3 border border-secondary-200">Monthly Growth</th>
                <th className="text-center p-3 border border-secondary-200">Year 1 Revenue</th>
                <th className="text-center p-3 border border-secondary-200">Year 2 Revenue</th>
                <th className="text-center p-3 border border-secondary-200">Year 3 Revenue</th>
                <th className="text-center p-3 border border-secondary-200">Year 3 Customers</th>
                <th className="text-center p-3 border border-secondary-200">Year 3 ARPU</th>
              </tr>
            </thead>
            <tbody>
              {revenueProjectionModels.scenarios.map((scenario, index) => (
                <tr key={index} className="border-b border-secondary-200">
                  <td className="p-3 font-medium text-secondary-900">{scenario.scenario}</td>
                  <td className="p-3 text-center text-secondary-700">{scenario.monthlyGrowthRate}%</td>
                  <td className="p-3 text-center text-secondary-700">
                    ${(scenario.yearOneRevenue / 1000).toFixed(0)}K
                  </td>
                  <td className="p-3 text-center text-secondary-700">
                    ${(scenario.yearTwoRevenue / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-center text-secondary-700">
                    ${(scenario.yearThreeRevenue / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-center text-secondary-700">{scenario.customerCount[2]}</td>
                  <td className="p-3 text-center text-secondary-700">
                    ${scenario.avgRevenuePerCustomer[2].toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Model Insights */}
      <div className="p-4 bg-success-50 rounded-lg border border-success-200">
        <h3 className="font-semibold text-success-900 mb-3">Revenue Model Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-success-800 mb-2">Growth Drivers</h4>
            <ul className="space-y-1 text-success-700">
              <li>• {currentScenario.monthlyGrowthRate}% monthly growth rate</li>
              <li>• Strong customer acquisition trajectory</li>
              <li>• Increasing ARPU through upsells</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Key Milestones</h4>
            <ul className="space-y-1 text-success-700">
              <li>• $1M ARR by month 12-18</li>
              <li>• {currentScenario.customerCount[2]} customers by year 3</li>
              <li>• ${(currentScenario.yearThreeRevenue / 1000000).toFixed(1)}M revenue potential</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-success-800 mb-2">Strategic Focus</h4>
            <ul className="space-y-1 text-success-700">
              <li>• Customer acquisition optimization</li>
              <li>• ARPU expansion strategies</li>
              <li>• Market penetration acceleration</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}