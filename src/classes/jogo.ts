// import * as readline from 'readline'
import { BaralhoJogo } from './baralho'
import { Mapa } from './mapa'
import { Jogador } from './jogador'
import { escolherPersonagemAleatoriamente } from './personagem'
import { Carta } from './carta'

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

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
    private baralhoJogador: BaralhoJogo
    private mapa: Mapa
    private dificuldade: DIFICULDADE_ENUM
    private indiceJogadorAtual: number

    constructor(qtdJogadores: number, dificuldade: DIFICULDADE_ENUM) {
        this.dificuldade = dificuldade

        this.mapa = new Mapa()

        this.baralhoJogador = new BaralhoJogo()

        const numeroCartas = cartasPorJogador[qtdJogadores] ?? 2

        this.jogadores = Array.from({ length: qtdJogadores }).map(_ => {
            const cartas = Array.from({ length: numeroCartas }).map(_ =>
                this.baralhoJogador.retirarCarta(),
            )

            return new Jogador(
                cartas,
                escolherPersonagemAleatoriamente(),
                this.mapa.retornarCidade('Atlanta')!,
            )
        })

        this.baralhoJogador.definirDificuldade(dificuldade)

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
}
