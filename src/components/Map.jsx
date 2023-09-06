import { useState, useEffect, useRef } from "react";

const Map = (props) => {

  const canvasRef = useRef(null);
  const [warriorImg, setWarriorImg] = useState(null);
  const [enemiesImg, setEnemiesImg] = useState(null);
  const [explotionImg, setExplotionImg] = useState(null);
  const [wallImg, setWallImg] = useState(null);

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
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //WRITE WARRIOR
    if(warriorImg && props.config.startGame){
      context.clearRect(0, 0, canvas.width, canvas.height)
      for(let i = 0; i < 7; i++){
        context.drawImage(wallImg, 0, 0, 72, 72, 72*i, 0, 72, 72)
        context.drawImage(wallImg, 0, 0, 72, 72, 72*i, 72, 72, 72)
      }
      context.drawImage(warriorImg, Math.round(props.config.warrior.currentFrame) * props.config.warrior.width, 0, props.config.warrior.width, props.config.warrior.height, props.config.warrior.x, props.config.warrior.y, props.config.warrior.width, props.config.warrior.height)
      props.config.enemies.forEach((enemy) => {
        if(enemy.dead)
          context.drawImage(explotionImg, Math.round(enemy.explotionCurrentFrames) * enemy.width , 0, enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height)
        else
          context.drawImage(enemiesImg, Math.round(enemy.currentFrame) * enemy.width, 0, enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height)
      })
    }
  }, [warriorImg, props.config.warrior.x, props.config.warrior.y, props.config.enemies, props.config.warrior.attack, props.config.warrior.dead, props.config.warrior.currentFrame, props.config.gameOver])

  return (
    <canvas ref={canvasRef} id="canvas" style={{border: '2px solid #000000', width: 1000, height: 400}} >

    </canvas>
  )
}

export default Map
