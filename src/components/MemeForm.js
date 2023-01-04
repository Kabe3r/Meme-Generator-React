import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Text from "./Text";


function MemeForm() {
const [meme, setMeme] = useState({
     mainImg: "https://i.imgflip.com/2896ro.jpg",
});

const [memesData, setMemesData] = useState([]);
const [input, setInput] = useState([
     {
          value: '',
          color: '#3ec6ff',

     }
]);



useEffect(() => {
     async function getMemes() {
          const res = await fetch("https://api.imgflip.com/get_memes");
          const data = await res.json();
          setMemesData(data.data.memes);
     }
     getMemes();
}, []);

const addInput = (e) => {
     e.preventDefault();
     setInput(prevInput => {
              return [
                   ...prevInput,
                   {
                        value: '',
                        color: '#3ec6ff',
                    } 
               ]
          })
}

const handleInput = (e, index) => {
     e.preventDefault();
     const { name, value } = e.target;
     const list = [...input];
     list[index][name] = value;
     setInput(list);
}


const download = () => {
     const display = document.getElementById("memeCapture");
     html2canvas(display, {
          allowTaint: true,
          useCORS: true,
          scrollY: -window.scrollY,
          scrollX: -window.scrollX,
     })
     .then(function (canvas) {
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "meme.png";
          link.href = url;
          link.click();
     });
}

const getMemeImage = (event) => {
     event.preventDefault();
     const randomNum = Math.floor(Math.random() * memesData.length);
     const url = memesData[randomNum].url;
     setMeme(prevMeme => ({
          ...prevMeme,
          mainImg: url,
     }));

     setInput(prevInput => {
          return [
               {
                    value: '',
                    color: '#3ec6ff',
               }
          ]
     })

  }

 return (
      
      <main>
      <form className="form">
      <div>
            {input.map((item, i) => {
               return (
                    <label>
            <input type='text' name='value' className="form__input"  onChange={e => handleInput(e, i)}  placeholder='Enter Text' value={item.value} id={i} size={45} />
            <input type='color' name='color'  className='form__color' onChange={e => handleInput(e, i)} value={item.color} id={i}  />
                    </label>
               )
             })}
      </div>
            <button className="form__add" onClick={addInput} disabled={input.length > 4 ? true : false}>+</button>
        <button className="form__button" onClick={getMemeImage}>Get Meme Images ♛</button>
      </form>
       <section>

       <div className="meme">
       <div id="memeCapture">
            <img className="meme__image"  src={meme.mainImg} alt="Meme" crossOrigin="annoymous" />
            
                    {input.map((item, i) => {
                         return (
                    <div key={i} style={{color: item.color}}  className={`meme__text ${i === 0 ? 'first' : i === 1 ? 'second' : i === 2 ? 'third' : i === 3 ? 'fourth' : 'fifth'}`} >
                    <Text draggable={true} text={item.value} />
                    </div>
                ) 
            })} 
       </div>
            <button className="form__button meme__download" onClick={download}>Download Image</button>
       </div>
       </section>
       </main>
 )

}
export default MemeForm;