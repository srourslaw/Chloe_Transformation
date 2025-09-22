import Card from '@/components/ui/Card';

export default function Risk() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-900">Risk Management</h1>
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Risk Assessment
        </h2>
        <p className="text-secondary-600">
          Risk heat map, risk register, and mitigation strategies.
        </p>
      </Card>
    </div>
  );
}