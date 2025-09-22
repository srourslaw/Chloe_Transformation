import Card from '../components/ui/Card';

export default function FinancialTest() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Financial Dashboard</h1>
        <p className="text-lg text-secondary-600">
          Comprehensive financial analysis including KPIs, projections, cost structure, cash flow, and benchmarking
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Test Financial Dashboard</h2>
        <p className="text-secondary-600">
          This is a test version to verify the page is working correctly.
        </p>
      </Card>
    </div>
  );
}