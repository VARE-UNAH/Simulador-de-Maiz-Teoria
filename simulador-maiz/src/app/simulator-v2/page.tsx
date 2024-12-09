"use client"

import { useState, useEffect } from 'react'
import { Card, CardBody, Input, Slider, Select, SelectItem } from '@nextui-org/react'
import CornPixelArt from '@/components/Corn/Index'

// Corn seed types with their characteristics
const cornSeeds = [
    { id: 'hybrid1', name: 'Híbrido de Alto Rendimiento', growthRate: 1.2, yieldPerHectare: 12 }, // Maíz híbrido para alta producción.
    { id: 'organic1', name: 'Maíz Orgánico', growthRate: 0.9, yieldPerHectare: 8 }, // Cultivado sin pesticidas ni químicos.
    { id: 'drought1', name: 'Resistente a la Sequía', growthRate: 1.0, yieldPerHectare: 10 }, // Ideal para climas secos.
    { id: 'sweet1', name: 'Maíz Dulce', growthRate: 1.1, yieldPerHectare: 9 }, // Consumido principalmente fresco o enlatado.
    { id: 'popcorn1', name: 'Maíz Palomero', growthRate: 0.8, yieldPerHectare: 7 }, // Variedad especial para palomitas.
    { id: 'waxy1', name: 'Maíz Waxy', growthRate: 1.0, yieldPerHectare: 9 }, // Rico en almidón, usado en la industria alimentaria.
    { id: 'flint1', name: 'Maíz Flint', growthRate: 1.1, yieldPerHectare: 11 }, // Granos duros, común en América Latina.
    { id: 'dent1', name: 'Maíz Dentado', growthRate: 1.2, yieldPerHectare: 12 }, // Amplio uso en piensos y procesamiento industrial.
    { id: 'blue1', name: 'Maíz Azul', growthRate: 0.9, yieldPerHectare: 8 }, // Usado en tortillas y alimentos tradicionales.
    { id: 'babycorn1', name: 'Maíz Baby', growthRate: 0.7, yieldPerHectare: 6 }, // Pequeño, utilizado en ensaladas y conservas.
];

export default function SimulatorPage() {
    const [plantDate, setPlantDate] = useState<string>('')
    const [seedType, setSeedType] = useState<string>(cornSeeds[0].id)
    const [minTemperature, setMinTemperature] = useState<number>(15)
    const [maxTemperature, setMaxTemperature] = useState<number>(30)
    const [wateringFrequency, setWateringFrequency] = useState<number>(3)
    const [fieldSize, setFieldSize] = useState<number>(1)
    const [viewDate, setViewDate] = useState<string>('')
    const [cornState, setCornState] = useState<{
        height: number,
        state: string,
        stage: number,
        expectedProduction: number
    }>({ height: 0, state: 'No plantado', stage: 0, expectedProduction: 0 })

    useEffect(() => {
        if (plantDate && viewDate) {
            const growth = calculateGrowth(new Date(plantDate), new Date(viewDate), minTemperature, maxTemperature, wateringFrequency, seedType, fieldSize)
            setCornState(growth)
        }
    }, [plantDate, viewDate, minTemperature, maxTemperature, wateringFrequency, seedType, fieldSize])

    const calculateGrowth = (start: Date, end: Date, minTemp: number, maxTemp: number, watering: number, seed: string, size: number) => {
        const daysPassed = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
        const selectedSeed = cornSeeds.find(s => s.id === seed) || cornSeeds[0]
        const avgTemp = (minTemp + maxTemp) / 2
        let height = Math.min(daysPassed * (avgTemp / 10) * (watering / 3) * selectedSeed.growthRate, 250)
        let state = 'Germinando'
        let stage = 0
        let expectedProduction = 0

        if (height > 50) { state = 'Creciendo'; stage = 1 }
        if (height > 100) { state = 'Casi listo'; stage = 2 }
        if (height > 150) { state = 'Listo para cosecha'; stage = 3 }
        if (height > 200) { state = 'Seco'; stage = 4 }
        if (daysPassed > 120 || avgTemp > 35 || avgTemp < 10 || watering < 1) { state = 'Echado a perder'; stage = 5 }

        // Calculate expected production
        if (stage >= 3) {
            expectedProduction = selectedSeed.yieldPerHectare * size
        } else {
            expectedProduction = (selectedSeed.yieldPerHectare * size) * (height / 250)
        }

        return {
            height: Math.round(height),
            state,
            stage,
            expectedProduction: Math.round(expectedProduction * 10) / 10
        }
    }

    return (
        <main className="min-h-screen pt-16 bg-cover bg-center" style={{
            backgroundImage: 'url("/fondo2.jpg")',
            backgroundAttachment: 'fixed'
        }}>
            <div className="container mx-auto p-4">
                <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
                    <CardBody className="p-6">
                        <h1 className="text-3xl font-bold mb-6 text-center">Simulador de Crecimiento de Maíz</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="plantDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de plantado:
                                    </label>
                                    <Input
                                        id="plantDate"
                                        type="date"
                                        value={plantDate}
                                        onChange={(e) => setPlantDate(e.target.value)}
                                        max={viewDate || undefined}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="seedType" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de semilla:
                                    </label>
                                    <Select
                                        id="seedType"
                                        value={seedType}
                                        color='default'
                                        onChange={(e) => setSeedType(e.target.value)}
                                    >
                                        {cornSeeds.map((seed) => (
                                            <SelectItem className='text-black' key={seed.id} value={seed.id}>
                                                {seed.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="minTemp" className="block text-sm font-medium text-gray-700 mb-1">
                                        Temperatura mínima (°C):
                                    </label>
                                    <Slider
                                        id="minTemp"
                                        minValue={0}
                                        maxValue={40}
                                        step={1}
                                        value={minTemperature}
                                        onChange={(value) => setMinTemperature(Number(value))}
                                    />
                                    <span className="block mt-2">{minTemperature}°C</span>
                                </div>
                                <div>
                                    <label htmlFor="maxTemp" className="block text-sm font-medium text-gray-700 mb-1">
                                        Temperatura máxima (°C):
                                    </label>
                                    <Slider
                                        id="maxTemp"
                                        minValue={0}
                                        maxValue={40}
                                        step={1}
                                        value={maxTemperature}
                                        onChange={(value) => setMaxTemperature(Number(value))}
                                    />
                                    <span className="block mt-2">{maxTemperature}°C</span>
                                </div>
                                <div>
                                    <label htmlFor="watering" className="block text-sm font-medium text-gray-700 mb-1">
                                        Frecuencia de riego (días):
                                    </label>
                                    <Slider
                                        id="watering"
                                        minValue={1}
                                        maxValue={7}
                                        step={1}
                                        value={wateringFrequency}
                                        onChange={(value) => setWateringFrequency(Number(value))}
                                    />
                                    <span className="block mt-2">Cada {wateringFrequency} días</span>
                                </div>
                                <div>
                                    <label htmlFor="fieldSize" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tamaño del campo (hectáreas):
                                    </label>
                                    <Input
                                        id="fieldSize"
                                        type="number"
                                        min={1}
                                        value={fieldSize.toString()}
                                        onChange={(e) => setFieldSize(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="viewDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha a visualizar:
                                    </label>
                                    <Input
                                        id="viewDate"
                                        type="date"
                                        value={viewDate}
                                        min={plantDate}
                                        isDisabled={plantDate === ''}
                                        onChange={(e) => setViewDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <CornPixelArt stage={cornState.stage} />
                                <div className="text-center">
                                    <p className="text-xl font-semibold">Estado: {cornState.state}</p>
                                    <p className="text-lg">Altura promedio: {cornState.height} cm</p>
                                    <p className="text-lg">Producción esperada: {cornState.expectedProduction} toneladas</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </main>
    )
}

