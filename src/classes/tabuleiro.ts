import { cidades } from '../dados/cidades'
import { BaralhoInfeccao, BaralhoJogo } from './baralho'
import { CartaInfeccao } from './carta'
import { Cidade, COR_ENUM, NomeCidade } from './cidade'
import { Doenca } from './doenca'
import { Jogador } from './jogador'
import { DIFICULDADE_ENUM } from './jogo'

export class Tabuleiro {
    private baralhoJogador: BaralhoJogo
    private baralhoInfeccao: BaralhoInfeccao
    private doencas: Map<COR_ENUM, Doenca>
    private cidades: Cidade[]

    constructor(dificuldade: DIFICULDADE_ENUM) {
        this.doencas = new Map()

        Object.values(COR_ENUM).forEach(cor => {
            this.doencas.set(cor, new Doenca(cor))
        })

        this.cidades = cidades.map(
            cidade => new Cidade(cidade.nome, cidade.cor),
        )

        cidades.forEach(dado => {
            const cidade = this.getCidade(dado.nome)

            dado.conectadoA.forEach(nomeCidade => {
                const cidadeConectada = this.getCidade(nomeCidade)

                cidade.adicionarConexao(cidadeConectada)
            })
        })

        this.baralhoJogador = new BaralhoJogo(this.cidades)

        const cidadeAtlanta = this.getCidade('Atlanta')

        cidadeAtlanta.adicionarCentroPesquisa()

        this.baralhoJogador.definirDificuldade(dificuldade)

        this.baralhoInfeccao = new BaralhoInfeccao(this.cidades)

        for (let i = 0; i < 3; i++) {
            for (let j = 3; j > 0; j--) {
                const cartaInfeccao =
                    this.baralhoInfeccao.retirarCarta() as CartaInfeccao

                const cidade = this.getCidade(cartaInfeccao.getNome())

                const doenca = this.getDoenca(cidade.getCor())

                doenca.retirarCubos(j)

                for (let n = 0; n < j; n++)
                    cidade.adicionarCubo(doenca.getCor())
            }
        }
    }

    infectarCidadesAoFinalDoTurno() {
        for (let i = 0; i < this.baralhoInfeccao.getVelocidadeInfeccao(); i++) {
            const carta = this.baralhoInfeccao.retirarCarta() as CartaInfeccao

            const cidade = this.cidades.find(
                cidade => cidade.getNome() === carta.getNome(),
            )!

            const doenca = this.getDoenca(cidade.getCor())

            doenca.retirarCubos(1)

            cidade.adicionarCubo(doenca.getCor())

            this.baralhoInfeccao.adicionarDescarte(carta)
        }
    }

    comprarCartaDoBaralhoJogador() {
        return this.baralhoJogador.retirarCarta()
    }

    tratarDoenca(cor: COR_ENUM, jogador: Jogador) {
        const doenca = this.getDoenca(cor)

        const quantidadeDoencasTratadas = jogador.tratarDoencas(
            cor,
            doenca.getEncontrouCura(),
        )

        doenca.adicionarCubos(quantidadeDoencasTratadas)

        if (!this.temCuboEmCidades(cor)) {
            doenca.erradicar()
        }
    }

    temCuboEmCidades(cor: COR_ENUM) {
        return this.getDoenca(cor).temCuboEmCidades()
    }

    getCidade(nome: NomeCidade) {
        return this.cidades.find(cidade => cidade.getNome() === nome)!
    }

    getDoenca(cor: COR_ENUM) {
        return this.doencas.get(cor)!
    }

    getDoencas() {
        return this.doencas
    }

    getBaralhoJogador() {
        return this.baralhoJogador
    }

    getBaralhoInfeccao() {
        return this.baralhoInfeccao
    }
}
