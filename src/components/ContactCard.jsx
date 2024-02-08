import React from 'react'
import img from '../images/4.jpeg'
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
      <div key={contact.id} className='rounded bg-gradient-to-r from-violet-500 to-pink-500 w-full m-2 border-white text-white   '>
        <div className='m-2 flex justify-between items-center  '>
        <img src={img} alt="" className='h-16 w-16 rounded-full object-cover m-2' />
<div>
<h2 className='text-3xl text-white'>{contact.name}</h2>
          <p className='text-white'><i className='fas fa-envelope'></i> {contact.email}</p>
          <p className='text-white'><i className='fas fa-phone'></i> {contact.number}</p>

</div> </div>
        <div className='flex bg-white text-black cursor-pointer text-xl font-bold justify-around w-full items-center'>

<button href="" className='' onClick={onOpen} >Edit </button><br></br>
<button href="" onClick={() => deleteContact(contact.id)}>Delete</button>

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