import { create } from 'zustand'
import { JogoToObject } from '../core/classes/jogo'

interface JogoStore {
    estadoJogo: JogoToObject | null
    setEstadoJogo: (jogo: JogoToObject | null) => void
}

export const useJogoStore = create<JogoStore>(set => ({
    estadoJogo: null,
    setEstadoJogo: jogo => set(() => ({ estadoJogo: jogo })),
}))
