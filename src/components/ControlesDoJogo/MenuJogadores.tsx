import { useState } from 'react'
import {
    mapeamentoCor,
    mapeamentoCorPersonagens,
    mapeamentoFotoPersonagens,
} from '../../utils/mapeamentos'
import { Carta, Personagem } from '../../types'

type Jogador = {
    nome: string
    personagem: Personagem
    cartas: Carta[]
    eJogadorAtual: boolean
}

type Props = {
    jogadores: Jogador[]
}

export const MenuJogadores: React.FC<Props> = ({ jogadores }) => {
    const [mostrarMenu, setMostrarMenu] = useState(true)

    return (
        <>
            {mostrarMenu && (
                <div className="absolute top-20 right-0 z-1 flex flex-col">
                    {jogadores.map((jogador, idx) => (
                        <div key={idx} className="relative shadow-lg">
                            {jogador.eJogadorAtual && (
                                <div
                                    className={`absolute inset-y-0 -translate-x-full px-1 flex justify-center items-center ${mapeamentoCorPersonagens[jogador.personagem]}`}
                                >
                                    <div className="h-0 border-y-6 border-y-transparent border-l-6 border-l-black" />
                                </div>
                            )}

                            {/* Cabeçalho do jogador */}
                            <div
                                className={`flex items-center px-2 py-1 ${mapeamentoCorPersonagens[jogador.personagem]}`}
                            >
                                <img
                                    src={
                                        mapeamentoFotoPersonagens[
                                            jogador.personagem
                                        ]
                                    }
                                    alt={jogador.nome}
                                    className="w-8 h-8 rounded-full mr-2 border border-white"
                                />
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-xs text-white max-w-[9rem]">
                                        {jogador.nome}
                                    </span>
                                    <span className="text-[10px] italic text-white">
                                        {jogador.personagem}
                                    </span>
                                </div>
                            </div>

                            {/* Cartas */}
                            <div
                                className={`bg-black/90 px-3 py-2 text-sm text-white`}
                            >
                                {jogador.cartas.map((carta, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 text-xs mb-1"
                                    >
                                        <span
                                            className={`w-2 h-3  ${carta.tipo === 'carta evento' ? 'bg-yellow-800' : mapeamentoCor[carta.cor!]}`}
                                        />
                                        <span
                                            className={
                                                carta.tipo === 'carta evento'
                                                    ? 'text-yellow-300 font-semibold'
                                                    : ''
                                            }
                                        >
                                            {carta.nome}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={() => setMostrarMenu(!mostrarMenu)}
                className="px-2 py-6 absolute top-20 right-0 z-2 bg-black/80 text-white rounded-l-full border-l-1 border-y-1 border-white hover:bg-black"
            >
                {mostrarMenu ? (
                    <div className="h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
                ) : (
                    <div className="h-0 border-y-8 border-y-transparent border-r-8 border-r-white" />
                )}
            </button>
        </>
    )
}
