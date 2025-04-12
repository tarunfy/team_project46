'use client'

import AppSidebar from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen">
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </div>
  )
}
