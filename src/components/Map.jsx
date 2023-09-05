import { useEffect } from "react";
import { useRef } from "react"

const Map = () => {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //WRITE WARRIOR
    context.fillStyle = '#000000'
    context.fillRect(2, 105, 40, 40)
    //WRITE ENEMIES WITH GREEN COLOR
    context.fillStyle = '#00FF00'
    context.fillRect(200, 105, 40, 40)
    context.fillRect(300, 105, 40, 40)
    context.fillRect(400, 105, 40, 40)
  }, [])

  return (
    <canvas ref={canvasRef} id="canvas" style={{border: '2px solid #000000', width: 1000, height: 400}} ></canvas>
  )
}

export default Map
