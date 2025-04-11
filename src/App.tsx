import { useState } from 'react'
import { DIFICULDADE_ENUM, Jogo } from './classes/jogo'
import { JogoIniciado } from './components/JogoIniciado'
import { Turno } from './components/Turno'
import { CartaCidade, CartaEvento } from './classes/carta'

export function App() {
    const [fase, setFase] = useState<'turno' | null>(null)
    const [jogo, setJogo] = useState<Jogo | null>(null)
    const [qtdJogadores, setQtdJogadores] = useState(2)
    const [dificuldade, setDificuldade] = useState(DIFICULDADE_ENUM.NORMAL)

    const iniciarJogo = () => {
        const jogo = new Jogo(qtdJogadores, dificuldade)
        setJogo(jogo)

        console.log(jogo.getCidade('Atlanta').getConexoes())
        console.log(jogo.getCidade('Atlanta').temCentroPesquisa())
        jogo.getJogadores().forEach(jogador => {
            jogador.getCartas().forEach(carta => {
                if (carta instanceof CartaCidade) {
                    carta.getNome()
                } else if (carta instanceof CartaEvento) {
                    carta.getDescricao()
                }
            })
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            {jogo ? (
                <div
                    className={`relative bg-contain bg-center bg-no-repeat bg-[url('/tabuleiro.png')] w-[69rem] h-[46rem] flex flex-col items-center justify-center`}
                >
                    {
                        <JogoIniciado
                            jogo={jogo}
                            onFinalizarTurno={() => setFase('turno')}
                        />
                    }

                    {fase === 'turno' ? <Turno jogo={jogo} /> : <></>}
                </div>
            ) : (
                <div className="p-6 shadow-md rounded">
                    <h1 className="text-xl font-bold mb-4">Configurar Jogo</h1>
                    <label className="block mb-2">
                        Quantidade de jogadores:
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="4"
                        value={qtdJogadores}
                        onChange={e => setQtdJogadores(Number(e.target.value))}
                        className="border p-2 w-full mb-4"
                    />

                    <label className="block mb-2">Dificuldade:</label>
                    <select
                        value={dificuldade}
                        onChange={e =>
                            setDificuldade(e.target.value as DIFICULDADE_ENUM)
                        }
                        className="border p-2 w-full mb-4"
                    >
                        {Object.values(DIFICULDADE_ENUM).map(nivel => (
                            <option key={nivel} value={nivel}>
                                {nivel}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={iniciarJogo}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Jogar
                    </button>
                </div>
            )}
        </div>
    )
}
