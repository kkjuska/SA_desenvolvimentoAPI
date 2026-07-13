import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function CardPost() {
    const [rotaAtiva, setRotaAtiva] = useState('/item')
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
            { name: 'nome', placeholder: 'Nome do Item (ex: Teclado)' },
            { name: 'Quantidade', placeholder: 'Numero (ex: 5)', type: 'number' }
        ],
        '/cat': [
            { name: 'nome', placeholder: 'Nome da Categoria (ex: Eletrônicos)' },
            { name: 'id_item', placeholder: 'Id do item (ex: 1)' }
        ],
        '/user': [
            { name: 'email', placeholder: 'E-mail (ex: lucas@email.com)', type: 'email' },
            { name: 'senha', placeholder: 'Senha de Acesso', type: 'password' },
            { name: 'id_item', placeholder: 'Id do item pego'}
        ],
        '/setor': [
            { name: 'nome', placeholder: 'Nome do Setor (ex: TI)' },
            { name: 'quantidade', placeholder: 'quantidade de trabalhadores no setor', type: "number" },
            { name: 'id_usuario', placeholder: 'Id do usuario'}
        ]
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const enviarDados = (e) => {
        e.preventDefault()
        setCarregando(true)
        setErro(null)
        setResposta(null)

        fetch(`http://localhost:3000${rotaAtiva}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao cadastrar na rota ${rotaAtiva}`)
                }
                return response.json()
            })
            .then(data => {
                setResposta(data)
                setFormData({})
                setCarregando(false)
            })
            .catch(err => {
                console.error(err)
                setErro(err.message)
                setCarregando(false)
            })
    }

    return (
       <Accordion type="single" collapsible="true" className="bg-gray-800 w-3/4 rounded-3xl text-white overflow-hidden">
            <AccordionItem value="card-post" className="border-none">
                
                <AccordionTrigger className="flex items-center justify-between p-4 hover:no-underline cursor-pointer w-full">
                    <div className="flex items-center gap-4">
                        <p className="bg-[#10B981] px-3 py-1 rounded-md font-bold text-sm text-white">
                            POST
                        </p>
                        <p className="font-medium">
                            Criar Novo Registro <span className="text-xs text-gray-400">(Inserir no Banco)</span>
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
                                        ? 'bg-[#10B981] text-white font-bold' 
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {rota.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={enviarDados} className="flex flex-col gap-3 mb-4 max-w-md">
                        <p className="text-xs text-gray-400">
                            Preencha os campos para a rota: <span className="text-green-400 font-mono font-bold">{rotaAtiva}</span>
                        </p>
                        
                        {camposPorRota[rotaAtiva].map((campo) => (
                            <input
                                key={campo.name}
                                type={campo.type || 'text'}
                                name={campo.name}
                                placeholder={campo.placeholder}
                                value={formData[campo.name] || ''}
                                onChange={handleInputChange}
                                required
                                className="bg-gray-950 border border-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 text-green-400 outline-none"
                            />
                        ))}

                        <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer w-full mt-1"
                        >
                            {carregando ? 'Cadastrando...' : 'Enviar Registro'}
                        </button>
                    </form>

                    <p className="text-gray-400 text-xs font-semibold mb-2">Resposta da API:</p>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs font-mono text-green-400 overflow-x-auto max-h-60 border border-gray-900">
                        {carregando && "Enviando dados para o servidor..."}
                        {erro && <span className="text-red-400">{erro}</span>}
                        {!carregando && !erro && !resposta && "Preencha o formulário e envie."}
                        {!carregando && resposta && (
                            <div>
                                <p className="text-emerald-400 font-bold mb-1">✓ Status 201: Cadastrado com Sucesso!</p>
                                {JSON.stringify(resposta, null, 2)}
                            </div>
                        )}
                    </pre>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default CardPost