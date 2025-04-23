import { CartaCidade, CartaEvento } from '../classes/carta'
import { Jogo } from '../classes/jogo'
import { COR_ENUM } from '../classes/cidade'
import { AcaoProps, OutraAcao } from '../App'
import { MenuSuperior } from './MenuSuperior'
import { MenuJogadores } from './MenuJogadores'
import { Cor } from '../types'
import { MenuInferior } from './MenuInferior'

const acoes: { acao: AcaoProps; label: string }[] = [
    { acao: 'balsa', label: 'Automóvel / Balsa' },
    { acao: 'voo direto', label: 'Voo Direto' },
    { acao: 'voo fretado', label: 'Voo Fretado' },
    { acao: 'ponte aerea', label: 'Ponte Aérea' },
]

const outrasAcoes: { acao: OutraAcao; label: string }[] = [
    { acao: 'tratar doenca', label: 'Tratar Doença' },
]

const mapeamentoEnumCor = {
    [COR_ENUM.AMARELO]: 'amarelo',
    [COR_ENUM.AZUL]: 'azul',
    [COR_ENUM.PRETO]: 'preto',
    [COR_ENUM.VERMELHO]: 'vermelho',
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
    const baralhoInfeccao = jogo.getBaralhoInfeccao().toObject()

    return (
        <>
            <MenuSuperior
                cartasRestantes={
                    jogo.getBaralhoJogador().toObject().cartas.length
                }
                cubos={
                    Object.fromEntries(
                        Array.from(jogo.getDoencas()).map(([cor, doenca]) => [
                            mapeamentoEnumCor[cor],
                            doenca.getCubosRestantes(),
                        ]),
                    ) as Record<Cor, number>
                }
                velocidadeInfeccao={
                    baralhoInfeccao.listaVelocidadeInfeccao[
                        baralhoInfeccao.indiceVelocidadeInfeccao
                    ]
                }
                surtos={jogo.getMarcadorSurto()}
                centrosPesquisa={1}
            />

            <MenuJogadores
                jogadores={jogo.getJogadores().map(jogador => {
                    return {
                        nome: jogador.getPersonagem().getNome(),
                        personagem: jogador.getPersonagem().getNome(),
                        eJogadorAtual: jogo.getJogadorAtual() === jogador,
                        cartas: jogador.getCartas().map(carta => {
                            if (carta instanceof CartaCidade) {
                                let corMapeada:
                                    | 'amarelo'
                                    | 'azul'
                                    | 'preto'
                                    | 'vermelho'
                                if (carta.getCor() === COR_ENUM.AMARELO)
                                    corMapeada = 'amarelo'
                                else if (carta.getCor() === COR_ENUM.AZUL)
                                    corMapeada = 'azul'
                                else if (carta.getCor() === COR_ENUM.PRETO)
                                    corMapeada = 'preto'
                                else corMapeada = 'vermelho'

                                return {
                                    nome: carta.getNome(),
                                    tipo: 'carta cidade',
                                    cor: corMapeada,
                                }
                            }

                            const cartaEvento = carta as CartaEvento

                            return {
                                nome: cartaEvento.getNome(),
                                tipo: 'carta evento',
                            }
                        }),
                    }
                })}
            />

            {/* Ações de movimento */}
            <div className="absolute bottom-1/5 left-4 bg-opacity-80 p-4 rounded shadow flex flex-col gap-2">
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

            {/* Outras Ações */}
            <div className="absolute bottom-10 left-4 bg-opacity-80 p-4 rounded shadow flex flex-col gap-2">
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

            <MenuInferior
                nomePersonagem={jogo
                    .getJogadorAtual()
                    .getPersonagem()
                    .getNome()}
                acoesRestantes={jogo.getAcoesRestantes()}
            />
        </>
    )
}
