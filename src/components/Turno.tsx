import { CartaCidade, CartaEvento, COR_ENUM } from '../classes/carta'
import { Jogo } from '../classes/jogo'

interface TurnoProps {
    jogo: Jogo
}

const mapeamentoCor = {
    [COR_ENUM.AMARELO]: 'bg-yellow-600',
    [COR_ENUM.AZUL]: 'bg-blue-600',
    [COR_ENUM.PRETO]: 'bg-gray-900',
    [COR_ENUM.VERMELHO]: 'bg-red-700',
}

export function Turno({ jogo }: TurnoProps) {
    const jogadorAtual = jogo.getJogadorAtual()

    return (
        <>
            {/* Cartas do jogador 1 */}
            <div className="absolute bottom-4 left-4 bg-opacity-80 p-4 rounded shadow">
                <h2 className="font-bold mb-2">Cartas</h2>
                <div className="flex gap-2">
                    {jogadorAtual.getCartas().map((carta, index) =>
                        carta instanceof CartaCidade ? (
                            <div
                                key={index}
                                className={`w-28 h-40 bg-orange-950 rounded-md shadow-md flex items-center justify-center text-center text-sm font-semibold p-2 ${mapeamentoCor[carta.getCor()]}`}
                            >
                                {carta.getNome()}
                            </div>
                        ) : carta instanceof CartaEvento ? (
                            <div
                                key={index}
                                className={`w-28 h-40 bg-orange-950 rounded-md shadow-md flex items-center justify-center text-center text-sm font-semibold p-2 bg-yellow-950`}
                            >
                                {carta.getDescricao()}
                            </div>
                        ) : (
                            <></>
                        ),
                    )}
                </div>
            </div>
            {/* <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-4 rounded shadow">
                <h2 className="font-bold mb-2">Cartas</h2>
                <ul>
                    {jogadorAtual.getCartas().map((carta, index) => (
                        <li key={index}>{
                            (carta instanceof CartaCidade) 
                                ? carta.getNome()
                                : 'teste'
                        }</li>
                    ))}
                </ul>
            </div> */}

            {/* Ações disponíveis */}
            {/* <div className="absolute top-1/3 left-4 bg-white bg-opacity-80 p-4 rounded shadow">
                <h2 className="font-bold mb-2">Ações</h2>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Mover</button>
            </div> */}

            {/* Bonecos nas cidades */}
            {/* {jogo.getJogadores().map((jogador, i) => {
                const cidade = jogador.getLocalizacao()
                // const pos = cidade.getPosicao() // você pode definir posição x/y por cidade

                return (
                    <div
                        key={i}
                        className="absolute w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs"
                        style={{
                            left: '200px',
                            top: '200px',
                            // left: pos.x,
                            // top: pos.y,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            })} */}
        </>
    )
}
