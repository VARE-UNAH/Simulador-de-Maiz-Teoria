import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function Home() {
  return (
    <main 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: 'url("/fondo2.jpg")',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="text-center space-y-6 p-8 bg-black/30 rounded-lg backdrop-blur-sm">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Simulador de Crecimiento de Maíz
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Experimenta con diferentes condiciones y observa cómo crece tu maíz virtual
        </p>
        <Button className="text-lg" color="primary">
          <Link href="/simulator">
            Simular Ahora
          </Link>
        </Button>
      </div>
    </main>
  )
}

