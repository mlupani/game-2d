import React, { useRef, useCallback } from 'react'
import { useEffect } from 'react';

const text = "Over the years, we humans have lived on Earth. This has been our home and refuge.. Over time, societies have been created in which laws have been put in place to have self-control for everyone.. but, will it be that humans will be prepared for what what's coming?";

const Intro = (props) => {
    const textRef = useRef(null);
    const [showButton, setShowButton] = React.useState(false);
    const [textEnd, setTextEnd] = React.useState('');

const handleStart = () => {
    props.setConfig({...props.config, startGame: true, intro: false})
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const writeText = async () => {
    setTimeout(async () => {
        setShowButton(true);
        for (const char of text) {
            await delay(char === '.'  || char === ',' ? 800 : 50);
            textRef.current && (textRef.current.innerHTML += char);
            setTextEnd(prev => prev + char);
        }
    }, 1200);
}

useEffect(() => {
    writeText();
}, []);

useEffect(() => {
    if (textEnd === text) {
        setTimeout(() => {
            handleStart();
        }, 3000)
    }
}, [textEnd, handleStart])

  return (
    <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: 'white', backgroundColor: 'black', backgroundImage: "url('https://media0.giphy.com/media/fo2h0DjceLyKlLxvvO/giphy.gif?cid=ecf05e47n26etaj4qnqu1f0ynf6x04phmafir5ld2v54ujcs&ep=v1_gifs_search&rid=giphy.gif&ct=g')", backgroundSize: 'cover'}}>
        <div style={{width: 500}}>
            <p ref={textRef} style={{fontSize : '22px', fontWeight: 'bold'}}></p>
        </div>
        <audio src="assets/introduccion.opus" autoPlay>
            Your browser does not support the <code>audio</code> element.
        </audio>
        <button onClick={handleStart} style={{width: 200, height: 50, border: '1px solid gray', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: 18, display: showButton ? 'flex': 'none'}} >
            Skip
        </button>
    </div>
  )
}

export default Intro