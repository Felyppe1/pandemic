import { BaralhoInfeccao, BaralhoJogador } from './baralho'
import { CartaEvento } from './carta'

export type NomePersonagem =
    | 'Especialista em Planos de Contingência'
    | 'Agente de Viagens'
    | 'Médico'
    | 'Especialista em Operações'
    | 'Especialista em Quarentena'
    | 'Pesquisadora'
    | 'Cientista'

export interface PersonagemToObject {
    nome: NomePersonagem
}

export class Personagem {
    private nome: NomePersonagem

    constructor(nome: NomePersonagem) {
        this.nome = nome
    }

    getNome() {
        return this.nome
    }

    toObject() {
        return {
            nome: this.nome,
        }
    }
}

export interface EspecialistaContingenciaToObject {
    cartaFuncao: {
        tipo: string
        nome: string
    } | null
    nome: NomePersonagem
}

export class EspecialistaContingencia extends Personagem {
    private cartaFuncao: CartaEvento | null

    constructor() {
        super('Especialista em Planos de Contingência')

        this.cartaFuncao = null
    }

    comprarCartaDeFuncao(nomeEvento: string, baralhoJogador: BaralhoJogador) {
        if (this.cartaFuncao) {
            throw new Error('Já possui uma carta de função')
        }

        const cartaEvento = baralhoJogador.comprarCartaDeFuncao(nomeEvento)

        this.cartaFuncao = cartaEvento
    }

    toObject(): EspecialistaContingenciaToObject {
        return {
            ...super.toObject(),
            cartaFuncao: this.cartaFuncao ? this.cartaFuncao.toObject() : null,
        }
    }
}
