import { useState } from 'react'
import { DIFICULDADE_ENUM, Jogo } from './classes/jogo'
import { JogoIniciado } from './components/JogoIniciado'
import { Turno } from './components/Turno'
import { Tabuleiro } from './components/Tabuleiro'
import { Cidade } from './classes/cidade'

export type AcaoProps =
    | 'balsa'
    | 'voo direto'
    | 'voo fretado'
    | 'ponte aerea'
    | null

export type OutraAcao = 'tratar doenca'

export function App() {
    const [fase, setFase] = useState<'turno' | null>(null)
    const [jogo, setJogo] = useState<Jogo | null>(null)
    const [qtdJogadores, setQtdJogadores] = useState(2)
    const [dificuldade, setDificuldade] = useState(DIFICULDADE_ENUM.NORMAL)
    const [teste, setTeste] = useState(0)

    const [acao, setAcao] = useState<AcaoProps>(null)

    function onClickCidade(cidade: Cidade) {
        if (acao === 'voo direto') jogo!.moverJogadorPorVooDireto(cidade)
        else if (acao === 'balsa') jogo!.moverJogadorPorBalsa(cidade)
        else if (acao === 'voo fretado') jogo!.moverJogadorPorVooFretado(cidade)
        else if (acao === 'ponte aerea') jogo!.moverJogadorPorPonteAerea(cidade)

        setAcao(null)
    }

    function onClickAcao(acao: AcaoProps) {
        setAcao(state => (state === acao ? null : acao))
    }

    function onClickOutraAcao(acao: OutraAcao) {
        if (acao === 'tratar doenca') jogo!.tratarDoenca()

        setTeste(state => state + 1)
    }

    const iniciarJogo = () => {
        const jogo = new Jogo(qtdJogadores, dificuldade)
        setJogo(jogo)
    }

    console.clear()
    console.log(
        'Personagem do jogador atual',
        jogo?.getJogadorAtual().getPersonagem().getNome(),
    )
    console.log(
        'Nome da localização do jogador atual',
        jogo?.getJogadorAtual().getLocalizacao().getNome(),
    )
    console.log(
        'Cartas de descarte do baralho do jogador',
        jogo?.getBaralhoJogador().getDescartes(),
    )
    console.log(
        'Cartas de descarte do baralho de infecção',
        jogo?.getBaralhoInfeccao().getDescartes(),
    )
    console.log('Ações restantes', jogo?.getAcoesRestantes())
    console.log('Cartas do jogador atual', jogo?.getJogadorAtual().getCartas())
    console.log(
        'Quantidade de doencas',
        jogo
            ?.getDoencas()
            .forEach(doenca =>
                console.log(doenca.getCor(), doenca.getCubosRestantes()),
            ),
    )

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen relative">
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
                            onClickOutraAcao={onClickOutraAcao}
                            onClickAcao={onClickAcao}
                        />
                    ) : (
                        <></>
                    )}
                </>
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
