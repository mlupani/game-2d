import { useState, useEffect, useRef } from "react";

const Level = (props) => {

  const canvasRef = useRef(null);
  const [warriorImg, setWarriorImg] = useState(null);
  const [enemiesImg, setEnemiesImg] = useState(null);
  const [explotionImg, setExplotionImg] = useState(null);
  const [wallImg, setWallImg] = useState(null);
  const [wallImg2, setWallImg2] = useState(null);
  const [wallImg3, setWallImg3] = useState(null);
  const [wallImg4, setWallImg4] = useState(null);
  const [wallImg5, setWallImg5] = useState(null);
  const [worldImg, setWorldImg] = useState(null);
  const [skyImg, setSkyImg] = useState(null);
  const [waterImg, setWaterImg] = useState(null);

  useEffect(() => {
    const warriorImg = new Image();
    if(props.config.warrior.attack)
      warriorImg.src = 'assets/sprites/attack.png';
    else if(props.config.warrior.dead)
      warriorImg.src = 'assets/sprites/dead.png';
    else
      warriorImg.src = 'assets/sprites/warrior-2.png';
    setWarriorImg(warriorImg);
  }, [props.config.warrior.attack, props.config.warrior.dead])

  useEffect(() => {
    const enemiesImg = new Image();
    enemiesImg.src = 'assets/sprites/zombie_run.png';
    setEnemiesImg(enemiesImg);

    const explotionImg = new Image();
    explotionImg.src = 'assets/sprites/explotion.png';
    setExplotionImg(explotionImg);

    const wallImg = new Image();
    wallImg.src = 'assets/sprites/wall.png';
    setWallImg(wallImg);

    const wallImg2 = new Image();
    wallImg2.src = 'assets/sprites/wall-2.png';
    setWallImg2(wallImg2);

    const wallImg3 = new Image();
    wallImg3.src = 'assets/sprites/wall-3.png';
    setWallImg3(wallImg3);

    const wallImg4 = new Image();
    wallImg4.src = 'assets/sprites/wall-4.png';
    setWallImg4(wallImg4);

    const wallImg5 = new Image();
    wallImg5.src = 'assets/sprites/wall-5.png';
    setWallImg5(wallImg5);

    const world = new Image();
    world.src = 'assets/sprites/world_tiles.png';
    setWorldImg(world);

    const skyImg = new Image();
    skyImg.src = 'assets/sprites/sky.png';
    setSkyImg(skyImg);

    const waterImg = new Image();
    waterImg.src = 'assets/sprites/water.png';
    setWaterImg(waterImg);


  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //WRITE WARRIOR
    if(warriorImg && enemiesImg && worldImg && skyImg && props.config.startGame && !props.config.advanceLevel){
      context.clearRect(0, 0, canvas.width, canvas.height)
      for(let i = 0; i < 7; i++){

        //IMG - FROMXIMG - FROMYIMG - TOWIDTH - TOHEIGHT - PLACEX - PLACEY - WIDTH - HEIGHT
        const fromx = 0;
        const fromy = 0;
        const towidth = 95;
        const toheight = 15;
        const placex = -35 + 45 * i;
        const placey = 135;
        const width2 = 100;
        const height2 = 15;

        if(props.config.actualLevel === 0){
          context.drawImage(skyImg, fromx, fromy, 10, 10, placex, 0, width2, 135)
          context.drawImage(worldImg, fromx, fromy, towidth, toheight, placex, placey, width2, height2)
        }

        if(props.config.actualLevel === 1){
          context.drawImage(skyImg, fromx, fromy, 10, 10, placex, 0, width2, 135)
          context.drawImage(waterImg, 32, fromy, 16, 16, placex, placey - 5, width2, height2 + 5)
        }

        if(props.config.actualLevel === 2){
          context.drawImage(wallImg3, 0, 0, 72, 72, 72*i, 0, 72, 72)
          context.drawImage(wallImg3, 0, 0, 72, 72, 72*i, 72, 72, 72)
        }

        if(props.config.actualLevel === 3){
          context.drawImage(wallImg4, 0, 0, 72, 72, 72*i, 0, 72, 72)
          context.drawImage(wallImg4, 0, 0, 72, 72, 72*i, 72, 72, 72)
        }

        if(props.config.actualLevel === 4){
          context.drawImage(wallImg5, 0, 0, 72, 72, 72*i, 0, 72, 72)
          context.drawImage(wallImg5, 0, 0, 72, 72, 72*i, 72, 72, 72)
        }

      }
      context.drawImage(warriorImg, Math.round(props.config.warrior.currentFrame) * props.config.warrior.width, 0, props.config.warrior.width, props.config.warrior.height, props.config.warrior.x, props.config.warrior.y, props.config.warrior.width, props.config.warrior.height)
      props.config.enemies.forEach((enemy) => {
        if(enemy.dead)
          context.drawImage(explotionImg, Math.round(enemy.explotionCurrentFrames) * enemy.width , 0, enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height)
        else
          context.drawImage(enemiesImg, Math.round(enemy.currentFrame) * enemy.width, 0, enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height)
      })
    }
  }, [warriorImg, props.config.warrior.x, props.config.warrior.y, props.config.enemies, props.config.warrior.attack, props.config.warrior.dead, props.config.warrior.currentFrame, props.config.gameOver, props.config.advanceLevel])

  return (
    <canvas ref={canvasRef} id="canvas" style={{border: '2px solid #000000', width: 1000, height: 400}} >

    </canvas>
  )
}

export default Level
