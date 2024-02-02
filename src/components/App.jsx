import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './Navbar'
import {collection,getDocs} from 'firebase/firestore';
import {db} from '../config/firebase'
import img from '../images/4.jpeg'

function App() {
const [contacts,setContacts]=useState([]);
//we are going to perform network call so we use useEffect
useEffect(()=>{
const getContacts=async()=>{
try{
const contactsRef=collection(db,"contacts");
const contactsSnapShot=await getDocs(contactsRef);
console.log(contactsSnapShot);
// const contactList=contactsSnapShot.docs.map((doc)=>
// doc.data());
// console.log(contactList);//we are getting the details but not the id 
// so lets do this to get the id also
const contactList=contactsSnapShot.docs.map((doc)=>{
  return{
    id:doc.id,
    ...doc.data()
  }
   
  
})
console.log(contactList)
setContacts(contactList)

}catch(error){

}
}
getContacts();
})

  return (
    <>
    <div className='mx-auto max-w-[360px] p-4'>
    <Navbar/>
    <div className='flex relative items-center '>

      <input 
      type="text" 
      className=' h-10 flex-grow border border-white bg-transparent rounded text-white pl-12 ' />
      <i className='fas fa-search m-1 absolute text-3xl px-2 text-white'></i>
    </div>
    <div>
      <i className='fas fa-add text-3xl text-white border border-white rounded-full p-2 cursor-pointer '>Add Contact</i>
    </div>

    </div>
    <div>{
contacts.map((contact)=>(
<div key={contact.id}>
<img src={img} alt="" className='h-16 w-16 object-cover' />
<h2>{contact.name}</h2>



</div>
)

)

}</div>
        </>
  )
}

export default App
