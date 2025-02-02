import Header from '@/components/Header'
import React from 'react'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
const layout = async({children}:{children:React.ReactNode}) => {
    const session=await auth();
    if(!session?.user?.id){
        redirect('/sign-in')
    }
    after(async () => {
      if (!session?.user?.id) return;
      console.log(session.user.id)
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user?.id))
        .limit(1);
  
      if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
        return;
  
      await db
        .update(users)
        .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
        .where(eq(users.id, session?.user?.id));
    });
  return (
    <main className='root-container'>
        <div className='mx-auto max-w-7xl'>
            <Header/>
            <div className='mt-20 pb-20'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default layout
