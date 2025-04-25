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
    | 'contruir centro pesquisa'
    | 'compartilhar conhecimento'
    | 'descobrir cura'

export enum COR_ENUM {
    AMARELO = 'AMARELO',
    AZUL = 'AZUL',
    PRETO = 'PRETO',
    VERMELHO = 'VERMELHO',
}
