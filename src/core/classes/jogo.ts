import { cidades } from '../dados/cidades'
import {
    BaralhoInfeccao,
    BaralhoInfeccaoToObject,
    BaralhoJogador,
    BaralhoJogadorToObject,
} from './baralho'
import { CartaEpidemia, CartaInfeccao } from './carta'
import { Cidade, CidadeToObject, COR_ENUM, NomeCidade } from './cidade'
import { Doenca, DoencaToObject } from './doenca'
import { Jogador, JogadorToObject } from './jogador'
import {
    EspecialistaContingencia,
    NomePersonagem,
    Personagem,
} from './personagem'

export enum DIFICULDADE_ENUM {
    FACIL = 'FACIL',
    NORMAL = 'NORMAL',
    HEROICO = 'HEROICO',
}

const cartasPorJogador: Record<number, number> = {
    1: 5,
    2: 4,
    3: 3,
    4: 2,
}

export class Jogo {
    private jogadores: Jogador[]
    private baralhoJogador: BaralhoJogador
    private baralhoInfeccao: BaralhoInfeccao
    private doencas: Map<COR_ENUM, Doenca>
    private cidades: Cidade[]
    private dificuldade: DIFICULDADE_ENUM
    private centroPesquisasRestantes: number
    private marcadorSurto: number
    private indiceJogadorAtual: number
    private acoesRestantes: number

    constructor(qtdJogadores: number, dificuldade: DIFICULDADE_ENUM) {
        this.marcadorSurto = 0
        this.dificuldade = dificuldade
        this.doencas = new Map()
        this.indiceJogadorAtual = 0
        this.acoesRestantes = 4
        this.cidades = []
        this.jogadores = []

        Object.values(COR_ENUM).forEach(cor => {
            this.doencas.set(cor, new Doenca(cor))
        })

        this.criarCidadesEConexoes()

        this.baralhoJogador = new BaralhoJogador(this.cidades)

        this.criarJogadores(qtdJogadores)

        this.baralhoJogador.definirDificuldade(this.dificuldade)

        const cidadeAtlanta = this.getCidade('Atlanta')

        cidadeAtlanta.construirCentroPesquisa()

        this.centroPesquisasRestantes = 5

        this.baralhoInfeccao = new BaralhoInfeccao(this.cidades)

        this.infectarCidadesNoInicioDoJogo()
    }

    private criarCidadesEConexoes() {
        this.cidades = cidades.map(
            cidade => new Cidade(cidade.nome, cidade.cor),
        )

        cidades.forEach(({ nome, conectadoA }) => {
            const cidade = this.getCidade(nome)

            conectadoA.forEach(nomeCidade => {
                const cidadeConectada = this.getCidade(nomeCidade)

                cidade.adicionarConexao(cidadeConectada)
            })
        })
    }

    private criarJogadores(qtdJogadores: number) {
        const personagens = [
            new EspecialistaContingencia(),
            new Personagem('Agente de Viagens'),
            new Personagem('Médico'),
            new Personagem('Especialista em Operações'),
            new Personagem('Especialista em Quarentena'),
            new Personagem('Pesquisadora'),
            new Personagem('Cientista'),
        ]

        const numeroCartas = cartasPorJogador[qtdJogadores] ?? 2

        this.jogadores = Array.from({ length: qtdJogadores }).map(_ => {
            const cartas = Array.from({ length: numeroCartas }).map(_ =>
                this.baralhoJogador.comprarCarta(),
            )

            return new Jogador(
                cartas,
                removerItemAleatorio(personagens),
                this.getCidade('Atlanta'),
            )
        })
    }

    private infectarCidadesNoInicioDoJogo() {
        for (let i = 3; i > 0; i--) {
            for (let j = 0; j < 3; j++) {
                const cartaInfeccao =
                    this.baralhoInfeccao.comprarCarta() as CartaInfeccao

                const cidade = this.getCidade(cartaInfeccao.getNome())

                const doenca = this.getDoenca(cidade.getCor())

                for (let n = 0; n < i; n++) cidade.adicionarCubo(doenca)

                this.baralhoInfeccao.descartar(cartaInfeccao)
            }
        }
    }

    moverJogadorPorBalsa(nomeCidadeDestino: NomeCidade) {
        const cidade = this.getCidade(nomeCidadeDestino)

        this.getJogadorAtual().balsa(cidade)

        this.verificarTurno()
    }

    moverJogadorPorVooDireto(nomeCidadeDestino: NomeCidade) {
        const cidade = this.getCidade(nomeCidadeDestino)

        this.getJogadorAtual().vooDireto(cidade, this.baralhoJogador)

        this.verificarTurno()
    }

    moverJogadorPorVooFretado(nomeCidadeDestino: NomeCidade) {
        const cidade = this.getCidade(nomeCidadeDestino)

        this.getJogadorAtual().vooFretado(cidade, this.baralhoJogador)

        this.verificarTurno()
    }

    moverJogadorPorPonteAerea(nomeCidadeDestino: NomeCidade) {
        const cidade = this.getCidade(nomeCidadeDestino)

        this.getJogadorAtual().ponteAerea(cidade)

        this.verificarTurno()
    }

    tratarDoenca(cor?: COR_ENUM) {
        const cores = this.getJogadorAtual().getCoresDasDoencasNaCidadeAtual()
        console.log('COR', cor)

        let corATratar: COR_ENUM | undefined

        if (cor) {
            corATratar = cores.find(c => c === cor)

            if (!corATratar) {
                throw new Error('Cor não encontrada na cidade atual')
            }
        } else {
            if (cores.length > 1) {
                throw new Error('É preciso escolher uma cor para tratar')
            }

            corATratar = cores[0]
        }

        const doenca = this.getDoenca(corATratar)

        const cidade = this.getJogadorAtual().getLocalizacao()

        cidade.tratarDoencas(doenca)

        this.verificarTurno()
    }

    construirCentroPesquisa(cidadeParaRemoverCentro?: NomeCidade) {
        if (this.centroPesquisasRestantes === 0 && !cidadeParaRemoverCentro) {
            throw new Error(
                'É preciso remover centro de pesquisa de outra cidade',
            )
        }

        if (cidadeParaRemoverCentro) {
            const cidade = this.getCidade(cidadeParaRemoverCentro)

            if (!cidade.temCentroPesquisa()) {
                throw new Error('Cidade não tem centro de pesquisa')
            }

            cidade.removerCentroPesquisa()
        }

        // TODO: o que eu deveria fazer nesse caso?
        try {
            this.getJogadorAtual().construirCentroPesquisa(this.baralhoJogador)
        } catch (error) {
            if (cidadeParaRemoverCentro) {
                const cidade = this.getCidade(cidadeParaRemoverCentro)

                cidade.construirCentroPesquisa()
            }

            throw error
        }

        this.centroPesquisasRestantes =
            this.centroPesquisasRestantes === 0
                ? 0
                : (this.centroPesquisasRestantes -= 1)

        this.verificarTurno()
    }

    encontrarCura(nomeCartas: NomeCidade[]) {
        const jogadorAtual = this.getJogadorAtual()
        const cidadeAtual = jogadorAtual.getLocalizacao()

        if (!cidadeAtual.temCentroPesquisa()) {
            throw new Error('Cidade não tem centro de pesquisa')
        }

        const cidades = this.cidades.filter(cidade =>
            nomeCartas.includes(cidade.getNome()),
        )

        const cor = cidades[0].getCor()

        const saoTodasDaMesmaCor = cidades.every(
            cidade => cor === cidade.getCor(),
        )

        if (!saoTodasDaMesmaCor) {
            throw new Error('As cartas devem ser da mesma cor')
        }

        const doenca = this.getDoenca(cor)

        if (doenca.estaCurada()) {
            throw new Error('A cura já foi encontrada')
        }

        jogadorAtual.encontrarCura(doenca, nomeCartas, this.baralhoJogador)

        this.verificarTurno()
    }

    moverOutroJogadorParaCidadeComJogador(
        indiceJogador: number,
        nomeCidade: NomeCidade,
    ) {
        const jogadorASerMovido = this.getJogadorPeloSeuIndice(indiceJogador)

        if (!this.getJogadorAtual().ePersonagem('Agente de Viagens')) {
            throw new Error('Apenas o Agente de Viagens pode fazer essa ação')
        }

        const cidade = this.getCidade(nomeCidade)

        if (!cidade.temAlgumJogador()) {
            throw new Error('Cidade não tem jogador')
        }

        jogadorASerMovido.moverSe(cidade)

        this.verificarTurno()
    }

    moverOutroJogadorComoSeFosseSeu(
        indiceJogador: number,
        tipoDeMovimento: 'balsa' | 'voo direto' | 'voo fretado' | 'ponte aerea',
        nomeCidade: NomeCidade,
    ) {
        const jogadorAlvo = this.getJogadorPeloSeuIndice(indiceJogador)

        const jogadorAtual = this.getJogadorAtual()

        if (!jogadorAtual.ePersonagem('Agente de Viagens')) {
            throw new Error('Apenas o Agente de Viagens pode fazer essa ação')
        }

        const cidadeDestino = this.getCidade(nomeCidade)

        switch (tipoDeMovimento) {
            case 'balsa':
                jogadorAlvo.balsa(cidadeDestino)
                break
            case 'voo direto':
                jogadorAlvo.vooDireto(cidadeDestino, this.baralhoJogador)
                break
            case 'voo fretado':
                jogadorAlvo.vooFretado(cidadeDestino, this.baralhoJogador)
                break
            case 'ponte aerea':
                jogadorAlvo.ponteAerea(cidadeDestino)
                break
            default:
                throw new Error('Opção de movimento inválida')
        }

        this.verificarTurno()
    }

    comprarCartaDeFuncao(nomeEvento: string) {
        const jogadorAtual = this.getJogadorAtual()

        jogadorAtual.comprarCartaDeFuncao(this.baralhoJogador, nomeEvento)

        this.verificarTurno()
    }

    usarEventoPrognostico(cartasInfeccaoReordenadas: NomeCidade[]) {
        const jogadorAtual = this.getJogadorAtual()

        jogadorAtual.usarEventoPrognostico(
            cartasInfeccaoReordenadas,
            this.baralhoInfeccao,
            this.baralhoJogador,
        )

        this.verificarTurno()
    }

    private verificarTurno() {
        this.acoesRestantes -= 1

        if (this.acoesRestantes === 0) {
            this.comprarDuasCartasAoFinalDoTurno()

            this.infectarCidadesAoFinalDoTurno()

            this.indiceJogadorAtual =
                (this.indiceJogadorAtual + 1) % this.jogadores.length

            this.acoesRestantes = 4
        }
    }

    private comprarDuasCartasAoFinalDoTurno() {
        const cartas = [
            this.baralhoJogador.comprarCarta(),
            this.baralhoJogador.comprarCarta(),
        ]

        cartas.forEach(carta => {
            if (carta instanceof CartaEpidemia) {
                const cartaInfeccao = this.baralhoInfeccao.comprarCartaDoFundo()

                const cidade = this.getCidade(cartaInfeccao.getNome())

                const doenca = this.getDoenca(cartaInfeccao.getCor())

                try {
                    for (let i = 0; i < 3; i++) {
                        if (cidade.adicionarCubo(doenca)) {
                            this.avancarMarcadorSurto()

                            break
                        }
                    }
                } catch (error) {
                    if (error instanceof Error) console.log(error.message)
                }

                this.baralhoInfeccao.aumentarVelocidadeInfeccao()

                this.baralhoInfeccao.descartar(cartaInfeccao)

                this.baralhoInfeccao.intensificar()

                this.baralhoJogador.descartar(carta)
            } else {
                try {
                    this.getJogadorAtual().comprarCarta(carta)
                } catch (error) {
                    // TODO: adicionar carta para ele escolher em uma lista
                    if (error instanceof Error) {
                        console.error(error.message)
                    }
                }
            }
        })
    }

    private infectarCidadesAoFinalDoTurno() {
        for (let i = 0; i < this.baralhoInfeccao.getVelocidadeInfeccao(); i++) {
            const carta = this.baralhoInfeccao.comprarCarta() as CartaInfeccao

            const cidade = this.getCidade(carta.getNome())

            const doenca = this.getDoenca(cidade.getCor())

            try {
                if (cidade.adicionarCubo(doenca)) this.avancarMarcadorSurto()
            } catch (error) {
                if (error instanceof Error) console.log(error.message)
            }

            this.baralhoInfeccao.descartar(carta)
        }
    }

    private avancarMarcadorSurto() {
        if (this.marcadorSurto === 7) {
            throw new Error('O surto chegou ao limite')
        }

        this.marcadorSurto += 1
    }

    getJogadorPeloSeuIndice(indiceJogador: number) {
        if (indiceJogador < 0 || indiceJogador >= this.jogadores.length) {
            throw new Error('Jogador não encontrado')
        }

        return this.jogadores[indiceJogador]
    }

    getJogadorPeloNomePersonagem(nomePersonagem: NomePersonagem) {
        const jogador = this.jogadores.find(jogador =>
            jogador.ePersonagem(nomePersonagem),
        )

        if (!jogador) {
            throw new Error('Jogador não encontrado')
        }

        return jogador
    }

    getDoenca(cor: COR_ENUM) {
        return this.doencas.get(cor)!
    }

    getCidade(nome: NomeCidade) {
        return this.cidades.find(cidade => cidade.getNome() === nome)!
    }

    getJogadorAtual() {
        return this.jogadores[this.indiceJogadorAtual]
    }

    toObject(): JogoToObject {
        return {
            jogadores: this.jogadores.map(jogador => jogador.toObject()),
            baralhoJogador: this.baralhoJogador.toObject(),
            baralhoInfeccao: this.baralhoInfeccao.toObject(),
            doencas: Array.from(this.doencas.values()).map(doenca =>
                doenca.toObject(),
            ),
            cidades: this.cidades.map(cidade => cidade.toObject()),
            dificuldade: this.dificuldade,
            marcadorSurto: this.marcadorSurto,
            indiceJogadorAtual: this.indiceJogadorAtual,
            acoesRestantes: this.acoesRestantes,
            centroPesquisasRestantes: this.centroPesquisasRestantes,
        }
    }
}

export interface JogoToObject {
    jogadores: JogadorToObject[]
    baralhoJogador: BaralhoJogadorToObject
    baralhoInfeccao: BaralhoInfeccaoToObject
    doencas: DoencaToObject[]
    cidades: CidadeToObject[]
    dificuldade: DIFICULDADE_ENUM
    marcadorSurto: number
    indiceJogadorAtual: number
    acoesRestantes: number
    centroPesquisasRestantes: number
}

export function removerItemAleatorio<T>(array: T[]): T {
    if (array.length === 0) throw new Error('Arrray vazio')

    const indiceAleatorio = Math.floor(Math.random() * array.length)
    const [removido] = array.splice(indiceAleatorio, 1)
    return removido
}
