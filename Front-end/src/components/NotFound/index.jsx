import { timer } from 'rxjs';
import './NotFound.css';

function NotFound () {

    const rederenciona = () =>{
        timer(500).subscribe(() =>{
            window.location.assign('/')
        })
    }

    return(
        <div className='container-404'>
            <div className='container-jack-sm'>
                <img src="./jack.gif" alt="teste" className='pulse'/>
            </div>
            <div className='container-perdido'>
                <h2>Parece que voce se perdeu!</h2>
                <h2>Vamos para um lugar seguro</h2>
                <button onClick={rederenciona}>clique aqui</button>
            </div>
            <div className='container-jack'>
                <img src="./jack.gif" alt="teste" className='pulse'/>
            </div>
        </div>
    )
}

export default NotFound;