import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-black">
            Simulador de Maíz
          </Link>
          <div className="flex gap-4">
            <Link href="/simulator" className="hover:text-primary text-black">
              Simulador
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

