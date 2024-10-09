'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const isAuthenticated = status === 'authenticated'
  const isOnboarding = pathname?.startsWith('/onboarding') || pathname?.startsWith('/user-type-selection')

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Sales AI
              </Link>
            </div>
            {isAuthenticated && !isOnboarding && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                  Dashboard
                </Link>
                {/* Add more navigation items as needed */}
              </div>
            )}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <span className="text-gray-900 text-sm font-medium mr-4">
                  {session?.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-900 hover:text-gray-700 text-sm font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation