import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';

function FormularioPostagem() {
  let navigate = useNavigate(); // Hook para navegação

  const { id } = useParams<{ id: string }>(); // Obtém o id da postagem da URL

  const { usuario, handleLogout } = useContext(AuthContext); // Contexto de autenticação
  const token = usuario.token; // Token de autenticação do usuário

  const [temas, setTemas] = useState<Tema[]>([]); // Estado para armazenar os temas disponíveis
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' }); // Estado para armazenar o tema selecionado
  const [postagem, setPostagem] = useState<Postagem>({ // Estado para armazenar os dados da postagem
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null,
  });

  // Função para buscar uma postagem pelo id
  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, { headers: { Authorization: token } });
  }

  // Função para buscar um tema pelo id
  async function buscarTemaPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, { headers: { Authorization: token } });
  }

  // Função para buscar todos os temas disponíveis
  async function buscarTemas() {
    await buscar('/temas', setTemas, { headers: { Authorization: token } });
  }

  // Efeito que verifica se o usuário está logado
  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  // Efeito que carrega os temas e, se necessário, a postagem pelo id
  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  // Efeito que atualiza a postagem com o tema selecionado
  useEffect(() => {
    setPostagem({ ...postagem, tema: tema });
  }, [tema]);

  // Função para atualizar o estado da postagem com os dados dos inputs do formulário
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  // Função para retornar à página de listagem de postagens
  function retornar() {
    navigate('/postagens');
  }

  // Função para cadastrar ou editar uma postagem
  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id != undefined) {
      // Editar postagem
      try {
        await atualizar(`/postagens`, postagem, setPostagem, { headers: { Authorization: token } });
        alert('Postagem atualizada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar a Postagem');
        }
      }
    } else {
      // Cadastrar postagem
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, { headers: { Authorization: token } });
        alert('Postagem cadastrada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrar a Postagem');
        }
      }
    }
  }

  // Verifica se o tema está carregando
  const carregandoTema = tema.descricao === '';

  // Renderiza o formulário de cadastro/edição de postagem
  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione um tema</option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>{tema.descricao}</option>
            ))}
          </select>
        </div>
        <button disabled={carregandoTema} type='submit' className='rounded disabled:bg-slate-200 bg-green-400 hover:bg-green-700 text-white font-bold w-1/2 mx-auto block py-2'>
          {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
