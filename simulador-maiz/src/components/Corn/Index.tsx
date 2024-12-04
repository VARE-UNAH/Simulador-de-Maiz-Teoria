import React from 'react'

const stages = [
  '🌱', // Germinando
  '🌿', // Creciendo
  '🌽', // Casi listo
  '🌽', // Listo para cosecha
  '🌾', // Seco
  '💀', // Echado a perder
]

interface CornPixelArtProps {
  stage: number
}

const CornPixelArt: React.FC<CornPixelArtProps> = ({ stage }) => {
  return (
    <div className="text-8xl">
      {stages[stage]}
    </div>
  )
}

export default CornPixelArt