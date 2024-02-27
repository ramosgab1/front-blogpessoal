import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import loginLogo from '../../assets/capa_perfil.png';
import { toastAlerta } from '../../util/toastAlerta/toastAlerta';

function Perfil() {
  let navigate = useNavigate();

  // Obtém o contexto de autenticação
  const { usuario } = useContext(AuthContext);

  // URL da imagem padrão
  const defaultProfilePhotoUrl = 'https://64.media.tumblr.com/44969dac1a7a0ebbd3e61eaba18eb719/d4130b6e75c130a0-a5/s500x750/5fa4eb002059d74cc968c1234f41fa21f3dfbbb9.jpg';

  // Verifica se o usuário está logado ao montar o componente
  useEffect(() => {
    if (!usuario.token) {
      // Se não estiver logado, exibe um alerta e redireciona para a página de login
      toastAlerta('Você precisa estar logado', 'info'); //Informa o tipo de toastAlerta "info".
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  // Verifica se o campo usuario.foto está vazio ou não
  const fotoUsuario = usuario.foto ? usuario.foto : defaultProfilePhotoUrl;

  // Renderiza o componente
  return (
    <div className='container mx-auto mt-4 rounded-2xl overflow-hidden'>
      {/* Exibe a imagem de capa */}
      <img className='w-full h-72 object-cover border-b-8 border-white' src={loginLogo} alt="Capa do Perfil" />
      {/* Exibe a foto de perfil do usuário */}
      <img src={usuario.foto !="" ? usuario.foto : defaultProfilePhotoUrl} alt={`Foto de perfil de ${usuario.nome}`} className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' />
      {/* Exibe o nome e o email do usuário */}
      <div className="relative mt-[-6rem] h-72 flex flex-col bg-red-300 text-white text-2xl items-center justify-center">
        <p><div className="inline-block uppercase underline text-red-500">Nome:</div> {usuario.nome} </p>
        <p><div className="inline-block uppercase underline text-red-500">E-mail:</div> {usuario.usuario}</p>
      </div>
    </div>
  );
}

export default Perfil;