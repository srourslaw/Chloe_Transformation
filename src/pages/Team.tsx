import {
  organizationalChart,
  teamHiringTimeline,
  skillsMatrix,
  teamCapacityPlanning
} from '@/data/mockData';
import OrganizationalChart from '@/components/team/OrganizationalChart';
import TeamHiringTimeline from '@/components/team/TeamHiringTimeline';
import SkillsMatrix from '@/components/team/SkillsMatrix';
import TeamCapacityPlanning from '@/components/team/TeamCapacityPlanning';

export default function Team() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-secondary-900">Team Structure</h1>
        <div className="text-sm text-secondary-600">
          Organizational design, hiring pipeline, and capacity planning
        </div>
      </div>

      {/* Interactive Organizational Chart */}
      <OrganizationalChart
        ceo={organizationalChart.ceo}
        departments={organizationalChart.departments}
      />

      {/* Team Hiring Timeline */}
      <TeamHiringTimeline positions={teamHiringTimeline} />

      {/* Skills Matrix & Gap Analysis */}
      <SkillsMatrix
        requiredSkills={skillsMatrix.requiredSkills}
        currentTeam={skillsMatrix.currentTeam}
        skillGaps={skillsMatrix.skillGaps}
      />

      {/* Team Capacity Planning */}
      <TeamCapacityPlanning
        phases={teamCapacityPlanning.phases}
        resourceConflicts={teamCapacityPlanning.resourceConflicts}
      />
    </div>
  );
}