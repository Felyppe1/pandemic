export type Personagem =
    | 'Agente de Viagens'
    | 'Médico'
    | 'Cientista'
    | 'Pesquisadora'
    | 'Especialista em Operações'
    | 'Especialista em Quarentena'
    | 'Especialista em Planos de Contingência'

export type Cor = 'azul' | 'preto' | 'vermelho' | 'amarelo'

export type TipoCarta =
    | 'carta evento'
    | 'carta cidade'
    | 'carta epidemia'
    | 'carta infeccao'

export type Carta = {
    nome: string
    tipo: TipoCarta
    cor?: Cor
}

export type Acao =
    | 'balsa'
    | 'voo direto'
    | 'voo fretado'
    | 'ponte aerea'
    | 'tratar doenca'
    | 'construir centro pesquisa'
    | 'compartilhar conhecimento'
    | 'descobrir cura'

export enum COR_ENUM {
    AMARELO = 'AMARELO',
    AZUL = 'AZUL',
    PRETO = 'PRETO',
    VERMELHO = 'VERMELHO',
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
