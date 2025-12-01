import { useContext, useState } from "react";
import { Input } from "../components/basics/Basic";
import { Contact, EditContact } from "../components/contacts/Contact";
import { AppContext } from "../provider";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import './../assets/styles/screens/ContactList.css'

// User can see his contact list
export default function ContactListPage(){
    // Parent context is obtained
    const { contacts, setContacts } = useContext(AppContext);
    // Variable containing value of input search
    const [search, setSearch] = useState('')

    // Method that deletes a contact
    const deleteContact=(id)=>{
        axios.delete(`http://localhost:4000/contacts/${id}`)
        .then(() => {
            const filteredContacts = contacts.filter(c => c.id !== id);
            setContacts(filteredContacts);
        })
        .catch(err => console.error(err));
    }

    // Method that change isEditing value in a contact
    const editContact = (id) => {
        const updatedContacts = contacts.map((contact, index) => 
            contact.id === id ? { ...contact, isEditing: true } : contact
        );
        setContacts(updatedContacts);
    }
    
    // Method that save changes in the contact
    const saveChanges = (id, updatedContact) => {
        axios.put(`http://localhost:4000/contacts/${id}`, updatedContact)
            .then(response => {
                const updatedContacts = contacts.map(contact =>
                    contact.id === id ? { ...response.data } : contact
                );
                    setContacts(updatedContacts);
                })
            .catch(err => {
                console.error("Error saving changes:", err);
                alert("Failed to save changes");
            });
    }

    // method that generate a contact list
    const generateList = () => {
        return contacts
            .filter(contact => {
                return search === '' || contact.name.toLowerCase().startsWith(search.toLowerCase());
            })
            .map((contact, id) => {
                return contact.isEditing ? (
                    <EditContact
                        className="div-target"
                        key={contact.id}
                        name={contact.name}
                        phone={contact.phone}
                        description={contact.description}
                        saveChanges={(updatedContact) => saveChanges(contact.id, updatedContact)}
                    />
                ) : (
                    <Contact
                        className="div-target"
                        key={contact.id}
                        name={contact.name}
                        phone={contact.phone}
                        description={contact.description}
                        deleteContact={() => deleteContact(contact.id)}
                        editContact={() => editContact(contact.id)}
                    />
                );
            });
    }

    return(
        <div className="div-main">
            <div className="div-header">
                <h1>Phones</h1>
            </div>
            <div className="body">
            <div className="div-search">
            <Input className="input-search"
                    classNameLabel="input-search-label"
                    classNameInput="input-search-input"
                    id="search" 
                    type="text"
                    label="Search: " 
                    placeholder="write a contact name" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                <Link to="/new-contact">
                    <IoMdPersonAdd className="icon-add-contact"/>
                </Link>
            </div>
            <div>
            {generateList()}
            </div>
            </div>
        </div>
    )
}