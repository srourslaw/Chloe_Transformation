import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Users, Award, DollarSign } from 'lucide-react';
import Card from '../ui/Card';

interface WeeklyMetric {
  week: string;
  storyPoints: number;
  bugResolution: number;
  codeReviewTime: number;
  customerProgress: number;
}

interface MonthlyReview {
  month: string;
  teamSatisfaction: number;
  productivity: number;
  trainingCompletion: number;
  retention: number;
}

interface QuarterlyAssessment {
  quarter: string;
  performanceVsGoals: number;
  skillDevelopment: number;
  careerProgression: number;
  teamExpansion: number;
}

interface BudgetAllocation {
  personnelCosts: { role: string; cost: number; percentage: number }[];
  trainingBudget: number;
  equipmentBudget: number;
  performanceBonus: number;
}

interface TeamPerformanceMetricsProps {
  weeklyMetrics: WeeklyMetric[];
  monthlyReviews: MonthlyReview[];
  quarterlyAssessment: QuarterlyAssessment[];
  budgetAllocation: BudgetAllocation;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function TeamPerformanceMetrics({
  weeklyMetrics,
  monthlyReviews,
  quarterlyAssessment,
  budgetAllocation
}: TeamPerformanceMetricsProps) {
  // Calculate averages for summary cards
  const avgStoryPoints = Math.round(weeklyMetrics.reduce((sum, week) => sum + week.storyPoints, 0) / weeklyMetrics.length);
  const avgBugResolution = Math.round(weeklyMetrics.reduce((sum, week) => sum + week.bugResolution, 0) / weeklyMetrics.length);
  const avgCodeReviewTime = (weeklyMetrics.reduce((sum, week) => sum + week.codeReviewTime, 0) / weeklyMetrics.length).toFixed(1);
  const avgTeamSatisfaction = (monthlyReviews.reduce((sum, month) => sum + month.teamSatisfaction, 0) / monthlyReviews.length).toFixed(1);

  const totalPersonnelCost = budgetAllocation.personnelCosts.reduce((sum, cost) => sum + cost.cost, 0);
  const totalBudget = totalPersonnelCost + budgetAllocation.trainingBudget + budgetAllocation.equipmentBudget + budgetAllocation.performanceBonus;

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Team Performance Metrics
        </h2>
        <p className="text-sm text-secondary-600">
          Weekly team metrics, monthly reviews, and quarterly assessments
        </p>
      </div>

      {/* Performance Summary Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Avg Velocity</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{avgStoryPoints}</div>
          <div className="text-sm text-primary-700">story points/week</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Bug Resolution</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{avgBugResolution}%</div>
          <div className="text-sm text-success-700">average rate</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Code Review</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{avgCodeReviewTime}h</div>
          <div className="text-sm text-warning-700">avg turnaround</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Satisfaction</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{avgTeamSatisfaction}/5</div>
          <div className="text-sm text-purple-700">team rating</div>
        </div>
      </div>

      {/* Weekly Team Metrics Dashboard */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Weekly Team Metrics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-secondary-800 mb-3">Development Velocity</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="storyPoints" stroke="#3b82f6" strokeWidth={3} name="Story Points" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-medium text-secondary-800 mb-3">Bug Resolution Rate</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value: any) => [`${value}%`, 'Resolution Rate']} />
                <Line type="monotone" dataKey="bugResolution" stroke="#10b981" strokeWidth={3} name="Bug Resolution %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-medium text-secondary-800 mb-3">Code Review Turnaround</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}h`, 'Review Time']} />
                <Bar dataKey="codeReviewTime" fill="#f59e0b" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-medium text-secondary-800 mb-3">Customer Implementation Progress</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value: any) => [`${value}%`, 'Progress']} />
                <Line type="monotone" dataKey="customerProgress" stroke="#8b5cf6" strokeWidth={3} name="Progress %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Team Review Cards */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Monthly Team Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monthlyReviews.map((review, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <h4 className="font-medium text-secondary-900 mb-3">{review.month}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Team Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${(review.teamSatisfaction / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{review.teamSatisfaction}/5</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Productivity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-success-500 h-2 rounded-full"
                        style={{ width: `${review.productivity}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{review.productivity}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Training Completion</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-warning-500 h-2 rounded-full"
                        style={{ width: `${review.trainingCompletion}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{review.trainingCompletion}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Retention</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${review.retention}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{review.retention}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly Assessment Matrix */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Quarterly Assessment</h3>
        {quarterlyAssessment.map((assessment, index) => (
          <div key={index} className="p-6 bg-primary-50 rounded-lg border border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-4">{assessment.quarter}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">{assessment.performanceVsGoals}%</div>
                <div className="text-sm text-primary-700">Performance vs Goals</div>
                <div className="w-full bg-primary-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${assessment.performanceVsGoals}%` }}
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-success-900 mb-1">{assessment.skillDevelopment}%</div>
                <div className="text-sm text-success-700">Skill Development</div>
                <div className="w-full bg-success-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-success-600 h-2 rounded-full"
                    style={{ width: `${assessment.skillDevelopment}%` }}
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-warning-900 mb-1">{assessment.careerProgression}%</div>
                <div className="text-sm text-warning-700">Career Progression</div>
                <div className="w-full bg-warning-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-warning-600 h-2 rounded-full"
                    style={{ width: `${assessment.careerProgression}%` }}
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-900 mb-1">+{assessment.teamExpansion}</div>
                <div className="text-sm text-purple-700">Team Expansion</div>
                <div className="text-xs text-purple-600 mt-2">New hires this quarter</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Personnel Costs Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetAllocation.personnelCosts}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="cost"
                label={({ role, percentage }) => `${role}: ${percentage}%`}
              >
                {budgetAllocation.personnelCosts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Cost']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Budget Breakdown</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-secondary-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-secondary-900">Total Personnel</span>
                </div>
                <span className="text-lg font-bold text-secondary-900">
                  ${totalPersonnelCost.toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-secondary-600">
                {Math.round((totalPersonnelCost / totalBudget) * 100)}% of total budget
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-success-50 rounded-lg border border-success-200 text-center">
                <div className="text-lg font-bold text-success-900">
                  ${budgetAllocation.trainingBudget.toLocaleString()}
                </div>
                <div className="text-sm text-success-700">Training & Development</div>
              </div>

              <div className="p-3 bg-warning-50 rounded-lg border border-warning-200 text-center">
                <div className="text-lg font-bold text-warning-900">
                  ${budgetAllocation.equipmentBudget.toLocaleString()}
                </div>
                <div className="text-sm text-warning-700">Equipment & Tools</div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                <div className="text-lg font-bold text-purple-900">
                  ${budgetAllocation.performanceBonus.toLocaleString()}
                </div>
                <div className="text-sm text-purple-700">Performance Bonuses</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-secondary-900">Total Team Budget</span>
                <span className="text-xl font-bold text-secondary-900">
                  ${totalBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}