import { useState } from 'react'
import { Acao, Cor, Personagem } from '../types'
import { MdDirectionsBoat } from 'react-icons/md'
import { BsFillAirplaneFill } from 'react-icons/bs'
import { FaBridge, FaFlask } from 'react-icons/fa6'
import { GiHealthNormal } from 'react-icons/gi'
import { PiHouseSimpleFill } from 'react-icons/pi'
import { FaShareAlt } from 'react-icons/fa'

type Props = {
    nomePersonagem: Personagem
    acoesRestantes: number
    acaoSelecionada: Acao | null
    onClickAcaoMovimento: (acao: Acao) => void
    onClickTratarDoenca: (cor?: Cor) => void
}

export function MenuInferior({
    nomePersonagem,
    acoesRestantes,
    acaoSelecionada,
    onClickAcaoMovimento,
    onClickTratarDoenca,
}: Props) {
    const [menuAberto, setMenuAberto] = useState(true)

    return (
        <>
            {menuAberto && (
                <div className="absolute bottom-0 inset-x-0 flex justify-around h-25 py-4 px-10 bg-black/90 shadow-lg border-t-1 border-white">
                    <div className="grid grid-cols-4 gap-4">
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'balsa' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-2xl">
                                <MdDirectionsBoat />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Balsa
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('voo direto')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'voo direto' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-2xl">
                                <BsFillAirplaneFill />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Voo Direto
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('voo fretado')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'voo fretado' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-2xl">
                                <BsFillAirplaneFill className="rotate-45" />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Voo Fretado
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('ponte aerea')}
                            className={`flex flex-col items-center hover:text-white transition ${acaoSelecionada === 'ponte aerea' ? 'text-white' : 'text-[#D68EFF]'}`}
                        >
                            <span className="text-2xl">
                                <FaBridge />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Ponte Aérea
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-4">
                        <button
                            onClick={() => onClickTratarDoenca()}
                            className="flex flex-col items-center max-w-[8rem] text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-2xl">
                                <GiHealthNormal />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Tratar Doença
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className="flex flex-col items-center max-w-[8rem] text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-2xl">
                                <FaFlask />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Encontrar Cura
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className="flex flex-col items-center max-w-[8rem] text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-2xl">
                                <PiHouseSimpleFill />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Construir Centro de Pesquisa
                            </span>
                        </button>
                        <button
                            onClick={() => onClickAcaoMovimento('balsa')}
                            className="flex flex-col items-center max-w-[8rem] text-[#D68EFF] hover:text-white transition"
                        >
                            <span className="text-2xl">
                                <FaShareAlt />
                            </span>
                            <span className="text-xs font-mono mt-1">
                                Compartilhar Conhecimento
                            </span>
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-16 py-1 rounded-t-full border-t-1 border-x-1 border-white shadow flex items-center gap-8 font-mono text-[.625rem]"
            >
                Vez de {nomePersonagem}, {acoesRestantes} ações restantes
            </button>
        </>
    )
}
