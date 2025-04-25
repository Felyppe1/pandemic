import { Cor } from '../../types'
import { CentroPesquisa } from '../CentroPesquisa'
import { CuboDoenca } from '../CuboDoenca'

type Props = {
    cartasRestantes: number
    cubos: Record<Cor, number>
    centrosPesquisa: number
    velocidadeInfeccao: number
    surtos: number
}

export const MenuSuperior: React.FC<Props> = ({
    cartasRestantes,
    cubos,
    centrosPesquisa,
    velocidadeInfeccao,
    surtos,
}) => {
    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-10 py-2 rounded-b-lg border-b-1 border-x-1 border-white shadow flex items-center flex-col gap-1 font-mono text-sm sm:rounded-b-full sm:flex-row sm:gap-8">
            {/* Cartas restantes */}
            <div className="flex items-center gap-1">
                <span className="text-xs">🃏</span>
                <span>{cartasRestantes}</span>
            </div>

            {/* Cubos por cor */}
            <div className="flex gap-3">
                {(Object.entries(cubos) as [keyof typeof cubos, number][]).map(
                    ([cor, qtd]) => (
                        <div key={cor} className={`flex items-center gap-1`}>
                            <CuboDoenca className="w-3" cor={cor} />
                            <span>{qtd}</span>
                        </div>
                    ),
                )}
            </div>

            <div className="flex items-center gap-8">
                {/* Centros de pesquisa */}
                <div className="flex items-center gap-1">
                    <CentroPesquisa className="w-4" />
                    <span>{centrosPesquisa}</span>
                </div>

                {/* Taxa de infecção */}
                <div className="flex items-center gap-1">
                    <span className="text-green-300">☣️</span>
                    <span>{velocidadeInfeccao}</span>
                </div>

                {/* Surtos */}
                <div className="flex items-center gap-1">
                    <span className="text-red-400">🚨</span>
                    <span>{surtos}</span>
                </div>
            </div>
        </div>
    )
}
