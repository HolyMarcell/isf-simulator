import { randInt } from '../util/randInt';
import { id } from '../util/id';


interface GenPoint {
  x: number;
  y: number;
  e: number;
}

interface GStruct {
  X?: number;
  Y?: number;
  Z?: number;
  E?: number;
  F?: number;
  command?: string;
  comment?: string;
}


const deg_to_rad = (deg: number) => {
  return deg * (Math.PI / 180);
}

const law_of_cosines = (a, b, theta) => {
  // This calculates the length of the Hypothenuse
  // on an arbitrary triangle given sides a,b and the angle theta between them

  const rad_theta = deg_to_rad(theta);

  const c_sq = Math.pow(a, 2) + Math.pow(b, 2) - (2 * a * b * Math.cos(rad_theta));
  return Math.sqrt(c_sq);
}


const makeCirclePoints = (radius: number, segments:number): GenPoint[]  => {
  const points: GenPoint[] = []
  const ang_inner = 360 / segments; // The angle between Corner < Center > Corner of 1 slice/segment
  const segment_len = law_of_cosines(radius, radius, ang_inner); // Length of one polygon segment


  for(let segment = 1; segment <= segments; segment++) {
    points.push({
      x: (radius * Math.sin(deg_to_rad(segment * ang_inner))),
      y: (radius * Math.cos(deg_to_rad(segment * ang_inner))),
      e: segment_len
    });
  }
  return points;
}

const randomizeStartPoint = (points: GenPoint[]): GenPoint[] => {
  const rand = randInt(0, points.length);

  const st = points.slice(0, rand);
  const ed = points.slice(rand);
  return [...ed, ...st];
}

const gstruct_to_gcode = (gstruct: GStruct[]): string[] => {
  return gstruct.map(({comment = '', command = '', ...rest}) => {
    const r = Object.keys(rest).reduce((acc, curr) => {
      return `${acc} ${curr}${rest[curr].toFixed(5)}`
    }, '')
    return `${command}${r} ${comment !== '' ? ';' : ''}${comment}`
  });
}

export const generator = ({
  diameter = 100,
  segments = 6,
  layers = 3,
  layerHeight = 1,
  randomizeStart = true
}) => {

  const radius = 0.5 * diameter;

  //const ang_seg_to_seg = 180 - ang_inner; // For slice: angles are 180 = a + a + ang_inner
                                          // ergo a = (180 - ang_inner) / 2
                                          // and angle between two segments = 2a = 180 - ang_inner


  const gcode: GStruct[] = [];

  for(let layer = 0; layer < layers; layer++) {

    const rnd = randomizeStart ? randomizeStartPoint : id;
    const genPoints = rnd(makeCirclePoints(radius, segments));

    // Add a comment to signify layer change
    gcode.push({
      comment: "LAYER:" + layer
    });

    gcode.push({
      command: "G92", // Reset E- and F-Value, start counting at E0
      E: 0,
      F: 0,
    });

    // Move to startpoint
    if(layer === 1) {
      gcode.push({
        command: "G0",
        X: genPoints[0].x,
        Y: genPoints[0].y,
        Z: layer * layerHeight,
      });
    } else {

      // Stay at the last printed point, but move up one Z
      const lastCode = gcode[gcode.length - 1];
      gcode.push({
        ...lastCode,
        command: "G0",
        Z: layer * layerHeight,
      });

      // Now we are at correct Z, move to startpos
      gcode.push({
        command: "G0",
        X: genPoints[0].x,
        Y: genPoints[0].y,
      });
    }

    let acc_e = 0; // Accumulate E over the length of a layer.

    for(let i = 1; i <= genPoints.length -1; i ++) {
      // Start count at 1, because 0 already got mangled in the lines before.
      // 0 point does not get extrusion but moves up a Z

      acc_e += genPoints[i].e;

      gcode.push({
        command: "G1",
        X: genPoints[i].x,
        Y: genPoints[i].y,
        E: acc_e,
      });
    }

    gcode.push({
      command: "G1",
      X: genPoints[0].x,
      Y: genPoints[0].y,
      E: genPoints[0].e + acc_e,
    });
  }


  return gstruct_to_gcode(gcode);

}
