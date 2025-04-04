import { useState } from "react"
import { DIFICULDADE_ENUM, Jogo } from "./classes/jogo"

export default function App() {
    const [jogo, setJogo] = useState<Jogo | null>(null)
    const [qtdJogadores, setQtdJogadores] = useState(2)
    const [dificuldade, setDificuldade] = useState<DIFICULDADE_ENUM>(DIFICULDADE_ENUM.NORMAL)
    const [mostrarMensagem, setMostrarMensagem] = useState(false)

    console.log(jogo)
    const iniciarJogo = () => {
        setMostrarMensagem(true)
        setJogo(new Jogo(qtdJogadores, dificuldade))
        setTimeout(() => setMostrarMensagem(false), 3000)
    }

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center bg-contain bg-center bg-no-repeat ${
            jogo ? "bg-[url('/tabuleiro.png')]" : ""
        }`}>
            {mostrarMensagem && (
                <div className="bg-yellow-600 px-10 py-4 rounded-lg text-5xl font-bold text-white">
                    Jogo Iniciado!
                </div>
            )}

            {!jogo ? (
                <div className="p-6 shadow-md rounded">
                    <h1 className="text-xl font-bold mb-4">Configurar Jogo</h1>
                    <label className="block mb-2">Quantidade de jogadores:</label>
                    <input type="number" min="1" max="4" value={qtdJogadores} onChange={(e) => setQtdJogadores(Number(e.target.value))} className="border p-2 w-full mb-4" />
                    
                    <label className="block mb-2">Dificuldade:</label>
                    <select value={dificuldade} onChange={(e) => setDificuldade(e.target.value as DIFICULDADE_ENUM)} className="border p-2 w-full mb-4">
                        {Object.values(DIFICULDADE_ENUM).map((nivel) => (
                            <option key={nivel} value={nivel}>{nivel}</option>
                        ))}
                    </select>
                    
                    <button onClick={iniciarJogo} className="bg-blue-500 text-white px-4 py-2 rounded">Jogar</button>
                </div>
            ) : <></>}
        </div>
    )
}

// export default function App() {
//     return (
//         <body
//             style={{ 
//                 backgroundImage: "url('/tabuleiro.png')",
//                 backgroundSize: 'contain',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 width: '100vw',
//                 height: '100vh'
//             }}>
//         </body>
//     )
// }
