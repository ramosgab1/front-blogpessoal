import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../util/toastAlerta/toastAlerta'

function DeletarPostagem() {
  // Estado para armazenar os dados da postagem a ser deletada
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  // Função para buscar os dados da postagem pelo id
  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info') //Informa o tipo de toastAlerta "info".
        handleLogout()
      }
    }
  }

  // Verifica se o usuário está logado
  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info')  //Informa o tipo de toastAlerta "info".
      navigate('/login')
    }
  }, [token])

  // Busca os dados da postagem ao montar o componente
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  // Navega de volta para a lista de postagens
  function retornar() {
    navigate("/postagens")
  }

  // Deleta a postagem
  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      toastAlerta('Postagem apagada com sucesso', 'sucesso') //Informa o tipo de toastAlerta "sucesso".

    } catch (error) {
      toastAlerta('Erro ao apagar a Postagem', 'erro') //Informa o tipo de toastAlerta "erro".
    }

    retornar()
  }

  // Renderiza o componente
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-red-300 text-white font-bold text-2xl'>Postagem</header>
        <div className="p-4">
          <p className='text-xl h-full'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
          <button className='w-full text-slate-100 bg-green-400 hover:bg-green-700 flex items-center justify-center' onClick={deletarPostagem}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem