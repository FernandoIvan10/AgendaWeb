// Basic components of the app

// Component containing a label and an Input
export function Input(props){
    return(
        <div className={props.className}>
            <label className={props.classNameLabel}>{props.label}</label>
            <input className={props.classNameInput}
                id={props.id} 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            ></input>
        </div>
    )
}