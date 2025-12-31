import { IoIosContact } from "react-icons/io";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";
import { useState } from "react";
import '../../assets/styles/components/ContactCard.css'

// Component that shows a contact card
export function ContactCard({
    mode,
    className,
    initialName,
    initialPhone,
    initialDescription,
    deleteContact,
    editContact,
    saveChanges
}){
    // Hooks that change a contact's data
    const [name, setName] = useState(initialName)
    const [phone, setPhone] = useState(initialPhone)
    const [description, setDescription] = useState(initialDescription)

    // Boolean that checks if the mode is view
    const isView = mode === "view"

    // Method that set the new changes
    const handleSave = () => {
        const updatedContact={name, phone, description}
        saveChanges(updatedContact)
    }

    return(
        <div className={`contact-card ${className ?? ""}`}>
            <article className="contact-card__card">
                <IoIosContact className="contact-card__profile-icon" />
                <div className="contact-card__info">
                    {isView ? (
                        <>
                            <strong className="contact-card__name">{name}</strong>
                            <span>{phone}</span>
                            <span>{description}</span>
                        </>
                    ) : (
                        <>
                            <input
                                className="contact-card__input"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                            <input
                                className="contact-card__input"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />
                            <input
                                className="contact-card__input"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}    
                            />
                        </>
                    )}
                </div>
                {isView ? (
                    <>
                        <button 
                        onClick={deleteContact}
                        className="contact-card__delete-button"
                        >
                        <FaTrashAlt />
                        </button>
                        <button 
                        onClick={editContact}
                        className="contact-card__edit-button"
                        >
                        <FaUserEdit />
                        </button>
                    </>
                ) : (
                    <button onClick={handleSave} className="contact-card__save-button"><IoSaveSharp/></button>
                )}
            </article>
        </div>
    )
}