import {useState, useEffect} from "react";
import html2canvas from "html2canvas";
import Text from "./Text";
import Input from "./Input";
import Button from "./Button";
import ColorPicker from "./ColorPicker";


function MemeForm() {
const [meme, setMeme] = useState({
     firstText: "",
     secondText: "",
     thirdText: "",
     fourthText: "",
     fifthText: "",
     firstColor: "#ee00ff",
     secondColor: "#c4d0e3",
     thirdColor: "#66ff00",
     fourthColor: "#3ec6ff",
     fifthColor: "#354259",
     mainImg: "https://i.imgflip.com/2896ro.jpg",
     boxes: "5"
});

const [memesData, setMemesData] = useState([]);


useEffect(() => {
     async function getMemes() {
          const res = await fetch("https://api.imgflip.com/get_memes");
          const data = await res.json();
          setMemesData(data.data.memes);
     }
     getMemes();
}, []);


function handleChange(event) {
     setMeme(prevMeme => ({
          ...prevMeme,
          [event.target.name]: event.target.value,
     }));
};


function download() {
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

function getMemeImage(event) {
     event.preventDefault()
     const randomNum = Math.floor(Math.random() * memesData.length);
     const url = memesData[randomNum].url;
     const box = memesData[randomNum].box_count;
     setMeme(prevMeme => ({
          ...prevMeme,
          mainImg: url,
          boxes: box 
     }));
   
     const text = meme.firstText || meme.secondText || meme.thirdText || meme.fourthText || meme.fifthText;

     if (text) {
          alert("Changes are not saved");
          meme.firstText = "";
          meme.secondText = "";
          meme.thirdText = "";
          meme.fourthText = "";
          meme.fifthText = "";
     }
     
}

 return (
      
      <main>
      <form className="form">
      
        {meme.boxes === 2 ?
           <>
            <Input name='firstText' handleChange={handleChange} value={meme.firstText} placeholder='Enter Text'/>
            <ColorPicker name="firstColor" handleChange={handleChange} value={meme.firstColor} />
            <Input name='secondText' handleChange={handleChange} value={meme.secondText} placeholder='Enter Text'/>
            <ColorPicker name="secondColor" handleChange={handleChange} value={meme.secondColor} />
           </>
           : meme.boxes === 3 ?
            <>
            <Input name='firstText'  handleChange={handleChange} value={meme.firstText} placeholder='Enter Text'/>
            <ColorPicker name="firstColor" handleChange={handleChange} value={meme.firstColor} />
            <Input name='secondText'  handleChange={handleChange} value={meme.secondText} placeholder='Enter Text'/>
            <ColorPicker name="secondColor" handleChange={handleChange} value={meme.secondColor} />
            <Input name='thirdText'  handleChange={handleChange} value={meme.thirdText} placeholder='Enter Text'/>
            <ColorPicker name="thirdColor" handleChange={handleChange} value={meme.thirdColor} />
           </>
           : meme.boxes === 4 ?
           <>
            <Input name='firstText'  handleChange={handleChange} value={meme.firstText} placeholder='Enter Text'/>
            <ColorPicker name="firstColor" handleChange={handleChange} value={meme.firstColor} />
            <Input name='secondText'  handleChange={handleChange} value={meme.secondText} placeholder='Enter Text'/>
            <ColorPicker name="secondColor" handleChange={handleChange} value={meme.secondColor} />
            <Input name='thirdText'  handleChange={handleChange} value={meme.thirdText} placeholder='Enter Text'/>
            <ColorPicker name="thirdColor" handleChange={handleChange} value={meme.thirdColor} />
            <Input name='fourthText'  handleChange={handleChange} value={meme.fourthText} placeholder='Enter Text'/>
            <ColorPicker name="fourthColor" handleChange={handleChange} value={meme.fourthColor} />
           </>
           : 
           <>
            <Input name='firstText'  handleChange={handleChange} value={meme.firstText} placeholder='Enter Text'/>
             <ColorPicker name="firstColor" handleChange={handleChange} value={meme.firstColor} />
            <Input name='secondText'  handleChange={handleChange} value={meme.secondText} placeholder='Enter Text'/>
            <ColorPicker name="secondColor" handleChange={handleChange} value={meme.secondColor} />
            <Input name='thirdText'  handleChange={handleChange} value={meme.thirdText} placeholder='Enter Text'/>
            <ColorPicker name="thirdColor" handleChange={handleChange} value={meme.thirdColor} />
            <Input name='fourthText'  handleChange={handleChange} value={meme.fourthText} placeholder='Enter Text'/>
            <ColorPicker name="fourthColor" handleChange={handleChange} value={meme.fourthColor} />
            <Input name='fifthText'  handleChange={handleChange} value={meme.fifthText} placeholder='Enter Text'/>
            <ColorPicker name="fifthColor" handleChange={handleChange} value={meme.fifthColor} />
           </>   
        }
        <Button getMemeImage={getMemeImage} />
      </form>
       <section>

       <div className="meme">
       <div id="memeCapture">
            <img className="meme__image"  src={meme.mainImg} alt="Meme" crossOrigin="annoymous" />
            
            <div style={{color: meme.firstColor}} className="meme__text first">
            <Text draggable={true} text={meme.firstText} />
            </div>
            
            <div style={{color: meme.secondColor}} className="meme__text second">
            <Text text={meme.secondText} />
            </div>

            <div style={{color: meme.thirdColor}} className="meme__text third">
            <Text text={meme.thirdText} />
            </div>

            <div style={{color: meme.fourthColor}} className="meme__text fourth">
            <Text text={meme.fourthText} />
            </div>

            <div style={{color: meme.fifthColor}} className="meme__text fifth">
            <Text text={meme.fifthText} />
            </div>
       </div>
            <button className="form__button meme__download" onClick={download}>Download Image</button>
       </div>
       </section>
       </main>
 )

}
export default MemeForm;