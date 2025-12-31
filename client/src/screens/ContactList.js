import { useState, useEffect, useMemo } from "react";
import { Input } from "../components/basics/Input";
import { ContactCard } from "../components/contacts/ContactCard";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import '../assets/styles/screens/ContactList.css'

// User can see his contact list
export default function ContactListPage(){
    // Variable containing contact list
    const [contacts, setContacts] = useState([])
    // Variable containing value of input search
    const [search, setSearch] = useState('')
    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch contacts from the server when the component mounts
    useEffect(() => {
        let isMounted = true; // Track if component is mounted
        setLoading(true);

        axios.get('/api/contacts')
            .then((res) => {
                if(!isMounted) return;
                setContacts(res.data)
                setLoading(false);
            })
            .catch((err) => {
                if(!isMounted) return;
                setError(err);
                setLoading(false);
            });

        return () => { isMounted = false; }; // Cleanup function to set isMounted to false
    }, []);

    // Method that deletes a contact
    const deleteContact=(id)=>{
        axios.delete(`/api/contacts/${id}`)
        .then(() => {
            setContacts(prev => removeContact(id, prev));
        })
        .catch(err => setError(err));
    }

    // Method that change isEditing value in a contact
    const editContact = (id) => {
        setContacts(prev => editingContact(id, prev));
    }
    
    // Method that save changes in the contact
    const saveChanges = (id, updatedContact) => {
        axios.put(`/api/contacts/${id}`, updatedContact)
            .then(res => {
                setContacts(prev => updateContact(id, prev, res.data));
                })
            .catch(err => {
                setError(err);
            });
    }

    // Method that removes a contact from a list by id
    const removeContact = (id, list) => {
        return list.filter(c => c.id !== id);
    }

    // Method that set isEditing to true for a contact by id
    const editingContact = (id, list) => {
        return list.map(contact => 
            contact.id === id ? { ...contact, isEditing: true } : contact
        );
    }

    // Method that update contact data by id
    const updateContact = (id, list, newData) => {
        return list.map(contact => 
            contact.id === id ? { ...contact, isEditing: false, ...newData } : contact
        );
    }

    // Method that filter contacts by search input
    const filterContacts = (search, contacts) => {
        return contacts.filter(contact =>
            search === '' 
            || contact.name.toLowerCase().startsWith(search.toLowerCase())
        );
    }

    // Memoized filtered contacts to avoid unnecessary computations
    const filteredContacts = useMemo(() => {
        return filterContacts(search, contacts);
    }, [search, contacts]);

    return(
        <div className="main-container">
            <div className="header">
                <h1>Phones</h1>
            </div>
            <div className="contact-list__body">
            <div className="contact-list__search-section">
            <Input className="contact-list__search-field"
                    id="search" 
                    type="text"
                    label="Search: " 
                    placeholder="write a contact name" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
            <Link to="/new-contact">
                <IoMdPersonAdd className="contact-list__add-contact-button"/>
            </Link>
            </div>
            <div>
            {loading ? (
                <p>Loading contacts...</p>
            ) : error ? (
                <p>Error loading contacts: {error?.message || 'Server error'}</p>
            ) : (
                filteredContacts.map((contact) => {
                    return contact.isEditing ? (
                        <ContactCard
                            mode="edit"
                            key={contact.id}
                            initialName={contact.name}
                            initialPhone={contact.phone}
                            initialDescription={contact.description}
                            saveChanges={(updatedContact) => saveChanges(contact.id, updatedContact)}
                        />
                    ) : (
                        <ContactCard
                            mode="view"
                            key={contact.id}
                            initialName={contact.name}
                            initialPhone={contact.phone}
                            initialDescription={contact.description}
                            deleteContact={() => deleteContact(contact.id)}
                            editContact={() => editContact(contact.id)}
                        />
                    );
                })
            )}
            </div>
            </div>
        </div>
    )
}