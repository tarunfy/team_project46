'use client'

import { IconMenu2 } from '@tabler/icons-react'
import {
  BadgeCent,
  Briefcase,
  LayoutDashboard,
  Settings,
  User,
} from 'lucide-react'
import { useState } from 'react'

const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: Briefcase,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Settings',
    href: '#',
    icon: Settings,
  },
  {
    label: 'NFT Market',
    href: '#',
    icon: BadgeCent,
  },
]

const DashboardSidebar = ({}) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="bg-black">
      <div className="absolute top-4 left-4 z-20 md:hidden">
        <IconMenu2 className="text-white" onClick={() => setOpen(!open)} />
      </div>
    </div>
  )
}

export default DashboardSidebar
