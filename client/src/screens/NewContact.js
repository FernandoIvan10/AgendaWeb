import { useState } from "react";
import { Input } from "../components/basics/Input";
import { RiContactsBook3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './../assets/styles/screens/NewContact.css';

// User can add new contact
export default function NewContactPage(){ 
    // Navigation hook
    const navigate = useNavigate();
    // contact state
    const [contact, setContact] = useState({ name: '', phone: '', description: '' });
    const [saving, setSaving] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [formError, setFormError] = useState(null);

    // method that saves a contact
    const saveHandler = async ()=>{
        // All fields must be filled in
        if(
            !contact.name.trim() 
            || !contact.phone.trim() 
            || !contact.description.trim()
        ){
            setFormError('Please, fill in all fields')
            return
        }

        try {
            if(saving) return; // Prevent multiple submissions
            setSaving(true);
            setFormError(null);
            setFetchError(null);

            await axios.post('/api/contacts', contact)
            
            navigate('/contact-list'); // Navigate to contact list
        }catch(err){
            setFetchError(err.message || 'An error occurred while saving the contact.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="main-container">
            <div className="header">
                <h1>Phone Book</h1>
                <Link to="/contact-list">
                    <RiContactsBook3Fill className="contact-form__list-button" />
                </Link>
            </div>
            <div className="contact-form__container">
                <Input
                    label="Name: " 
                    id="contact-name" 
                    type="text"
                    placeholder="write a contact name"
                    value={contact.name}
                    onChange={(e)=>setContact({...contact, name: e.target.value})}
                    />
                <Input
                    label="Phone: "
                    id="contact-phone" 
                    type="text"
                    placeholder="write a contact phone"
                    value={contact.phone}
                    onChange={(e)=>setContact({...contact, phone: e.target.value})}
                />
                <Input
                    label="Description: "
                    id="contact-description" 
                    type="text" 
                    placeholder="write a description"
                    value={contact.description}
                    onChange={(e)=>setContact({...contact, description: e.target.value})}
                />
                <button 
                    id="button-save" 
                    className="contact-form__save-button" 
                    onClick={saveHandler}
                >
                    Save
                </button>
            </div>
            {formError && <p className="error-message">{formError}</p>}
            {fetchError && <p className="error-message">{fetchError}</p>}
        </div>
    )
}