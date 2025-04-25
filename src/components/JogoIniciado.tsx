import { useEffect, useState } from 'react'
import { JogadorToObject } from '../classes/jogador'

interface JogoIniciadoProps {
    jogadores: JogadorToObject[]
    onFinalizarTurno: () => void
}

export function JogoIniciado({
    jogadores,
    onFinalizarTurno,
}: JogoIniciadoProps) {
    const [mostrar, setMostrar] = useState<'jogadores' | 'mensagem' | null>(
        null,
    )

    useEffect(() => {
        if (jogadores) {
            setMostrar('jogadores')

            const timer1 = setTimeout(() => setMostrar('mensagem'), 5000)
            const timer2 = setTimeout(() => {
                setMostrar(null)
                onFinalizarTurno()
            }, 7000)

            return () => {
                clearTimeout(timer1)
                clearTimeout(timer2)
            }
        }
    }, [])

    if (mostrar === 'jogadores') {
        return (
            <div className="absolute flex justify-evenly w-full flex-wrap gap-6 px-8">
                {jogadores.map((jogador, index) => {
                    return (
                        <div
                            key={index}
                            className="w-72 bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold mb-2 text-center">
                                Jogador {index + 1}
                            </h2>
                            <div className="border-t border-gray-600 pt-4">
                                <p className="text-lg font-semibold mb-2">
                                    {jogador.personagem.nome}
                                </p>
                                <p className="text-sm text-gray-200 whitespace-pre-line">
                                    CONSERTAR
                                    {/* {jogador.} */}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (mostrar === 'mensagem') {
        return (
            <div className="absolute bg-yellow-600 px-10 py-4 rounded-lg text-5xl font-bold text-white text-center w-fit">
                Jogo Iniciado!
            </div>
        )
    }

    return null
}
