import { MenuSuperior } from './MenuSuperior'
import { MenuJogadores } from './MenuJogadores'
import { Acao, Cor, NomeCidade } from '../../types'
import { MenuInferior } from './MenuInferior'

interface TurnoProps {
    acaoSelecionada: Acao | null
    onClickAcao: (acao: Acao) => void
    onClickTratarDoenca: (cor?: Cor) => void
    onClickConstruirCentroPesquisa: (
        cidadeParaRemoverCentro?: NomeCidade,
    ) => void
}

export function ControlesDoJogo({
    acaoSelecionada,
    onClickAcao,
    onClickTratarDoenca,
    onClickConstruirCentroPesquisa,
}: TurnoProps) {
    return (
        <>
            <MenuSuperior />

            <MenuJogadores />

            <MenuInferior
                acaoSelecionada={acaoSelecionada}
                onClickAcaoMovimento={onClickAcao}
                onClickTratarDoenca={onClickTratarDoenca}
                onClickConstruirCentroPesquisa={onClickConstruirCentroPesquisa}
            />
        </>
    )
}
