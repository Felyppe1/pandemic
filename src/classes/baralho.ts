import { cidades } from '../dados/cidades'
import {
    Carta,
    CartaCidade,
    CartaEpidemia,
    FinanciamentoGovernamental,
    Prognostico,
    RecursoExtra,
    TransporteAereo,
    UmaNoiteTranquila,
} from './carta'
import { DIFICULDADE_ENUM } from './jogo'

export abstract class Baralho {
    private cartas: Carta[]

    constructor() {
        this.cartas = []
    }

    adicionarCarta(carta: Carta) {
        this.cartas.push(carta)
    }

    retirarCarta(): Carta {
        console.log(this.cartas.length)
        if (this.cartas.length <= 2) {
            throw new Error('O jogo acabou. Você perdeu!')
        }

        return this.cartas.pop()!
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
}

export class BaralhoJogo extends Baralho {
    constructor() {
        super()

        const cartasCidade = cidades.map(
            cidade => new CartaCidade(cidade.nome, cidade.cor),
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

export class BaralhoInfeccao extends Baralho {}
