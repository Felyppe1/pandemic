import {
    Carta,
    CartaCidade,
    CartaEpidemia,
    CartaInfeccao,
    FinanciamentoGovernamental,
    Prognostico,
    RecursoExtra,
    TransporteAereo,
    UmaNoiteTranquila,
} from './carta'
import { Cidade } from './cidade'
import { DIFICULDADE_ENUM } from './jogo'

export abstract class Baralho {
    private cartas: Carta[]
    private descarte: Carta[]

    constructor() {
        this.cartas = []
        this.descarte = []
    }

    adicionarCarta(carta: Carta) {
        this.cartas.push(carta)
    }

    retirarCarta(): Carta {
        if (this.cartas.length <= 2) {
            throw new Error('O jogo acabou. Você perdeu!')
        }

        const cartaRetirada = this.cartas.pop()!

        this.descarte.push(cartaRetirada)

        return cartaRetirada
    }

    embaralharCartas() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]]
        }
    }

    getCartas() {
        return [...this.cartas]
    }

    descartarCarta(carta: Carta) {
        this.descarte.push(carta)
    }

    getDescarte() {
        return this.descarte
    }
}

export class BaralhoJogo extends Baralho {
    constructor(cidades: Cidade[]) {
        super()

        const cartasCidade = cidades.map(
            cidade => new CartaCidade(cidade.getNome(), cidade.getCor()),
        )

        const cartasEvento = [
            new TransporteAereo(),
            new UmaNoiteTranquila(),
            new Prognostico(),
            new FinanciamentoGovernamental(),
            new RecursoExtra(),
        ]

        const cartas = [...cartasCidade, ...cartasEvento]

        cartas.forEach(carta => this.adicionarCarta(carta))

        this.embaralharCartas()
    }

    definirDificuldade(dificuldade: DIFICULDADE_ENUM) {
        const epidemiaPorDificuldade = {
            [DIFICULDADE_ENUM.FACIL]: 4,
            [DIFICULDADE_ENUM.NORMAL]: 5,
            [DIFICULDADE_ENUM.HEROICO]: 6,
        } as const

        const quantidadeEpidemias = epidemiaPorDificuldade[dificuldade]

        const cartasEpidemia = Array.from(
            { length: quantidadeEpidemias },
            () => new CartaEpidemia(),
        )

        cartasEpidemia.forEach(carta => this.adicionarCarta(carta))

        this.embaralharCartas()
    }
}

export class BaralhoInfeccao extends Baralho {
    private velocidadeInfeccao: number // TODO: assim não dá

    constructor(cidades: Cidade[]) {
        super()

        const cartasInfeccao = cidades.map(
            cidade => new CartaInfeccao(cidade.getNome(), cidade.getCor()),
        )

        cartasInfeccao.forEach(carta => this.adicionarCarta(carta))

        this.embaralharCartas()

        this.velocidadeInfeccao = 2
    }

    getVelocidadeInfeccao() {
        return this.velocidadeInfeccao
    }
}
