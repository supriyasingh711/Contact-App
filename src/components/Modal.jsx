import React from 'react'
import { createPortal } from 'react-dom'
//modal is a pop up to add our data to database
const Modal = ({onClose,isOpen,children}) => {
  return createPortal(
    <>
    
    {isOpen && 
    (<>
    <div className='w-1/3 h-[400px] m-auto bg-white relative z-50'>
        <div className='justify-end flex p-4'>
            < i className='fas fa-close text-3xl' onClick={onClose}> </i>
        </div>
        {children}
</div>
    <div onClick={onClose}
    className='backdrop-blur h-screen w-screen absolute top-0 z-40'/>
    </>)}
    </>
  ,document.getElementById("modal-root"))
}

export default Modal