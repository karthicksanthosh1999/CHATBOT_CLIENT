import { AppSidebar } from '#components/app-sidebar';
import { SidebarProvider } from '#components/ui/sidebar';
import { type ReactNode } from 'react'

const AuthProvider = ({ children }: { children : ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  )
}

export default AuthProvider
