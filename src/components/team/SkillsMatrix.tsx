import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface TeamMemberSkills {
  name: string;
  role: string;
  skills: Record<string, number>;
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface SkillsMatrixProps {
  requiredSkills: string[];
  currentTeam: TeamMemberSkills[];
  skillGaps: SkillGap[];
}

const getSkillLevelColor = (level: number) => {
  if (level >= 4) return 'bg-success-500';
  if (level >= 3) return 'bg-warning-500';
  if (level >= 1) return 'bg-danger-500';
  return 'bg-secondary-300';
};

const getSkillLevelText = (level: number) => {
  if (level >= 4) return 'Expert';
  if (level >= 3) return 'Proficient';
  if (level >= 1) return 'Basic';
  return 'None';
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'text-danger-700 bg-danger-100 border-danger-300';
    case 'high':
      return 'text-warning-700 bg-warning-100 border-warning-300';
    case 'medium':
      return 'text-primary-700 bg-primary-100 border-primary-300';
    case 'low':
      return 'text-secondary-700 bg-secondary-100 border-secondary-300';
    default:
      return 'text-secondary-700 bg-secondary-100 border-secondary-300';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-danger-600" />;
    case 'high':
      return <TrendingUp className="h-4 w-4 text-warning-600" />;
    case 'medium':
      return <CheckCircle className="h-4 w-4 text-primary-600" />;
    default:
      return <User className="h-4 w-4 text-secondary-600" />;
  }
};

export default function SkillsMatrix({ requiredSkills, currentTeam, skillGaps }: SkillsMatrixProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Calculate average skill levels across team
  const avgSkills = requiredSkills.map(skill => {
    const total = currentTeam.reduce((sum, member) => sum + (member.skills[skill] || 0), 0);
    return {
      skill,
      currentLevel: total / currentTeam.length,
      requiredLevel: 4 // Assume required level of 4 for most skills
    };
  });

  // Prepare radar chart data for selected member
  const selectedMemberData = selectedMember
    ? requiredSkills.map(skill => ({
        skill: skill.length > 10 ? skill.substring(0, 10) + '...' : skill,
        fullSkill: skill,
        level: currentTeam.find(m => m.name === selectedMember)?.skills[skill] || 0,
        maxLevel: 5
      }))
    : [];

  // Skills distribution
  const skillDistribution = requiredSkills.map(skill => {
    const levels = currentTeam.map(member => member.skills[skill] || 0);
    return {
      skill,
      expert: levels.filter(l => l >= 4).length,
      proficient: levels.filter(l => l >= 3 && l < 4).length,
      basic: levels.filter(l => l >= 1 && l < 3).length,
      none: levels.filter(l => l === 0).length
    };
  });

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Skills Matrix & Gap Analysis
        </h2>
        <p className="text-sm text-secondary-600">
          Team skill assessment with capability gaps and recommendations
        </p>
      </div>

      {/* Skills Overview */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Strong Skills</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            {avgSkills.filter(s => s.currentLevel >= 3).length}
          </div>
          <div className="text-sm text-success-700">team capabilities</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Developing</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">
            {avgSkills.filter(s => s.currentLevel >= 1 && s.currentLevel < 3).length}
          </div>
          <div className="text-sm text-warning-700">skills in progress</div>
        </div>

        <div className="p-4 bg-danger-50 rounded-lg border border-danger-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-danger-600" />
            <span className="font-medium text-danger-900">Skill Gaps</span>
          </div>
          <div className="text-2xl font-bold text-danger-900">
            {skillGaps.filter(g => g.priority === 'critical' || g.priority === 'high').length}
          </div>
          <div className="text-sm text-danger-700">critical/high priority</div>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Team Size</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{currentTeam.length}</div>
          <div className="text-sm text-primary-700">team members</div>
        </div>
      </div>

      {/* Skills Matrix Table */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Skills Matrix</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid gap-1" style={{ gridTemplateColumns: `200px repeat(${requiredSkills.length}, 1fr)` }}>
              {/* Header */}
              <div className="p-2 bg-secondary-100 font-medium text-secondary-700">Team Member</div>
              {requiredSkills.map(skill => (
                <div
                  key={skill}
                  className="p-2 bg-secondary-100 text-center text-xs font-medium text-secondary-700 cursor-pointer hover:bg-secondary-200"
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                >
                  {skill.length > 8 ? skill.substring(0, 8) + '...' : skill}
                </div>
              ))}

              {/* Team Member Rows */}
              {currentTeam.map((member, memberIndex) => (
                <>
                  <div
                    key={`${memberIndex}-name`}
                    className="p-3 bg-white border border-secondary-200 cursor-pointer hover:bg-secondary-50"
                    onClick={() => setSelectedMember(selectedMember === member.name ? null : member.name)}
                  >
                    <div className="font-medium text-secondary-900 text-sm">{member.name}</div>
                    <div className="text-xs text-secondary-600">{member.role}</div>
                  </div>
                  {requiredSkills.map(skill => {
                    const level = member.skills[skill] || 0;
                    return (
                      <div
                        key={`${memberIndex}-${skill}`}
                        className="p-2 bg-white border border-secondary-200 flex items-center justify-center"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold', getSkillLevelColor(level))}>
                            {level}
                          </div>
                          <div className="text-xs text-secondary-600">
                            {getSkillLevelText(level)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Member Radar Chart */}
      {selectedMember && (
        <div className="mb-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="font-semibold text-primary-900 mb-4">
            {selectedMember} - Skills Profile
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={selectedMemberData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Skill Level"
                    dataKey="level"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-medium text-primary-800 mb-3">Skills Breakdown</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedMemberData
                  .sort((a, b) => b.level - a.level)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-primary-700" title={item.fullSkill}>
                        {item.fullSkill}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className={clsx('w-4 h-4 rounded-full', getSkillLevelColor(item.level))} />
                        <span className="font-medium text-primary-900">{item.level}/5</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Gaps Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Skill Gaps Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-secondary-800 mb-3">Current vs Required Skills</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillGaps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="skill"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="currentLevel" fill="#10b981" name="Current Level" />
                <Bar dataKey="requiredLevel" fill="#3b82f6" name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-medium text-secondary-800 mb-3">Priority Skill Gaps</h4>
            <div className="space-y-3">
              {skillGaps
                .sort((a, b) => b.gap - a.gap)
                .map((gap, index) => (
                  <div key={index} className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-secondary-900">{gap.skill}</h5>
                      <span className={clsx(
                        'px-2 py-1 rounded text-xs font-medium border',
                        getPriorityColor(gap.priority)
                      )}>
                        {gap.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary-600">
                        Current: {gap.currentLevel.toFixed(1)} / Required: {gap.requiredLevel}
                      </span>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(gap.priority)}
                        <span className="font-medium text-secondary-900">
                          Gap: {gap.gap.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Distribution */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Skills Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillDistribution.map((dist, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <h4 className="font-medium text-secondary-900 mb-3">{dist.skill}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success-500" />
                    <span>Expert (4-5)</span>
                  </div>
                  <span className="font-medium">{dist.expert}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning-500" />
                    <span>Proficient (3)</span>
                  </div>
                  <span className="font-medium">{dist.proficient}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-danger-500" />
                    <span>Basic (1-2)</span>
                  </div>
                  <span className="font-medium">{dist.basic}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary-300" />
                    <span>None (0)</span>
                  </div>
                  <span className="font-medium">{dist.none}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h3 className="font-semibold text-warning-900 mb-3">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Immediate Actions</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Hire UX/UI Designer (critical gap)</li>
              <li>• Provide DevOps training to engineering team</li>
              <li>• Recruit senior sales professionals</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-800 mb-2">Medium-term Goals</h4>
            <ul className="space-y-1 text-warning-700">
              <li>• Cross-train team in testing methodologies</li>
              <li>• Invest in Docker/containerization training</li>
              <li>• Strengthen marketing capabilities</li>
            </ul>
          </div>
        </div>
      </div>

      {!selectedMember && (
        <div className="mt-6 text-center py-4 text-secondary-600">
          <p className="text-sm">Click on team member names to view individual skill profiles</p>
        </div>
      )}
    </Card>
  );
}