// import {useState}
import Draggable from "react-draggable";


function Text(props) {
      return (
            <Draggable>
           <h2>{props.text}</h2>
            </Draggable>
      )
}

export default Text;