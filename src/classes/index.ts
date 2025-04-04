// import * as readline from 'readline'
// import { DIFICULDADE_ENUM, Jogo } from "./jogo";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

// async function input(inputText?: string): Promise<string> {
//     return new Promise(resolve => {
//         rl.question(inputText ?? '', input => {
//             resolve(input.trim())
//         })
//     })
// }

// async function perguntarDificuldade() {
//     console.log('Escolha a dificuldade:')
//     console.log('[1] Introdutório')
//     console.log('[2] Normal')
//     console.log('[3] Heróico')

//     while (true) {
//         const resposta = await input('Resposta (apenas número): ')

//         if (resposta === '1') return DIFICULDADE_ENUM.FACIL
//         if (resposta === '2') return DIFICULDADE_ENUM.NORMAL
//         if (resposta === '3') return DIFICULDADE_ENUM.HEROICO

//         console.error('Número inválido.')
//     }
// }

// async function perguntarQtdJogadores() {
//     console.log('Selecione a quantidade de jogadores: 1, 2, 3, 4')

//     let resposta: string

//     while (true) {
//         resposta = await input('Número: ')

//         if (['1', '2', '3', '4'].includes(resposta)) {
//             console.error(`Você selecionou ${resposta} jogador(es).`)
//             console.log()

//             break
//         }

//         console.error('Número inválido.')
//     }

//     return parseInt(resposta)
// }



// async function jogar() {
//     const qtdJogadores = await perguntarQtdJogadores()

//     const dificuldade = await perguntarDificuldade()

//     const partida = new Jogo(qtdJogadores, dificuldade)

//     partida.comecar()
// }

// jogar()