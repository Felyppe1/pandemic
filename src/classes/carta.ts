import { COR_ENUM, NomeCidade } from './cidade'

export abstract class Carta {}

export class CartaInfeccao extends Carta {
    private nome: NomeCidade
    private cor: COR_ENUM

    constructor(nome: NomeCidade, cor: COR_ENUM) {
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

export abstract class CartaJogador extends Carta {}

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
    private nome: string
    private descricao: string

    constructor(nome: string, descricao: string) {
        super()

        this.nome = nome
        this.descricao = descricao
    }

    getDescricao() {
        return this.descricao
    }

    getNome() {
        return this.nome
    }
}

export class TransporteAereo extends CartaEvento {
    constructor() {
        super(
            'Transporte Aéreo',
            'Mova qualquer peão para qualquer cidade (com permissão do dono do peão).',
        )
    }
}
export class UmaNoiteTranquila extends CartaEvento {
    constructor() {
        super(
            'Uma Noite Tranquila',
            'Pule a próxima fase de infecção (não revele cartas de infecção).',
        )
    }
}
export class Prognostico extends CartaEvento {
    constructor() {
        super(
            'Prognóstico',
            'Compre, olhe e reorganize as 6 cartas do topo do baralho de infecção.',
        )
    }
}
export class FinanciamentoGovernamental extends CartaEvento {
    constructor() {
        super(
            'Financiamento Governamental',
            'Adicione 1 centro de pesquisa a qualquer cidade (não precisa descartar carta).',
        )
    }
}
export class RecursoExtra extends CartaEvento {
    constructor() {
        super(
            'Recurso Extra',
            'Um jogador pode jogar fora até 2 cartas da mão e comprar o mesmo número de cartas do topo do baralho de jogador.',
        )
    }
}
