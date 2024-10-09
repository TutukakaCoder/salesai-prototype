'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      if (!session.user.userType) {
        router.push('/user-type-selection')
      } else if (!session.user.onboardingCompleted) {
        router.push('/onboarding')
      } else {
        router.push('/dashboard')
      }
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600">Welcome to Sales AI</h1>
          <p className="mt-3 text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Sales AI</h1>
      <p className="text-xl mb-8">Connect, Introduce, and Grow Your Business</p>
      <div className="flex space-x-4">
        <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign In
        </Link>
        <Link href="/auth/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  )
}