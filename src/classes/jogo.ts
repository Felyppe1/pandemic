import { Jogador } from './jogador'
import { escolherPersonagemAleatoriamente } from './personagem'
import { Tabuleiro } from './tabuleiro'

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
    private dificuldade: DIFICULDADE_ENUM
    private indiceJogadorAtual: number
    private acoesRestantes: number
    private tabuleiro: Tabuleiro

    constructor(qtdJogadores: number, dificuldade: DIFICULDADE_ENUM) {
        this.dificuldade = dificuldade

        this.tabuleiro = new Tabuleiro(this.dificuldade)

        const numeroCartas = cartasPorJogador[qtdJogadores] ?? 2

        this.jogadores = Array.from({ length: qtdJogadores }).map(_ => {
            const cartas = Array.from({ length: numeroCartas }).map(_ =>
                this.tabuleiro.getBaralhoJogador().retirarCarta(),
            )

            return new Jogador(
                cartas,
                escolherPersonagemAleatoriamente(),
                this.tabuleiro.getCidade('Atlanta'),
            )
        })

        this.indiceJogadorAtual = 0
        this.acoesRestantes = 4
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

    proximoJogador() {
        this.indiceJogadorAtual =
            ((this.indiceJogadorAtual + 1) % this.jogadores.length) - 1
    }
}
