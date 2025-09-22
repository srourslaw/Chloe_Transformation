import { ReactNode, useState, useCallback } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-auto">
          <div className="animate-fade-in h-full p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}