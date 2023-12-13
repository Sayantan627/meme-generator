import { useEffect, useState } from "react";
import download from "downloadjs";
import { toPng } from "html-to-image";
import Draggable from "react-draggable";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const getMemeImage = () => {
    const randomIndex = Math.floor(Math.random() * allMemes.length) + 1;
    setMeme((prevMeme) => {
      return { ...prevMeme, randomImage: allMemes[randomIndex].url };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const clearInput = () => {
    setMeme((prevMeme) => ({
      ...prevMeme,
      topText: "",
      bottomText: "",
    }));
  };

  const node = document.getElementById("meme-img");
  const downloadImage = () => {
    toPng(node)
      .then((dataURL) => {
        download(dataURL, "meme.png");
      })
      .catch(() => console.log("error occured"));
  };

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button type="submit" className="form--btn" onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
        <button type="button" className="form--btn" onClick={clearInput}>
          Clear Text
        </button>
      </div>
      <div className="meme" id="meme-img">
        <img src={meme.randomImage} className="meme--img" />
        <Draggable bounds="parent">
          <h2 className="meme--text top">{meme.topText}</h2>
        </Draggable>
        <Draggable bounds="parent">
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </Draggable>
      </div>
      <div className="download--section">
        <button type="button" className="download--btn" onClick={downloadImage}>
          Download Meme
        </button>
      </div>
    </main>
  );
};
export default Meme;
