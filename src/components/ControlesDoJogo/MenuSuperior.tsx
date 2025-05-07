import { useJogoStore } from '../../store/useJogoStore'
import { Cor, COR_ENUM } from '../../types'
import { CentroPesquisa } from '../CentroPesquisa'
import { CuboDoenca } from '../CuboDoenca'

const mapeamentoEnumCor = {
    [COR_ENUM.AMARELO]: 'amarelo',
    [COR_ENUM.AZUL]: 'azul',
    [COR_ENUM.PRETO]: 'preto',
    [COR_ENUM.VERMELHO]: 'vermelho',
} as const

export function MenuSuperior() {
    const jogo = useJogoStore(state => state.estadoJogo)!

    const cubos = Object.fromEntries(
        Array.from(jogo.doencas).map(({ cor, cubosRestantes }) => [
            mapeamentoEnumCor[cor],
            cubosRestantes,
        ]),
    ) as Record<Cor, number>

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-10 py-2 rounded-b-lg border-b-1 border-x-1 border-white shadow flex items-center flex-col gap-1 font-mono text-sm sm:rounded-b-full sm:flex-row sm:gap-8">
            {/* Cartas restantes */}
            <div className="flex items-center gap-1">
                <span className="text-xs">🃏</span>
                <span>{jogo.baralhoJogador.cartas.length}</span>
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
                    <span>{jogo.centroPesquisasRestantes}</span>
                </div>

                {/* Taxa de infecção */}
                <div className="flex items-center gap-1">
                    <span className="text-green-300">☣️</span>
                    <span>
                        {
                            jogo.baralhoInfeccao.listaVelocidadeInfeccao[
                                jogo.baralhoInfeccao.indiceVelocidadeInfeccao
                            ]
                        }
                    </span>
                </div>

                {/* Surtos */}
                <div className="flex items-center gap-1">
                    <span className="text-red-400">🚨</span>
                    <span>{jogo.marcadorSurto}</span>
                </div>
            </div>
        </div>
    )
}
