import '../../assets/styles/components/Input.css'

// Component for a basic input field with label
export function Input({
    className, 
    label, 
    id, 
    ...inputProps
}){
    return(
        <div className={`contact-form_field ${className ?? ""}`}>
            <label 
                className="contact-form_label" 
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="contact-form_input"
                id={id} 
                {...inputProps}
            ></input>
        </div>
    )
}