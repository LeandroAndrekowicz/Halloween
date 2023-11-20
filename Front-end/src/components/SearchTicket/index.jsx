import React, { useState } from 'react';
import axios from 'axios'; 
import './SearchTicket.css'
import Header from '../Header';
import Ticket from './Ticket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchTicket = () => {
  const [cpf, setCpf] = useState(''); 
  const [haveTicket, setHaveTicket] = useState(false);
  const [data, setData] = useState();


  const buscaIngressos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/findAll/ingresso/${cpf}`);
      setHaveTicket(true);
      setData(response.data);
    } catch (error) {
      console.error('Erro na solicitação:', error);
      toast.error('Não foram encontrados ingressos com esse CPF', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <>
        <Header />
        <div className='container-ticket'>
            <div className='container-titulo'>
                <h2>Preencha seu Ingresso</h2>
            </div>
            <div className={haveTicket ? 'clear' : 'container-input'}>
                <input
                    type="text"
                    placeholder="cpf"
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)}
                />
                <button onClick={buscaIngressos}>Buscar</button>
            </div>
            {
                haveTicket && 
                <div className='cards'>
                    <Ticket data={data.ingresso}/>
                </div>
            }
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </>
  );
};

export default SearchTicket;