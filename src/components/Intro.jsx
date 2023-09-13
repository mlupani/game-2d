import React, { useRef, useCallback } from 'react'
import { useEffect } from 'react';

const text = "Over the years, we humans have lived on Earth. This has been our home and refuge.. Over time, societies have been created in which laws have been put in place to have self-control for everyone.. But. will it be that humans will be prepared for whats coming..";

const Intro = (props) => {
    const textRef = useRef(null);

const handleStart = () => {
    props.setConfig({...props.config, startGame: true, intro: false})
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const writeText = useCallback(
    async () => {
        setTimeout(async () => {
            for (const char of text) {
                await delay(char === '.' ? 800 : 50);
                textRef.current && (textRef.current.innerHTML += char);
            }
        }, 1200);
    }
, [])

useEffect(() => {
    writeText();
}, []);

  return (
    <div style={{width: 1200, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: 'white', backgroundColor: 'black'}}>
        <div style={{width: 500}}>
            <p ref={textRef} style={{fontSize : '20px'}}></p>
        </div>
        <audio src="assets/introduccion.opus" autoPlay>
            Your browser does not support the <code>audio</code> element.
        </audio>
        <button onClick={handleStart} style={{width: 200, height: 50, border: '1px solid gray', color: 'white', display:'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18}} >
            Skip
        </button>
    </div>
  )
}

export default Intro