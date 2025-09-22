import Card from '@/components/ui/Card';

export default function Marketing() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-900">Sales & Marketing</h1>
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Go-to-Market Strategy
        </h2>
        <p className="text-secondary-600">
          Market segmentation, sales pipeline, and marketing campaign performance.
        </p>
      </Card>
    </div>
  );
}