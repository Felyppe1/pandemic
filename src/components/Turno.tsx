import { CartaCidade, CartaEvento } from '../classes/carta'
import { Jogo } from '../classes/jogo'
import { COR_ENUM } from '../classes/cidade'
import { MenuSuperior } from './MenuSuperior'
import { MenuJogadores } from './MenuJogadores'
import { Acao, Cor } from '../types'
import { MenuInferior } from './MenuInferior'

const mapeamentoEnumCor = {
    [COR_ENUM.AMARELO]: 'amarelo',
    [COR_ENUM.AZUL]: 'azul',
    [COR_ENUM.PRETO]: 'preto',
    [COR_ENUM.VERMELHO]: 'vermelho',
} as const

interface TurnoProps {
    jogo: Jogo
    acaoSelecionada: Acao | null
    onClickAcao: (acao: Acao) => void
    onClickTratarDoenca: (cor?: Cor) => void
}

export function Turno({
    jogo,
    acaoSelecionada,
    onClickAcao,
    onClickTratarDoenca,
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
                            } else if (carta instanceof CartaEvento) {
                                return {
                                    nome: carta.getNome(),
                                    tipo: 'carta evento',
                                }
                            } else {
                                return {
                                    nome: 'Epidemia',
                                    tipo: 'carta epidemia',
                                }
                            }
                        }),
                    }
                })}
            />

            <MenuInferior
                nomePersonagem={jogo
                    .getJogadorAtual()
                    .getPersonagem()
                    .getNome()}
                acoesRestantes={jogo.getAcoesRestantes()}
                acaoSelecionada={acaoSelecionada}
                onClickAcaoMovimento={onClickAcao}
                onClickTratarDoenca={onClickTratarDoenca}
            />
        </>
    )
}
