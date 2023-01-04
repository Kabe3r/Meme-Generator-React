// import {useState}
import Draggable from "react-draggable";


function Text({text}) {
      return (
            <Draggable>
           <h2>{text}</h2>
            </Draggable>
      )
}

export default Text;