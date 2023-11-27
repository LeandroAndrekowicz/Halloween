import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchTicket.css';


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
            <input type="text" value={item.nome}/>
            <h3>CPF</h3>
            <input type="text" value={item.cpf}/>
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
