import Card from '@/components/ui/Card';

export default function Strategy() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-900">Product Strategy</h1>

      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Current vs Future State
        </h2>
        <p className="text-secondary-600">
          This section will contain detailed product transformation strategy,
          technical roadmap, and feature prioritization matrix.
        </p>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Technical Architecture
        </h2>
        <p className="text-secondary-600">
          Multi-tenant SaaS architecture design and implementation plan.
        </p>
      </Card>
    </div>
  );
}