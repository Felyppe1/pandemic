import { Cidade, COR_ENUM, NomeCidade } from '../classes/cidade'
import { Jogador } from '../classes/jogador'
import { Tabuleiro as TabuleiroClasse } from '../classes/tabuleiro'
import { CuboDoenca } from './CuboDoenca'
import { Peao } from './Peao'

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

const mapeamentoCor = {
    [COR_ENUM.AMARELO]: '#fdc700',
    [COR_ENUM.AZUL]: '#155dfc',
    [COR_ENUM.PRETO]: '#262626',
    [COR_ENUM.VERMELHO]: '#c70036',
}

const corJogadores = ['#00b40f', '#eb7700', '#00e3e0', '#ff00fe']

interface TabuleiroProps {
    tabuleiro: TabuleiroClasse
    jogadores: Jogador[]
    onClickCidade: (cidade: Cidade) => void
}

export function Tabuleiro({
    tabuleiro,
    jogadores,
    onClickCidade,
}: TabuleiroProps) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1600 900"
            className="bg-[#001b33]"
        >
            <image
                href="./src/assets/mapa-pandemic.png"
                x="0"
                y="0"
                width="1600"
                height="900"
            />

            {/* Conexões */}
            {coordenadasCidades.map(({ nomeCidade, x, y }, i) => {
                const cidade = tabuleiro.getCidade(nomeCidade)
                const cidadesConectadas = cidade.getConexoes()

                return cidadesConectadas.map(cidade => {
                    const cidadeConectada = coordenadasCidades.find(
                        elemento => elemento.nomeCidade === cidade.getNome(),
                    )

                    return cidadeConectada ? (
                        <line
                            className="drop-shadow-[0_0_6px_rgba(103,235,255,1)]"
                            key={cidade.getNome()}
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
            {coordenadasCidades.map((cidade, i) => {
                const cor =
                    'fill-' +
                    mapeamentoCor[
                        tabuleiro.getCidade(cidade.nomeCidade).getCor()
                    ]

                const cidadee = tabuleiro.getCidade(cidade.nomeCidade)

                return (
                    <g
                        key={cidade.nomeCidade}
                        onClick={() => onClickCidade(cidadee)}
                        cursor="pointer"
                    >
                        <circle
                            className={`drop-shadow-[0_0_6px_rgba(255,255,255,1)] ${cor}`}
                            cx={cidade.x}
                            cy={cidade.y}
                            r="10"
                            fill={mapeamentoCor[cidadee.getCor()]}
                            strokeWidth="2"
                        />
                        <text
                            x={cidade.x + 15}
                            y={cidade.y + 5}
                            fontSize="14"
                            fill="#ffffff"
                            fontFamily="sans-serif"
                        >
                            {cidade.nomeCidade}
                        </text>

                        {/* Jogadores na cidade */}
                        {cidadee.getJogadores().map((jogador, idx) => {
                            const total = cidadee.getJogadores().length
                            const spacing = 10
                            const offset = ((total + 1.5) * spacing) / 2
                            const x = cidade.x - offset + idx * spacing

                            const indice = jogadores.findIndex(
                                j => j === jogador,
                            )

                            return (
                                <Peao
                                    key={idx}
                                    x={x}
                                    y={cidade.y - 40}
                                    scale={0.8}
                                    cor={corJogadores[indice]}
                                />
                            )
                        })}

                        {/* Cubos na cidade */}
                        {Array.from(cidadee.getCubosDoenca().entries()).flatMap(
                            ([cor, quantidade]) =>
                                Array.from({ length: quantidade }).map(
                                    (_, i) => (
                                        <CuboDoenca
                                            key={`${cor}-${i}`}
                                            x={cidade.x - i * 10}
                                            y={cidade.y + 4}
                                            cor={mapeamentoCor[cor]}
                                        />
                                    ),
                                ),
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
