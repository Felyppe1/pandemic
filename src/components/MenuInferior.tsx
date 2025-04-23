import { Personagem } from '../types'

type Props = {
    nomePersonagem: Personagem
    acoesRestantes: number
}

export function MenuInferior({ nomePersonagem, acoesRestantes }: Props) {
    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-16 py-1 rounded-t-full border-t-1 border-x-1 border-white shadow flex items-center gap-8 font-mono text-[.625rem]">
            Vez de {nomePersonagem}, {acoesRestantes} ações restantes
        </div>
    )
}
