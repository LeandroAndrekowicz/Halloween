import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchTicket.css';
import axios from 'axios';
import { async } from 'rxjs';
import { mask } from '../Mascaras/CpfValidator';

const EditTicket = ({ data }) => {
  const [ingresso, setIngresso] = useState([]);

  useEffect(() => {
    setIngresso(data);
  }, [data]);

  const isValidDate = (dateString) => {
    return !isNaN(new Date(dateString));
  };

  const IngressoCard = ({ item }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const [cpf, setCpf] = useState(item.cpf);
    const [nome, setNome] = useState(item.nome);
    const [id] = useState(item.id);

    const handleNomeChange = (event) => {
      setNome(event.target.value);
    };

    const handleCPFChange = (event) => {
      setCpf(mask(event.target.value));
    };
  
    const editData = async () =>{
      try {
        const converteData = new Date(selectedDate).toISOString().split('T')[0];
        if(nome !== item.nome || cpf !== item.cpf || converteData !== item.dataNascimento){
          const response = await axios.patch(`http://localhost:3000/edit/ingresso/`, {cpf: cpf, nome: nome, dataNascimento: converteData, idIngresso: id});

          toast.success('Ingresso editado com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          return response;
        }
        else {
          toast.error('Edite pelo menos algum campo!', {
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
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    }


    useEffect(() => {
      if (isValidDate(item.dataNascimento)) {
        const date = new Date(item.dataNascimento);
        const adjustedDate = new Date(date.getTime() + localOffset);
        setSelectedDate(adjustedDate);
      } else {
        setSelectedDate(null); 
      }
    }, [item.dataNascimento]);

    return (
      <div className='cardPreenchido'>
        <div className='informaçao'>
          <div className='card' key={item.id}>
            <h3>Nome</h3>
            <input type="text" value={nome} onChange={handleNomeChange}/>
            <h3>CPF</h3>
            <input type="text" value={cpf} onChange={handleCPFChange}/>
            <h3>Data de Nascimento</h3>
            <div className='calendarioPreenchido'>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                className="calendario"
                id='calendarioPreenchido'
                utcOffset={0}
              />
            </div>
            <button onClick={editData}>Salvar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container-cardPreenchido'>
      {ingresso !== undefined && (
        <div className='container-cardsPreenchido'>
          {ingresso.map((item) => (
              <IngressoCard key={item.id} item={item} />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default EditTicket;
