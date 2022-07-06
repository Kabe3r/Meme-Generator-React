function ColorPicker(props) {
      return (
            
            <input type="color" className="form__color" name={props.name} onChange={props.handleChange} value={props.value} />
            
      );

}

export default ColorPicker;