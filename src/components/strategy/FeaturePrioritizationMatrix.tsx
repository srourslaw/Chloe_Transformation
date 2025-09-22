import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../ui/Card';

interface Feature {
  name: string;
  effort: number;
  impact: number;
  size: number;
  category: string;
  description: string;
  color: string;
}

interface FeaturePrioritizationMatrixProps {
  features: Feature[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg max-w-xs">
        <h4 className="font-semibold text-secondary-900 mb-2">{data.name}</h4>
        <p className="text-sm text-secondary-600 mb-3">{data.description}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-600">Implementation Effort:</span>
            <span className="font-medium">{data.effort}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-600">Business Impact:</span>
            <span className="font-medium">{data.impact}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-600">Category:</span>
            <span className="font-medium">{data.category}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function FeaturePrioritizationMatrix({ features }: FeaturePrioritizationMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(features.map(f => f.category)));

  const filteredFeatures = selectedCategory
    ? features.filter(f => f.category === selectedCategory)
    : features;

  const getQuadrantLabel = (effort: number, impact: number) => {
    if (effort <= 5 && impact >= 7) return 'Quick Wins';
    if (effort >= 6 && impact >= 7) return 'Major Projects';
    if (effort <= 5 && impact <= 6) return 'Fill-ins';
    return 'Questionable';
  };

  const getQuadrantColor = (effort: number, impact: number) => {
    if (effort <= 5 && impact >= 7) return 'bg-success-50 border-success-200';
    if (effort >= 6 && impact >= 7) return 'bg-primary-50 border-primary-200';
    if (effort <= 5 && impact <= 6) return 'bg-warning-50 border-warning-200';
    return 'bg-danger-50 border-danger-200';
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Feature Prioritization Matrix
        </h2>
        <p className="text-sm text-secondary-600">
          Implementation effort vs business impact analysis for strategic feature planning
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Chart */}
      <div className="relative">
        {/* Quadrant Background */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-12">
          <div className={`rounded ${getQuadrantColor(3, 8)} opacity-30`} />
          <div className={`rounded ${getQuadrantColor(8, 8)} opacity-30`} />
          <div className={`rounded ${getQuadrantColor(3, 3)} opacity-30`} />
          <div className={`rounded ${getQuadrantColor(8, 3)} opacity-30`} />
        </div>

        {/* Quadrant Labels */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-12 pointer-events-none">
          <div className="flex items-start justify-start p-2">
            <span className="text-xs font-semibold text-success-700 bg-success-100 px-2 py-1 rounded">
              Quick Wins
            </span>
          </div>
          <div className="flex items-start justify-end p-2">
            <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded">
              Major Projects
            </span>
          </div>
          <div className="flex items-end justify-start p-2">
            <span className="text-xs font-semibold text-warning-700 bg-warning-100 px-2 py-1 rounded">
              Fill-ins
            </span>
          </div>
          <div className="flex items-end justify-end p-2">
            <span className="text-xs font-semibold text-danger-700 bg-danger-100 px-2 py-1 rounded">
              Questionable
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            data={filteredFeatures}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="effort"
              domain={[0, 10]}
              name="Implementation Effort"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="impact"
              domain={[0, 10]}
              name="Business Impact"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="impact" fill="#8884d8">
              {filteredFeatures.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Axis Labels */}
      <div className="flex justify-center mt-2">
        <span className="text-sm font-medium text-secondary-600">Implementation Effort (Low → High)</span>
      </div>
      <div className="flex justify-center mt-4 transform -rotate-90 origin-center absolute left-4 top-1/2">
        <span className="text-sm font-medium text-secondary-600">Business Impact (Low → High)</span>
      </div>

      {/* Feature Legend */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: feature.color }}
            />
            <div className="min-w-0">
              <h4 className="font-medium text-secondary-900 text-sm truncate">{feature.name}</h4>
              <p className="text-xs text-secondary-600">{feature.category}</p>
              <div className="flex gap-2 text-xs text-secondary-500 mt-1">
                <span>Effort: {feature.effort}</span>
                <span>Impact: {feature.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Recommendations */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <h3 className="font-semibold text-success-900 mb-2">Recommended Priority 1</h3>
          <div className="space-y-2">
            {features
              .filter(f => f.effort <= 5 && f.impact >= 7)
              .map((feature, index) => (
                <div key={index} className="text-sm text-success-800">
                  • {feature.name} - Quick win with high impact
                </div>
              ))}
          </div>
        </div>
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="font-semibold text-primary-900 mb-2">Strategic Investments</h3>
          <div className="space-y-2">
            {features
              .filter(f => f.effort >= 6 && f.impact >= 7)
              .map((feature, index) => (
                <div key={index} className="text-sm text-primary-800">
                  • {feature.name} - High effort, high reward
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}