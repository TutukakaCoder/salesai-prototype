import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navigation from '@/app/components/Navigation'

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
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="container mx-auto mt-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}