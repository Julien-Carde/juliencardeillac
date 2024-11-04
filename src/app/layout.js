import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Julien Cardeillac | Software Engineer & 3D Artist',
  description: "Julien Cardeillac's portfolio: a showcase of software development, 3D graphics, interactive web design, and creative innovation.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


