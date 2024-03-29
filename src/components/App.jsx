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
const {isOpen,onClose,onOpen}=useDisclosure()//this is a custom hook
//we are going to perform network call so we use useEffect
useEffect(()=>{
const getContacts=async()=>{
try{
const contactsRef=collection(db,"contacts");
const contactsSnapShot=await getDocs(contactsRef);
//this onspanshot updates as soon as we create
onSnapshot(contactsRef,(snapshot)=>{
  const contactList=snapshot.docs.map((doc)=>{
    return {
      id:doc.id,
      ...doc.data()
    }
  })
// const contactList=contactsSnapShot.docs.map((doc)=>{
//   return{
//     id:doc.id,
//     ...doc.data()//spread operator to include a list
//   }
//   })
setContacts(contactList)
return contactList

})}catch(error){
  console.log(error);
}
}
getContacts();
},[]);//if i am not sending this empty array it is not working in filter
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
    <div className='w-full flex flex-col justify-center items-center'>
    <Navbar/>
    <div className='flex w-full sm:w-2/3 '>
      <input onChange={filterContacts}
      type="text" 
      className='h-10  border border-white bg-transparent rounded relative text-white m-3 p-1 w-full pl-12 ' />
      <i  className='fas fa-search m-2 p-2 absolute text-3xl px-2 text-white'></i>
    </div>
    <div onClick={onOpen} className='cursor-pointer'>
      <p href="" className='text-3xl text-white'>
      <i  className='fas fa-add text-2xl text-white  m-5 p-2 cursor-pointer '></i>
        
        Create New Contact</p>
    </div>
    <div className='bg-white'>{
contacts.length<=0?<NotFoundContact/>:contacts.map((contact)=>(
    <ContactCard key={contact.id} contact={contact} />
)
)
}</div>
    </div>
    <div >
    <AddAndUpdateContact isOpen={isOpen} onClose={onClose}  />

    </div>
<ToastContainer/>
        </>
  )
}

export default App
