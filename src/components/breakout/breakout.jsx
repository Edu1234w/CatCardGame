import { useRef, useEffect } from "react";

export default function Breakout()
{
    const canvasRef = useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // ctx.fillStyle = "green";
        // ctx.fillRect(10,10,150,100);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(75,75,50,0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }, [])

    return(
        <canvas id="canvas" ref={canvasRef} height="500px" width="800px" />
    );
}