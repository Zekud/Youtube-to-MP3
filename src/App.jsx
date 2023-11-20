import React, { useState, useRef } from "react";
import youtube_parser from "./parser";
import axios from "axios";

function Spinner() {
  return <div class="spinner-grow text-secondary" role="status"></div>;
}
function App() {
  const inputRef = useRef();
  const [urlData, setUrlData] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      alert("Please enter a valid YouTube link");
      return;
    }

    setClicked(true);
    const youtube_id = youtube_parser(inputRef.current.value);

    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: youtube_id },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SOME_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    axios(options)
      .then((response) => {
        setClicked(false);
        setUrlData(response.data);
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="app">
      <section className="logo">
        <span>Youtube2Mp3</span>
      </section>
      <section className="content">
        <h1 className="title">YouTube To MP3 Converter</h1>
        <p className="description">
          Convert and download YouTube videos in MP3 format in few clicks
        </p>

        <form>
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste YouTube URL here..."
            className="url-input"
          />

          <button className="convert-btn" onClick={handleClick}>
            Convert
          </button>
          <section className="url-output">
            {clicked ? <Spinner /> : null}
            {urlData ? urlData.title : null}
          </section>
        </form>

        {urlData ? (
          <a className="download-btn" href={urlData.link}>
            Download MP3
          </a>
        ) : null}
      </section>
      <footer>
        <p>Made with ❤️ by Zekua</p>
      </footer>
    </div>
  );
}

export default App;
