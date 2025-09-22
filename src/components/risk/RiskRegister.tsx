import { Calendar, User, DollarSign, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import { risks } from '../../data/mockData';

// Enhanced risk data with mitigation details
const enhancedRisks = risks.map((risk, index) => ({
  ...risk,
  owner: ['Sarah Johnson', 'Michael Chen', 'David Kim', 'Emily Rodriguez'][index % 4],
  dueDate: new Date(2024, 3 + index, 15 + (index * 7)), // Spread due dates
  mitigationCost: [25000, 15000, 35000, 20000, 30000][index] || 25000,
  category: risk.title.toLowerCase().includes('market') ? 'Market' :
           risk.title.toLowerCase().includes('technical') ? 'Technical' :
           risk.title.toLowerCase().includes('talent') ? 'Operational' : 'Financial'
}));

const getPriorityColor = (probability: string, impact: string) => {
  const score = (probability === 'high' ? 3 : probability === 'medium' ? 2 : 1) +
                (impact === 'high' ? 3 : impact === 'medium' ? 2 : 1);

  if (score >= 5) return 'text-red-600 bg-red-50';
  if (score >= 4) return 'text-orange-600 bg-orange-50';
  if (score >= 3) return 'text-yellow-600 bg-yellow-50';
  return 'text-green-600 bg-green-50';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'mitigating': return 'text-blue-600 bg-blue-50';
    case 'monitoring': return 'text-yellow-600 bg-yellow-50';
    case 'resolved': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export default function RiskRegister() {
  const totalMitigationCost = enhancedRisks.reduce((sum, risk) => sum + risk.mitigationCost, 0);
  const highPriorityRisks = enhancedRisks.filter(risk =>
    (risk.probability === 'high' && risk.impact === 'high') ||
    (risk.probability === 'high' && risk.impact === 'medium') ||
    (risk.probability === 'medium' && risk.impact === 'high')
  ).length;

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Risk Register
        </h2>
        <p className="text-sm text-secondary-600">
          Detailed risk tracking with owners, timelines, and mitigation costs
        </p>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-900">Total Risks</span>
          </div>
          <div className="text-lg font-bold text-primary-900">{enhancedRisks.length}</div>
        </div>

        <div className="p-3 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-warning-600" />
            <span className="text-sm font-medium text-warning-900">High Priority</span>
          </div>
          <div className="text-lg font-bold text-warning-900">{highPriorityRisks}</div>
        </div>

        <div className="p-3 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-success-600" />
            <span className="text-sm font-medium text-success-900">Mitigation Budget</span>
          </div>
          <div className="text-lg font-bold text-success-900">${(totalMitigationCost / 1000).toFixed(0)}K</div>
        </div>
      </div>

      {/* Risk Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-secondary-100">
              <th className="text-left p-3 border border-secondary-200 font-semibold">Risk</th>
              <th className="text-center p-3 border border-secondary-200 font-semibold">Priority</th>
              <th className="text-center p-3 border border-secondary-200 font-semibold">Status</th>
              <th className="text-left p-3 border border-secondary-200 font-semibold">Owner</th>
              <th className="text-center p-3 border border-secondary-200 font-semibold">Due Date</th>
              <th className="text-right p-3 border border-secondary-200 font-semibold">Cost</th>
            </tr>
          </thead>
          <tbody>
            {enhancedRisks.map((risk, index) => (
              <tr key={risk.id} className="border-b border-secondary-200 hover:bg-secondary-50">
                <td className="p-3 border border-secondary-200">
                  <div>
                    <div className="font-medium text-secondary-900">{risk.title}</div>
                    <div className="text-xs text-secondary-600 mt-1">{risk.category}</div>
                    <div className="text-xs text-secondary-500 mt-1 max-w-xs truncate">
                      {risk.description}
                    </div>
                  </div>
                </td>
                <td className="p-3 border border-secondary-200 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(risk.probability, risk.impact)}`}>
                    {risk.probability === 'high' && risk.impact === 'high' ? 'Critical' :
                     (risk.probability === 'high' && risk.impact === 'medium') ||
                     (risk.probability === 'medium' && risk.impact === 'high') ? 'High' :
                     risk.probability === 'medium' && risk.impact === 'medium' ? 'Medium' : 'Low'}
                  </span>
                </td>
                <td className="p-3 border border-secondary-200 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(risk.status)}`}>
                    {risk.status}
                  </span>
                </td>
                <td className="p-3 border border-secondary-200">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-secondary-400" />
                    <span className="text-secondary-900">{risk.owner}</span>
                  </div>
                </td>
                <td className="p-3 border border-secondary-200 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4 text-secondary-400" />
                    <span className="text-secondary-700">
                      {risk.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </td>
                <td className="p-3 border border-secondary-200 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <DollarSign className="h-4 w-4 text-secondary-400" />
                    <span className="font-medium text-secondary-900">
                      {(risk.mitigationCost / 1000).toFixed(0)}K
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk Analytics Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Severity Distribution */}
        <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Severity Distribution</h3>
          <div className="space-y-3">
            {[
              { level: 'Critical', count: enhancedRisks.filter(r => (r.probability === 'high' && r.impact === 'high')).length, color: 'bg-red-500', percentage: 16 },
              { level: 'High', count: enhancedRisks.filter(r => (r.probability === 'high' && r.impact === 'medium') || (r.probability === 'medium' && r.impact === 'high')).length, color: 'bg-orange-500', percentage: 50 },
              { level: 'Medium', count: enhancedRisks.filter(r => (r.probability === 'medium' && r.impact === 'medium')).length, color: 'bg-yellow-500', percentage: 25 },
              { level: 'Low', count: enhancedRisks.filter(r => (r.probability === 'low' || r.impact === 'low')).length, color: 'bg-green-500', percentage: 9 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-secondary-700">{item.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-secondary-200 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-sm text-secondary-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Response Strategies */}
        <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Risk Response Strategies</h3>
          <div className="space-y-3">
            {[
              { strategy: 'Avoid', description: 'Eliminate risk source', risks: 1, color: 'text-red-600', icon: '🚫' },
              { strategy: 'Mitigate', description: 'Reduce probability/impact', risks: 2, color: 'text-orange-600', icon: '🛡️' },
              { strategy: 'Transfer', description: 'Share or shift risk', risks: 0, color: 'text-blue-600', icon: '🔄' },
              { strategy: 'Accept', description: 'Monitor and tolerate', risks: 1, color: 'text-green-600', icon: '✅' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className={`font-medium ${item.color}`}>{item.strategy}</div>
                    <div className="text-xs text-secondary-500">{item.description}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-secondary-900">{item.risks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Escalation Matrix */}
      <div className="mt-6 p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h3 className="font-semibold text-warning-900 mb-4">Risk Escalation Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-white rounded border border-warning-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-warning-800">Team Level</span>
            </div>
            <div className="text-warning-700">
              <div className="font-medium">Low risks</div>
              <div className="text-xs">Direct manager handles</div>
              <div className="text-xs">Weekly review</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-warning-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-warning-800">Project Level</span>
            </div>
            <div className="text-warning-700">
              <div className="font-medium">Medium risks</div>
              <div className="text-xs">Project manager review</div>
              <div className="text-xs">Bi-weekly assessment</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-warning-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="font-medium text-warning-800">Executive Level</span>
            </div>
            <div className="text-warning-700">
              <div className="font-medium">High risks</div>
              <div className="text-xs">Senior leadership</div>
              <div className="text-xs">Immediate escalation</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-warning-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-medium text-warning-800">Board Level</span>
            </div>
            <div className="text-warning-700">
              <div className="font-medium">Critical risks</div>
              <div className="text-xs">Board notification</div>
              <div className="text-xs">Crisis management</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mitigation Summary */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Mitigation Strategy Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Immediate Actions (Next 30 days)</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Complete technical architecture review</li>
              <li>• Finalize key hiring for development team</li>
              <li>• Establish competitive monitoring process</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Long-term Strategy</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Build strategic partnerships to reduce competition risk</li>
              <li>• Diversify technology stack to reduce dependencies</li>
              <li>• Develop comprehensive training programs</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}