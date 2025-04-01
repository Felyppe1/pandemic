export abstract class Personagem {}

export class EspecialistaContingencia extends Personagem {}
export class AgenteViagens extends Personagem {}
export class Medico extends Personagem {}
export class EspecialistaOperacoes extends Personagem {}
export class EspecialistaQuarentena extends Personagem {}
export class Pesquisadora extends Personagem {}
export class Cientista extends Personagem {}

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
