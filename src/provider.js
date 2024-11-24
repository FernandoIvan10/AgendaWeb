import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context is created
export const AppContext = createContext()

// Context provider is created
export const Provider = ({ children }) => {
    //State hook to store a single contact
    const [contact, setContact] = useState({
        name: '',
        phone: '',
        description: '',
        isEditing: false
    })
    //State hook to store the contact list
    const [contacts, setContacts] = useState([])

    // Fetch contacts from the backend when the component mounts
    useEffect(() => {
        axios.get("http://localhost:3000/contacts")
            .then((response) => {
                setContacts(response.data); // Populate contacts with API response
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
            });
    }, []);

    return (
        // Hooks are shared with children
        <AppContext.Provider value={{ contact, setContact, contacts, setContacts }}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider