import { COR_ENUM } from './cidade'

const MAXIMO_CUBOS = 24

export class Doenca {
    private cor: COR_ENUM
    private cubosRestantes: number
    private encontrouCura: boolean
    private estaErradicado: boolean

    constructor(cor: COR_ENUM) {
        this.cor = cor
        this.cubosRestantes = MAXIMO_CUBOS
        this.encontrouCura = false
        this.estaErradicado = false
    }

    getCor() {
        return this.cor
    }

    adicionarCubos(quantidade: number) {
        if (this.cubosRestantes + quantidade > MAXIMO_CUBOS) {
            throw new Error(
                `Não é possível adicionar mais que ${MAXIMO_CUBOS} cubos`,
            )
        }

        this.cubosRestantes += quantidade
    }

    retirarCubos(quantidade: number) {
        if (this.cubosRestantes < quantidade) {
            throw new Error(`Acabou os cubos da cor ${this.cor}`)
        }

        this.cubosRestantes = this.cubosRestantes - quantidade

        return quantidade
    }

    temCuboEmCidades() {
        return this.cubosRestantes !== MAXIMO_CUBOS
    }

    getCubosRestantes() {
        return this.cubosRestantes
    }

    getEncontrouCura() {
        return this.encontrouCura
    }

    getEstaErradicado() {
        return this.estaErradicado
    }

    descobrirCura() {
        this.encontrouCura = true
    }

    erradicar() {
        this.estaErradicado = true
    }
}
