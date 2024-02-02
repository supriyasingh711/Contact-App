import React from 'react'
import img from '../images/4.jpeg'
import { deleteDoc,doc } from 'firebase/firestore'
import {db} from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclosure from '../hooks/useDisclosure'
const ContactCard = ({contact}) => {
const {isOpen,onClose,onOpen}=useDisclosure()
    
    const deleteContact=async (id)=>{

        try{

console.log(id);
            await deleteDoc(doc(db,"contacts",id))

        }catch(error){
            console.log(error)
        }
    }
  return (
    <>
    <div key={contact.id} className='border w-2/3 border-white text-white flex justify-around items-center'>
<img src={img} alt="" className='h-16 w-16 rounded-full object-cover' />
<div className='p-4'>
<h2 className='text-3xl text-white'>{contact.name}</h2>
<p className='text-white'>{contact.email}</p>
</div>
<div className='p-4 text-bold text-2xl'>
<button href="" className='p-4 cursor-pointer' onClick={onOpen} >edit </button>
<button href="" onClick={()=>deleteContact(contact.id)}>delete</button>
</div>
</div>
<AddAndUpdateContact 

contact={contact} 
isUpdate 
isOpen={isOpen} 
onClose={onClose}/>
    
    </>
    

  )
}
export default ContactCard;