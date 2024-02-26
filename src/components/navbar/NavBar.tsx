import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import homeLogo from '../../assets/home.png'
import { HouseSimple, Note, NotePencil, Notepad, SignIn, SignOut, User, UserCircle } from '@phosphor-icons/react'


function Navbar() {
  let navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)
  const location = useLocation()

  function logout(){
    handleLogout()
    alert('Usuário deslogado com sucesso!')
    navigate('/login')
  }

  let navbarComponent 

  return (
    <>
        <div className='w-full bg-red-300 text-white flex justify-center py-2 border-b-2 border-red-200'>
        <div className="container flex justify-end text-lg item-center text-sm uppercase">
        <div className='flex gap-1 items-center'>
        <div className='flex items-center'><div className='px-1'><UserCircle size={20} /></div><Link to='/cadastro' className={location.pathname === '/cadastro' ? 'font-bold text-red-500 uppercase': 'hover:underline'}>Cadastre-se</Link></div>
        <div className='flex px-1 items-center'><div className='px-1'><SignIn size={20} /></div><Link to='/login' className={location.pathname === '/login' ? 'font-bold text-red-500 uppercase': 'hover:underline'}>Login</Link></div></div>
        <div className='flex px-2 items-center'><div className='px-1'><SignOut size={20} /></div><Link to="" onClick={logout} className='hover:underline'>Sair</Link></div>
        <div className='flex gap-4 items-center'>
        </div>
        </div>
        </div>

     <div className='w-full bg-red-300 text-white flex justify-center py-2'>
          <div className="container flex justify-between text-lg">
            <div className="flex justify-left items-center"><img src={homeLogo} alt="" className='w-12 p-2' />
            <div className='text-2xl font-bold uppercase font-sans'>Blog Pessoal</div>
            </div>

            <div className='flex gap-4 items-center'>
            <div className='flex px-1 items-center'><div className='px-1'><HouseSimple size={20} /></div><Link to='/home' className={location.pathname === '/home' ? 'font-bold text-red-500 uppercase' : 'hover:underline'}>Home
            </Link></div>
            <div className='flex px-1 items-center'><div className='px-1'><Notepad size={20} /></div>
            <Link to='/postagens' className={location.pathname === '/postagens' ? 'font-bold text-red-500 uppercase' : 'hover:underline'}>Postagens</Link></div>
            <div className='flex px-1 items-center'><div className='px-1'><Note size={20} /></div>
            <Link to="/temas" className={location.pathname === '/temas' ? 'font-bold text-red-500 uppercase' : 'hover:underline'}>Temas</Link></div>
            <div className='flex px-1 items-center'><div className='px-1'><NotePencil size={20} /></div>
            <Link to="/cadastroTema" className={location.pathname === '/cadastroTema' ? 'font-bold text-red-500 uppercase' : 'hover:underline'}>Cadastrar tema</Link></div>
            <div className='flex px-1 items-center'><div className='px-1'><User size={20} /></div>
            <Link to="/perfil" className={location.pathname === '/perfil' ? 'font-bold text-red-500 uppercase' : 'hover:underline'}>Perfil</Link></div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar