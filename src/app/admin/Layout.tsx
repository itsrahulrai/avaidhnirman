import DashbordSidebar from '@/component/DashbordSidebar'
import DashbordTopHeader from '@/component/DashbordTopHeader'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="flex h-screen bg-gray-50">
                <DashbordSidebar />
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <DashbordTopHeader />
                    {children}
                </div>
            </div>
        </>

    )
}

export default Layout