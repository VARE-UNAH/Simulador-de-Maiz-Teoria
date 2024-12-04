import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Navbar } from "@/components/Navbar/Index"
import { Background } from "@/components/Background/Index"
import { Toaster, toast } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Simulador de Crecimiento de Maíz",
  description: "Simula el crecimiento de maíz bajo diferentes condiciones",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Background />
        <Navbar />
        <Toaster />
        {children}
      </body>
    </html>
  )
}

