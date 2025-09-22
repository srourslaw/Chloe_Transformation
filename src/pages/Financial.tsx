import Card from '@/components/ui/Card';

export default function Financial() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-900">Financial Projections</h1>
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Revenue Models
        </h2>
        <p className="text-secondary-600">
          Financial modeling, ROI analysis, and SaaS metrics dashboard.
        </p>
      </Card>
    </div>
  );
}