import { CuboDoenca } from './cubo-doenca'
import { Jogador } from './jogador'

export class Cidade {
    private nome: NomeCidade
    private cor: COR_ENUM
    private cubosDoenca: Map<COR_ENUM, number>
    private temCentro: boolean
    private conexoes: Cidade[]
    private jogadores: Jogador[]

    constructor(nome: NomeCidade, cor: COR_ENUM) {
        this.nome = nome
        this.cor = cor
        this.conexoes = []
        this.cubosDoenca = new Map()
        this.temCentro = false
        this.jogadores = []
    }

    adicionarConexao(cidade: Cidade) {
        if (!this.conexoes.includes(cidade)) {
            this.conexoes.push(cidade)
            cidade.conexoes.push(this)
        }
    }

    getNome() {
        return this.nome
    }

    getCor() {
        return this.cor
    }

    getConexoes() {
        return this.conexoes
    }

    adicionarCentroPesquisa() {
        if (this.temCentro) {
            throw new Error('Cidade já tem centro de pesquisa')
        }

        this.temCentro = true
    }

    adicionarCubos(cuboDoenca: CuboDoenca, quantidade: number) {
        cuboDoenca.getCubos(quantidade)

        const quantidadeAtual = this.cubosDoenca.get(cuboDoenca.getCor())!

        if (quantidadeAtual + quantidade > 3) {
            this.conexoes.forEach(cidade => {
                cidade.adicionarCubos(cuboDoenca, 1)
            })

            return
        }

        this.cubosDoenca.set(cuboDoenca.getCor(), quantidade)
    }

    adicionarJogador(jogador: Jogador) {
        this.jogadores.push(jogador)
    }

    temCentroPesquisa() {
        return this.temCentro
    }

    getCubosDoenca() {
        return this.cubosDoenca
    }
}

export enum COR_ENUM {
    AMARELO = 'AMARELO',
    AZUL = 'AZUL',
    PRETO = 'PRETO',
    VERMELHO = 'VERMELHO',
}

export enum CIDADE_ENUM {
    SAN_FRANCISCO = 'San Francisco',
    CHICAGO = 'Chicago',
    ATLANTA = 'Atlanta',
    MONTREAL = 'Montreal',
    NEW_YORK = 'New York',
    WASHINGTON = 'Washington',
    MADRID = 'Madrid',
    LONDON = 'London',
    PARIS = 'Paris',
    ESSEN = 'Essen',
    MILAN = 'Milan',
    ST_PETERSBURG = 'St. Petersburg',

    LOS_ANGELES = 'Los Angeles',
    MEXICO_CITY = 'Mexico City',
    MIAMI = 'Miami',
    BOGOTA = 'Bogotá',
    LIMA = 'Lima',
    SANTIAGO = 'Santiago',
    BUENOS_AIRES = 'Buenos Aires',
    SAO_PAULO = 'São Paulo',
    LAGOS = 'Lagos',
    KINSHASA = 'Kinshasa',
    JOHANNESBURG = 'Johannesburg',

    ALGIERS = 'Algiers',
    CAIRO = 'Cairo',
    ISTANBUL = 'Istanbul',
    BAGHDAD = 'Baghdad',
    TEHRAN = 'Tehran',
    MOSCOW = 'Moscow',
    RIYADH = 'Riyadh',
    KARACHI = 'Karachi',
    DELHI = 'Delhi',
    MUMBAI = 'Mumbai',
    CHENNAI = 'Chennai',
    KOLKATA = 'Kolkata',

    BEIJING = 'Beijing',
    SEOUL = 'Seoul',
    TOKYO = 'Tokyo',
    SHANGHAI = 'Shanghai',
    OSAKA = 'Osaka',
    TAIPEI = 'Taipei',
    HONG_KONG = 'Hong Kong',
    BANGKOK = 'Bangkok',
    MANILA = 'Manila',
    HO_CHI_MINH_CITY = 'Ho Chi Minh City',
    JAKARTA = 'Jakarta',
    SYDNEY = 'Sydney',
}

export type NomeCidade =
    | 'San Francisco'
    | 'Chicago'
    | 'Atlanta'
    | 'Montreal'
    | 'New York'
    | 'Washington'
    | 'Madrid'
    | 'London'
    | 'Paris'
    | 'Essen'
    | 'Milan'
    | 'St. Petersburg'
    | 'Los Angeles'
    | 'Mexico City'
    | 'Miami'
    | 'Bogotá'
    | 'Lima'
    | 'Santiago'
    | 'Buenos Aires'
    | 'São Paulo'
    | 'Lagos'
    | 'Kinshasa'
    | 'Johannesburg'
    | 'Algiers'
    | 'Cairo'
    | 'Istanbul'
    | 'Baghdad'
    | 'Tehran'
    | 'Moscow'
    | 'Riyadh'
    | 'Karachi'
    | 'Delhi'
    | 'Mumbai'
    | 'Chennai'
    | 'Kolkata'
    | 'Beijing'
    | 'Seoul'
    | 'Tokyo'
    | 'Shanghai'
    | 'Osaka'
    | 'Taipei'
    | 'Hong Kong'
    | 'Bangkok'
    | 'Manila'
    | 'Ho Chi Minh City'
    | 'Jakarta'
    | 'Sydney'
