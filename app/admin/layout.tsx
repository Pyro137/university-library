import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

import "@/styles/admin.css"
import SideBar from '@/components/admin/SideBar';
import Header from '@/components/admin/Header';

const layout = async ({children}:{children:React.ReactNode}) => {
    const session= await auth();
    if(!session?.user?.id) redirect("sign-in")
    
  return (
    <main className='flex min-h-screen w-full flex-row'>
        <SideBar session={session}/>
        <div className='admin-container'>
            <Header session={session}/>
            {children}
        </div>
    </main>
  )
}

export default layout
