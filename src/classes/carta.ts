export abstract class Carta {}

export abstract class CartaJogador extends Carta {}

export enum COR_ENUM {
    AMARELO = 'AMARELO',
    AZUL = 'AZUL',
    PRETO = 'PRETO',
    VERMELHO = 'VERMELHO',
}

export class CartaCidade extends CartaJogador {
    private nome: string
    private cor: COR_ENUM

    constructor(nome: string, cor: COR_ENUM) {
        super()

        this.nome = nome
        this.cor = cor
    }
}

export class CartaEpidemia extends CartaJogador {}

export abstract class CartaEvento extends CartaJogador {}

export class TransporteAereo extends CartaEvento {}
