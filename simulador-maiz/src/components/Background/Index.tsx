import Image from 'next/image'

export function Background() {
    return (
        <div className="fixed inset-0 z-[-1]">
            <Image
                src="/fondo2.jpg"
                alt="Campo de maíz"
                fill
                style={{ objectFit: 'cover' }}
                priority
            />
        </div>
    )
}