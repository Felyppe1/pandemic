import { BaralhoJogo } from './baralho'
import { Carta, CartaJogador } from './carta'
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
    }

    comprarCartas(baralho: BaralhoJogo) {
        if (this.cartas.length === 7) {
            throw new Error('Jogador já tem 7 cartas')
        }

        const carta1 = baralho.retirarCarta()
        const carta2 = baralho.retirarCarta()

        this.cartas.push(carta1!, carta2!)
    }

    moverSe(nomeCidade: string) {
        const cidade = this.localizacao
            .getConexoes()
            .find(conexao => conexao.getNome() === nomeCidade)

        if (!cidade) {
            throw new Error(
                'Não é possível se mover para uma cidade que não está conectada a sua',
            )
        }

        this.localizacao = cidade
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
