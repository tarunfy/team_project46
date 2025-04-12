'use client'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AuthContext } from '@/context/authContext'

import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
  const router = useRouter()
  const { getUser, signOutUser } = useContext(AuthContext)

  const handleLogout = () => {
    signOutUser()
    toast.success('Signed out successfully!')
    router.push('/login')
  }
  useEffect(() => {
    const user = getUser()
    console.log(user)
    if (user == null) {
      // Checks for both null and undefined
      console.log('myVar is null or undefined')
      router.push('/login')
    }
  }, [])
  return (
    <div>
      Tarun this side.
      <SidebarTrigger />
      <Button onClick={handleLogout}>signOut</Button>
    </div>
  )
}

export default Dashboard
