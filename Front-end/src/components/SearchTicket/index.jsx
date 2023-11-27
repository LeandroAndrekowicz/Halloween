import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './SearchTicket.css'
import Header from '../Header';
import Ticket from './Ticket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound'
import EditTicket from './EditTicket';
import { async, timer } from 'rxjs';

const SearchTicket = () => {
  const [cpf, setCpf] = useState(''); 
  const [haveTicket, setHaveTicket] = useState(false);
  const [data, setData] = useState([]);
  const [completeTicket, setCompleteTicket] = useState(false);
  const [ingressos, setIngressos] = useState([]);
  const [playSound] = useSound('./Music.mp4');
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    playSound();
  }, [playSound]);


  const buscaIngressosPreenchidos = async (id) => {
    try {
     
      const response = await axios.get(`http://localhost:3000/findAll/ingressoPreenchido/${id}`);
      setIngressos(response.data);

      setLoading(false);
      return response.data.complete === true; 
    } catch (error) {
      console.error('Erro ao buscar os ingressos:', error);
    }
  };


  useEffect(() => {
    if (data && data.ingresso) {
      const hasCompleteTicket = data.ingresso.some(item => item.complete === true);
      const hasIncompleteTicket = data.ingresso.some(item => item.complete === false);
  
      if (hasCompleteTicket) {
        timer(2000).subscribe(() => {
          let id = '';
          data.ingresso.filter((item) => {
            id = item.id
          })

          buscaIngressosPreenchidos(id);
        });
        setCompleteTicket(true);
      } else if (hasIncompleteTicket) {
        setCompleteTicket(false);
        setHaveTicket(true);
        setLoading(false);
      } else {
        setCompleteTicket(false);
        setHaveTicket(false);
        setLoading(false);
      }
    }
  }, [data]);
  
  const buscaIngressos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/findAll/ingresso/${cpf}`);
      setLoading(true)
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
                <h2 className={haveTicket || completeTicket  ? 'clear' : 'container-input'}>Digite seu Cpf</h2>
                <h2 className={haveTicket  ? 'container-input' : 'clear'}>Preencha Seus Ingressos</h2>
                <h2 className={completeTicket ? 'container-input' : 'clear'}>Edite seus ingressos</h2>
            </div>
            <div className={haveTicket || completeTicket ? 'clear' : 'container-input'}>
                <input
                    type="text"
                    placeholder="cpf"
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)}
                />
                <button onClick={buscaIngressos}>Buscar</button>
            </div>
            <>
              {
                loading && (
                  <div className='container-loading'>
                    <h2>loading</h2>
                    <img src="./loading.gif" alt="Loading Gif" />
                  </div>
                )
                
              }
              {
                haveTicket && data && data.ingresso && (
                  <div className='cards'>
                    <Ticket data={data.ingresso} />
                  </div>
                )
              }
            </>

            {
              completeTicket && (
                <div className='cards'>
                  <EditTicket data={ingressos.ingresso} />
                </div>
              )
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
