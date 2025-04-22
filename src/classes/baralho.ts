import {
    Carta,
    CartaCidade,
    CartaEpidemia,
    CartaEvento,
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
    private descartes: Carta[]

    constructor() {
        this.cartas = []
        this.descartes = []
    }

    adicionarCarta(carta: Carta) {
        this.cartas.push(carta)
    }

    adicionarDescarte(carta: Carta) {
        this.descartes.push(carta)
    }

    retirarCarta(): Carta {
        const cartaRetirada = this.cartas.pop()!

        return cartaRetirada
    }

    retirarDescarte(): Carta {
        const descarteRetirado = this.descartes.pop()!

        return descarteRetirado
    }

    embaralharCartas() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]]
        }
    }

    setDescartes(descartes: Carta[]) {
        this.descartes = descartes
    }

    getCartas() {
        return [...this.cartas]
    }

    getDescartes() {
        return this.descartes
    }
}

export class BaralhoJogador extends Baralho {
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

    retirarDescarteEspecifico(descarte: CartaEvento): CartaEvento {
        const descarteEncontrado = super
            .getDescartes()
            .find(d => d !== descarte)

        if (!descarteEncontrado) {
            throw new Error('Carta não encontrada no descarte')
        }

        super.setDescartes(
            super
                .getDescartes()
                .filter(descarte => descarte !== descarteEncontrado),
        )

        return descarteEncontrado as CartaEvento
    }
}

export class BaralhoInfeccao extends Baralho {
    private listaVelocidadeInfeccao: number[]
    private indiceVelocidadeInfeccao: number

    constructor(cidades: Cidade[]) {
        super()

        const cartasInfeccao = cidades.map(
            cidade => new CartaInfeccao(cidade.getNome(), cidade.getCor()),
        )

        cartasInfeccao.forEach(carta => this.adicionarCarta(carta))

        this.embaralharCartas()

        this.listaVelocidadeInfeccao = [2, 2, 2, 3, 3, 4, 4]
        this.indiceVelocidadeInfeccao = 0
    }

    getVelocidadeInfeccao() {
        return this.listaVelocidadeInfeccao[this.indiceVelocidadeInfeccao]
    }
}
