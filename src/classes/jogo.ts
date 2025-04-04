import * as readline from 'readline'
import { Baralho, BaralhoJogo } from './baralho'
import { Mapa } from './mapa'
import { Jogador } from './jogador'
import { escolherPersonagemAleatoriamente } from './personagem'
import { Carta, CartaCidade, CartaJogador } from './carta'


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

export enum DIFICULDADE_ENUM {
    FACIL = 'FACIL',
    NORMAL = 'NORMAL',
    HEROICO = 'HEROICO'
}

export class Jogo {
    private jogadores: Jogador[]
    private baralhoJogador: BaralhoJogo
    private mapa: Mapa
    private dificuldade: DIFICULDADE_ENUM

    constructor(qtdJogadores: number, dificuldade: DIFICULDADE_ENUM) {
        this.dificuldade = dificuldade

        this.baralhoJogador = new BaralhoJogo(this.dificuldade)

        this.jogadores = Array.from({ length: qtdJogadores }).map(_ => {
            let cartas: Carta[] = []
            
            while (true) {
                cartas.push(this.baralhoJogador.retirarCarta())

                // Esse primeiro não existe
                if (qtdJogadores === 1 && cartas.length == 5) {
                    break
                }

                if (qtdJogadores === 2 && cartas.length === 4) {
                    break
                }

                if (qtdJogadores === 3 && cartas.length === 3) {
                    break
                }

                if (qtdJogadores === 4 && cartas.length === 2) {
                    break
                }
            }

            return new Jogador(
                cartas,
                escolherPersonagemAleatoriamente(),
                this.mapa.retornarCidade('Atlanta')!,
            )
        })

        this.mapa = new Mapa()
    }

    async comecar() {
        while (true) {
            // Turno do jogador
            for (const jogador of this.jogadores) {
                // Realizar 4 ações
                for (let i = 1; i < 5; i++) {
                    const resposta = await this.perguntarAcao(i)
        
                    if (resposta === '1') {
                        await this.perguntarCidade(jogador)
                    }

                }

                // Comprar 2 Cartas de Jogador
                try {
                    jogador.comprarCartas(this.baralhoJogador)
                } catch (e) {
                    console.error(e)

                    const cartaRetirada1 = this.baralhoJogador.retirarCarta()
                    await this.perguntarOQueFazerComCarta(cartaRetirada1)

                    const cartaRetirada2 = this.baralhoJogador.retirarCarta()
                    await this.perguntarOQueFazerComCarta(cartaRetirada2)
                }

                // Infectar cidades
            }

            break
        }

        rl.close()
    }
    
    async perguntarAcao(acaoX: number) {
        console.log(`AÇÃO ${acaoX}`)
        console.log('O que você deseja fazer?')
        console.log('[1] Automóvel/Balsa')
    
        let resposta: string
    
        while (true) {
            resposta = await this.input('Resposta (apenas um número): ')
    
            if (['1'].includes(resposta)) {
                console.log()
                break
            }
    
            console.error('Opção inválida.')
        }
    
        return resposta
    }

    async perguntarCidade(jogador: Jogador) {
        console.log('Para qual cidade deseja ir?')
    
        const opcoes = jogador.getLocalizacao().getConexoes().map((cidade, index) => {
            const opcao = index + 1
    
            console.log(`[${opcao}] ${cidade.getNome()}`)
    
            return opcao.toString()
        })
    
        let resposta: string
    
        while (true) {
            resposta = await this.input('Resposta (apenas um número): ')
    
            if (opcoes.includes(resposta)) {
                const cidadeEscolhida = jogador.getLocalizacao().getConexoes()[parseInt(resposta) - 1]

                jogador.moverSe(cidadeEscolhida.getNome())

                console.log(`Moveu-se para a cidade ${cidadeEscolhida.getNome()}\n`)
                break
            }
    
            console.error('Opção inválida.')
        }
    
        return resposta
    }
    
    async perguntarOQueFazerComCarta(carta: Carta) {
        console.log('O que fazer deseja fazer??')
    
        console.log(`[1] Descartar a carta NOME`)
        console.log('[2] Doar uma carta sua')
    
        let resposta: string
    
        while (true) {
            resposta = await this.input('Resposta (apenas um número): ')
    
            if (['1', '2'].includes(resposta)) {
                break
            }
    
            console.error('Opção inválida.')
        }
    
        return resposta
    }
    
    async input(inputText?: string): Promise<string> {
        return new Promise(resolve => {
            rl.question(inputText ?? '', input => {
                resolve(input.trim())
            })
        })
    }
}



