"use client"

import { useState, useEffect } from 'react'
import CornPixelArt from '@/components/Corn/Index'
import { Card, CardBody, Input, Slider } from '@nextui-org/react'

export default function SimulatorPage() {
    const [plantDate, setPlantDate] = useState<string>('')
    const [temperature, setTemperature] = useState<number>(25)
    const [wateringFrequency, setWateringFrequency] = useState<number>(3)
    const [viewDate, setViewDate] = useState<string>('')
    const [cornState, setCornState] = useState<{
        height: number,
        state: string,
        stage: number
    }>({ height: 0, state: 'No plantado', stage: 0 })

    useEffect(() => {
        if (plantDate && viewDate) {
            const growth = calculateGrowth(new Date(plantDate), new Date(viewDate), temperature, wateringFrequency)
            setCornState(growth)
        }
    }, [plantDate, viewDate, temperature, wateringFrequency])

    const calculateGrowth = (start: Date, end: Date, temp: number, watering: number) => {
        const daysPassed = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
        let height = Math.min(daysPassed * (temp / 10) * (watering / 3), 250)
        let state = 'Germinando'
        let stage = 0

        if (height > 50) { state = 'Creciendo'; stage = 1 }
        if (height > 100) { state = 'Casi listo'; stage = 2 }
        if (height > 150) { state = 'Listo para cosecha'; stage = 3 }
        if (height > 200) { state = 'Seco'; stage = 4 }
        if (daysPassed > 120 || temp > 35 || watering < 1) { state = 'Echado a perder'; stage = 5 }

        return { height: Math.round(height), state, stage }
    }

    return (
        <main
            className="min-h-screen pt-16 bg-cover bg-center"
            style={{
                backgroundImage: 'url("/fondo2.jpg")',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container mx-auto p-4">
                <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
                    <CardBody className="p-6">
                        <h1 className="text-3xl font-bold mb-6 text-center">Simulador de Crecimiento de Maíz</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">Fecha de plantado:</label>
                                    <Input
                                        type="date"
                                        value={plantDate}
                                        onChange={(e) => setPlantDate(e.target.value)}
                                        max={viewDate || undefined} // Si viewDate está vacío, no se establece un máximo
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Temperatura (°C):</label>
                                    <Slider
                                        minValue={0}
                                        maxValue={40}
                                        step={1}
                                        value={[temperature]}
                                        showSteps={true}
                                        onChange={(value) => setTemperature(Number(value))}
                                    />
                                    <span className="block mt-2">{temperature}°C</span>
                                </div>
                                <div>
                                    <label className="block mb-2">Frecuencia de riego (días):</label>
                                    <Slider
                                        minValue={1}
                                        maxValue={7}
                                        step={1}
                                        value={[wateringFrequency]}
                                        showSteps={true}
                                        onChange={(value) => setWateringFrequency(Number(value))}
                                    />
                                    <span className="block mt-2">Cada {wateringFrequency} días</span>
                                </div>
                                <div>
                                    <label className="block mb-2">Fecha a visualizar:</label>
                                    <Input
                                        type="date"
                                        value={viewDate}
                                        min={plantDate}
                                        disabled={plantDate === ''}
                                        onChange={(e) => setViewDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <CornPixelArt stage={cornState.stage} />
                                <div className="text-center">
                                    <p className="text-xl font-semibold">Estado: {cornState.state}</p>
                                    <p className="text-lg">Altura: {cornState.height} cm</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </main>
    )
}

