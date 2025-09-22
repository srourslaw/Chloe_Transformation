import Card from '../components/ui/Card';
import RevenueProjectionModels from '../components/financial/RevenueProjectionModels';
import CostStructureAnalysis from '../components/financial/CostStructureAnalysis';
import CashFlowProjections from '../components/financial/CashFlowProjections';
// import InvestmentROIDashboard from '../components/financial/InvestmentROIDashboard';
// import FinancialKPIDashboard from '../components/financial/FinancialKPIDashboard';
// import BenchmarkingComparison from '../components/financial/BenchmarkingComparison';

export default function Financial() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Financial Dashboard</h1>
        <p className="text-lg text-secondary-600">
          Comprehensive financial analysis including KPIs, projections, cost structure, cash flow, and benchmarking
        </p>
      </div>


      <RevenueProjectionModels />
      <CostStructureAnalysis />
      <CashFlowProjections />

      {/* <FinancialKPIDashboard />
      <BenchmarkingComparison />
      <InvestmentROIDashboard /> */}
    </div>
  );
}