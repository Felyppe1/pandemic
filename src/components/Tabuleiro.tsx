import { COR_ENUM, NomeCidade } from '../classes/cidade'
import { Tabuleiro as TabuleiroClasse } from '../classes/tabuleiro'
// import { mapeamentoCor } from "../utils/mapeamentos";

const coordenadasCidades: { nomeCidade: NomeCidade; x: number; y: number }[] = [
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

interface TabuleiroProps {
    tabuleiro: TabuleiroClasse
}

export function Tabuleiro({ tabuleiro }: TabuleiroProps) {
    function handleClickCidade(nome: NomeCidade) {
        console.log(nome)
    }

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
                            key={i}
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

                return (
                    <g
                        key={i}
                        onClick={() => handleClickCidade(cidade.nomeCidade)}
                        cursor="pointer"
                    >
                        <circle
                            className={`drop-shadow-[0_0_6px_rgba(255,255,255,1)] ${cor}`}
                            cx={cidade.x}
                            cy={cidade.y}
                            r="10"
                            fill={
                                mapeamentoCor[
                                    tabuleiro
                                        .getCidade(cidade.nomeCidade)
                                        .getCor()
                                ]
                            }
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
                    </g>
                )
            })}
        </svg>
    )
}
