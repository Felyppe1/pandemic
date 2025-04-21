import { cidades } from '../dados/cidades'
import { BaralhoInfeccao, BaralhoJogador } from './baralho'
import { CartaInfeccao } from './carta'
import { Cidade, COR_ENUM, NomeCidade } from './cidade'
import { Doenca } from './doenca'
import { Jogador } from './jogador'
import { escolherPersonagemAleatoriamente } from './personagem'

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
    private jogadores: Jogador[]
    private baralhoJogador: BaralhoJogador
    private baralhoInfeccao: BaralhoInfeccao
    private doencas: Map<COR_ENUM, Doenca>
    private cidades: Cidade[]
    private dificuldade: DIFICULDADE_ENUM
    private indiceJogadorAtual: number
    private acoesRestantes: number

    constructor(qtdJogadores: number, dificuldade: DIFICULDADE_ENUM) {
        this.dificuldade = dificuldade
        this.doencas = new Map()
        this.indiceJogadorAtual = 0
        this.acoesRestantes = 4

        Object.values(COR_ENUM).forEach(cor => {
            this.doencas.set(cor, new Doenca(cor))
        })

        this.cidades = cidades.map(
            cidade => new Cidade(cidade.nome, cidade.cor),
        )

        cidades.forEach(({ nome, conectadoA }) => {
            const cidade = this.getCidade(nome)

            conectadoA.forEach(nomeCidade => {
                const cidadeConectada = this.getCidade(nomeCidade)

                cidade.adicionarConexao(cidadeConectada)
            })
        })

        this.baralhoJogador = new BaralhoJogador(this.cidades)

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

        const cidadeAtlanta = this.getCidade('Atlanta')

        cidadeAtlanta.adicionarCentroPesquisa()

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

    moverJogadorPorBalsa(cidade: Cidade) {
        this.getJogadorAtual().balsa(cidade)

        this.verificarTurno()
    }

    moverJogadorPorVooDireto(cidade: Cidade) {
        this.getJogadorAtual().vooDireto(cidade, this.baralhoJogador)

        this.verificarTurno()
    }

    moverJogadorPorVooFretado(cidade: Cidade) {
        this.getJogadorAtual().vooFretado(cidade, this.baralhoJogador)

        this.verificarTurno()
    }

    moverJogadorPorPonteAerea(cidade: Cidade) {
        this.getJogadorAtual().ponteAerea(cidade)

        this.verificarTurno()
    }

    tratarDoenca() {
        // TODO: não dá assim, vai precisar receber a cor por parâmetro (uma cidae pode ter doenças de várias cores)
        const cor = this.getJogadorAtual().getCorDaCidadeAtual()

        const doenca = this.getDoenca(cor)

        const cidade = this.getJogadorAtual().getLocalizacao()

        cidade.tratarDoencas(doenca)

        this.verificarTurno()
    }

    private verificarTurno() {
        this.acoesRestantes -= 1

        if (this.acoesRestantes === 0) {
            this.getJogadorAtual().comprarCartas(this.baralhoJogador)

            this.infectarCidadesAoFinalDoTurno()

            this.indiceJogadorAtual =
                (this.indiceJogadorAtual + 1) % this.jogadores.length

            this.acoesRestantes = 4
        }
    }

    private infectarCidadesAoFinalDoTurno() {
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

    getDoenca(cor: COR_ENUM) {
        return this.doencas.get(cor)!
    }

    getCidade(nome: NomeCidade) {
        return this.cidades.find(cidade => cidade.getNome() === nome)!
    }

    getJogadores() {
        return this.jogadores
    }

    getJogadorAtual() {
        return this.jogadores[this.indiceJogadorAtual]
    }

    getAcoesRestantes() {
        return this.acoesRestantes
    }

    getBaralhoJogador() {
        return this.baralhoJogador
    }

    getBaralhoInfeccao() {
        return this.baralhoInfeccao
    }

    getDoencas() {
        return this.doencas
    }
}
