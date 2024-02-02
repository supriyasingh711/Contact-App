import React from 'react'
import Modal from './Modal'
import { Form,Formik,Field } from 'formik'
import { addDoc, collection,updateDoc,doc } from 'firebase/firestore'
import {db} from '../config/firebase'

const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {
    //function to send our data

    const addContact=async (contact)=>{
        try{
const contactsRef=collection(db,"contacts");
await addDoc(contactsRef,contact)
onClose();


        }catch(error){
            console.log(error)

        }
    }
    const updateContact=async (contact,id)=>{
        console.log(id);
        try{
const contactsRef=doc(db,"contacts",id);
await updateDoc(contactsRef,contact)
onClose();

        }catch(error){
            console.log(error)

        }
    }
  return (
    <div>
        <Modal isOpen={isOpen}
onClose={onClose}

>

    <Formik
    initialValues={isUpdate?{
        name:contact.name,
        email:contact.email,
        number:contact.number

    }:{
        name:"",
        email:"",
        number:""
    }}
    onSubmit={(values)=>{
        console.log(values)
        isUpdate?updateContact(values,contact.id):addContact(values)
        
        
    }}
    
    >
        <Form className='flex flex-col justify-center items-center gap-1 '>
            <div className='flex flex-col  w-2/3'>
            <label htmlFor='name'>Name</label>
            <Field name="name" className="border border-black  py-2" />

            </div>
            <div className='flex flex-col  w-2/3'>
            <label htmlFor='email'>Email</label>
            <Field name="email" className="border border-black py-2" />

            </div> 
             <div className='flex flex-col w-2/3'>
            <label htmlFor='phone number'>Phone number</label>
            <Field name="number" className="border border-black py-2" />

            </div>
            <button className='bg-orange p-4 text-white  ' type='submit'> {isUpdate? " Update ": "Add"} Contact</button>

         

        </Form>
    </Formik>
</Modal>
    </div>
  )
}

export default AddAndUpdateContact