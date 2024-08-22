import './globals.css'

import type { Metadata } from 'next'

import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: 'Firula - B2C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
