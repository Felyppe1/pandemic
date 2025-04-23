import { Baralho, BaralhoInfeccao, BaralhoJogador } from './baralho'
import { Carta, CartaCidade, CartaEvento, CartaJogador } from './carta'
import { Cidade, NomeCidade } from './cidade'
import {
    EspecialistaContingencia,
    NomePersonagem,
    Personagem,
} from './personagem'

export class Jogador {
    private cartas: CartaJogador[]
    private personagem: Personagem
    private localizacao: Cidade

    constructor(cartas: Carta[], personagem: Personagem, localizacao: Cidade) {
        this.cartas = cartas
        this.personagem = personagem

        this.localizacao = localizacao
        localizacao.adicionarJogador(this)
    }

    comprarCarta(carta: CartaJogador) {
        if (this.cartas.length === 7) {
            throw new Error('Jogador já tem 7 cartas')
        }

        this.cartas.push(carta)
    }

    balsa(cidadeDestino: Cidade) {
        const eConexao = this.localizacao.buscarCidadeConectada(cidadeDestino)

        if (!eConexao) {
            throw new Error(
                'Não é possível se mover para uma cidade que não está conectada a sua',
            )
        }

        this.moverSe(cidadeDestino)
    }

    vooDireto(cidadeDestino: Cidade, baralho: BaralhoJogador) {
        const cartaEncontrada = this.cartas.find(
            carta =>
                carta instanceof CartaCidade &&
                carta.getNome() === cidadeDestino.getNome(),
        )

        if (!cartaEncontrada) {
            throw new Error(
                'Você não tem a carta para fazer voo direto para essa cidade',
            )
        }

        this.descartarCarta(cartaEncontrada, baralho)

        this.moverSe(cidadeDestino)
    }

    vooFretado(cidadeDestino: Cidade, baralho: BaralhoJogador) {
        const cartaEncontrada = this.cartas.find(
            carta =>
                carta instanceof CartaCidade &&
                carta.getNome() === this.localizacao.getNome(),
        )

        if (!cartaEncontrada) {
            throw Error(
                'Você não tem a carta da sua cidade atual para fazer voo fretado',
            )
        }

        this.descartarCarta(cartaEncontrada, baralho)

        this.moverSe(cidadeDestino)
    }

    ponteAerea(cidadeDestino: Cidade) {
        if (!this.localizacao.temCentroPesquisa()) {
            throw new Error(
                'Sua cidade atual não tem centro de pesquisa para fazer ponte aérea',
            )
        }

        if (!cidadeDestino.temCentroPesquisa()) {
            throw new Error(
                `A cidade ${cidadeDestino.getNome()} não tem centro de pesquisa para fazer ponte aérea`,
            )
        }

        this.moverSe(cidadeDestino)
    }

    moverSe(cidade: Cidade) {
        this.localizacao.removerJogador(this)
        this.localizacao = cidade
        cidade.adicionarJogador(this)
    }

    private descartarCarta(cartaDescarte: Carta, baralho: Baralho) {
        this.cartas = this.cartas.filter(carta => carta !== cartaDescarte)

        baralho.descartar(cartaDescarte)
    }

    comprarCartaDeFuncao(baralho: BaralhoJogador, nomeEvento: string) {
        if (this.personagem instanceof EspecialistaContingencia) {
            const carta = baralho.comprarUmaCartaDeFuncao(nomeEvento)

            this.personagem.comprarCartaDeFuncao(carta)
        } else {
            throw new Error(
                'Apenas o Especialista em planos de contingência pode fazer essa ação',
            )
        }
    }

    usarEventoPrognostico(
        cartasInfeccaoReordenadas: NomeCidade[],
        baralhoInfeccao: BaralhoInfeccao,
        baralhoJogador: BaralhoJogador,
    ) {
        const eventoPrognostico = this.cartas.find(
            carta =>
                carta instanceof CartaEvento &&
                carta.getNome() === 'Prognóstico',
        )

        if (!eventoPrognostico) {
            throw new Error('Você não tem a carta de evento Prognóstico')
        }

        baralhoInfeccao.reordenarSeisPrimeirasCartasDeDescarteEAdicionarNoBaralho(
            cartasInfeccaoReordenadas,
        )

        this.descartarCarta(eventoPrognostico, baralhoJogador)
    }

    getCorDaCidadeAtual() {
        return this.localizacao.getCor()
    }

    ePersonagem(nome: NomePersonagem) {
        return this.personagem.getNome() === nome
    }

    getCartas() {
        return [...this.cartas]
    }

    getLocalizacao() {
        return this.localizacao
    }

    getPersonagem() {
        return this.personagem
    }
}
