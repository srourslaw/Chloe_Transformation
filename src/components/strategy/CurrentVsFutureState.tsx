import {
  User, Users, Code, Layers, Upload, Zap,
  Database, Cloud, Settings, Sliders, ArrowRight
} from 'lucide-react';
import Card from '../ui/Card';

interface StateFeature {
  icon: string;
  title: string;
  description: string;
}

interface StateData {
  title: string;
  subtitle: string;
  features: StateFeature[];
}

interface CurrentVsFutureStateProps {
  currentState: StateData;
  futureState: StateData;
}

const iconMap = {
  User, Users, Code, Layers, Upload, Zap,
  Database, Cloud, Settings, Sliders
};

export default function CurrentVsFutureState({ currentState, futureState }: CurrentVsFutureStateProps) {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  const StateCard = ({ state, isCurrentState }: { state: StateData; isCurrentState: boolean }) => (
    <div className={`relative p-6 rounded-lg border-2 ${
      isCurrentState
        ? 'border-danger-200 bg-danger-50'
        : 'border-success-200 bg-success-50'
    }`}>
      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold ${
          isCurrentState ? 'text-danger-900' : 'text-success-900'
        }`}>
          {state.title}
        </h3>
        <p className={`text-sm ${
          isCurrentState ? 'text-danger-700' : 'text-success-700'
        }`}>
          {state.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {state.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className={`p-2 rounded-lg ${
              isCurrentState
                ? 'bg-danger-100 text-danger-600'
                : 'bg-success-100 text-success-600'
            }`}>
              {getIcon(feature.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-secondary-900">{feature.title}</h4>
              <p className="text-sm text-secondary-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Current vs Future State Comparison
        </h2>
        <p className="text-sm text-secondary-600">
          Transformation from single-customer solution to multi-tenant SaaS platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Current State */}
        <StateCard state={currentState} isCurrentState={true} />

        {/* Transformation Arrow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full shadow-lg">
            <ArrowRight className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Future State */}
        <StateCard state={futureState} isCurrentState={false} />
      </div>

      {/* Transformation Benefits */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h4 className="font-medium text-primary-900 mb-2">Scalability</h4>
          <p className="text-sm text-primary-800">
            From single customer to unlimited tenants with isolated data and configurations
          </p>
        </div>
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <h4 className="font-medium text-success-900 mb-2">Efficiency</h4>
          <p className="text-sm text-success-800">
            Automated deployments and configuration management reduce operational overhead
          </p>
        </div>
        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <h4 className="font-medium text-warning-900 mb-2">Flexibility</h4>
          <p className="text-sm text-warning-800">
            Configurable business rules and customizable workflows for diverse client needs
          </p>
        </div>
      </div>
    </Card>
  );
}