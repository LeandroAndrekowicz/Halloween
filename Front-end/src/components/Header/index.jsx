import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='container-header'>
        <div className='container-logo'>
            <img className='img' src='./logo.png'/>
        </div>
        <div className='cabecalho'>
          <a href="/">Home</a>
          <a href="/buyTicket">Comprar Ticket</a>
          <a href="/ticket">Preencher Ticket</a>
        </div>
    </div>
  )
}

export default Header