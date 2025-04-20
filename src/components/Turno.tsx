import { useState } from 'react'
import { CartaCidade, CartaEvento } from '../classes/carta'
import { Jogo } from '../classes/jogo'
import { COR_ENUM } from '../classes/cidade'
import { AcaoProps, OutraAcao } from '../App'

const acoes: { acao: AcaoProps; label: string }[] = [
    { acao: 'balsa', label: 'Automóvel / Balsa' },
    { acao: 'voo direto', label: 'Voo Direto' },
    { acao: 'voo fretado', label: 'Voo Fretado' },
    { acao: 'ponte aerea', label: 'Ponte Aérea' },
]

const outrasAcoes: { acao: OutraAcao; label: string }[] = [
    { acao: 'tratar doenca', label: 'Tratar Doença' },
]

const mapeamentoCor = {
    [COR_ENUM.AMARELO]: 'bg-yellow-400',
    [COR_ENUM.AZUL]: 'bg-blue-600',
    [COR_ENUM.PRETO]: 'bg-neutral-800',
    [COR_ENUM.VERMELHO]: 'bg-red-700',
}

interface TurnoProps {
    jogo: Jogo
    acaoSelecionada: AcaoProps
    onClickAcao: (acao: AcaoProps) => void
    onClickOutraAcao: (acao: OutraAcao) => void
}

export function Turno({
    jogo,
    acaoSelecionada,
    onClickAcao,
    onClickOutraAcao,
}: TurnoProps) {
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

            {/* Ações de movimento */}
            {!esconder && (
                <div className="absolute top-1/6 left-4 bg-opacity-80 p-4 rounded shadow flex flex-col gap-2">
                    <h2 className="font-bold mb-2">Ações de Movimento</h2>
                    {acoes.map(({ acao, label }) => (
                        <button
                            key={acao}
                            onClick={() => onClickAcao(acao)}
                            className={`px-3 py-1 rounded transition text-white ${
                                acaoSelecionada === acao
                                    ? 'bg-blue-700 ring-2 ring-blue-300'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {/* Outras Ações */}
            {!esconder && (
                <div className="absolute top-1/2 left-4 bg-opacity-80 p-4 rounded shadow flex flex-col gap-2">
                    <h2 className="font-bold mb-2">Outras Ações</h2>
                    {outrasAcoes.map(({ acao, label }) => (
                        <button
                            key={acao}
                            onClick={() => onClickOutraAcao(acao)}
                            className={`px-3 py-1 rounded transition text-white ${'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {label}
                        </button>
                    ))}
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
