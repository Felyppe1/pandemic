import { COR_ENUM } from './carta'

export class Cidade {
    private nome: string
    private cor: COR_ENUM
    private cubosDoenca: Map<COR_ENUM, number>
    private temCentro: boolean
    private conexoes: Cidade[]

    constructor(nome: string, cor: COR_ENUM) {
        this.nome = nome
        this.cor = cor
        this.conexoes = []
        this.cubosDoenca = new Map()
        this.temCentro = false
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
