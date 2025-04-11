'use client'
import {
  BadgeCent,
  Briefcase,
  LayoutDashboard,
  Settings,
  User,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { LogoDark } from '../../components/logo-dark'
import { Sidebar, SidebarBody, SidebarLink } from '../../components/ui/sidebar'
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

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="h-screen">
      <Sidebar
        open={open}
        setOpen={setOpen}
        className="bg-gray-900"
        animate={false}
      >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <LogoDark /> : <LogoDark />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Manu Arora',
                href: '#',
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  )
}
