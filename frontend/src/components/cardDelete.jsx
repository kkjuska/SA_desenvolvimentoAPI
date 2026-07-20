import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function CardDelete() {
    const [rotaAtiva, setRotaAtiva] = useState('/item')
    const [idDigitado, setIdDigitado] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [resposta, setResposta] = useState(null)
    const [erro, setErro] = useState(null)

    const rotasDisponiveis = [
        { path: '/item', label: 'Itens' },
        { path: '/cat', label: 'Categorias' },
        { path: '/user', label: 'Usuários' },
        { path: '/setor', label: 'Setores' }
    ]

    const deletarRegistro = (e) => {
        e.preventDefault()
    
        if (!idDigitado.trim()) {
            alert("Por favor, digite o ID do registro que deseja deletar!")
            return
        }
    
        const confirmar = window.confirm(`Tem certeza que deseja deletar o ID ${idDigitado} da rota ${rotaAtiva}? Se isso for um item você pode ter problemas com o aluguel!`)
        if (!confirmar) return
    
        setCarregando(true)
        setErro(null)
        setResposta(null)
    
        fetch(`http://localhost:3000${rotaAtiva}/${idDigitado}`, {
            method: 'DELETE'
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`Erro ao deletar o ID ${idDigitado} na rota ${rotaAtiva}. Verifique se ele existe.`)
                }
    
                const texto = await response.text()
                
                return texto ? JSON.parse(texto) : { mensagem: `Registro com ID ${idDigitado} excluído com sucesso!` }
            })
            .then(data => {
                setResposta(data)
                setIdDigitado('')
                setCarregando(false)
            })
            .catch(err => {
                console.error(err)
                setErro(err.message)
                setCarregando(false)
            })
    }

    return (
        <Accordion type="single" collapsible="true" className="bg-[#0a0a0a] w-3/4 rounded-3xl text-[#d7d7d7] overflow-hidden mb-4">
            <AccordionItem value="card-delete" className="border-none">
                
                <AccordionTrigger className="flex items-center justify-between p-4 hover:no-underline cursor-pointer w-full">
                    <div className="flex items-center gap-4">
                        <p className="bg-[#EF4444] px-3 py-1 rounded-md font-bold text-sm text-white">
                            DELETE
                        </p>
                        <p className="font-medium">
                            Excluir Registro <span className="text-xs text-gray-400">(Remover do Banco)</span>
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
                                    setResposta(null)
                                    setErro(null)
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                    rotaAtiva === rota.path
                                        ? 'bg-[#EF4444] text-white font-bold' 
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {rota.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={deletarRegistro} className="flex gap-2 items-center mb-4 max-w-md">
                        <span className="font-mono text-xs text-gray-400 bg-gray-950 px-2 py-2 rounded-lg border border-gray-800 shrink-0">
                            {rotaAtiva}/
                        </span>
                        <input
                            type="text"
                            placeholder="ID para deletar"
                            value={idDigitado}
                            onChange={(e) => setIdDigitado(e.target.value)}
                            required
                            className="bg-gray-950 border border-gray-800 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2 text-red-400 outline-none font-bold"
                        />
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer border border-red-700 shrink-0"
                        >
                            {carregando ? 'Deletando...' : 'Excluir'}
                        </button>
                    </form>

                    <p className="text-gray-400 text-xs font-semibold mb-2">Resposta da API:</p>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs font-mono text-red-400 overflow-x-auto max-h-60 border border-gray-900">
                        {carregando && "Enviando comando de exclusão..."}
                        {erro && <span className="text-red-400">{erro}</span>}
                        {/* Corrigido aqui: trocado 'respuesta' por 'resposta' */}
                        {!carregando && !erro && !resposta && "Informe o ID e clique em Excluir para remover do banco de dados."}
                        {!carregando && resposta && (
                            <div>
                                <p className="text-red-400 font-bold mb-1">🗑 Sucesso: Registro removido permanentemente!</p>
                                {JSON.stringify(resposta, null, 2)}
                            </div>
                        )}
                    </pre>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default CardDelete