import { useState } from 'react'
import { CartaCidade, CartaEvento } from '../classes/carta'
import { Jogo } from '../classes/jogo'
import { COR_ENUM } from '../classes/cidade'

interface TurnoProps {
    jogo: Jogo
}

const mapeamentoCor = {
    [COR_ENUM.AMARELO]: 'bg-yellow-400',
    [COR_ENUM.AZUL]: 'bg-blue-600',
    [COR_ENUM.PRETO]: 'bg-neutral-800',
    [COR_ENUM.VERMELHO]: 'bg-red-700',
}

export function Turno({ jogo }: TurnoProps) {
    const [esconder, setEsconder] = useState(false)
    const jogadorAtual = jogo.getJogadorAtual()

    function handleEsconder() {
        setEsconder(!esconder)
    }

    return (
        <>
            {/* Botão para esconder/mostrar ações */}
            <button
                onClick={handleEsconder}
                className="absolute top-4 left-4 z-50 bg-white bg-opacity-90 px-3 py-1 rounded shadow-md hover:bg-gray-200 transition"
            >
                {esconder ? 'Mostrar opções' : 'Esconder opções'}
            </button>

            {/* Ações disponíveis */}
            {!esconder && (
                <div className="absolute top-1/3 left-4 bg-opacity-80 p-4 rounded shadow">
                    <h2 className="font-bold mb-2">Ações</h2>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        Automóvel / Balsa
                    </button>
                </div>
            )}

            {/* Cartas do jogador 1 */}
            {!esconder && (
                <div className="absolute bottom-4 left-4 bg-opacity-80 p-4 rounded shadow">
                    <h2 className="font-bold mb-2">Cartas</h2>
                    <div className="flex gap-2">
                        {jogadorAtual.getCartas().map((carta, index) =>
                            carta instanceof CartaCidade ? (
                                <div
                                    key={index}
                                    className={`w-28 h-40 rounded-md shadow-md flex items-center justify-center text-center text-sm font-semibold p-2 ${mapeamentoCor[carta.getCor()]}`}
                                >
                                    {carta.getNome()}
                                </div>
                            ) : carta instanceof CartaEvento ? (
                                <div
                                    key={index}
                                    className={`w-28 h-40 bg-orange-950 rounded-md shadow-md flex flex-col items-center gap-2 justify-center text-center text-sm font-semibold p-2 bg-yellow-950`}
                                >
                                    <p>{carta.getNome()}</p>
                                    <p className="text-xs">
                                        {carta.getDescricao()}
                                    </p>
                                </div>
                            ) : (
                                <></>
                            ),
                        )}
                    </div>
                </div>
            )}

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
