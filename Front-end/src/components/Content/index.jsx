import React, { useState } from 'react'
import './Content.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Content = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selected, setSelected] = useState(null)
    const [quantidade, setQuantidade] = useState({
        criancas: 0,
        adultos: 0,
        senior: 0,
        pcd: 0
    });

    console.log(quantidade);


  return (
    <div className='container-content'>
        <div className='container-data'>
            <div className='container-abobora'>
                <img src="./abobora.png" alt="Abobora" />
                <h2>Escolha a data</h2>
            </div>
            <div className='container-calendar'>
                <DatePicker selected={selected} onChange={ date => setSelected(date)} dateFormat="dd/MM/yyyy" minDate={startDate} className='calendario' />
            </div>
        </div>
        <div className='container-pessoa'>
            <div className='container-abobora'>
                <img src="./pessoa.png" alt="Pessoa" />
                <h2>Quantas pessoas?</h2>
            </div>
            <div className='container-quantidadePessoas'>
                <div className='container-card'>
                    <div>
                        <h3>CRIANÇAS</h3>
                        <p>11 A 16 ANOS</p>
                    </div>
                    <div className='container-quantidade'>
                        <span onClick={() => setQuantidade({criancas: quantidade.criancas + 1})}>+</span>
                        <input type="number" />
                        <span onClick={() => setQuantidade({criancas: quantidade.criancas - 1})}>-</span>
                    </div>
                </div>
            <div className='container-quantidadePessoas'>
                <div className='container-card'>
                    <div>
                        <h3>ADULTO</h3>
                        <p>16 A 60 ANOS</p>
                    </div>
                    <div className='container-quantidade'>
                        <span onClick={() => setQuantidade({adultos: quantidade.adultos + 1})}>+</span>
                        <input type="number" />
                        <span onClick={() => setQuantidade({adultos: quantidade.adultos - 1})}>-</span>
                    </div>
                </div>
            </div>
            <div className='container-quantidadePessoas'>
                <div className='container-card'>
                    <div>
                        <h3>SENIOR</h3>
                        <p>ACIMA DE 60 ANOS</p>
                    </div>
                    <div className='container-quantidade'>
                        <span>+</span>
                        <input type="number" />
                        <span>-</span>
                    </div>
                </div>
            </div>
            <div className='container-quantidadePessoas'>
                <div className='container-card'>
                    <div>
                        <h3>PESSOA COM DEFICIÊNCIA</h3>
                        <p>SAIBA MAIS</p>
                    </div>
                    <div className='container-quantidade'>
                        <span>+</span>
                        <input type="number" />
                        <span>-</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className='container-dadosPessoais'>

        </div>
    </div>
  )
}

export default Content