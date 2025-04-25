import { useState } from 'react'
import { DIFICULDADE_ENUM, Jogo, JogoToObject } from './classes/jogo'
import { JogoIniciado } from './components/JogoIniciado'
import { Turno } from './components/Turno'
import { Tabuleiro } from './components/Tabuleiro'
import { NomeCidade } from './classes/cidade'
import { Acao, Cor } from './types'
import { mapeamentoCorParaCorEnum } from './utils/mapeamentos'

export function App() {
    const [fase, setFase] = useState<'turno' | null>(null)
    const [jogo, setJogo] = useState<Jogo | null>(null)
    const [estadoJogo, setEstadoJogo] = useState<JogoToObject | null>(null)
    const [qtdJogadores, setQtdJogadores] = useState(2)
    const [dificuldade, setDificuldade] = useState(DIFICULDADE_ENUM.NORMAL)
    const [acao, setAcao] = useState<Acao | null>(null)

    function handleMover(nomeCidade: NomeCidade) {
        if (acao === 'voo direto') jogo!.moverJogadorPorVooDireto(nomeCidade)
        else if (acao === 'balsa') jogo!.moverJogadorPorBalsa(nomeCidade)
        else if (acao === 'voo fretado')
            jogo!.moverJogadorPorVooFretado(nomeCidade)
        else if (acao === 'ponte aerea')
            jogo!.moverJogadorPorPonteAerea(nomeCidade)

        setAcao(null)
        setEstadoJogo(jogo!.toObject())
    }

    function handleAcao(acao: Acao) {
        setAcao(state => (state === acao ? null : acao))
    }

    function handleTratarDoenca(cor?: Cor) {
        if (cor) {
            jogo!.tratarDoenca(mapeamentoCorParaCorEnum[cor])
        } else {
            jogo!.tratarDoenca()
        }

        setEstadoJogo(jogo!.toObject())
    }

    const iniciarJogo = () => {
        const jogo = new Jogo(qtdJogadores, dificuldade)

        setEstadoJogo(jogo.toObject())

        setJogo(jogo)
    }

    return (
        <div
            className={`flex flex-col items-center justify-center h-screen w-screen relative ${jogo ? 'bg-[#001b33]' : 'bg-stone-950'}`}
        >
            {estadoJogo ? (
                <>
                    <Tabuleiro jogo={estadoJogo} onClickCidade={handleMover} />
                    <JogoIniciado
                        jogadores={estadoJogo.jogadores}
                        onFinalizarTurno={() => setFase('turno')}
                    />

                    {fase === 'turno' ? (
                        <Turno
                            jogo={estadoJogo}
                            acaoSelecionada={acao}
                            onClickAcao={handleAcao}
                            onClickTratarDoenca={handleTratarDoenca}
                        />
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <div className="p-6 shadow-md rounded text-white sans-serif">
                    <h1 className="text-xl font-bold mb-4">Novo Jogo</h1>
                    <label className="block mb-2">
                        Quantidade de jogadores:
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="4"
                        value={qtdJogadores}
                        onChange={e => setQtdJogadores(Number(e.target.value))}
                        className="p-2 w-full mb-4 bg-[#01102F] border-3 border-[#858387]"
                    />

                    <label className="block mb-2">Dificuldade:</label>
                    <select
                        value={dificuldade}
                        onChange={e =>
                            setDificuldade(e.target.value as DIFICULDADE_ENUM)
                        }
                        className="p-2 w-full mb-4 bg-[#01102F] border-3 border-[#858387] cursor-pointer"
                    >
                        {Object.values(DIFICULDADE_ENUM).map(nivel => (
                            <option key={nivel} value={nivel}>
                                {nivel}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={iniciarJogo}
                        className="px-6 py-2 bg-[#001435] text-white border-2 border-[#5DA1EE] rounded-md hover:bg-[#00264d] transition"
                    >
                        Iniciar Jogo
                    </button>
                    {/* <button
                        onClick={iniciarJogo}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Jogar
                    </button> */}
                </div>
            )}
        </div>
    )
}
