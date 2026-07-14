import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function CardPut() {
    const [rotaAtiva, setRotaAtiva] = useState('/item')
    const [idDigitado, setIdDigitado] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [resposta, setResposta] = useState(null)
    const [erro, setErro] = useState(null)
    const [formData, setFormData] = useState({})

    const rotasDisponiveis = [
        { path: '/item', label: 'Itens' },
        { path: '/cat', label: 'Categorias' },
        { path: '/user', label: 'Usuários' },
        { path: '/setor', label: 'Setores' }
    ]

    const camposPorRota = {
        '/item': [
            { name: 'nome', placeholder: 'Novo nome do Item' },
            { name: 'quantidade', placeholder: 'Nova quantidade'}
        ],
        '/cat': [
            { name: 'nome', placeholder: 'Novo nome da Categoria' },
            { name: 'id_item', placeholder: 'Novo id do item'}
        ],
        '/user': [
            { name: 'email', placeholder: 'Novo e-mail', type: 'email' },
            { name: 'password', placeholder: 'Nova senha', type: 'password' },
            { name: 'id_item', placeholder: 'Novo id do item pego' }
        ],
        '/setor': [
            { name: 'nome', placeholder: 'Novo nome do Setor' },
            { name: 'qt_pessoas', placeholder: 'Nova quantidade de pessoas no setor', type:'number' },
            { name: 'id_usuario', placeholder: 'Novo id do usuario'}
        ]
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const atualizarDados = (e) => {
        e.preventDefault()

        if (!idDigitado.trim()) {
            alert("Por favor, informe o ID do registro que deseja atualizar!")
            return
        }
        
        setCarregando(true)
        setErro(null)
        setResposta(null)

        fetch(`http://localhost:3000${rotaAtiva}/${idDigitado}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao atualizar o ID ${idDigitado} na rota ${rotaAtiva}`)
                }
                return response.json()
            })
            .then(data => {
                setResposta(data)
                setFormData({}) 
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
        <Accordion type="single" collapsible="true" className="bg-gray-800 w-3/4 rounded-3xl text-white overflow-hidden mb-4">
            <AccordionItem value="card-put" className="border-none">
                
                <AccordionTrigger className="flex items-center justify-between p-4 hover:no-underline cursor-pointer w-full">
                    <div className="flex items-center gap-4">
                        <p className="bg-yellow-500 px-3 py-1 rounded-md font-bold text-sm text-white">
                            PUT
                        </p>
                        <p className="font-medium">
                            Atualizar Registro <span className="text-xs text-gray-400">(Editar no Banco)</span>
                        </p>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="bg-gray-900/40 p-5 border-t border-gray-800">
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {rotasDisponiveis.map((rota) => (
                            <button
                                key={rota.path}
                                type="button"
                                onClick={() => {
                                    setRotaAtiva(rota.path)
                                    setFormData({})
                                    setResposta(null)
                                    setErro(null)
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                    rotaAtiva === rota.path
                                        ? 'bg-yellow-500 text-white font-bold' 
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {rota.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={atualizarDados} className="flex flex-col gap-3 mb-4 max-w-md">
                        
                        <div className="flex gap-2 items-center">
                            <span className="font-mono text-xs text-gray-400 bg-gray-950 px-2 py-2 rounded-lg border border-gray-800 shrink-0">
                                {rotaAtiva}/
                            </span>
                            <input
                                type="text"
                                placeholder="ID do registro para alterar"
                                value={idDigitado}
                                onChange={(e) => setIdDigitado(e.target.value)}
                                required
                                className="bg-gray-950 border border-gray-800 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2 text-yellow-200 outline-none font-bold"
                            />
                        </div>

                        <hr className="border-gray-800 my-1" />
                        <p className="text-xs text-gray-400">Novos valores para os campos:</p>

                        {camposPorRota[rotaAtiva].map((campo) => (
                            <input
                                key={campo.name}
                                type={campo.type || 'text'}
                                name={campo.name}
                                placeholder={campo.placeholder}
                                value={formData[campo.name] || ''}
                                onChange={handleInputChange}
                                required
                                className="bg-gray-950 border border-gray-800 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2 text-gray-200 outline-none"
                            />
                        ))}

                        <button
                            type="submit"
                            className="bg-yellow-600 hover:bg-yellow-400 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer w-full mt-1"
                        >
                            {carregando ? 'Atualizando...' : 'Atualizar Registro'}
                        </button>
                    </form>

                    <p className="text-gray-400 text-xs font-semibold mb-2">Resposta da API:</p>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs font-mono text-gray-200 overflow-x-auto max-h-60 border border-gray-900">
                        {carregando && "Enviando atualização para o servidor..."}
                        {erro && <span className="text-red-400">{erro}</span>}
                        {!carregando && !erro && !resposta && "Informe o ID, preencha os novos dados e envie."}
                        {!carregando && resposta && (
                            <div>
                                <p className="text-sky-400 font-bold mb-1">✓ Status 200: Registro Atualizado!</p>
                                {JSON.stringify(resposta, null, 2)}
                            </div>
                        )}
                    </pre>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default CardPut