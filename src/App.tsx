import { useState } from 'react'
import { DIFICULDADE_ENUM, Jogo } from './classes/jogo'
import { JogoIniciado } from './components/JogoIniciado'
import { Turno } from './components/Turno'
import { Tabuleiro } from './components/Tabuleiro'
import { Cidade } from './classes/cidade'
import { Acao, Cor } from './types'

enum COR_ENUM {
    AMARELO = 'AMARELO',
    AZUL = 'AZUL',
    PRETO = 'PRETO',
    VERMELHO = 'VERMELHO',
}

const mapeamentoCorParaCorEnum = {
    amarelo: COR_ENUM.AMARELO,
    azul: COR_ENUM.AZUL,
    preto: COR_ENUM.PRETO,
    vermelho: COR_ENUM.VERMELHO,
}

export function App() {
    const [fase, setFase] = useState<'turno' | null>(null)
    const [jogo, setJogo] = useState<Jogo | null>(null)
    const [qtdJogadores, setQtdJogadores] = useState(2)
    const [dificuldade, setDificuldade] = useState(DIFICULDADE_ENUM.NORMAL)
    const [_, setReenderizar] = useState(0)

    const [acao, setAcao] = useState<Acao | null>(null)

    function onClickCidade(cidade: Cidade) {
        if (acao === 'voo direto') jogo!.moverJogadorPorVooDireto(cidade)
        else if (acao === 'balsa') jogo!.moverJogadorPorBalsa(cidade)
        else if (acao === 'voo fretado') jogo!.moverJogadorPorVooFretado(cidade)
        else if (acao === 'ponte aerea') jogo!.moverJogadorPorPonteAerea(cidade)

        setAcao(null)
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

        setReenderizar(state => state + 1)
    }

    const iniciarJogo = () => {
        const jogo = new Jogo(qtdJogadores, dificuldade)
        setJogo(jogo)
    }

    console.log(
        'DOENCAS NA CIDADE ATUAL',
        jogo?.getJogadorAtual().getLocalizacao().getCubosDoenca(),
    )

    return (
        <div
            className={`flex flex-col items-center justify-center h-screen w-screen relative ${jogo ? 'bg-[#001b33]' : 'bg-stone-950'}`}
        >
            {jogo ? (
                <>
                    <Tabuleiro jogo={jogo} onClickCidade={onClickCidade} />
                    <JogoIniciado
                        jogo={jogo}
                        onFinalizarTurno={() => setFase('turno')}
                    />

                    {fase === 'turno' ? (
                        <Turno
                            jogo={jogo}
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
