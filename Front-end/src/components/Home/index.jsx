import React from 'react'
import Header from '../Header'
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './Home.css'

const index = () => {
  return (
    <>
        <Header />
        <div className='container-home'>
            <h2>NOSSAS ATRAÇÕES</h2>
            <div className='container-carousel'>
                <Carousel showArrows={false} showStatus={false} showThumbs = {false} autoPlay={true} transitionTime={3000} interval={5000} infiniteLoop={true} className='carousel'>
                    <div>
                        <img src="./carousel1.jpg" />
                    </div>
                    <div>
                        <img src="./carousel2.jpg" />
                    </div>
                    <div>
                        <img src="./carousel3.jpg" />
                    </div>
                </Carousel>
            </div>
            <div className='container-atracoes'>
                <div className='atracoes'>
                    <div className='grid'>
                        <div className='subgrid'>
                            <h2>road to hell</h2>
                            <img src="./atracao1.webp" alt="Montanha russa" />
                        </div>
                        <div className='subgrid'>
                            <h2>Circus Madness</h2>
                            <img src="./atracao2.webp" alt="Palhaços" />
                        </div>

                    </div>  
                    <div className='grid'>
                        <div className='subgrid'>
                            <h2>Refuge of Fear</h2>
                            <img src="./atracao3.webp" alt="Casa de Horrores" />
                        </div>
                        <div className='subgrid'>
                            <h2>home of wail</h2>
                            <img src="./atracao4.jpg" alt="Entrada" />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='subgrid'>
                            <h2>Agony Show</h2>
                            <img src="./atracao5.jpg" alt="Circo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  ) 
}

export default index