// Component for a basic input field with label
export function Input({
    divClassName, 
    label, 
    id, 
    ...inputProps
}){
    return(
        <div className={divClassName}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id} 
                {...inputProps}
            ></input>
        </div>
    )
}