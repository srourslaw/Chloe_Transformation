import RiskHeatMap from '../components/risk/RiskHeatMap';
import RiskRegister from '../components/risk/RiskRegister';
import RiskTimeline from '../components/risk/RiskTimeline';
import MonteCarloSimulation from '../components/risk/MonteCarloSimulation';

export default function Risk() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Risk Management Dashboard</h1>
        <p className="text-lg text-secondary-600">
          Comprehensive risk assessment, monitoring, and mitigation strategies for the Chloe transformation project
        </p>
      </div>

      <RiskHeatMap />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RiskRegister />
        <RiskTimeline />
      </div>
      <MonteCarloSimulation />
    </div>
  );
}