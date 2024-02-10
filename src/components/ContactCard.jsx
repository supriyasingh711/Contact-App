import React from 'react'
import img from '../images/moon.jpeg'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclosure from '../hooks/useDisclosure'
import { toast } from 'react-toastify'
const ContactCard = ({ contact }) => {
const { isOpen, onClose, onOpen } = useDisclosure()
const deleteContact = async (id) => {
    try {
      console.log(id);
      await deleteDoc(doc(db, "contacts", id))
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
   
    <div key={contact.id} className='rounded  w-full p-2 p-4 border-white text-white   '>
        <div className='bg-black flex  justify-between items-center  '>
        <img src={img} alt="" className='h-16 w-16 rounded-full object-cover ' />
    <div className='w-'>
    <h2 className='text-2xl text-slate-300 capitalize tracking-tighter leading-10 text-white'>{contact.name}</h2>
          <p className='text-white'>{contact.email}</p>
          <p className='text-white'>{contact.number}</p>

    </div> 
    <div className='flex w-1/3 cursor-pointer text-xl font-bold justify-around w-full items-center'>

        <button href="" className='' onClick={onOpen} ><i className='fa fa-pen'></i> </button><br></br>
        <button href="" onClick={() => deleteContact(contact.id)}><i className='fa fa-trash'></i></button>

</div>
    </div>
        
      </div>
 
      
      <AddAndUpdateContact

        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose} />

    </>


  )
}
export default ContactCard;