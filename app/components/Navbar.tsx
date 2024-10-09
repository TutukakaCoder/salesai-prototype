import Link from 'next/link'
import { Session } from 'next-auth'
import Image from 'next/image'

interface NavbarProps {
  session: Session | null
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="Sales AI Logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold text-gray-800">Sales AI</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/marketplace" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Marketplace
                </Link>
                <Link href="/profile" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <button type="submit" className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar