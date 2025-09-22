import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, TrendingUp, DollarSign, Star } from 'lucide-react';
import Card from '../ui/Card';

interface CompetitorPosition {
  company: string;
  price: number;
  features: number;
  marketShare: number;
}

interface CompetitivePositioningMapProps {
  positioning: CompetitorPosition[];
}

const COMPANY_COLORS = {
  'Chloe': '#3b82f6',
  'LS Central': '#ef4444',
  'Toast POS': '#10b981',
  'Square Retail': '#f59e0b',
  'Shopify POS': '#8b5cf6'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
        <h4 className="font-semibold text-secondary-900 mb-2">{data.company}</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-secondary-600">Price:</span>
            <span className="font-medium">${data.price}/month</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-secondary-600">Features Score:</span>
            <span className="font-medium">{data.features}/100</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-secondary-600">Market Share:</span>
            <span className="font-medium">{data.marketShare}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CompetitivePositioningMap({ positioning }: CompetitivePositioningMapProps) {
  const chloePosition = positioning.find(p => p.company === 'Chloe');
  const competitors = positioning.filter(p => p.company !== 'Chloe');

  // Calculate market positioning metrics
  const avgPrice = positioning.reduce((sum, p) => sum + p.price, 0) / positioning.length;
  const avgFeatures = positioning.reduce((sum, p) => sum + p.features, 0) / positioning.length;
  const totalMarketShare = positioning.reduce((sum, p) => sum + p.marketShare, 0);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Competitive Positioning Map
        </h2>
        <p className="text-sm text-secondary-600">
          Price vs features analysis showing competitive landscape and market positioning
        </p>
      </div>

      {/* Competitive Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Our Position</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">${chloePosition?.price}</div>
          <div className="text-sm text-primary-700">{chloePosition?.features}/100 features</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Market Avg Price</span>
          </div>
          <div className="text-2xl font-bold text-success-900">${Math.round(avgPrice)}</div>
          <div className="text-sm text-success-700">across all players</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Star className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Avg Features</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{Math.round(avgFeatures)}</div>
          <div className="text-sm text-warning-700">feature score</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Market Leader</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {positioning.reduce((max, p) => p.marketShare > max.marketShare ? p : max).marketShare}%
          </div>
          <div className="text-sm text-purple-700">
            {positioning.reduce((max, p) => p.marketShare > max.marketShare ? p : max).company}
          </div>
        </div>
      </div>

      {/* Positioning Map */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Price vs Features Positioning</h3>

        {/* Quadrant Labels */}
        <div className="relative mb-4">
          <div className="grid grid-cols-2 gap-4 mb-2 text-xs font-medium text-secondary-600">
            <div className="text-left">High Features, Low Price</div>
            <div className="text-right">High Features, High Price</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-secondary-600">
            <div className="text-left">Low Features, Low Price</div>
            <div className="text-right">Low Features, High Price</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={positioning} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="price"
              domain={[200, 700]}
              name="Price"
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              type="number"
              dataKey="features"
              domain={[60, 95]}
              name="Features"
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="features" fill="#8884d8">
              {positioning.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COMPANY_COLORS[entry.company as keyof typeof COMPANY_COLORS] || '#8884d8'}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Competitor Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {positioning.map((competitor, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COMPANY_COLORS[competitor.company as keyof typeof COMPANY_COLORS] }}
                />
                <h4 className="font-semibold text-secondary-900">{competitor.company}</h4>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Price</span>
                  <span className="font-medium text-secondary-900">${competitor.price}/mo</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-600">Features</span>
                  <span className="font-medium text-secondary-900">{competitor.features}/100</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-600">Market Share</span>
                  <span className="font-medium text-secondary-900">{competitor.marketShare}%</span>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-secondary-600 mb-1">Value Score</div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min((competitor.features / (competitor.price / 100)) * 2, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Share Distribution */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Market Share Distribution</h3>
          <div className="space-y-3">
            {positioning
              .sort((a, b) => b.marketShare - a.marketShare)
              .map((company, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COMPANY_COLORS[company.company as keyof typeof COMPANY_COLORS] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-secondary-900">{company.company}</span>
                      <span className="text-sm text-secondary-600">{company.marketShare}%</span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(company.marketShare / Math.max(...positioning.map(p => p.marketShare))) * 100}%`,
                          backgroundColor: COMPANY_COLORS[company.company as keyof typeof COMPANY_COLORS]
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Competitive Strengths & Gaps</h3>
          <div className="space-y-4">
            <div className="p-3 bg-success-50 rounded-lg border border-success-200">
              <h4 className="font-medium text-success-900 mb-2">Our Advantages</h4>
              <ul className="text-sm text-success-800 space-y-1">
                <li>• High feature score (85/100) at competitive price</li>
                <li>• Better value proposition than premium players</li>
                <li>• Room for market share growth (currently 2%)</li>
              </ul>
            </div>

            <div className="p-3 bg-warning-50 rounded-lg border border-warning-200">
              <h4 className="font-medium text-warning-900 mb-2">Areas for Improvement</h4>
              <ul className="text-sm text-warning-800 space-y-1">
                <li>• Higher price than Square Retail and Shopify POS</li>
                <li>• Lower features than LS Central</li>
                <li>• Need to increase market awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Positioning Insights */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Strategic Positioning Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Market Opportunity</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Sweet spot between features and price</li>
              <li>• 73% market share available for capture</li>
              <li>• Premium features at mid-market pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Competitive Strategy</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Differentiate on integration capabilities</li>
              <li>• Emphasize value over lowest price</li>
              <li>• Target feature-conscious buyers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Growth Path</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Increase feature score to 90+</li>
              <li>• Maintain competitive pricing</li>
              <li>• Focus on market share expansion</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}