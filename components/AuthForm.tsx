import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'


interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignedIn = type === "SIGN_IN";
  const router =useRouter()

  const form: UseFormReturn<T>= useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })
 

  const handleSubmit:SubmitHandler<T> =async (data) =>{
    const result= await onSubmit(data)
    if(result.success){
      toast({
        type: "success",
        title: "Success",
        description: "You have successfully signed in/up!",
      })
      router.push('/')
    }else{
      toast({
        title: `Error ${isSignedIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
  <div className='flex flex-col gap-4'>
    <h1 className='text-2xl font-semibold text-white'>
      {isSignedIn ? "Welcome back to Bookwise":"Create your library account"}
    </h1>
    <p className='text-light-100'>
      {isSignedIn ? "Access the vast collection of resourches":"Please complete all fields to access library"}
    </p>
  <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((field) =>(
            <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>{FIELD_NAMES[field.name] as keyof typeof FIELD_NAMES}</FormLabel>
                <FormControl>
                  {field.name==="universityCard" ? (<ImageUpload onFileChanged={field.onChange}/>):(<Input required type={FIELD_TYPES[field.name] as keyof typeof FIELD_TYPES} {...field} />)}
                  
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          ))}
          <Button type="submit" className='form-btn'>{isSignedIn?"Sign In": "Sign Up"}</Button>
        </form>
      </Form>
      <p className='text-center text-base font-medium'>
        {isSignedIn ? "New to Bookwise? ":"Already have a account "}
        <Link href={isSignedIn ? "/sign-up":"/sign-in"} className='font-bold text-primary'>
            {isSignedIn ? "Create a new account" : "Sign In"}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
