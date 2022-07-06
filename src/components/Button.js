function Button (props) {
      return (
            <div>
            <button className="form__button" onClick={props.getMemeImage}>Get Meme Images ♛</button>
            </div>
      )
}

export default Button;