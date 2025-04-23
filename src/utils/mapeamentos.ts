import { Cor, Personagem } from '../types'

export const mapeamentoCor: Record<Cor, string> = {
    azul: 'bg-blue-400',
    preto: 'bg-neutral-700',
    vermelho: 'bg-red-500',
    amarelo: 'bg-yellow-400',
}

export const mapeamentoCorPersonagens: Record<Personagem, string> = {
    'Agente de Viagens': 'bg-[#d187f5]',
    Médico: 'bg-[#f9943b]',
    Cientista: 'bg-[#adadad]',
    Pesquisadora: 'bg-[#c5b08c]',
    'Especialista em Operações': 'bg-[#7cc66c]',
    'Especialista em Quarentena': 'bg-[#006400]',
    'Especialista em Planos de Contingência': 'bg-[#4fbfff]',
}

export const mapeamentoFotoPersonagens: Record<Personagem, string> = {
    'Agente de Viagens': '/rosto/agente-viagens.png',
    Médico: '/rosto/medico.png',
    Cientista: '/rosto/cientista.png',
    Pesquisadora: '/rosto/pesquisadora.png',
    'Especialista em Operações': '/rosto/especialista-operacoes.png',
    'Especialista em Quarentena': '/rosto/especialista-quarentena.png',
    'Especialista em Planos de Contingência':
        '/rosto/especialista-contingencia.png',
}
