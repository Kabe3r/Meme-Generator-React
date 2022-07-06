
function Input(props) {
      return ( 
            <input type="text" className="form__input" name={props.name} onChange={props.handleChange} placeholder={props.placeholder} />
      )
}

export default Input;