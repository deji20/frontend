import { useRef, useEffect } from 'react'

interface CanvasProps{
  draw: (context: CanvasRenderingContext2D) => void
}

export default function Canvas(props: CanvasProps){
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if(!canvas) return 
    const context = canvas.getContext('2d')
    //Our first draw
    if(!context) return

    props.draw(context);
  }, [])

  return <canvas width="100px" height="100px" ref={canvasRef}/>
}