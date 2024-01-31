import { useState,useEffect } from 'react'
import React from 'react'
import './App.css'
import Header from '../components/Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
function App() {
  const LOCAL_STORAGE_KEY="contacts"
  const [contacts,setContacts]=useState([]);
  const addContactHandler=(contact)=>{
    console.log(contact)
    setContacts([...contacts,contact])
  }
  useEffect(()=>{
localstorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts])

  return (
    <>
    <div className='ui container'>
    <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts}/>
    </div>
     
    </>
  )
}

export default App
