import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Função para exibir um alerta toast de acordo com o tipo especificado
export function toastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {
    case 'sucesso':
      // Exibe um toast de sucesso com a mensagem especificada
      toast.success(mensagem, {
        position: 'top-right',     // Posição do toast
        autoClose: 2000,           // Tempo de fechamento automático em milissegundos (2 segundos)
        hideProgressBar: false,    // Esconder a barra de progresso
        closeOnClick: true,        // Fechar o toast ao clicar nele
        pauseOnHover: false,       // Pausar fechamento automático ao passar o mouse sobre o toast
        draggable: false,          // Permitir arrastar o toast
        theme: 'colored',          // Tema do toast
        progress: undefined,       // Configuração da barra de progresso (undefined para padrão)
      });
      break;

    case 'info':
      // Exibe um toast de informação com a mensagem especificada
      toast.info(mensagem, {
        position: 'top-right',     // Posição do toast
        autoClose: 2000,           // Tempo de fechamento automático em milissegundos (2 segundos)
        hideProgressBar: false,    // Esconder a barra de progresso
        closeOnClick: true,        // Fechar o toast ao clicar nele
        pauseOnHover: false,       // Pausar fechamento automático ao passar o mouse sobre o toast
        draggable: false,          // Permitir arrastar o toast
        theme: 'colored',          // Tema do toast
        progress: undefined,       // Configuração da barra de progresso (undefined para padrão)
      });
      break;

    case 'erro':
      // Exibe um toast de erro com a mensagem especificada
      toast.error(mensagem, {
        position: 'top-right',     // Posição do toast
        autoClose: 2000,           // Tempo de fechamento automático em milissegundos (2 segundos)
        hideProgressBar: false,    // Esconder a barra de progresso
        closeOnClick: true,        // Fechar o toast ao clicar nele
        pauseOnHover: false,       // Pausar fechamento automático ao passar o mouse sobre o toast
        draggable: false,          // Permitir arrastar o toast
        theme: 'colored',          // Tema do toast
        progress: undefined,       // Configuração da barra de progresso (undefined para padrão)
      });
      break;

    default:
      // Se o tipo não for reconhecido, exibe um toast de informação com a mensagem especificada
      toast.info(mensagem, {
        position: 'top-right',     // Posição do toast
        autoClose: 2000,           // Tempo de fechamento automático em milissegundos (2 segundos)
        hideProgressBar: false,    // Esconder a barra de progresso
        closeOnClick: true,        // Fechar o toast ao clicar nele
        pauseOnHover: false,       // Pausar fechamento automático ao passar o mouse sobre o toast
        draggable: false,          // Permitir arrastar o toast
        theme: 'colored',          // Tema do toast
        progress: undefined,       // Configuração da barra de progresso (undefined para padrão)
      });
      break;
  }
}