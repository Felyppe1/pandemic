interface PeaoProps {
    x: number
    y: number
    cor?: string
    scale?: number
}

export function Peao({ x, y, cor = 'fill-[#c5b08c]', scale = 0.1 }: PeaoProps) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            <path
                className={`${cor} stroke-white stroke-1`}
                d="M16.0911 7C18.1379 12.7329 24.6618 32.8022 30.1536 49.3351C19.4112 52.9075 13.1435 52.869 2.02856 49.3351L16.0911 7Z"
            />
            <circle
                className={`${cor} stroke-white stroke-1`}
                cx="16.0286"
                cy="10"
                r="10"
            />
        </g>
    )
}
