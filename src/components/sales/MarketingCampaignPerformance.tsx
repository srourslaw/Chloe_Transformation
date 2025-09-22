import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface Campaign {
  campaign: string;
  spend: number;
  leads: number;
  costPerLead: number;
  roi: number;
  period: string;
}

interface MarketingCampaignPerformanceProps {
  campaigns: Campaign[];
}

const getRoiColor = (roi: number) => {
  if (roi >= 4) return 'text-success-700 bg-success-100';
  if (roi >= 3) return 'text-warning-700 bg-warning-100';
  return 'text-danger-700 bg-danger-100';
};

export default function MarketingCampaignPerformance({ campaigns }: MarketingCampaignPerformanceProps) {
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalLeads = campaigns.reduce((sum, campaign) => sum + campaign.leads, 0);
  const avgCostPerLead = totalSpend / totalLeads;
  const avgRoi = campaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / campaigns.length;

  // Prepare data for charts
  const roiData = campaigns.map(campaign => ({
    ...campaign,
    name: campaign.campaign.replace(' ', '\n')
  }));

  const costEfficiencyData = campaigns.map(campaign => ({
    campaign: campaign.campaign,
    costPerLead: campaign.costPerLead,
    leads: campaign.leads,
    efficiency: (1 / campaign.costPerLead) * 1000 // Higher is better
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Marketing Campaign Performance
        </h2>
        <p className="text-sm text-secondary-600">
          Campaign ROI analysis with lead generation and cost efficiency metrics
        </p>
      </div>

      {/* Campaign Overview Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Total Spend</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">${(totalSpend / 1000).toFixed(0)}K</div>
          <div className="text-sm text-primary-700">across all campaigns</div>
        </div>

        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Total Leads</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{totalLeads}</div>
          <div className="text-sm text-success-700">generated leads</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">Avg Cost/Lead</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">${Math.round(avgCostPerLead)}</div>
          <div className="text-sm text-warning-700">blended average</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Avg ROI</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{avgRoi.toFixed(1)}x</div>
          <div className="text-sm text-purple-700">return multiple</div>
        </div>
      </div>

      {/* Campaign Performance Charts */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Campaign ROI Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value}x`, 'ROI']} />
              <Bar dataKey="roi" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Lead Generation by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaigns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value: any) => [value, 'Leads']} />
              <Bar dataKey="leads" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Efficiency Analysis */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Cost Per Lead Analysis</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={costEfficiencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campaign" />
            <YAxis />
            <Tooltip formatter={(value: any) => [`$${value}`, 'Cost per Lead']} />
            <Line type="monotone" dataKey="costPerLead" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign Details */}
      <div className="mb-8">
        <h3 className="font-semibold text-secondary-900 mb-4">Campaign Performance Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaigns.map((campaign, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
              <h4 className="font-semibold text-secondary-900 mb-3">{campaign.campaign}</h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Spend</span>
                  <span className="text-sm font-medium text-secondary-900">
                    ${(campaign.spend / 1000).toFixed(0)}K
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Leads</span>
                  <span className="text-sm font-medium text-secondary-900">{campaign.leads}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Cost/Lead</span>
                  <span className="text-sm font-medium text-secondary-900">
                    ${campaign.costPerLead}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600">ROI</span>
                  <span className={clsx(
                    'text-sm font-medium px-2 py-1 rounded',
                    getRoiColor(campaign.roi)
                  )}>
                    {campaign.roi}x
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-secondary-600">Period</span>
                  <span className="text-sm font-medium text-secondary-900">{campaign.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <h4 className="font-semibold text-success-900 mb-3">Best ROI</h4>
          <div className="space-y-2">
            {campaigns
              .sort((a, b) => b.roi - a.roi)
              .slice(0, 2)
              .map((campaign, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-success-800">{campaign.campaign}</span>
                  <span className="font-medium text-success-900">{campaign.roi}x</span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h4 className="font-semibold text-primary-900 mb-3">Most Leads</h4>
          <div className="space-y-2">
            {campaigns
              .sort((a, b) => b.leads - a.leads)
              .slice(0, 2)
              .map((campaign, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-primary-800">{campaign.campaign}</span>
                  <span className="font-medium text-primary-900">{campaign.leads}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <h4 className="font-semibold text-warning-900 mb-3">Lowest Cost/Lead</h4>
          <div className="space-y-2">
            {campaigns
              .sort((a, b) => a.costPerLead - b.costPerLead)
              .slice(0, 2)
              .map((campaign, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-warning-800">{campaign.campaign}</span>
                  <span className="font-medium text-warning-900">${campaign.costPerLead}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Campaign Optimization Recommendations */}
      <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">Campaign Optimization Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">High Performers</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Referral Program: Highest ROI at 5.2x - scale investment</li>
              <li>• Trade Shows: Strong ROI (4.1x) despite higher cost/lead</li>
              <li>• Content Marketing: Consistent performer with good volume</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Optimization Opportunities</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Digital Advertising: Optimize targeting to reduce cost/lead</li>
              <li>• Trade Shows: Focus on higher-quality prospects</li>
              <li>• Content Marketing: Increase budget allocation</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}