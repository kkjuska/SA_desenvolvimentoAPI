import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function CardGetById() {

    const [rotaAtiva, setRotaAtiva] = useState('/item')
    const [idDigitado, setIdDigitado] = useState('')
    const [dados, setDados] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState(null)

    const rotasDisponiveis = [
        { path: '/item', label: 'Itens' },
        { path: '/cat', label: 'Categorias' },
        { path: '/user', label: 'Usuários' },
        { path: '/setor', label: 'Setores' }
    ]

    const buscarPorId = (e) => {
        e.preventDefault() 
        
        if (!idDigitado.trim()) {
            alert("Por favor, digite um ID antes de buscar!")
            return
        }

        setCarregando(true)
        setErro(null)
        setDados(null)

        fetch(`http://localhost:3000${rotaAtiva}/${idDigitado}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`ID não encontrado na rota ${rotaAtiva}`)
                }
                return response.json()
            })
            .then(data => {
                setDados(data)
                setCarregando(false)
            })
            .catch(err => {
                console.error(err)
                setErro(err.message)
                setCarregando(false)
            })
    }

    return (
        <Accordion type="single" collapsible className="bg-[#0a0a0a] w-3/4 rounded-3xl text-[#d7d7d7] overflow-hidden mb-4">
            <AccordionItem value="card-get-by-id" className="border-none">
                <AccordionTrigger className="flex items-center justify-between p-4 hover:no-underline cursor-pointer w-full">
                    <div className="flex items-center gap-4">
                        <p className="bg-[#3852E8] px-3 py-1 rounded-md font-bold text-sm text-white">
                            GET
                        </p>
                        <p className="font-medium">
                            Consultar por ID <span className="text-xs text-gray-400">(Busca Específica)</span>
                        </p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="bg-[#0f0f0f] p-5 border-t border-gray-800">
                    
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {rotasDisponiveis.map((rota) => (
                            <button
                                key={rota.path}
                                type="button"
                                onClick={() => {
                                    setRotaAtiva(rota.path)
                                    setDados(null) 
                                    setErro(null)
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                    rotaAtiva === rota.path
                                        ? 'bg-[#3852E8] text-white font-bold' 
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {rota.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={buscarPorId} className="flex gap-2 items-center mb-4 max-w-md">
                        <span className="font-mono text-xs text-gray-400 bg-gray-950 px-2 py-2 rounded-lg border border-gray-800 shrink-0">
                            {rotaAtiva}/
                        </span>
                        <input
                            type="text"
                            placeholder="Digite o ID (ex: 12)"
                            value={idDigitado}
                            onChange={(e) => setIdDigitado(e.target.value)}
                            className="bg-gray-950 border border-gray-800 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2 text-[#3852E8] outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer border border-gray-700"
                        >
                            Buscar
                        </button>
                    </form>
                    <p className="text-gray-400 text-xs font-semibold mb-2">Resultado da busca:</p>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs font-mono text-[#3852E8] overflow-x-auto max-h-60 border border-gray-900">
                        {carregando && "Buscando no banco de dados..."}
                        {erro && <span className="text-red-400">{erro}</span>}
                        {!carregando && !erro && !dados && "Digite o ID acima e clique em buscar."}
                        {!carregando && dados && JSON.stringify(dados, null, 2)}
                    </pre>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default CardGetById