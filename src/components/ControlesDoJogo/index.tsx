import {
    CartaCidadeToObject,
    CartaEventoToObject,
} from '../../core/classes/carta'
import { JogoToObject } from '../../core/classes/jogo'
import { COR_ENUM } from '../../core/classes/cidade'
import { MenuSuperior } from './MenuSuperior'
import { MenuJogadores } from './MenuJogadores'
import { Acao, Cor } from '../../types'
import { MenuInferior } from './MenuInferior'

const mapeamentoEnumCor = {
    [COR_ENUM.AMARELO]: 'amarelo',
    [COR_ENUM.AZUL]: 'azul',
    [COR_ENUM.PRETO]: 'preto',
    [COR_ENUM.VERMELHO]: 'vermelho',
} as const

interface TurnoProps {
    jogo: JogoToObject
    acaoSelecionada: Acao | null
    onClickAcao: (acao: Acao) => void
    onClickTratarDoenca: (cor?: Cor) => void
}

export function ControlesDoJogo({
    jogo,
    acaoSelecionada,
    onClickAcao,
    onClickTratarDoenca,
}: TurnoProps) {
    const baralhoInfeccao = jogo.baralhoInfeccao

    return (
        <>
            <MenuSuperior
                cartasRestantes={jogo.baralhoJogador.cartas.length}
                cubos={
                    Object.fromEntries(
                        Array.from(jogo.doencas).map(
                            ({ cor, cubosRestantes }) => [
                                mapeamentoEnumCor[cor],
                                cubosRestantes,
                            ],
                        ),
                    ) as Record<Cor, number>
                }
                velocidadeInfeccao={
                    baralhoInfeccao.listaVelocidadeInfeccao[
                        baralhoInfeccao.indiceVelocidadeInfeccao
                    ]
                }
                surtos={jogo.marcadorSurto}
                centrosPesquisa={1}
            />

            <MenuJogadores
                jogadores={jogo.jogadores.map(jogador => {
                    return {
                        nome: jogador.personagem.nome,
                        personagem: jogador.personagem.nome,
                        eJogadorAtual:
                            jogo.jogadores[jogo.indiceJogadorAtual] === jogador,
                        cartas: jogador.cartas.map(carta => {
                            if (carta.tipo === 'carta cidade') {
                                const cartaCidade = carta as CartaCidadeToObject

                                let corMapeada:
                                    | 'amarelo'
                                    | 'azul'
                                    | 'preto'
                                    | 'vermelho'

                                if (cartaCidade.cor === COR_ENUM.AMARELO)
                                    corMapeada = 'amarelo'
                                else if (cartaCidade.cor === COR_ENUM.AZUL)
                                    corMapeada = 'azul'
                                else if (cartaCidade.cor === COR_ENUM.PRETO)
                                    corMapeada = 'preto'
                                else corMapeada = 'vermelho'

                                return {
                                    nome: cartaCidade.nome,
                                    tipo: 'carta cidade',
                                    cor: corMapeada,
                                }
                            } else if (carta.tipo === 'carta evento') {
                                const cartaEvento = carta as CartaEventoToObject

                                return {
                                    nome: cartaEvento.nome,
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
                nomePersonagem={
                    jogo.jogadores[jogo.indiceJogadorAtual].personagem.nome
                }
                acoesRestantes={jogo.acoesRestantes}
                acaoSelecionada={acaoSelecionada}
                onClickAcaoMovimento={onClickAcao}
                onClickTratarDoenca={onClickTratarDoenca}
            />
        </>
    )
}
