import { BaralhoJogo } from './baralho'
import { Carta, CartaCidade, CartaJogador } from './carta'
import { Cidade } from './cidade'
import { Personagem } from './personagem'

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

    comprarCartas(baralho: BaralhoJogo) {
        if (this.cartas.length === 7) {
            throw new Error('Jogador já tem 7 cartas')
        }

        const carta1 = baralho.retirarCarta()
        const carta2 = baralho.retirarCarta()

        this.cartas.push(carta1!, carta2!)
    }

    balsa(cidade: Cidade) {
        const eConexao = this.localizacao.buscarCidadeConectada(cidade)

        if (!eConexao) {
            throw new Error(
                'Não é possível se mover para uma cidade que não está conectada a sua',
            )
        }

        this.moverSe(cidade)
    }

    vooDireto(cidade: Cidade, baralho: BaralhoJogo) {
        const cartaEncontrada = this.cartas.find(
            carta =>
                carta instanceof CartaCidade &&
                carta.getNome() === cidade.getNome(),
        )

        if (!cartaEncontrada) {
            throw new Error(
                'Você não tem a carta para fazer voo direto para essa cidade',
            )
        }

        this.moverSe(cidade)

        this.cartas = this.cartas.filter(carta => carta !== cartaEncontrada)

        baralho.adicionarDescarte(cartaEncontrada)
    }

    private moverSe(cidade: Cidade) {
        this.localizacao.removerJogador(this)
        this.localizacao = cidade
        cidade.adicionarJogador(this)
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
