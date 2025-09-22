import Card from '@/components/ui/Card';

export default function Project() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-900">Timeline & Milestones</h1>
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Project Timeline
        </h2>
        <p className="text-secondary-600">
          Master project timeline, sprint planning, and milestone tracking.
        </p>
      </Card>
    </div>
  );
}