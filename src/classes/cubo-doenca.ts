import { COR_ENUM } from './cidade'

export class CuboDoenca {
    private cor: COR_ENUM
    private cubosRestantes: number
    private encontrouCura: boolean
    private estaErradicado: boolean

    constructor(cor: COR_ENUM) {
        this.cor = cor
        this.cubosRestantes = 24
        this.encontrouCura = false
        this.estaErradicado = false
    }

    getCor() {
        return this.cor
    }

    getCubos(quantidade: number) {
        if (this.cubosRestantes < quantidade) {
            throw new Error(`Acabou os cubos da cor ${this.cor}`)
        }

        this.cubosRestantes = this.cubosRestantes - quantidade

        return quantidade
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
