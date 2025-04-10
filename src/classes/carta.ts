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

    getNome() {
        return this.nome
    }

    getCor() {
        return this.cor
    }
}

export class CartaEpidemia extends CartaJogador {}

export abstract class CartaEvento extends CartaJogador {
    private descricao: string

    constructor(descricao: string) {
        super()

        this.descricao = descricao
    }

    getDescricao() {
        return this.descricao
    }
}

export class TransporteAereo extends CartaEvento {
    constructor() {
        super(
            'Mova qualquer peão para qualquer cidade (com permissão do dono do peão).',
        )
    }
}
export class UmaNoiteTranquila extends CartaEvento {
    constructor() {
        super(
            'Pule a próxima fase de infecção (não revele cartas de infecção).',
        )
    }
}
export class Prognostico extends CartaEvento {
    constructor() {
        super(
            'Compre, olhe e reorganize as 6 cartas do topo do baralho de infecção.',
        )
    }
}
export class FinanciamentoGovernamental extends CartaEvento {
    constructor() {
        super(
            'Adicione 1 centro de pesquisa a qualquer cidade (não precisa descartar carta).',
        )
    }
}
export class RecursoExtra extends CartaEvento {
    constructor() {
        super(
            'Um jogador pode jogar fora até 2 cartas da mão e comprar o mesmo número de cartas do topo do baralho de jogador.',
        )
    }
}
