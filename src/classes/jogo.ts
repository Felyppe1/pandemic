import { BaralhoInfeccao, BaralhoJogo } from './baralho'
import { Jogador } from './jogador'
import { escolherPersonagemAleatoriamente } from './personagem'
import { CartaInfeccao } from './carta'
import { Cidade, COR_ENUM, NomeCidade } from './cidade'
import { cidades } from '../dados/cidades'

export enum DIFICULDADE_ENUM {
    FACIL = 'FACIL',
    NORMAL = 'NORMAL',
    HEROICO = 'HEROICO',
}

const cartasPorJogador: Record<number, number> = {
    1: 5,
    2: 4,
    3: 3,
    4: 2,
}

export class Jogo {
    private baralhoJogador: BaralhoJogo
    private baralhoInfeccao: BaralhoInfeccao
    private cubos: Map<COR_ENUM, number>
    private cidades: Cidade[]
    private jogadores: Jogador[]
    private dificuldade: DIFICULDADE_ENUM
    private indiceJogadorAtual: number

    constructor(qtdJogadores: number, dificuldade: DIFICULDADE_ENUM) {
        this.dificuldade = dificuldade

        this.cubos = new Map<COR_ENUM, number>()

        Object.values(COR_ENUM).forEach(cor => {
            this.cubos.set(cor, 12)
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

        const numeroCartas = cartasPorJogador[qtdJogadores] ?? 2

        this.jogadores = Array.from({ length: qtdJogadores }).map(_ => {
            const cartas = Array.from({ length: numeroCartas }).map(_ =>
                this.baralhoJogador.retirarCarta(),
            )

            return new Jogador(
                cartas,
                escolherPersonagemAleatoriamente(),
                this.getCidade('Atlanta'),
            )
        })

        this.baralhoJogador.definirDificuldade(this.dificuldade)

        this.baralhoInfeccao = new BaralhoInfeccao(this.cidades)

        for (let i = 0; i < 3; i++) {
            for (let j = 3; j > 0; j--) {
                const cartaInfeccao =
                    this.baralhoInfeccao.retirarCarta() as CartaInfeccao

                const cidade = this.getCidade(cartaInfeccao.getNome())

                cidade.adicionarCubo(
                    cidade.getCor(),
                    this.retirarCubos(cidade.getCor(), j),
                )
            }
        }

        this.indiceJogadorAtual = 0
    }

    getJogadores() {
        return this.jogadores
    }

    getJogadorAtual() {
        return this.jogadores[this.indiceJogadorAtual]
    }

    proximoJogador() {
        this.indiceJogadorAtual =
            ((this.indiceJogadorAtual + 1) % this.jogadores.length) - 1
    }

    getCidade(nome: NomeCidade) {
        return this.cidades.find(cidade => cidade.getNome() === nome)!
    }

    retirarCubos(cor: COR_ENUM, quantidade: number) {
        const quantidadeCubos = this.cubos.get(cor)!

        if (quantidadeCubos < quantidade) {
            throw new Error(`Cubos da cor ${cor} acabou`)
        }

        this.cubos.set(cor, quantidadeCubos - quantidade)

        return quantidade
    }
}
