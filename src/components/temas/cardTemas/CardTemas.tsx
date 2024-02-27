import React from 'react'
import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema';

// Adicionamos as props fazendo a inteface. A única propriedade da interface é "tema", e seu tipo será a MODEL "Tema", ou seja,  a propridade será um objeto com seus campos de descrição baseados no modelo "Tema", contendo id e descrição.

interface CardTemasProps {
    tema: Tema
}

// Passamos a config para o componente, desestruturando a props dentro do function CardTemas () ao abrir chaves e então acessando a propriedade que criamos da CardTemasProps, indicando que o componente CardTemas terá uma propridade chamada "tema" que será um objeto com os campos id e descrição, representando cada um dos temas que cadastraremos, logo o que era apenas function CardTemas() ficará:

function CardTemas({ tema }: CardTemasProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-red-300 text-white font-bold text-2xl'>Tema</header>
            
            {/* Agora podemos usar a props para funcionamento do componente e aqui onde antes estava a descrição estática de "DESCRIÇÃO TEMA:" substituímos pelo código { tema.descricao } que trará um texto dinâmico.  */}

            <p className='p-8 text-3xl bg-slate-200 h-full'>{ tema.descricao }</p>
            <div className='flex'>
                {/* Aqui precisamos passar o link para a edição de tema, ou seja, a rota editar. Sendo assim, o que era apenas Link to='' deve virar Link to='/editarTema'. OBS IMPORTANTE!! NESSE LINK TO USAMOS CRASE AO INVÉS DE ASPA PQ A ROTA É DA API. CRASE = ROTA API, ASPAS = ROTA INTERNA DO ROUTER-DOM!!*/}

            
               <Link to={`/editarTema/${ tema.id }`} className='w-full text-slate-100 bg-green-400 hover:bg-green-700 flex items-center justify-center py-2'>
                <button>Editar</button>
                </Link> 

                {/* Editar = Atualizar tema acima. Deletar = Deletar tema abaixo.  */}

                <Link to={`/deletarTema/${ tema.id }`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center py-2'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    );
}

export default CardTemas