import { Download, Calendar, Settings } from 'lucide-react';
import { format } from 'date-fns';

export default function Header() {
  const today = new Date();

  const handleExport = (type: 'pdf' | 'excel' | 'powerpoint') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${type}`);
  };

  return (
    <header className="border-b border-secondary-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gradient">
            Chloe Transformation Dashboard
          </h1>
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Calendar className="h-4 w-4" />
            <span>{format(today, 'EEEE, MMMM d, yyyy')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('pdf')}
              className="btn btn-outline px-3 py-2 text-xs"
              title="Export as PDF"
            >
              <Download className="h-4 w-4" />
              PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="btn btn-outline px-3 py-2 text-xs"
              title="Export as Excel"
            >
              <Download className="h-4 w-4" />
              Excel
            </button>
            <button
              onClick={() => handleExport('powerpoint')}
              className="btn btn-outline px-3 py-2 text-xs"
              title="Export as PowerPoint"
            >
              <Download className="h-4 w-4" />
              PPT
            </button>
          </div>

          <div className="h-6 w-px bg-secondary-200" />

          <button
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