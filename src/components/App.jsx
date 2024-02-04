import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './Navbar'
import {collection,getDocs, onSnapshot} from 'firebase/firestore';
import {db} from '../config/firebase'
import ContactCard from './ContactCard';
import Modal from './Modal';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclosure from '../hooks/useDisclosure';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NotFoundContact from './NotFoundContact';

function App() {
const [contacts,setContacts]=useState([]);
const {isOpen,onClose,onOpen}=useDisclosure()
//we are going to perform network call so we use useEffect
useEffect(()=>{
const getContacts=async()=>{
try{
const contactsRef=collection(db,"contacts");
const contactsSnapShot=await getDocs(contactsRef);
const contactList=contactsSnapShot.docs.map((doc)=>{
  return{
    id:doc.id,
    ...doc.data()
  }
  })
setContacts(contactList)

}catch(error){

}
}
getContacts();
},[])
const filterContacts=(e)=>{
  const value=e.target.value;
  const contactsRef=collection(db,"contacts")
  onSnapshot(contactsRef,(snapshot)=>{
    const contactList=snapshot.docs.map((doc)=>{
      return {
        id:doc.id,
        ...doc.data(),
      }
    })
    const filteredContacts=contactList.filter(contact=>
      contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts)
      return filteredContacts;
  })
}


  return (
    <>
    <div className='mx-auto max-w-[360px] p-4'>
    <Navbar/>
    <div className='flex relative items-center '>

      <input onChange={filterContacts}
      type="text" 
      className=' h-10 flex-grow border border-white bg-transparent rounded text-white pl-12 ' />
      <i  className='fas fa-search m-1 absolute text-3xl px-2 text-white'></i>
    </div>
    <div>
      <i onClick={onOpen} className='fas fa-add text-3xl text-white border border-white rounded-full p-2 cursor-pointer '>Add Contact</i>
    </div>

    </div>
    <div>{
contacts.length<=0?<NotFoundContact/>:contacts.map((contact)=>(
    <ContactCard key={contact.id} contact={contact} />
)

)

}</div>

<AddAndUpdateContact isOpen={isOpen} onClose={onClose}  />
<ToastContainer/>
        </>
  )
}

export default App
