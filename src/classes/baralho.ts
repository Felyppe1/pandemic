import {
    Carta,
    CartaCidade,
    CartaEpidemia,
    CartaEvento,
    CartaInfeccao,
    CartaJogador,
    CartaToObject,
    FinanciamentoGovernamental,
    Prognostico,
    RecursoExtra,
    TransporteAereo,
    UmaNoiteTranquila,
} from './carta'
import { Cidade, NomeCidade } from './cidade'
import { DIFICULDADE_ENUM } from './jogo'

/*
 * Baralho de infecção interage com descartes:
 * - Carta de evento Prognóstico: olha as 6 primeiras cartas do descarte de infecção, reordena e as adiciona no topo do baralho
 * - Carta de epidemia: embaralha as cartas do descarte de infecção e adiciona no topo do baralho de infecção
 *
 * Baralho de jogador interage com descartes:
 * - Personagem Especialista em planos de contingência: escolher uma carta de evento do descarte de jogador e colocar na mão
 */
export abstract class Baralho {
    protected cartas: Carta[]
    protected descartes: Carta[]

    constructor(cartas: Carta[]) {
        this.cartas = Baralho.embaralhar(cartas)
        this.descartes = []
    }

    abstract comprarCarta(): Carta

    descartar(carta: Carta) {
        this.descartes.push(carta)
    }

    static embaralhar(cartas: Carta[]) {
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[cartas[i], cartas[j]] = [cartas[j], cartas[i]]
        }

        return cartas
    }
}

export interface BaralhoJogadorToObject {
    cartas: CartaToObject[]
    descartes: CartaToObject[]
}

export class BaralhoJogador extends Baralho {
    constructor(cidades: Cidade[]) {
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

        super([...cartasCidade, ...cartasEvento])
    }

    comprarCarta(): CartaJogador {
        if (this.cartas.length === 0) {
            throw new Error('As cartas do baralho do jogador acabaram')
        }

        const cartaRetirada = this.cartas.pop()!

        return cartaRetirada
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

        this.cartas.push(...cartasEpidemia)

        this.cartas = Baralho.embaralhar(this.cartas)
    }

    comprarUmaCartaDeFuncao(nomeEvento: string) {
        const cartaEvento = this.descartes.find(
            carta =>
                carta instanceof CartaEvento && carta.getNome() === nomeEvento,
        )

        if (!cartaEvento) {
            throw new Error('Carta de evento não encontrada no descarte')
        }

        this.descartes = this.descartes.filter(
            descarte => descarte !== cartaEvento,
        )

        return cartaEvento as CartaEvento
    }

    toObject() {
        return {
            cartas: this.cartas.map(carta => carta.toObject()),
            descartes: this.descartes.map(carta => carta.toObject()),
        }
    }
}

export interface BaralhoInfeccaoToObject {
    cartas: CartaToObject[]
    descartes: CartaToObject[]
    listaVelocidadeInfeccao: number[]
    indiceVelocidadeInfeccao: number
}

export class BaralhoInfeccao extends Baralho {
    private listaVelocidadeInfeccao: number[]
    private indiceVelocidadeInfeccao: number

    constructor(cidades: Cidade[]) {
        const cartasInfeccao = cidades.map(
            cidade => new CartaInfeccao(cidade.getNome(), cidade.getCor()),
        )

        super(cartasInfeccao)

        this.listaVelocidadeInfeccao = [2, 2, 2, 3, 3, 4, 4]
        this.indiceVelocidadeInfeccao = 0
    }

    comprarCarta(): Carta {
        const cartaRetirada = this.cartas.pop()!

        return cartaRetirada
    }

    comprarCartaDoFundo() {
        return this.cartas[0] as CartaInfeccao
    }

    reordenarSeisPrimeirasCartasDeDescarteEAdicionarNoBaralho(
        cartasReordenadas: NomeCidade[],
    ) {
        if (cartasReordenadas.length > 6) {
            throw new Error(
                'A quantidade de cartas reordenadas não pode ser maior que 6',
            )
        }

        const nomeDasCartas = this.descartes.map(descarte => {
            if (descarte instanceof CartaInfeccao) {
                return descarte.getNome()
            }
        })

        const cartaInfeccaoNaoEncontrada = cartasReordenadas.find(
            cartaInfeccao => !nomeDasCartas.includes(cartaInfeccao),
        )

        if (cartaInfeccaoNaoEncontrada) {
            throw new Error(
                `A carta de infecção ${cartaInfeccaoNaoEncontrada} não está no descarte`,
            )
        }

        const quantidade = cartasReordenadas.length
        const cartasRemovidas = this.descartes.splice(
            -quantidade,
            quantidade,
        ) as CartaInfeccao[]

        const instanciasReordenadas = cartasReordenadas.map(
            nome => cartasRemovidas.find(c => c.getNome() === nome)!,
        )

        this.cartas.push(...instanciasReordenadas)
    }

    intensificar() {
        Baralho.embaralhar(this.descartes)

        this.cartas.push(...this.descartes)
    }

    aumentarVelocidadeInfeccao() {
        if (
            this.indiceVelocidadeInfeccao ===
            this.listaVelocidadeInfeccao.length - 1
        )
            return

        this.indiceVelocidadeInfeccao += 1
    }

    getVelocidadeInfeccao() {
        return this.listaVelocidadeInfeccao[this.indiceVelocidadeInfeccao]
    }

    toObject() {
        return {
            cartas: this.cartas.map(carta => carta.toObject()),
            descartes: this.descartes.map(carta => carta.toObject()),
            listaVelocidadeInfeccao: this.listaVelocidadeInfeccao,
            indiceVelocidadeInfeccao: this.indiceVelocidadeInfeccao,
        }
    }
}
