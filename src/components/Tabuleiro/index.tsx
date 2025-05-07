import { COR_ENUM, NomeCidade } from '../../core/classes/cidade'
import { useJogoStore } from '../../store/useJogoStore'
import { Cor } from '../../types'
import {
    mapeamentoCor,
    mapeamentoCorPersonagens,
} from '../../utils/mapeamentos'
import { CentroPesquisa } from './CentroPesquisa'
import { CuboDoenca } from './CuboDoenca'
import { Peao } from './Peao'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const coordenadasCidades: { nomeCidade: NomeCidade; x: number; y: number }[] = [
    {
        nomeCidade: 'San Francisco',
        x: 400,
        y: 385,
    },
    {
        nomeCidade: 'Chicago',
        x: 490,
        y: 350,
    },
    {
        nomeCidade: 'Atlanta',
        x: 520,
        y: 410,
    },
    {
        nomeCidade: 'Montreal',
        x: 570,
        y: 340,
    },
    {
        nomeCidade: 'New York',
        x: 610,
        y: 370,
    },
    {
        nomeCidade: 'Washington',
        x: 590,
        y: 410,
    },
    {
        nomeCidade: 'Madrid',
        x: 770,
        y: 390,
    },
    {
        nomeCidade: 'London',
        x: 780,
        y: 320,
    },
    {
        nomeCidade: 'Paris',
        x: 830,
        y: 350,
    },
    {
        nomeCidade: 'Essen',
        x: 860,
        y: 300,
    },
    {
        nomeCidade: 'Milan',
        x: 880,
        y: 340,
    },
    {
        nomeCidade: 'St. Petersburg',
        x: 940,
        y: 290,
    },
    {
        nomeCidade: 'Algiers',
        x: 860,
        y: 430,
    },
    {
        nomeCidade: 'Cairo',
        x: 910,
        y: 445,
    },
    {
        nomeCidade: 'Istanbul',
        x: 920,
        y: 390,
    },
    {
        nomeCidade: 'Baghdad',
        x: 980,
        y: 420,
    },
    {
        nomeCidade: 'Tehran',
        x: 1035,
        y: 370,
    },
    {
        nomeCidade: 'Moscow',
        x: 990,
        y: 340,
    },
    {
        nomeCidade: 'Riyadh',
        x: 990,
        y: 480,
    },
    {
        nomeCidade: 'Karachi',
        x: 1050,
        y: 440,
    },
    {
        nomeCidade: 'Delhi',
        x: 1110,
        y: 410,
    },
    {
        nomeCidade: 'Mumbai',
        x: 1060,
        y: 495,
    },
    {
        nomeCidade: 'Chennai',
        x: 1120,
        y: 535,
    },
    {
        nomeCidade: 'Kolkata',
        x: 1170,
        y: 445,
    },
    {
        nomeCidade: 'São Paulo',
        x: 680,
        y: 630,
    },
    {
        nomeCidade: 'Buenos Aires',
        x: 640,
        y: 680,
    },
    {
        nomeCidade: 'Bogotá',
        x: 565,
        y: 550,
    },
    {
        nomeCidade: 'Lima',
        x: 530,
        y: 630,
    },
    {
        nomeCidade: 'Santiago',
        x: 550,
        y: 700,
    },
    {
        nomeCidade: 'Mexico City',
        x: 490,
        y: 480,
    },
    {
        nomeCidade: 'Miami',
        x: 570,
        y: 460,
    },
    {
        nomeCidade: 'Los Angeles',
        x: 400,
        y: 450,
    },
    {
        nomeCidade: 'Lagos',
        x: 840,
        y: 520,
    },
    {
        nomeCidade: 'Kinshasa',
        x: 885,
        y: 590,
    },
    {
        nomeCidade: 'Johannesburg',
        x: 930,
        y: 660,
    },
    {
        nomeCidade: 'Beijing',
        x: 1220,
        y: 340,
    },
    {
        nomeCidade: 'Seoul',
        x: 1295,
        y: 355,
    },
    {
        nomeCidade: 'Tokyo',
        x: 1330,
        y: 395,
    },
    {
        nomeCidade: 'Shanghai',
        x: 1220,
        y: 420,
    },
    {
        nomeCidade: 'Osaka',
        x: 1350,
        y: 440,
    },
    {
        nomeCidade: 'Taipei',
        x: 1290,
        y: 460,
    },
    {
        nomeCidade: 'Hong Kong',
        x: 1230,
        y: 485,
    },
    {
        nomeCidade: 'Bangkok',
        x: 1180,
        y: 505,
    },
    {
        nomeCidade: 'Manila',
        x: 1320,
        y: 535,
    },
    {
        nomeCidade: 'Ho Chi Minh City',
        x: 1230,
        y: 555,
    },
    {
        nomeCidade: 'Jakarta',
        x: 1175,
        y: 600,
    },
    {
        nomeCidade: 'Sydney',
        x: 1350,
        y: 680,
    },
]

interface TabuleiroProps {
    onClickCidade: (nomeCidadeDestino: NomeCidade) => void
}

export function Tabuleiro({ onClickCidade }: TabuleiroProps) {
    const jogo = useJogoStore(state => state.estadoJogo)!

    const linhasRenderizadas = new Set<string>()

    let nivelCubos = 0

    return (
        <TransformWrapper
            initialScale={1}
            minScale={0.9}
            maxScale={4}
            wheel={{ step: 0.1, smoothStep: 0.05 }}
            doubleClick={{ disabled: true }}
        >
            <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
                contentStyle={{ width: '100%', height: '100%' }}
            >
                <svg width="100%" height="100%" viewBox="0 0 1600 900">
                    <image
                        href="/mapa-pandemic.png"
                        x="0"
                        y="0"
                        width="1600"
                        height="900"
                    />

                    {/* Conexões */}
                    {coordenadasCidades.map(({ nomeCidade, x, y }) => {
                        const cidade = jogo.cidades.find(
                            cidade => cidade.nome === nomeCidade,
                        )!

                        const cidadesConectadas = cidade.conexoes

                        return cidadesConectadas.map(nomeCidadeConectada => {
                            const nomeA = nomeCidade
                            const nomeB = nomeCidadeConectada

                            const chave = [nomeA, nomeB].sort().join('-')

                            if (linhasRenderizadas.has(chave)) return null

                            linhasRenderizadas.add(chave)

                            const cidadeConectada = coordenadasCidades.find(
                                elemento =>
                                    elemento.nomeCidade === nomeCidadeConectada,
                            )

                            return cidadeConectada ? (
                                <line
                                    className="drop-shadow-[0_0_6px_rgba(103,235,255,1)]"
                                    key={nomeCidadeConectada}
                                    x1={x}
                                    y1={y}
                                    x2={cidadeConectada.x}
                                    y2={cidadeConectada.y}
                                    stroke="rgb(103 234 255)"
                                    strokeWidth="1"
                                />
                            ) : null
                        })
                    })}

                    {/* Cidades */}
                    {coordenadasCidades.map(coordCidade => {
                        const cidade = jogo.cidades.find(
                            cidade => cidade.nome === coordCidade.nomeCidade,
                        )!

                        const cor =
                            'fill-' +
                            mapeamentoCor[
                                cidade.cor.toLowerCase() as Cor
                            ].replace(/^bg-/, '')
                        console.log(cor)
                        return (
                            <g
                                key={coordCidade.nomeCidade}
                                onClick={() => onClickCidade(cidade.nome)}
                                cursor="pointer"
                            >
                                <circle
                                    className={`drop-shadow-[0_0_6px_rgba(255,255,255,1)] ${cor} stroke-2`}
                                    cx={coordCidade.x}
                                    cy={coordCidade.y}
                                    r="10"
                                    // fill={mapeamentoCor[cidade.cor]}
                                    // strokeWidth="2"
                                />
                                <text
                                    x={coordCidade.x + 15}
                                    y={coordCidade.y + 5}
                                    fontSize="14"
                                    fill="#ffffff"
                                    fontFamily="sans-serif"
                                >
                                    {coordCidade.nomeCidade}
                                </text>

                                {/* Jogadores na cidade */}
                                {cidade.jogadores.map((jogador, idx) => {
                                    const total = cidade.jogadores.length
                                    const spacing = 10
                                    const offset = ((total + 1.5) * spacing) / 2
                                    const x =
                                        coordCidade.x - offset + idx * spacing

                                    const cor =
                                        'fill-' +
                                        mapeamentoCorPersonagens[
                                            jogador
                                        ].replace(/^bg-/, '')

                                    return (
                                        <Peao
                                            key={idx}
                                            x={x}
                                            y={coordCidade.y - 40}
                                            scale={0.8}
                                            cor={cor}
                                        />
                                    )
                                })}

                                {/* Centro de pesquisa */}
                                {cidade.temCentro && (
                                    <CentroPesquisa
                                        x={coordCidade.x - 12}
                                        y={coordCidade.y - 12}
                                        scale={0.1}
                                    />
                                )}

                                {/* Cubos na cidade */}
                                {(
                                    Object.entries(cidade.cubosDoenca) as [
                                        COR_ENUM,
                                        number,
                                    ][]
                                ).flatMap(([cor, quantidade], indiceCor) => {
                                    if (quantidade !== 0) nivelCubos++

                                    const corMapeada =
                                        'fill-' +
                                        mapeamentoCor[
                                            cidade.cor.toLowerCase() as Cor
                                        ].replace(/^bg-/, '')

                                    const cubos = Array.from({
                                        length: quantidade,
                                    }).map((_, i) => (
                                        <CuboDoenca
                                            key={`${cor}-${i}`}
                                            x={coordCidade.x - i * 10}
                                            y={
                                                coordCidade.y -
                                                2 +
                                                nivelCubos * 6
                                            }
                                            cor={corMapeada}
                                        />
                                    ))

                                    if (indiceCor === 3) nivelCubos = 0

                                    return cubos
                                })}
                            </g>
                        )
                    })}
                </svg>
            </TransformComponent>
        </TransformWrapper>
    )
}
