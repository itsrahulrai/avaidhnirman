import DashbordSidebar from '@/component/DashbordSidebar';
import DashbordTopHeader from '@/component/DashbordTopHeader';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <DashbordSidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashbordTopHeader />

          {/* Page-specific content will render here */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 p-4 text-center text-sm text-gray-500 shadow-sm">
            © 2025 Avaidh Nirman Virodhi Morcha. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;