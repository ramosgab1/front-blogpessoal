import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import loginLogo from '../../assets/login.jpg'

function Perfil() {
  let navigate = useNavigate()

  // Obtém o contexto de autenticação
  const { usuario } = useContext(AuthContext)

  // Verifica se o usuário está logado ao montar o componente
  useEffect(() => {
    if (usuario.token === "") {
      // Se não estiver logado, exibe um alerta e redireciona para a página de login
      alert('Você precisa estar logado')
      navigate("/login")
    }
  }, [usuario.token])

  // Renderiza o componente
  return (
    <div className='container mx-auto mt-4 rounded-2xl overflow-hidden'>
      {/* Exibe a imagem de capa */}
      <img className='w-full h-72 object-cover border-b-8 border-white' src={loginLogo} alt="Capa do Perfil" />
      {/* Exibe a foto de perfil do usuário */}
      <img src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' />
      {/* Exibe o nome e o email do usuário */}
      <div className="relative mt-[-6rem] h-72 flex flex-col bg-red-300 text-white text-2xl items-center justify-center">
        <p>Nome: {usuario.nome} </p>
        <p>Email: {usuario.usuario}</p>
      </div>
    </div>
  )
}

export default Perfil