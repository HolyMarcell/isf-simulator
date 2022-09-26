import { PageLayout } from '../components/layout';
import { useEffect, useRef } from 'react';
import { generator } from './generator';


export const GcodePipe = () => {

  const c = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = c.current;
    const ctx = canvas?.getContext('2d');
    const d = 200;
    const gcode = generator({
      diameter: d,
      segments: 30
    });

    console.log(gcode)

    const points = [{x: 0, y: 0}]
    if(ctx) {

      // const os = (d / 2) + 4;
      const os = ctx.canvas.width / 2;

      ctx.beginPath();
      const start = points[0];
      ctx.moveTo(os + start.x, os + start.y)
      for(let point of points) {
        ctx.lineTo(os + point.x, os + point.y);
      }
      ctx.closePath();
      ctx.stroke();

      //ctx.fill();


    }

  }, [])




  return (
    <PageLayout>
      <h3>This generates a GCode for a pipe</h3>
      <canvas width={'500px'} height={'500px'} ref={c}></canvas>
    </PageLayout>
  )
}
