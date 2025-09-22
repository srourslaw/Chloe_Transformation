import ProjectTimelineDashboard from '../components/project/ProjectTimelineDashboard';
import MilestoneTracking from '../components/project/MilestoneTracking';
import ProgressMonitoringDashboard from '../components/project/ProgressMonitoringDashboard';

export default function Project() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Project Management Dashboard</h1>
        <p className="text-lg text-secondary-600">
          Comprehensive project tracking including timeline, milestones, progress monitoring, and team performance
        </p>
      </div>

      <ProgressMonitoringDashboard />
      <ProjectTimelineDashboard />
      <MilestoneTracking />
    </div>
  );
}