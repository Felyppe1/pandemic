export abstract class Personagem {
    private nome: string
    private descricao: string

    constructor(nome: string, descricao: string) {
        this.nome = nome
        this.descricao = descricao
    }

    getNome() {
        return this.nome
    }

    getDescricao() {
        return this.descricao
    }
}

export class EspecialistaContingencia extends Personagem {
    constructor() {
        super(
            'ESPECIALISTA EM PLANOS DE CONTINGÊNCIA',
            'O Especialista em Planos de Contingência pode, como uma ação, pegar uma Carta de Evento da Pilha de Descarte de Jogador e colocá-la na sua Carta de Função. Apenas 1 Carta de Evento pode estar na Carta de Função a qualquer momento. Ela não conta para o limite da mão.\nQuando o Especialista em Planos de Contingência jogar a Carta de Evento de sua Carta de Função, remova essa Carta de Evento do jogo (em vez de descartá-la).',
        )
    }
}
export class AgenteViagens extends Personagem {
    constructor() {
        super(
            'AGENTE DE VIAGENS',
            'O Agente de Viagens pode, como uma ação:\n• mover qualquer peão, se o dono dele concordar, para qualquer cidade que tenha outro peão, ou\n• mover o peão de outro jogador, com o consentimento deste, como se fosse o seu.\n\nO Agente de Viagens só pode mover os peões de outros jogadores; ele não pode fazer outras ações com eles, tal como Tratar uma Doença.',
        )
    }
}
export class Medico extends Personagem {
    constructor() {
        super(
            'MÉDICO',
            'O Médico remove todos os cubos da mesma cor, e não apenas 1, ao realizar a ação de Tratar uma Doença.\n\nSe uma doença já tem cura, ele remove automaticamente todos os cubos da cor dela ao simplesmente entrar na cidade ou estar nela. Isso não custa uma ação.\n\nO Médico também evita a colocação de cubos de doença (e surtos) de doenças com cura na sua cidade.',
        )
    }
}
export class EspecialistaOperacoes extends Personagem {
    constructor() {
        super(
            'ESPECIALISTA EM OPERAÇÕES',
            'O Especialista em Operações pode, como uma ação:\n• construir um Centro de Pesquisa em sua cidade atual sem descartar (ou usar) uma Carta de Cidade, ou\n• uma vez por turno, se mover de um Centro de Pesquisa para qualquer cidade, bastando descartar qualquer Carta de Cidade.\n\nO Agente de Viagens não pode usar a habilidade de movimento especial do Especialista em Operações ao mover o peão dele.',
        )
    }
}
export class EspecialistaQuarentena extends Personagem {
    constructor() {
        super(
            'ESPECIALISTA EM QUARENTENA',
            'A Especialista em Quarentena evita surtos e a colocação de cubos de doença na cidade onde estiver e em todas as cidades conectadas a essa cidade. Ela não afeta cubos colocados durante a preparação.',
        )
    }
}
export class Pesquisadora extends Personagem {
    constructor() {
        super(
            'PESQUISADORA',
            'Ao realizar a ação de Compartilhar Conhecimento, a Pesquisadora pode dar qualquer Carta de Cidade da sua mão para outro jogador na mesma cidade; a carta não precisa corresponder à cidade. A transferência tem que ser da mão dela para a de outro jogador, mas pode ocorrer no turno de qualquer um dos dois jogadores.',
        )
    }
}
export class Cientista extends Personagem {
    constructor() {
        super(
            'CIENTISTA',
            'A Cientista só precisa de 4 (e não 5) Cartas de Cidade da mesma cor para Descobrir uma Cura para a doença da cor correspondente.',
        )
    }
}

export const personagens = [
    new EspecialistaContingencia(),
    new AgenteViagens(),
    new Medico(),
    new EspecialistaOperacoes(),
    new EspecialistaQuarentena(),
    new Pesquisadora(),
    new Cientista(),
]

export function escolherPersonagemAleatoriamente() {
    if (personagens.length === 0) {
        throw new Error('Não há mais personagens disponíveis.')
    }

    const indiceAleatorio = Math.floor(Math.random() * personagens.length)

    return personagens.splice(indiceAleatorio, 1)[0]
}
