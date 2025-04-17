import { cidades } from '../dados/cidades'
import { BaralhoInfeccao, BaralhoJogo } from './baralho'
import { CartaInfeccao } from './carta'
import { Cidade, COR_ENUM, NomeCidade } from './cidade'
import { CuboDoenca } from './cubo-doenca'
import { DIFICULDADE_ENUM } from './jogo'

export class Tabuleiro {
    private baralhoJogador: BaralhoJogo
    private baralhoInfeccao: BaralhoInfeccao
    private cubosDoenca: CuboDoenca[]
    private cidades: Cidade[]

    constructor(dificuldade: DIFICULDADE_ENUM) {
        this.cubosDoenca = []

        Object.values(COR_ENUM).forEach(cor => {
            this.cubosDoenca.push(new CuboDoenca(cor))
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

                cidade.adicionarCubos(
                    this.getCubosDoenca(cidade.getCor()),
                    this.getCubos(cidade.getCor(), j),
                )
            }
        }
    }

    getCidade(nome: NomeCidade) {
        return this.cidades.find(cidade => cidade.getNome() === nome)!
    }

    getCubosDoenca(cor: COR_ENUM) {
        return this.cubosDoenca.find(cuboDoenca => cor === cuboDoenca.getCor())!
    }

    getCubos(cor: COR_ENUM, quantidade: number) {
        const cuboDoenca = this.getCubosDoenca(cor)

        return cuboDoenca.getCubos(quantidade)
    }

    getBaralhoJogador() {
        return this.baralhoJogador
    }
}
