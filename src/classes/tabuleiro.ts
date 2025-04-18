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

                cidade.adicionarCubos(this.getCuboDoenca(cidade.getCor()), j)
            }
        }
    }

    infectarCidadesAoFinalDoTurno() {
        for (let i = 0; i < this.baralhoInfeccao.getVelocidadeInfeccao(); i++) {
            const carta = this.baralhoInfeccao.retirarCarta() as CartaInfeccao

            const cidade = this.cidades.find(
                cidade => cidade.getNome() === carta.getNome(),
            )!

            const cuboDoenca = this.cubosDoenca.find(
                cubo => cubo.getCor() === cidade.getCor(),
            )!

            cidade.adicionarCubos(cuboDoenca, 1)

            this.baralhoInfeccao.adicionarDescarte(carta)
        }
    }

    getCidade(nome: NomeCidade) {
        return this.cidades.find(cidade => cidade.getNome() === nome)!
    }

    getCuboDoenca(cor: COR_ENUM) {
        return this.cubosDoenca.find(cuboDoenca => cor === cuboDoenca.getCor())!
    }

    getBaralhoJogador() {
        return this.baralhoJogador
    }

    getBaralhoInfeccao() {
        return this.baralhoInfeccao
    }
}
