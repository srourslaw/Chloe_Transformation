import Card from '@/components/ui/Card';

export default function Team() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-900">Team Structure</h1>
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Organizational Chart
        </h2>
        <p className="text-secondary-600">
          Interactive team structure, hiring timeline, and capacity planning.
        </p>
      </Card>
    </div>
  );
}