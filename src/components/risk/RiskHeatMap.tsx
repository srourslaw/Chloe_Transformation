import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Shield, Target } from 'lucide-react';
import Card from '../ui/Card';
import { risks } from '../../data/mockData';

// Transform risks into heat map data
const riskHeatMapData = risks.map(risk => {
  const probabilityScore = risk.probability === 'high' ? 9 : risk.probability === 'medium' ? 6 : 3;
  const impactScore = risk.impact === 'high' ? 9 : risk.impact === 'medium' ? 6 : 3;

  return {
    id: risk.id,
    title: risk.title,
    probability: probabilityScore,
    impact: impactScore,
    category: risk.title.toLowerCase().includes('market') ? 'Market' :
             risk.title.toLowerCase().includes('technical') ? 'Technical' :
             risk.title.toLowerCase().includes('talent') ? 'Operational' : 'Financial',
    riskLevel: probabilityScore * impactScore >= 49 ? 'Critical' :
               probabilityScore * impactScore >= 25 ? 'High' :
               probabilityScore * impactScore >= 9 ? 'Medium' : 'Low'
  };
});

const RISK_COLORS = {
  'Critical': '#dc2626',
  'High': '#ea580c',
  'Medium': '#d97706',
  'Low': '#16a34a'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-secondary-200 rounded-lg shadow-lg">
        <p className="font-semibold text-secondary-900">{data.title}</p>
        <p className="text-sm text-secondary-600">Category: {data.category}</p>
        <p className="text-sm text-secondary-600">Probability: {data.probability}/10</p>
        <p className="text-sm text-secondary-600">Impact: {data.impact}/10</p>
        <p className={`text-sm font-medium ${
          data.riskLevel === 'Critical' ? 'text-red-600' :
          data.riskLevel === 'High' ? 'text-orange-600' :
          data.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
        }`}>
          Risk Level: {data.riskLevel}
        </p>
      </div>
    );
  }
  return null;
};

export default function RiskHeatMap() {
  const riskCounts = {
    Critical: riskHeatMapData.filter(r => r.riskLevel === 'Critical').length,
    High: riskHeatMapData.filter(r => r.riskLevel === 'High').length,
    Medium: riskHeatMapData.filter(r => r.riskLevel === 'Medium').length,
    Low: riskHeatMapData.filter(r => r.riskLevel === 'Low').length
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Risk Heat Map
        </h2>
        <p className="text-sm text-secondary-600">
          Visual representation of project risks by probability and impact
        </p>
      </div>

      {/* Risk Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="font-medium text-red-900">Critical</span>
          </div>
          <div className="text-2xl font-bold text-red-900">{riskCounts.Critical}</div>
          <div className="text-sm text-red-700">immediate attention</div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-900">High</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">{riskCounts.High}</div>
          <div className="text-sm text-orange-700">close monitoring</div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-900">Medium</span>
          </div>
          <div className="text-2xl font-bold text-yellow-900">{riskCounts.Medium}</div>
          <div className="text-sm text-yellow-700">periodic review</div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Low</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{riskCounts.Low}</div>
          <div className="text-sm text-green-700">minimal concern</div>
        </div>
      </div>

      {/* Heat Map Chart and Risk Analysis */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Probability vs Impact Matrix</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Risk zones background */}
              <defs>
                <pattern id="criticalZone" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="rgba(220, 38, 38, 0.1)" />
                </pattern>
                <pattern id="highZone" patternUnits="userSpaceOnUse" width="15" height="15">
                  <rect width="15" height="15" fill="rgba(234, 88, 12, 0.1)" />
                </pattern>
              </defs>
              <XAxis
                type="number"
                dataKey="probability"
                name="Probability"
                domain={[0, 10]}
                label={{ value: 'Probability (1-10)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="impact"
                name="Impact"
                domain={[0, 10]}
                label={{ value: 'Impact (1-10)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={riskHeatMapData}>
                {riskHeatMapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.riskLevel as keyof typeof RISK_COLORS]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          {/* Risk Matrix Legend */}
          <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center font-medium text-secondary-700">Risk Zones</div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Critical (7-10)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>High (4-6)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low (1-3)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          {/* Risk Velocity Indicator */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Risk Velocity</h4>
            <div className="space-y-3">
              {riskHeatMapData.map((risk, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: RISK_COLORS[risk.riskLevel as keyof typeof RISK_COLORS] }}
                    />
                    <span className="text-sm text-blue-800 truncate">{risk.title.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {risk.probability * risk.impact > 36 ? (
                      <span className="text-xs text-red-600">📈 Rising</span>
                    ) : risk.probability * risk.impact > 16 ? (
                      <span className="text-xs text-yellow-600">➡️ Stable</span>
                    ) : (
                      <span className="text-xs text-green-600">📉 Declining</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Treatment Priority */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Treatment Priority</h4>
            <div className="space-y-2">
              {riskHeatMapData
                .sort((a, b) => (b.probability * b.impact) - (a.probability * a.impact))
                .map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                    <span className="text-xs text-purple-800 truncate max-w-20">{risk.title.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-purple-900">
                    {(risk.probability * risk.impact).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Appetite Gauge */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Risk Appetite</h4>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">75%</div>
                <div className="text-xs text-green-600">Within Tolerance</div>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="text-xs text-green-700 space-y-1">
                <div>• Target: &lt; 80% high-risk items</div>
                <div>• Current: 75% acceptable risk</div>
                <div>• Status: ✅ Within appetite</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Categories and Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Risk Categories */}
        <div className="lg:col-span-2 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Categories Distribution</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Technical', 'Market', 'Operational', 'Financial'].map(category => {
              const categoryRisks = riskHeatMapData.filter(r => r.category === category);
              const percentage = Math.round((categoryRisks.length / riskHeatMapData.length) * 100);
              const categoryColor = category === 'Technical' ? 'bg-blue-500' :
                                  category === 'Market' ? 'bg-green-500' :
                                  category === 'Operational' ? 'bg-yellow-500' : 'bg-purple-500';

              return (
                <div key={category} className="p-3 bg-white rounded-lg border border-secondary-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${categoryColor}`}></div>
                      <span className="font-medium text-secondary-900 text-sm">{category}</span>
                    </div>
                    <span className="text-lg font-bold text-secondary-900">{categoryRisks.length}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div className={`${categoryColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="text-xs text-secondary-600 mt-1">{percentage}% of total risks</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Legend Enhanced */}
        <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Severity Legend</h3>
          <div className="space-y-3">
            {Object.entries(RISK_COLORS).map(([level, color]) => {
              const riskCount = riskHeatMapData.filter(r => r.riskLevel === level).length;
              const actionRequired = level === 'Critical' ? 'Immediate Action' :
                                   level === 'High' ? 'Urgent Review' :
                                   level === 'Medium' ? 'Monitor Closely' : 'Routine Check';

              return (
                <div key={level} className="p-2 bg-white rounded border border-secondary-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-medium text-secondary-900">{level}</span>
                    </div>
                    <span className="text-sm font-bold text-secondary-900">{riskCount}</span>
                  </div>
                  <div className="text-xs text-secondary-600">{actionRequired}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Health Score */}
        <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Health Score</h3>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600">B+</div>
            <div className="text-sm text-secondary-600">Overall Risk Rating</div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-secondary-600">Risk Coverage</span>
              <span className="text-xs font-bold text-secondary-900">94%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-secondary-600">Mitigation Progress</span>
              <span className="text-xs font-bold text-secondary-900">78%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-secondary-600">Response Readiness</span>
              <span className="text-xs font-bold text-secondary-900">85%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="mt-3 text-xs text-secondary-600">
            <div className="flex items-center gap-1">
              <span className="text-green-600">●</span>
              <span>Good risk management</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}