import { Doenca } from './doenca'
import { Jogador } from './jogador'
import { NomePersonagem } from './personagem'

export interface CidadeToObject {
    nome: NomeCidade
    cor: COR_ENUM
    temCentro: boolean
    cubosDoenca: Record<COR_ENUM, number>
    jogadores: NomePersonagem[]
    conexoes: NomeCidade[]
}

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
        this.cubosDoenca = new Map(Object.values(COR_ENUM).map(cor => [cor, 0]))
        this.temCentro = false
        this.jogadores = []
    }

    adicionarConexao(cidade: Cidade) {
        if (!this.conexoes.includes(cidade)) {
            this.conexoes.push(cidade)
            cidade.conexoes.push(this)
        }
    }

    buscarCidadeConectada(cidade: Cidade) {
        return this.conexoes.find(conexao => conexao === cidade)
    }

    getNome() {
        return this.nome
    }

    getCor() {
        return this.cor
    }

    adicionarCentroPesquisa() {
        if (this.temCentro) {
            throw new Error('Cidade já tem centro de pesquisa')
        }

        this.temCentro = true
    }

    adicionarCubo(
        doenca: Doenca,
        cidadesQueJaSofreramSurto = new Set<Cidade>(),
    ) {
        if (doenca.getEstaErradicado()) {
            throw new Error('Doença erradicada')
        }

        const quantidadeAtual = this.cubosDoenca.get(doenca.getCor())!

        if (quantidadeAtual === 3) {
            if (cidadesQueJaSofreramSurto.has(this)) return true

            cidadesQueJaSofreramSurto.add(this)

            this.conexoes.forEach(cidade => {
                cidade.adicionarCubo(doenca, cidadesQueJaSofreramSurto)
            })

            return true
        }

        doenca.retirarCubos(1)

        this.cubosDoenca.set(doenca.getCor(), quantidadeAtual + 1)

        return false
    }

    tratarDoencas(doenca: Doenca) {
        const cor = doenca.getCor()

        const quantidadeCubosDoenca = this.cubosDoenca.get(cor)!

        if (quantidadeCubosDoenca === 0) {
            throw new Error(`Não há doenças da cor ${cor} nessa cidade`)
        }

        let doencasCuradas: number

        if (doenca.estaCurada()) {
            this.cubosDoenca.set(cor, 0)

            doencasCuradas = quantidadeCubosDoenca
        } else {
            this.cubosDoenca.set(cor, quantidadeCubosDoenca - 1)

            doencasCuradas = 1
        }

        doenca.adicionarCubos(doencasCuradas)

        try {
            doenca.erradicar()
        } catch (e) {
            console.error(e)
        }
    }

    getCoresDasDoencasPresentes() {
        const coresDoencas = Array.from(this.cubosDoenca.entries())
            .filter(([_, quantidade]) => quantidade > 0)
            .map(([cor, _]) => cor)

        if (coresDoencas.length === 0) {
            throw new Error('Não há doenças nessa cidade')
        }

        return coresDoencas
    }

    adicionarJogador(jogador: Jogador) {
        if (!this.jogadores.includes(jogador)) {
            this.jogadores.push(jogador)
        }
    }

    removerJogador(jogador: Jogador) {
        this.jogadores = this.jogadores.filter(j => j !== jogador)
    }

    temCentroPesquisa() {
        return this.temCentro
    }

    temAlgumJogador() {
        return this.jogadores.length > 0
    }

    toObject(): CidadeToObject {
        return {
            nome: this.nome,
            cor: this.cor,
            temCentro: this.temCentro,
            cubosDoenca: Object.fromEntries(this.cubosDoenca) as Record<
                COR_ENUM,
                number
            >,
            jogadores: this.jogadores.map(jogador => jogador.getPersonagem()),
            conexoes: this.conexoes.map(cidade => cidade.getNome()),
        }
    }
}

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
