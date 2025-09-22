import { Download, Calendar, Settings, FileText, FileSpreadsheet, Presentation, Menu, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const today = new Date();

  const handleExport = (type: 'pdf' | 'excel' | 'powerpoint') => {
    const currentPage = window.location.pathname.split('/')[1] || 'dashboard';
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
    const filename = `Chloe_${currentPage}_${timestamp}`;

    switch (type) {
      case 'pdf':
        // Generate PDF of current page
        window.print();
        break;

      case 'excel':
        // Create downloadable Excel file with sample data
        const csvContent = generateCSVContent(currentPage);
        downloadFile(csvContent, `${filename}.csv`, 'text/csv');
        break;

      case 'powerpoint':
        // Generate PowerPoint summary
        const pptContent = generatePPTSummary(currentPage);
        downloadFile(pptContent, `${filename}_summary.txt`, 'text/plain');
        break;
    }
  };

  const generateCSVContent = (page: string) => {
    const headers = ['Metric', 'Value', 'Status', 'Last Updated'];
    const data = [
      ['Total Investment', '$1.65M', 'On Track', format(new Date(), 'yyyy-MM-dd')],
      ['Year 3 Revenue', '$4.2M', 'Projected', format(new Date(), 'yyyy-MM-dd')],
      ['Team Size', '11', 'Active', format(new Date(), 'yyyy-MM-dd')],
      ['Success Probability', '75%', 'Good', format(new Date(), 'yyyy-MM-dd')],
      ['Risk Level', 'Medium', 'Managed', format(new Date(), 'yyyy-MM-dd')]
    ];

    return [headers, ...data].map(row => row.join(',')).join('\n');
  };

  const generatePPTSummary = (page: string) => {
    return `Chloe Transformation Dashboard - ${page.toUpperCase()} Summary
Generated: ${format(new Date(), 'EEEE, MMMM d, yyyy HH:mm')}

KEY METRICS:
- Total Investment Required: $1.65M
- Projected Year 3 Revenue: $4.2M
- Target Customers (Year 1): 15
- Team Size: 11 members
- Success Probability: 75%

CURRENT STATUS:
✅ Financial modeling complete
✅ Risk assessment in progress
✅ Team structure defined
🔄 Implementation phase active

NEXT ACTIONS:
- Complete technical architecture review
- Finalize key hiring decisions
- Establish competitive monitoring
- Continue risk mitigation efforts

For detailed analysis, please review the full dashboard.
Contact: Chloe Transformation Team`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSettings = () => {
    alert('Settings panel coming soon! This will include:\n\n• Dashboard preferences\n• Export options\n• User settings\n• Theme selection\n• Data refresh intervals');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_authenticated');
    window.location.reload();
  };

  return (
    <header className="border-b border-secondary-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            title="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-xl lg:text-2xl font-bold text-gradient">
            Chloe Transformation Dashboard
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-sm text-secondary-600">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">{format(today, 'EEEE, MMMM d, yyyy')}</span>
            <span className="md:hidden">{format(today, 'MMM d, yyyy')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleExport('pdf')}
              className="btn btn-outline px-3 py-2 text-xs"
              title="Export as PDF"
            >
              <Download className="h-4 w-4" />
              <span className="hidden lg:inline">PDF</span>
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="btn btn-outline px-3 py-2 text-xs"
              title="Export as Excel"
            >
              <Download className="h-4 w-4" />
              <span className="hidden lg:inline">Excel</span>
            </button>
            <button
              onClick={() => handleExport('powerpoint')}
              className="btn btn-outline px-3 py-2 text-xs"
              title="Export as PowerPoint"
            >
              <Download className="h-4 w-4" />
              <span className="hidden lg:inline">PPT</span>
            </button>
          </div>

          <div className="hidden sm:block h-6 w-px bg-secondary-200" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            title="Logout"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden lg:inline">Logout</span>
          </button>

          <button
            onClick={handleSettings}
            className="btn btn-outline p-2"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}