import React, { useEffect, useState } from 'react';
import './Content.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Header from '../Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import { timer } from 'rxjs';
import { mask } from '../Mascaras/CpfValidator';


const Counter = ({ label, count, setCount, handleIncrement, handleDecrement, handleInputChange }) => (
  <div className="container-cardss">
        <div>
            <h3>{label}</h3>
            <p>{label === 'Crianças' ? '11 A 16 ANOS' : label === 'Adulto' ? '16 A 60 ANOS' : label === 'Senior' ? 'ACIMA DE 60 ANOS' : 'SAIBA MAIS'}</p>
        </div>
        <div className="container-quantidade">
            <button onClick={handleDecrement}>-</button>
            <input type="number" min={0} value={count} onChange={handleInputChange} />
            <button onClick={handleIncrement}>+</button>
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

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [playSound] = useSound('./Music.mp4');

  useEffect(() =>{
      playSound();
  })

  const saveData = async () =>{
    try {
        const converteData = new Date(selected).toISOString().split('T')[0];
        const quantidade = criancas + adultos + idosos + pcd
        const complete = false

        if(cpf !== '' && nome !== '' && totalGeral !== 0 && selected !== null && quantidade !== 0){
          const response = await axios.post(`http://localhost:3000/create/ingresso`, {cpf: cpf, nome: nome, valor: totalGeral, data: converteData, quantidade: quantidade});

          toast.success('Ingresso adquirido com sucesso!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

                
          timer(3000).subscribe(() =>{
            window.location.assign('/ticket')
          })
        }

        else{
            toast.error('Preencha todos os campos!', {
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

        return
    } catch (error) {
        
    }
  }

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

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleCPFChange = (event) => {
    setCpf(mask(event.target.value));
  };


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
    <>
        <Header />
        <div className="container-content">
            <div className="container-data">
                <div className="container-abobora">
                    <img src="./calendario.png" alt="Calendario" />
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
                    <input type="text" placeholder="Nome" value={nome} onChange={handleNomeChange} />
                    <label>CPF</label>
                    <input type="text" placeholder="CPF" value={cpf} onChange={handleCPFChange} />

                    <div className='valor'>
                        <p>R$ {totalGeral}</p>
                    </div>
                    <div className='botao'>
                        <button onClick={saveData}>Finalizar</button>
                    </div>
                </div>
            </div>
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

export default Content;
