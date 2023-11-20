import React, { useEffect } from 'react'
import './SearchTicket.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { timer } from 'rxjs';



const Ticket = ({data}) => {
  const [selected, setSelected] = useState(null);
  const [cont, setCont] = useState(1);
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [ingressoId, setIngressoId] = useState('');
  const [quantiadeIngressos, setQuantiadeIngressos] = useState(0);

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const dataMap = () =>{
    data.map((item) =>{
      setIngressoId(item.id);
      setQuantiadeIngressos(item.quantidade);
    })
  }

  useEffect(() =>{
    dataMap();
  })
  
  const preencheTicket = async () => {
    try {
      if(cpf !== '' && nome !== '' && selected !== null) {
        const dataNascimento = new Date(selected).toISOString().split('T')[0];

        const response = await axios.post(`http://localhost:3000/create/ingressoPreenchido`, {ingressoId: ingressoId, cpf: cpf, nome: nome, dataNascimento: dataNascimento});

        if(cont === quantiadeIngressos){
          toast.success('Todos ingressos preenchidos', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

            timer(3000).subscribe(() => {
              window.location.assign('/');
            });
            
        }
        else{
          setCont(cont + 1)
        }

        return response;
      }

    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  }

  return (
  <>
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
        theme="dark" />
      <div className='container-card'>
        <div className='container-informaçoes'>
          <div className='informaçoes'>
            <h5>ingresso {cont} de {quantiadeIngressos}</h5>
            <h3>CPF</h3>
            <input type="text" value={cpf} onChange={handleCpfChange} placeholder='cpf' />
            <h3>Nome</h3>
            <input type='text' value={nome} onChange={handleNomeChange} placeholder='nome' />
            <h3>Data de nascimento</h3>
            <DatePicker
                selected={selected}
                onChange={(date) => setSelected(date)}
                dateFormat="dd/MM/yyyy"
                className="calendario"
                id='calendario' />
            <button className='ghst-btn' onClick={preencheTicket}>Salvar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ticket