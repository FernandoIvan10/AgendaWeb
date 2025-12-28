import { useState } from "react";
import { Input } from "../components/basics/Basic";
import { RiContactsBook3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './../assets/styles/screens/NewContact.css';

// User can add new contact
export default function NewContactPage(){
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: '', phone: '', description: '' });
    // method that saves a contact
    const saveHandler = ()=>{
        // All fields must be filled in
        if(!contact.name || !contact.phone || !contact.description){
            alert('Please, fill in all fields')
            return
        }
        // New contact is added to contacts
        axios.post('/api/contacts', contact)
        .then(response => {
            setContact({ name: "", phone: "", description: "" }); // Clear the form
            alert("Contact saved successfully");
            navigate('/contact-list');
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="div-main">
            <div className="div-header">
                <h1>Phone Book</h1>
                <Link to="/contact-list">
                    <RiContactsBook3Fill className="icon-list" />
                </Link>
            </div>
            <div className="div-form">
                <Input className="div-input"
                    classNameLabel="input-label"
                    classNameInput="input"
                    label="Name: " 
                    id="contact-name" 
                    type="text"
                    placeholder="write a contact name"
                    value={contact.name}
                    onChange={(e)=>setContact({...contact, name: e.target.value})}
                    />
                <Input className="div-input"
                    classNameLabel="input-label"
                    classNameInput="input"
                    label="Phone: "
                    id="contact-phone" 
                    type="text"
                    placeholder="write a contact phone"
                    value={contact.phone}
                    onChange={(e)=>setContact({...contact, phone: e.target.value})}
                />
                <Input className="div-input"
                    classNameLabel="input-label"
                    classNameInput="input"
                    label="Description: "
                    id="contact-description" 
                    type="text" 
                    placeholder="write a description"
                    value={contact.description}
                    onChange={(e)=>setContact({...contact, description: e.target.value})}
                />
                <button id="button-save" onClick={saveHandler}>Save</button>
            </div>
        </div>
    )
}