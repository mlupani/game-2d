import { useEffect, useRef } from "react";
import Confetti from 'react-confetti'

const images_url = [
  'assets/sprites/warrior-run.png',
  'assets/sprites/warrior-jump.png',
  'assets/sprites/water.png',
  'assets/sprites/atardecer.png',
  'assets/sprites/warrior-2.png'
]

const WinGame = () => {

  const canvasRef = useRef(null);
  let imagesLoaded = []

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    images_url.forEach((url) => {
      const img = new Image();
      img.src = url;
      imagesLoaded.push(img)
      img.onload = function() {
          if(imagesLoaded.length === images_url.length){
            let frame_run = 0
            let placeX = -50
            const warrior_run = imagesLoaded[0]
            const water = imagesLoaded[2]
            const atardecer = imagesLoaded[3]
            const timer = setInterval(() => {
                if(placeX === 80) {
                    clearInterval(timer)
                    jump_warrior()
                    return;
                }
                if(frame_run === 8) frame_run = 0
                //IMG - FROMXIMG - FROMYIMG - TOWIDTH - TOHEIGHT - PLACEX - PLACEY - WIDTH - HEIGHT
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(atardecer, 0, 0, 600, 130, 0, 0, 600, 130)
                context.drawImage(warrior_run, frame_run * 80, 0, 80, 64, placeX, 50, 80, 90)
                context.drawImage(water, 32, 0, 16, 16, 0, 130, 1200, 20)
                frame_run++
                placeX++
            }, 2000 / 60)
          }
      }
    })
  }, []);

  const jump_warrior = () => {
    console.log('ejecutando')
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const warrior_jump = imagesLoaded[1]
    const water = imagesLoaded[2]
    const atardecer = imagesLoaded[3]
    const warrior = imagesLoaded[4]
    let frame_jump = 0
    let placeX = 80
    let placeY = 70
    const timer = setInterval(() => {
      if(placeX === 105) {
        clearInterval(timer)
        context.drawImage(atardecer, 0, 0, 600, 130, 0, 0, 600, 130)
        context.drawImage(warrior, 0, 0, 64, 64, placeX, placeY, 64, 80)
        context.drawImage(water, 32, 0, 16, 16, 0, 130, 1200, 20)
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height)
      //IMG - FROMXIMG - FROMYIMG - TOWIDTH - TOHEIGHT - PLACEX - PLACEY - WIDTH - HEIGHT
      context.drawImage(atardecer, 0, 0, 600, 130, 0, 0, 600, 130)
      context.drawImage(warrior_jump, frame_jump * 64, 0, 64, 64, placeX, placeY, 64, 80)
      context.drawImage(water, 32, 0, 16, 16, 0, 130, 1200, 20)
      placeX++
      if(frame_jump < 14){
        frame_jump++
        placeY = placeY - 5
      }
      else
        placeY = placeY + 5
    }, 2000 / 50)
  }


  return (
    <div style={{color: 'white', backgroundColor: 'black', width: 1400, height: 480}}>
        <Confetti
          width={1400}
          height={480}
          style={{marginLeft: 300}}
        />
        <h1>Congratulations!!</h1>
        <canvas ref={canvasRef} id="canvasMap" style={{border: '1px solid #000000', width: 1400, height: 400}} >

        </canvas>
    </div>
  )
}

export default WinGame