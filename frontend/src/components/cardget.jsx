import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function Cardget() {

    const [rotaAtiva, setRotaAtiva] = useState('/item')
    const [dados, setDados] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        setCarregando(true) 
        fetch(`http://localhost:3000${rotaAtiva}`) 
            .then(response => response.json())
            .then(data => {
                setDados(data)
                setCarregando(false)
            })
            .catch(error => {
                console.error(`Erro ao buscar dados de ${rotaAtiva}:`, error)
                setCarregando(false)
            })
    }, [rotaAtiva])
    const rotasDisponiveis = [
        { path: '/item', label: 'Itens' },
        { path: '/cat', label: 'Categorias' },
        { path: '/user', label: 'Usuários' },
        { path: '/setor', label: 'Setores' }
    ]

    return (
        <Accordion type="single" collapsible className="bg-gray-800 w-3/4 rounded-3xl text-white overflow-hidden">
            <AccordionItem value="card-unico-api" className="border-none">
                {}
                <AccordionTrigger className="flex items-center justify-between p-4 hover:no-underline cursor-pointer w-full">
                    <div className="flex items-center gap-4">
                        <p className="bg-[#3852E8] px-3 py-1 rounded-md font-bold text-sm">
                            GET
                        </p>
                        <p className="font-medium">
                            Consultar Banco de Dados
                        </p>
                    </div>
                </AccordionTrigger>
                {}
                <AccordionContent className="bg-gray-900/50 p-5 border-t border-gray-700">
                    {}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {rotasDisponiveis.map((rota) => (
                            <button
                                key={rota.path}
                                onClick={() => setRotaAtiva(rota.path)}
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
                    {}
                    <p className="text-gray-400 text-xs font-semibold mb-2">
                        Mostrando resultados de: <span className="text-[#3852E8] font-mono">{rotaAtiva}</span>
                    </p>
                    {}
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs font-mono text-[#3852E8] overflow-x-auto max-h-60">
                        {carregando ? (
                            "Carregando dados da rota..."
                        ) : dados ? (
                            JSON.stringify(dados, null, 2)
                        ) : (
                            "Nenhum dado encontrado nesta rota."
                        )}
                    </pre>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Cardget