import * as readline from 'readline'
import { BaralhoJogo } from './classes/baralho'
import { Carta, CartaCidade, COR_ENUM } from './classes/carta'
import { Jogador } from './classes/jogador'
import {
    escolherPersonagemAleatoriamente,
    EspecialistaContingencia,
    personagens,
} from './classes/personagem'
import { Mapa } from './classes/mapa'
import { Cidade } from './classes/cidade'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const baralhoJogo = new BaralhoJogo()
const mapa = new Mapa()

async function comecarJogo() {
    const qtdJogadores = await perguntarQtdJogadores()

    const jogadores = Array.from({ length: qtdJogadores }).map(jogador => {
        return new Jogador(
            [baralhoJogo.retirarCarta()!],
            escolherPersonagemAleatoriamente(),
            mapa.retornarCidade('Atlanta')!,
        )
    })

    while (true) {
        // Turno do jogador
        for (const jogador of jogadores) {
            // Realizar 4 ações
            for (let i = 1; i < 5; i++) {
                const resposta = await perguntarAcao(i)
    
                if (resposta === '1') {
                    await perguntarCidade(jogador)
                }

            }

            // Comprar 2 Cartas de Jogador
            try {
                jogador.comprarCartas(baralhoJogo)
            } catch (e) {
                console.error(e)

                const cartaRetirada1 = baralhoJogo.retirarCarta()
                await perguntarOQueFazerComCarta(cartaRetirada1!)

                const cartaRetirada2 = baralhoJogo.retirarCarta()
                await perguntarOQueFazerComCarta(cartaRetirada2!)
            }

            // Infectar cidades
        }

        break
    }

    rl.close()
}

comecarJogo()

async function perguntarQtdJogadores() {
    console.log('Selecione a quantidade de jogadores: 1, 2, 3, 4')

    let qtdJogadores: number

    while (true) {
        const res = await input('Número: ')

        qtdJogadores = parseInt(res)

        if ([1, 2, 3, 4].includes(qtdJogadores)) {
            console.error(`Você selecionou ${qtdJogadores} jogador(es).\n`)

            break
        }

        console.error('Número inválido.')

        await perguntarQtdJogadores()
    }

    return qtdJogadores
}

async function perguntarAcao(acaoX: number) {
    console.log(`AÇÃO ${acaoX}`)
    console.log('O que você deseja fazer?')
    console.log('[1] Automóvel/Balsa')

    let resposta: string

    while (true) {
        resposta = await input('Resposta (apenas um número): ')

        if (['1'].includes(resposta)) {
            console.log()
            break
        }

        console.error('Opção inválida.')
    }

    return resposta
}

async function perguntarCidade(jogador: Jogador) {
    console.log('Para qual cidade deseja ir?')

    const opcoes = jogador.getLocalizacao().getConexoes().map((cidade, index) => {
        const opcao = index + 1

        console.log(`[${opcao}] ${cidade.getNome()}`)

        return opcao.toString()
    })

    let resposta: string

    while (true) {
        resposta = await input('Resposta (apenas um número): ')

        if (opcoes.includes(resposta)) {
            console.log()
            break
        }

        console.error('Opção inválida.')
    }

    return resposta
}

async function perguntarOQueFazerComCarta(carta: Carta) {
    console.log('O que fazer deseja fazer??')

    console.log(`[1] Descartar a carta NOME`)
    console.log('[2] Doar uma carta sua')

    let resposta: string

    while (true) {
        resposta = await input('Resposta (apenas um número): ')

        if (['1', '2'].includes(resposta)) {
            break
        }

        console.error('Opção inválida.')
    }

    return resposta
}

async function input(inputText?: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(inputText ?? '', input => {
            // rl.close()

            resolve(input.trim())
        })
    })
}
