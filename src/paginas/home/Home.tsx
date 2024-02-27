import { Link } from 'react-router-dom';
import homeLogo from '../../assets/home_logo.png'
import ListaPostagens from '../../components/postagens/listaPostagem/ListaPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem.tsx/ModalPostagem';
import './Home.css';


function Home() {
    return (
        <>
        <div className="bg-red-300 flex justify-center py-5">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold'>Seja bem vinde!</h2>
              <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>
  
              <div className="flex justify-around gap-4">
              <ModalPostagem />
              <Link to="/postagens" className='rounded bg-white text-red-500 py-2 px-4'>Ver postagens</Link>
            </div>
          </div>

          <div className="flex justify-center ">
            <img src={homeLogo} alt="" className='w-1/2' />
    
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  );
}

export default Home;