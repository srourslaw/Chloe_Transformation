import {
  currentVsFutureState,
  productModules,
  technicalRoadmap,
  featurePrioritizationData,
  sprintPlanningData,
  integrationComplexityData
} from '@/data/mockData';
import CurrentVsFutureState from '@/components/strategy/CurrentVsFutureState';
import ProductArchitecture from '@/components/strategy/ProductArchitecture';
import TechnicalRoadmap from '@/components/strategy/TechnicalRoadmap';
import FeaturePrioritizationMatrix from '@/components/strategy/FeaturePrioritizationMatrix';
import DevelopmentSprintPlanning from '@/components/strategy/DevelopmentSprintPlanning';
import IntegrationComplexityHeatMap from '@/components/strategy/IntegrationComplexityHeatMap';

export default function Strategy() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-secondary-900">Product Strategy</h1>
        <div className="text-sm text-secondary-600">
          Technical transformation and architecture planning
        </div>
      </div>

      {/* Current vs Future State Comparison */}
      <CurrentVsFutureState
        currentState={currentVsFutureState.currentState}
        futureState={currentVsFutureState.futureState}
      />

      {/* Product Module Architecture */}
      <ProductArchitecture
        coreHub={productModules.coreHub}
        modules={productModules.modules}
        integrations={productModules.integrations}
      />

      {/* Technical Transformation Roadmap */}
      <TechnicalRoadmap phases={technicalRoadmap} />

      {/* Feature Prioritization Matrix */}
      <FeaturePrioritizationMatrix features={featurePrioritizationData} />

      {/* Development Sprint Planning */}
      <DevelopmentSprintPlanning sprints={sprintPlanningData} />

      {/* Integration Complexity Heat Map */}
      <IntegrationComplexityHeatMap integrations={integrationComplexityData} />
    </div>
  );
}