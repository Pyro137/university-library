"use client"
import { auth } from '@/auth'
import AuthForm from '@/components/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth'
import { signInSchema, signUpSchema } from '@/lib/validations'
import React from 'react'

const page =async () => {
  return (
    <div>
      <AuthForm 
        type={"SIGN_IN"} 
        schema={signInSchema} 
        defaultValues={{
          email:"",
          password:""
        }} 
        onSubmit={signInWithCredentials}/>

    </div>
  )
}

export default page

