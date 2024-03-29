import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'


const defaultProfilePhotoUrl = 'https://64.media.tumblr.com/44969dac1a7a0ebbd3e61eaba18eb719/d4130b6e75c130a0-a5/s500x750/5fa4eb002059d74cc968c1234f41fa21f3dfbbb9.jpg';

interface CardPostagemProps {
    post: Postagem
  }
  
  function CardPostagem({post}: CardPostagemProps) {
    return (
      <div className='border-red-400 border flex flex-col rounded overflow-hidden justify-between'>
        <div>
          <div className="flex w-full bg-red-300 py-2 px-4 items-center gap-4">
            <img src={post.usuario?.foto !="" ? post.usuario?.foto : defaultProfilePhotoUrl} className='h-12 rounded-full' alt="" />
            <h3 className='text-lg font-bold text-center uppercase '>{post.usuario?.nome}</h3>
          </div>
          <div className='p-4 '>
            <h4 className='text-lg font-semibold uppercase'>{post.titulo}</h4>
            <p>{post.texto}</p>
            <p>Tema: {post.tema?.descricao}</p>
            <p>Data: {new Intl.DateTimeFormat(undefined, {
                      dateStyle: 'full',
                      timeStyle: 'medium',
                    }).format(new Date(post.data))}</p>
          </div>
        </div>
        <div className="flex">
        <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-green-400 hover:bg-green-700 flex items-center justify-center py-2'>
            <button>Editar</button>
          </Link>
          <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 hover:bg-red-400 w-full flex items-center justify-center'>
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    )
  }
  
  export default CardPostagem