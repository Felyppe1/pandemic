import { useState } from 'react'
import { CartaCidade, CartaEvento } from '../classes/carta'
import { Jogo } from '../classes/jogo'
import { COR_ENUM } from '../classes/cidade'
import { AcaoProps } from '../App'

const mapeamentoCor = {
    [COR_ENUM.AMARELO]: 'bg-yellow-400',
    [COR_ENUM.AZUL]: 'bg-blue-600',
    [COR_ENUM.PRETO]: 'bg-neutral-800',
    [COR_ENUM.VERMELHO]: 'bg-red-700',
}

interface TurnoProps {
    jogo: Jogo
    onClickAcao: (acao: AcaoProps) => void
}

export function Turno({ jogo, onClickAcao }: TurnoProps) {
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
                <div className="absolute top-1/3 left-4 bg-opacity-80 p-4 rounded shadow flex flex-col gap-2">
                    <h2 className="font-bold mb-2">Ações</h2>
                    {/* Vai ser um radio */}
                    <button
                        onClick={() => onClickAcao('balsa')}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Automóvel / Balsa
                    </button>
                    <button
                        onClick={() => onClickAcao('voo direto')}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Voo Direto
                    </button>
                    <button
                        onClick={() => onClickAcao('voo fretado')}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Voo Fretado
                    </button>
                    <button
                        onClick={() => onClickAcao('ponte aerea')}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Ponte Aerea
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
                                    key={carta.getNome()}
                                    className={`w-28 h-40 rounded-md shadow-md flex items-center justify-center text-center text-sm font-semibold p-2 ${mapeamentoCor[carta.getCor()]}`}
                                >
                                    {carta.getNome()}
                                </div>
                            ) : carta instanceof CartaEvento ? (
                                <div
                                    key={carta.getNome()}
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
        </>
    )
}
