import { COR_ENUM, NomeCidade } from './cidade'

export interface CartaToObject {
    tipo: string
}

export abstract class Carta {
    abstract toObject(): CartaToObject
}

export interface CartaInfeccaoToObject {
    tipo: string
    nome: NomeCidade
    cor: COR_ENUM
}

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

    toObject(): CartaInfeccaoToObject {
        return {
            tipo: 'carta infeccao',
            nome: this.nome,
            cor: this.cor,
        }
    }
}

export abstract class CartaJogador extends Carta {}

export interface CartaCidadeToObject {
    tipo: string
    nome: NomeCidade
    cor: COR_ENUM
}

export class CartaCidade extends CartaJogador {
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

    toObject(): CartaCidadeToObject {
        return {
            tipo: 'carta cidade',
            nome: this.nome,
            cor: this.cor,
        }
    }
}

export interface CartaEpidemiaToObject {
    tipo: string
}

export class CartaEpidemia extends CartaJogador {
    toObject(): CartaEpidemiaToObject {
        return {
            tipo: 'carta epidemia',
        }
    }
}

export interface CartaEventoToObject {
    tipo: string
    nome: string
}

export abstract class CartaEvento extends CartaJogador {
    private nome: string

    constructor(nome: string) {
        super()

        this.nome = nome
    }

    getNome() {
        return this.nome
    }

    toObject(): CartaEventoToObject {
        return {
            tipo: 'carta evento',
            nome: this.nome,
        }
    }
}

export class TransporteAereo extends CartaEvento {
    constructor() {
        super(
            'Transporte Aéreo',
            // 'Mova qualquer peão para qualquer cidade (com permissão do dono do peão).',
        )
    }
}
export class UmaNoiteTranquila extends CartaEvento {
    constructor() {
        super(
            'Uma Noite Tranquila',
            // 'Pule a próxima fase de infecção (não revele cartas de infecção).',
        )
    }
}
export class Prognostico extends CartaEvento {
    constructor() {
        super(
            'Prognóstico',
            // 'Compre, olhe e reorganize as 6 cartas do topo do baralho de infecção.',
        )
    }
}
export class FinanciamentoGovernamental extends CartaEvento {
    constructor() {
        super(
            'Financiamento Governamental',
            // 'Adicione 1 centro de pesquisa a qualquer cidade (não precisa descartar carta).',
        )
    }
}
export class RecursoExtra extends CartaEvento {
    constructor() {
        super(
            'Recurso Extra',
            // 'Um jogador pode jogar fora até 2 cartas da mão e comprar o mesmo número de cartas do topo do baralho de jogador.',
        )
    }
}
