import React, { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import CardTemas from '../cardTemas/CardTemas';
import { toastAlerta } from '../../../util/toastAlerta/toastAlerta';


// Organizando a lógica do ListaTemas. Estrutura do hook useState. O useState será responsável por armazenar um array que contém objetos com a estrutura de nossa model Temas (id e descrição) e deve começar vazio, logo []. Não esquecer de importar Tema. 


function ListaTemas(){
    const [temas, setTemas] = useState<Tema[]>([]);
    const navigate = useNavigate();

    // Constante que irá acessar nosso Contexto e importar state Usuário e função handleLogout. Queremos apenas o token para validar o acesso e se o usuário está logado, por isso criaremos uma constante chamada token. 

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Função assincrona (revisão: ela permite que você continue executando seu código sem ter que parar e esperar por algo como uma requisição de rede terminar) que buscará os temas que estão no backend. Dentro dela, try catch para trabalhar possíveis erros ao fazer requisição ao backend. O buscar faz a requisição de busca no back, lembrar do token de validação. Caso o token esteja expirado, devemos indicar ao usuário. Error: any se refere a qualquer erro - 403 é FORBIDDEN, e ali ele vê se inclui o código do erro, indicando que, neste caso, o token está inválido e então o sistema deve deslogar o usuário. 

    async function buscarTemas(){
         try{
            await buscar('/temas', setTemas, {
                headers:{
                    Authorization: token
                },
            });
    } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info') //Informa o tipo de toastAlerta "info".
          handleLogout()
        }
    }
    }

    // Adiciona-se um useEffect para verificar se o usuário está logado. Caso não esteja, o usuário será informado da necessidade de login e token. 

    useEffect(() => {
        if (token === '') {
          toastAlerta('Você precisa estar logado', 'info'); //Informa o tipo de toastAlerta "info".
          navigate('/login');
        }
      }, [token]);
    
      useEffect(() => {
        buscarTemas();
      }, [temas.length]);
      return (
        <>
          {temas.length === 0 && (
            <Dna
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper mx-auto"
            />
          )}
          <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {temas.map((tema) => (
                  <>
                    <CardTemas key={tema.id} tema={tema} />
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }
    
    export default ListaTemas;