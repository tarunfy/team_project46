'use client'

import {
  BarChartIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from 'lucide-react'

import { Logo } from '@/components/logo'
import NavMain from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/authContext'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const data = {
  navMain: [
    {
      title: 'Upload Image',
      url: '#',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Find a Dermatologist',
      url: '#',
      icon: ListIcon,
    },
    {
      title: 'Progress Tracker',
      url: '#',
      icon: BarChartIcon,
    },
   
    {
      title: 'Profile',
      url: '#',
      icon: UsersIcon,
    },
  ],
}

const AppSidebar = ({ ...props }) => {
   const router = useRouter()
    const { getUser, signOutUser } = useContext(AuthContext)
   const handleLogout = () => {
      signOutUser()
      toast.success('Signed out successfully!')
      router.push('/login')
    }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu className="p-4 border-b">
            <Logo />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} className='px-3 py-1.5'>signOut</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
