import React, { useEffect, useState } from 'react';
import './Content.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Counter = ({ label, count, setCount, handleIncrement, handleDecrement, handleInputChange }) => (
  <div className="container-card">
        <div>
            <h3>{label}</h3>
            <p>{label === 'Crianças' ? '11 A 16 ANOS' : label === 'Adulto' ? '16 A 60 ANOS' : label === 'Senior' ? 'ACIMA DE 60 ANOS' : 'SAIBA MAIS'}</p>
        </div>
        <div className="container-quantidade">
            <button onClick={handleIncrement}>+</button>
            <input type="number" min={0} value={count} onChange={handleInputChange} />
            <button onClick={handleDecrement}>-</button>
        </div>
    </div>
);

const Content = () => {
  const [startDate] = useState(new Date());
  const [selected, setSelected] = useState(null);
  const [criancas, setCriancas] = useState(0);
  const [adultos, setAdultos] = useState(0);
  const [idosos, setIdosos] = useState(0);
  const [pcd, setPcd] = useState(0);
  const [subtotalCriancas, setSubtotalCriancas] = useState(0);
  const [subtotalAdultos, setSubtotalAdultos] = useState(0);
  const [subtotalIdosos, setSubtotalIdosos] = useState(0);
  const [subtotalPcd, setSubtotalPcd] = useState(0);

  const [dadosPessoais, setDadosPessoais] = useState({});

  const precoCriancas = 35;
  const precoAdultos = 50; 
  const precoIdosos = 45;  
  const precoPcd = 40;  

  const calcularSubtotal = (quantidade, preco) => quantidade * preco;

  const atualizarSubtotais = () => {
    setSubtotalCriancas(calcularSubtotal(criancas, precoCriancas));
    setSubtotalAdultos(calcularSubtotal(adultos, precoAdultos));
    setSubtotalIdosos(calcularSubtotal(idosos, precoIdosos));
    setSubtotalPcd(calcularSubtotal(pcd, precoPcd));
  };

  const totalGeral = subtotalCriancas + subtotalAdultos + subtotalIdosos + subtotalPcd;


  useEffect(() =>{
    atualizarSubtotais();
  })


  const handleIncrement = (setFunction) => () => {
    setFunction((count) => count + 1);
  };

  const handleDecrement = (setFunction) => () => {
    setFunction((count) => (count !== 0 ? count - 1 : 0));
  };

  const handleInputChange = (setFunction) => (e) => {
    const value = Number(e.target.value);
    setFunction(isNaN(value) ? 0 : value);
  };

  return (
    <div className="container-content">
        <div className="container-data">
            <div className="container-abobora">
                <img src="./abobora.png" alt="Abóbora" />
                <h2>Escolha a data</h2>
            </div>
            <div className="container-calendar">
                <DatePicker selected={selected} onChange={(date) => setSelected(date)} dateFormat="dd/MM/yyyy" minDate={startDate} className="calendario" />
            </div>
        </div>
        <div className="container-pessoa">
            <div className="container-abobora">
                <img src="./pessoa.png" alt="Pessoa" />
                <h2>Quantas pessoas?</h2>
            </div>
            <div className="container-quantidadePessoas">
                <Counter
                    label="Crianças"
                    count={criancas}
                    setCount={setCriancas}
                    handleIncrement={handleIncrement(setCriancas)}
                    handleDecrement={handleDecrement(setCriancas)}
                    handleInputChange={handleInputChange(setCriancas)}
                />
                <Counter
                    label="Adulto"
                    count={adultos}
                    setCount={setAdultos}
                    handleIncrement={handleIncrement(setAdultos)}
                    handleDecrement={handleDecrement(setAdultos)}
                    handleInputChange={handleInputChange(setAdultos)}
                />
                <Counter
                    label="Senior"
                    count={idosos}
                    setCount={setIdosos}
                    handleIncrement={handleIncrement(setIdosos)}
                    handleDecrement={handleDecrement(setIdosos)}
                    handleInputChange={handleInputChange(setIdosos)}
                />
                <Counter
                    label="Pessoa com Deficiência"
                    count={pcd}
                    setCount={setPcd}
                    handleIncrement={handleIncrement(setPcd)}
                    handleDecrement={handleDecrement(setPcd)}
                    handleInputChange={handleInputChange(setPcd)}
                />
            </div>
        </div>
        <div className="container-dadosPessoais">
            <div className='container-abobora'>
                <img src="./dadosPessoais.png" alt="Dados pessoais" />
                <h2>Dados Pessoais</h2>
            </div>
            <div className='dadosPessoais'>
                <label>Nome</label>
                <input type="text" placeholder="Nome" />
                <label>CPF</label>
                <input type="text" placeholder="CPF" />

                <div className='valor'>
                    <p>R$ {totalGeral}</p>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Content;
