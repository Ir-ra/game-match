
import ReactDOM from 'react-dom'
import './Modal.css'

function Modal({ children, handleClose }) {
    
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <button className='modal-button' onClick={handleClose}>Ok</button>
                   
            </div>
        </div>
    ), document.body) 
}

export default Modal;