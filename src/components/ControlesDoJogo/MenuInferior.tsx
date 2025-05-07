import { useState } from 'react'
import { Acao, Cor, NomeCidade } from '../../types'
import { MdDirectionsBoat } from 'react-icons/md'
import { BsFillAirplaneFill } from 'react-icons/bs'
import { FaBridge, FaFlask } from 'react-icons/fa6'
import { GiHealthNormal } from 'react-icons/gi'
import { PiHouseSimpleFill } from 'react-icons/pi'
import { FaShareAlt } from 'react-icons/fa'
import { useJogoStore } from '../../store/useJogoStore'

type Props = {
    acaoSelecionada: Acao | null
    onClickAcaoMovimento: (acao: Acao) => void
    onClickTratarDoenca: (cor?: Cor) => void
    onClickConstruirCentroPesquisa: (
        cidadeParaRemoverCentro?: NomeCidade,
    ) => void
}

export function MenuInferior({
    acaoSelecionada,
    onClickAcaoMovimento,
    onClickTratarDoenca,
    onClickConstruirCentroPesquisa,
}: Props) {
    const [menuAberto, setMenuAberto] = useState(true)
    const [abrirModalCentroPesquisa, setAbrirModalCentroPesquisa] =
        useState(false)
    const [cidadeCentroPesquisa, setCidadeCentroPesquisa] =
        useState<NomeCidade | null>(null)

    const jogo = useJogoStore(state => state.estadoJogo)!

    function handleConstruirCentroPesquisa() {
        if (jogo.centroPesquisasRestantes === 0) {
            setAbrirModalCentroPesquisa(true)
            return
        }

        onClickConstruirCentroPesquisa()
    }

    function handleSelecionarCidadeCentroPesquisa() {
        onClickConstruirCentroPesquisa(cidadeCentroPesquisa!)
        setAbrirModalCentroPesquisa(false)
        setCidadeCentroPesquisa(null)
    }

    function handleCancelarCentroPesquisa() {
        setAbrirModalCentroPesquisa(false)
        setCidadeCentroPesquisa(null)
    }

    return (
        <>
            {abrirModalCentroPesquisa && (
                <div className="absolute bottom-0 inset-x-0 flex flex-col justify-center items-center gap-8 py-4 pb-12 px-[5%] bg-black/90 shadow-lg border-t-1 border-white font-mono lg:gap-6">
                    <p className="text-center">
                        Não há centros de pesquisa disponíveis. Selecione uma
                        cidade para remover o centro de pesquisa
                    </p>
                    <div className="flex justify-center flex-wrap gap-x-8 gap-y-2">
                        {jogo.cidades.map(cidade => {
                            if (cidade.temCentro) {
                                return (
                                    <button
                                        onClick={() =>
                                            setCidadeCentroPesquisa(
                                                cidadeCentroPesquisa ===
                                                    cidade.nome
                                                    ? null
                                                    : cidade.nome,
                                            )
                                        }
                                        className={`transition px-3 py-2 rounded-xl transition ${cidadeCentroPesquisa === cidade.nome && 'border-[#5DA1EE] border-2'}`}
                                    >
                                        {cidade.nome}
                                    </button>
                                )
                            }

                            return null
                        })}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleCancelarCentroPesquisa}
                            className="px-6 py-2 bg-[#150000] text-white border-2 border-[#ac1616] rounded-md hover:bg-[#390000] transition"
                        >
                            Cancelar
                        </button>

                        {cidadeCentroPesquisa && (
                            <button
                                onClick={handleSelecionarCidadeCentroPesquisa}
                                className="px-6 py-2 bg-[#001435] text-white border-2 border-[#5DA1EE] rounded-md hover:bg-[#00264d] transition"
                            >
                                Selecionar
                            </button>
                        )}
                    </div>
                </div>
            )}
            {/* {abrirModalCentroPesquisa && (
                <div>
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setAbrirModalCentroPesquisa(false)}></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Construir Centro de Pesquisa</h2>
                            <p>Você não tem centros de pesquisa disponíveis. Deseja remover um centro de pesquisa de outra cidade?</p>
                            <button onClick={() => setAbrirModalCentroPesquisa(false)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Fechar</button>
                        </div>
                    </div>
                </div>
            )} */}

            {menuAberto && !abrirModalCentroPesquisa && (
                <div className="absolute bottom-0 inset-x-0 grid grid-cols-1 gap-3 justify-around py-4 pb-12 px-[5%] bg-black/90 shadow-lg border-t-1 border-white font-mono lg:grid-cols-2 lg:gap-[10%] lg:h-25">
                    <div className="grid grid-cols-4">
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'balsa' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-xl lg:text-2xl">
                                <MdDirectionsBoat />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Balsa
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('voo direto')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'voo direto' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-xl lg:text-2xl">
                                <BsFillAirplaneFill />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Voo Direto
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('voo fretado')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'voo fretado' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-xl lg:text-2xl">
                                <BsFillAirplaneFill className="rotate-45" />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Voo Fretado
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('ponte aerea')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'ponte aerea' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-xl lg:text-2xl">
                                <FaBridge />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Ponte Aérea
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-4">
                        <button
                            onClick={() => onClickTratarDoenca()}
                            className="flex flex-col items-center text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-xl lg:text-2xl">
                                <GiHealthNormal />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Tratar Doença
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className="flex flex-col items-center text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-xl lg:text-2xl">
                                <FaFlask />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Encontrar Cura
                            </span>
                        </button>
                        <button
                            onClick={() => handleConstruirCentroPesquisa()}
                            className="flex flex-col items-center text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-xl lg:text-2xl">
                                <PiHouseSimpleFill />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Construir Centro de Pesquisa
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className="flex flex-col items-center text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-xl lg:text-2xl">
                                <FaShareAlt />
                            </span>
                            <span className="text-[.625rem] lg:text-xs mt-1">
                                Compartilhar Conhecimento
                            </span>
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white py-1 px-12 rounded-t-full border-t-1 border-x-1 border-white shadow flex justify-center items-center font-mono text-[0.5rem] sm:text-[.625rem] min-w-[16rem] sm:min-w-110"
            >
                Vez de {jogo.jogadores[jogo.indiceJogadorAtual].personagem.nome}
                , {jogo.acoesRestantes} ações restantes
            </button>
        </>
    )
}
