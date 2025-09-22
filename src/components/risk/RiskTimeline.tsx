import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Clock, TrendingUp, Calendar } from 'lucide-react';
import Card from '../ui/Card';

// Risk timeline data showing when risks are most likely to occur
const riskTimelineData = [
  {
    month: 1,
    marketRisk: 3,
    technicalRisk: 8,
    operationalRisk: 2,
    financialRisk: 1,
    totalRisk: 14,
    mitigationEffort: 20
  },
  {
    month: 2,
    marketRisk: 4,
    technicalRisk: 9,
    operationalRisk: 3,
    financialRisk: 2,
    totalRisk: 18,
    mitigationEffort: 35
  },
  {
    month: 3,
    marketRisk: 5,
    technicalRisk: 7,
    operationalRisk: 5,
    financialRisk: 2,
    totalRisk: 19,
    mitigationEffort: 45
  },
  {
    month: 4,
    marketRisk: 6,
    technicalRisk: 6,
    operationalRisk: 6,
    financialRisk: 3,
    totalRisk: 21,
    mitigationEffort: 55
  },
  {
    month: 5,
    marketRisk: 7,
    technicalRisk: 5,
    operationalRisk: 7,
    financialRisk: 4,
    totalRisk: 23,
    mitigationEffort: 60
  },
  {
    month: 6,
    marketRisk: 8,
    technicalRisk: 4,
    operationalRisk: 8,
    financialRisk: 5,
    totalRisk: 25,
    mitigationEffort: 70
  },
  {
    month: 7,
    marketRisk: 9,
    technicalRisk: 3,
    operationalRisk: 6,
    financialRisk: 6,
    totalRisk: 24,
    mitigationEffort: 75
  },
  {
    month: 8,
    marketRisk: 8,
    technicalRisk: 3,
    operationalRisk: 5,
    financialRisk: 7,
    totalRisk: 23,
    mitigationEffort: 80
  },
  {
    month: 9,
    marketRisk: 7,
    technicalRisk: 2,
    operationalRisk: 4,
    financialRisk: 6,
    totalRisk: 19,
    mitigationEffort: 85
  },
  {
    month: 10,
    marketRisk: 6,
    technicalRisk: 2,
    operationalRisk: 3,
    financialRisk: 5,
    totalRisk: 16,
    mitigationEffort: 90
  },
  {
    month: 11,
    marketRisk: 5,
    technicalRisk: 1,
    operationalRisk: 2,
    financialRisk: 4,
    totalRisk: 12,
    mitigationEffort: 95
  },
  {
    month: 12,
    marketRisk: 4,
    technicalRisk: 1,
    operationalRisk: 2,
    financialRisk: 3,
    totalRisk: 10,
    mitigationEffort: 98
  }
];

// Key risk events and milestones
const riskMilestones = [
  {
    month: 2,
    event: 'Architecture Review',
    type: 'decision',
    description: 'Critical technical decisions that impact project feasibility'
  },
  {
    month: 4,
    event: 'Team Hiring Complete',
    type: 'milestone',
    description: 'All key positions filled to reduce operational risk'
  },
  {
    month: 6,
    event: 'Market Entry',
    type: 'decision',
    description: 'Go-to-market launch increases market and competitive risks'
  },
  {
    month: 8,
    event: 'First Customer Go-Live',
    type: 'milestone',
    description: 'Operational risks peak as first customer implementation begins'
  },
  {
    month: 10,
    event: 'Series A Funding',
    type: 'decision',
    description: 'Financial risk mitigation through additional funding'
  },
  {
    month: 12,
    event: 'Year 1 Review',
    type: 'milestone',
    description: 'Overall risk assessment and strategy adjustment'
  }
];

export default function RiskTimeline() {
  const peakRiskMonth = riskTimelineData.reduce((prev, current) =>
    prev.totalRisk > current.totalRisk ? prev : current
  );

  const currentMitigationProgress = riskTimelineData[5]?.mitigationEffort || 70; // Month 6

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Risk Timeline
        </h2>
        <p className="text-sm text-secondary-600">
          Risk evolution and mitigation progress over the project timeline
        </p>
      </div>

      {/* Timeline Overview Cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-warning-600" />
            <span className="text-sm font-medium text-warning-900">Peak Risk</span>
          </div>
          <div className="text-lg font-bold text-warning-900">Month {peakRiskMonth.month}</div>
          <div className="text-xs text-warning-700">highest exposure period</div>
        </div>

        <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-900">Mitigation Progress</span>
          </div>
          <div className="text-lg font-bold text-primary-900">{currentMitigationProgress}%</div>
          <div className="text-xs text-primary-700">current completion</div>
        </div>

        <div className="p-3 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-4 w-4 text-success-600" />
            <span className="text-sm font-medium text-success-900">Key Milestones</span>
          </div>
          <div className="text-lg font-bold text-success-900">{riskMilestones.length}</div>
          <div className="text-xs text-success-700">decision points</div>
        </div>
      </div>

      {/* Risk Evolution Chart */}
      <div className="mb-6">
        <h3 className="font-semibold text-secondary-900 mb-4">Risk Evolution by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={riskTimelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: 'Project Month', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: 'Risk Level', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: any, name: string) => [
                value,
                name === 'marketRisk' ? 'Market Risk' :
                name === 'technicalRisk' ? 'Technical Risk' :
                name === 'operationalRisk' ? 'Operational Risk' :
                name === 'financialRisk' ? 'Financial Risk' : 'Total Risk'
              ]}
              labelFormatter={(month) => `Month ${month}`}
            />
            <Line
              type="monotone"
              dataKey="technicalRisk"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Technical Risk"
            />
            <Line
              type="monotone"
              dataKey="marketRisk"
              stroke="#10b981"
              strokeWidth={2}
              name="Market Risk"
            />
            <Line
              type="monotone"
              dataKey="operationalRisk"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Operational Risk"
            />
            <Line
              type="monotone"
              dataKey="financialRisk"
              stroke="#ef4444"
              strokeWidth={2}
              name="Financial Risk"
            />
            <Line
              type="monotone"
              dataKey="totalRisk"
              stroke="#1f2937"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Total Risk"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Mitigation Progress */}
      <div className="mb-6">
        <h3 className="font-semibold text-secondary-900 mb-4">Mitigation Effort vs Risk Level</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={riskTimelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: any, name: string) => [
                name === 'mitigationEffort' ? `${value}%` : value,
                name === 'mitigationEffort' ? 'Mitigation Progress' : 'Total Risk'
              ]}
            />
            <Bar yAxisId="left" dataKey="totalRisk" fill="#ef4444" fillOpacity={0.6} name="Total Risk" />
            <Line yAxisId="right" type="monotone" dataKey="mitigationEffort" stroke="#10b981" strokeWidth={3} name="Mitigation Progress" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Risk Milestones */}
      <div>
        <h3 className="font-semibold text-secondary-900 mb-4">Key Risk Milestones & Decision Points</h3>
        <div className="space-y-3">
          {riskMilestones.map((milestone, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                milestone.type === 'decision'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${
                    milestone.type === 'decision' ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                  <span className={`font-medium ${
                    milestone.type === 'decision' ? 'text-orange-900' : 'text-blue-900'
                  }`}>
                    {milestone.event}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  milestone.type === 'decision'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  Month {milestone.month}
                </span>
              </div>
              <p className={`text-sm ${
                milestone.type === 'decision' ? 'text-orange-700' : 'text-blue-700'
              }`}>
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}