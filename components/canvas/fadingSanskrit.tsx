import om from "../../public/assets/sanskrit-om.svg"
import Canvas from "./canvas";

export default function FadingSanskrit(){
    return (
        <Canvas draw={(ctx) => {

            ctx.strokeStyle = "#023122"
            const path = new Path2D(om)
            ctx.stroke(path)
        }}/>
    )
} 