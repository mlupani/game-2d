import { useEffect, useRef } from "react";

const images_url = [
    'assets/sprites/map.jpg',
    'assets/sprites/warrior-2.png',
    'assets/sprites/warrior-run.png'
]

const Map = ({config, setConfig}) => {

  const canvasRef = useRef(null);
  let imagesLoaded = []

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //context.clearRect(0, 0, canvas.width, canvas.height)
    //IMG - FROMXIMG - FROMYIMG - TOWIDTH - TOHEIGHT - PLACEX - PLACEY - WIDTH - HEIGHT
    images_url.forEach((url) => {
        const img = new Image();
        img.src = url;
        imagesLoaded.push(img)
        img.onload = function() {
            if(imagesLoaded.length === images_url.length){
                const map = imagesLoaded[0]
                const warrior = imagesLoaded[1]
                context.drawImage(map, 0, 0, 1400, 700, 0, 0, canvas.width, canvas.height)
                context.drawImage(warrior, 0, 0, 64, 64, 0, 80, 40, 40)
                if(!config.firstLevel)
                    moveWarrior()
                else
                setTimeout(() => {
                    setConfig({
                      ...config,
                      advanceLevel: false,
                      startGame: true,
                      firstLevel: false
                    })
                  }, 4000)
            }
        }
    })

   }, []);

   const moveWarrior = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const map = imagesLoaded[0]
        const warrior = imagesLoaded[1]
        const warrior_run = imagesLoaded[2]
        let frame_run = 0
        const levelsInMap = Object.values(config.levelInMap);
        let x = levelsInMap[config.actualLevel].x;
        let y = levelsInMap[config.actualLevel].y;
        let timer = null
        timer = setInterval(() => {
            if(frame_run === 8) frame_run = 0
            context.drawImage(map, 0, 0, 1400, 700, 0, 0, canvas.width, canvas.height)
            context.drawImage(warrior_run, frame_run * 80, 0, 80, 64, x, y, 40, 40)
            if(x !== levelsInMap[config.nextLevel].x){
                x++
            }
            if(y !== levelsInMap[config.nextLevel].y){
                if(y > levelsInMap[config.nextLevel].y)
                    y--
                else
                    y++
            }
            if(x === levelsInMap[config.nextLevel].x && y === levelsInMap[config.nextLevel].y){
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(map, 0, 0, 1400, 700, 0, 0, canvas.width, canvas.height)
                context.drawImage(warrior, 0 * 64, 0, 80, 64, x, y, 40, 40)
                clearInterval(timer)
                setTimeout(() => {
                    setConfig({
                      ...config,
                      advanceLevel: false,
                      startGame: true,
                      stopEnemies: false,
                      actualLevel: config.actualLevel + 1,
                      nextLevel: config.nextLevel + 1,
                      winGame: config.actualLevel === 4 ? true : false,
                    })
                  }, 2000)
            }
            frame_run++
        }, 2000 / 50)
   }
  return (
    <canvas ref={canvasRef} id="canvasMap" style={{border: '2px solid #000000', width: 1000, height: 400}} >

    </canvas>
  )
}

export default Map