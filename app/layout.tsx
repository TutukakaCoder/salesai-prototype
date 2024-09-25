import { Providers } from './providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sales AI',
  description: 'AI-Powered Sales Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen p-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}