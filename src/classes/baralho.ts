import {
    Carta,
    CartaCidade,
    CartaEpidemia,
    CartaJogador,
    COR_ENUM,
    TransporteAereo,
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
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]]
        }
    }

    getCartas() {
        return [...this.cartas]
    }
}

export class BaralhoJogo extends Baralho {
    constructor(dificuldade: DIFICULDADE_ENUM) {
        super()

        const cartasCidade = cidades.map(cidade =>
            new CartaCidade(cidade.nome, cidade.cor),
        )

        let cartasEpidemia: CartaJogador[] = []

        while (true) {
            cartasEpidemia.push(new CartaEpidemia())

            if (
                dificuldade === DIFICULDADE_ENUM.FACIL &&
                cartasEpidemia.length === 4
            ) {
                break
            }

            if (
                dificuldade === DIFICULDADE_ENUM.NORMAL &&
                cartasEpidemia.length === 5
            ) {
                break
            }

            if (
                dificuldade === DIFICULDADE_ENUM.HEROICO &&
                cartasEpidemia.length === 6
            ) {
                break
            }
        }

        const cartasEvento = [new TransporteAereo()]

        const cartas = [...cartasCidade, ...cartasEpidemia, ...cartasEvento]

        cartas.forEach(carta => this.adicionarCarta(carta))

        this.embaralharCartas()
    }
}

export class BaralhoInfeccao extends Baralho {}

const cidades = [
    { nome: 'San Francisco', cor: COR_ENUM.AZUL },
    { nome: 'Chicago', cor: COR_ENUM.AZUL },
    { nome: 'Atlanta', cor: COR_ENUM.AZUL },
    { nome: 'Montreal', cor: COR_ENUM.AZUL },
    { nome: 'New York', cor: COR_ENUM.AZUL },
    { nome: 'Washington', cor: COR_ENUM.AZUL },
    { nome: 'Madrid', cor: COR_ENUM.AZUL },
    { nome: 'London', cor: COR_ENUM.AZUL },
    { nome: 'Paris', cor: COR_ENUM.AZUL },
    { nome: 'Essen', cor: COR_ENUM.AZUL },
    { nome: 'Milan', cor: COR_ENUM.AZUL },
    { nome: 'St. Petersburg', cor: COR_ENUM.AZUL },

    { nome: 'Los Angeles', cor: COR_ENUM.AMARELO },
    { nome: 'Mexico City', cor: COR_ENUM.AMARELO },
    { nome: 'Miami', cor: COR_ENUM.AMARELO },
    { nome: 'Bogotá', cor: COR_ENUM.AMARELO },
    { nome: 'Lima', cor: COR_ENUM.AMARELO },
    { nome: 'Santiago', cor: COR_ENUM.AMARELO },
    { nome: 'Buenos Aires', cor: COR_ENUM.AMARELO },
    { nome: 'São Paulo', cor: COR_ENUM.AMARELO },
    { nome: 'Lagos', cor: COR_ENUM.AMARELO },
    { nome: 'Kinshasa', cor: COR_ENUM.AMARELO },
    { nome: 'Johannesburg', cor: COR_ENUM.AMARELO },
    { nome: 'Khartoum', cor: COR_ENUM.AMARELO },

    { nome: 'Algiers', cor: COR_ENUM.PRETO },
    { nome: 'Cairo', cor: COR_ENUM.PRETO },
    { nome: 'Istanbul', cor: COR_ENUM.PRETO },
    { nome: 'Baghdad', cor: COR_ENUM.PRETO },
    { nome: 'Tehran', cor: COR_ENUM.PRETO },
    { nome: 'Moscow', cor: COR_ENUM.PRETO },
    { nome: 'Riyadh', cor: COR_ENUM.PRETO },
    { nome: 'Karachi', cor: COR_ENUM.PRETO },
    { nome: 'Delhi', cor: COR_ENUM.PRETO },
    { nome: 'Mumbai', cor: COR_ENUM.PRETO },
    { nome: 'Chennai', cor: COR_ENUM.PRETO },
    { nome: 'Kolkata', cor: COR_ENUM.PRETO },

    { nome: 'Beijing', cor: COR_ENUM.VERMELHO },
    { nome: 'Seoul', cor: COR_ENUM.VERMELHO },
    { nome: 'Tokyo', cor: COR_ENUM.VERMELHO },
    { nome: 'Shanghai', cor: COR_ENUM.VERMELHO },
    { nome: 'Osaka', cor: COR_ENUM.VERMELHO },
    { nome: 'Taipei', cor: COR_ENUM.VERMELHO },
    { nome: 'Hong Kong', cor: COR_ENUM.VERMELHO },
    { nome: 'Bangkok', cor: COR_ENUM.VERMELHO },
    { nome: 'Manila', cor: COR_ENUM.VERMELHO },
    { nome: 'Ho Chi Minh City', cor: COR_ENUM.VERMELHO },
    { nome: 'Jakarta', cor: COR_ENUM.VERMELHO },
    { nome: 'Sydney', cor: COR_ENUM.VERMELHO },
] as const
