import { IoIosContact } from "react-icons/io";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";
import { useState } from "react";

// Contact components

// Component containing a contact card
export function Contact(props){
    return(
        <article className={props.className}>
            <IoIosContact className="icon-profile" />
            <div className="div-info">
                <strong>{props.name}</strong>
                <label>{props.phone}</label>
                <label>{props.description}</label>
            </div>
            <button 
                onClick={props.deleteContact}
                className="icon-delete"
                >
                <FaTrashAlt />
                </button>
            <button 
                onClick={props.editContact}
                className="icon-edit"
                >
                <FaUserEdit />
                </button>
        </article>
    )
}

// Component containing a edit contact card
export function EditContact(props){
    // Hooks that change a contact's data
    const [name, setName] = useState(props.name)
    const [phone, setPhone] = useState(props.phone)
    const [description, setDescription] = useState(props.description)

    // Method that set the new changes
    const handleSave = () => {
        const updatedContact={name, phone, description}
        props.saveChanges(updatedContact)
    }

    return(
        <article className={props.className}>
            <IoIosContact className="icon-profile"/>
            <div className="info-edit-contact">
                <input className="input-edit-contact"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                ></input>
                <input className="input-edit-contact"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                ></input>
                <input className="input-edit-contact"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}    
                ></input>
            </div>
            <button onClick={handleSave}><IoSaveSharp className="icon-save"/></button>
        </article>
    )
}