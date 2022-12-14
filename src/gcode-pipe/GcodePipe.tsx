import { PageLayout } from '../components/layout';
import React, { useEffect, useRef, useState } from 'react';
import { generator } from './generator';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Spacer,
  Stack,
  Switch
} from '@chakra-ui/react';
import { parseGcode, ThreeDLine } from '@holymarcell/three-d-line/dist';


interface FormProps {
  diameter?: string;
  segments?: string;
  layers?: string;
  layerHeight?: string;
  randomizeStart?: boolean;
}


export const GcodePipe = () => {

  const mountRef = useRef<HTMLDivElement>(null);

  const canvasSize = {width: 600, height: 600};
  const {
    stats,
    canvas,
    startAnimation,
    addPoints,
    createBin,
    renderLine
  } = ThreeDLine({canvas: canvasSize});

  const [formState, setFormState] = useState<FormProps>({
    diameter: '200',
    segments: '60',
    layers: '100',
    layerHeight: '1',
    randomizeStart: true
  });

  const [copyGCode, setCopyGCode] = useState<string>('');
  const [showRawCode, setShowRawCode] = useState<boolean>(false);

  useEffect(() => {
    const gcode = generator({
      diameter: parseFloat(formState['diameter'] || '0'),
      segments: parseFloat(formState['segments'] || '0'),
      layers: parseFloat(formState['layers'] || '0'),
      layerHeight: parseFloat(formState['layerHeight'] || '0'),
      randomizeStart: formState['randomizeStart']
    });

    setCopyGCode(gcode.join('\r\n'));

  }, [formState])

  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.replaceChildren(canvas)
    }
  }, [copyGCode]);

  useEffect(() => {
    if (copyGCode) {
      console.log('going for it')
      createBin({colorGradient: {from: '#ff0', to: '#00f'}});
      startAnimation();

      const points = parseGcode(copyGCode.split('\n'));
      console.log(points.slice(0, 300))
      addPoints(points);
      renderLine();
      setTimeout(renderLine, 1000);
      setTimeout(renderLine, 2000);
      setTimeout(renderLine, 4000);

      //addPointsTimeout()
    }

  }, [copyGCode])


  const oc = (e) => {
    if (e.target.name === 'segments' && parseFloat(e.target.value) > 500) {
      setFormState((v) => ({
          ...v,
          [e.target.name]: 500
        })
      )
    } else if (e.target.name === 'layers' && parseFloat(e.target.value) > 500) {
      setFormState((v) => ({
          ...v,
          [e.target.name]: 500
        })
      )
    } else {

      setFormState((v) => ({
          ...v,
          [e.target.name]: e.target.value
        })
      )
    }
  }

  const downloadGcode = () => {
    const file = new Blob([copyGCode], {type: 'text/gcode'});
    const e = document.createElement('a');
    e.href = URL.createObjectURL(file);
    e.download = `Pipe-d${formState['diameter']}-seg${formState['segments']}-lay${formState['layers']}.gcode`
    document.body.append(e);
    e.click();
  }

  return (
    <PageLayout>
      <h2>This generates a GCode for a pipe</h2>

      <Spacer p={'30px'}/>

      <Grid templateColumns={'1fr 1fr'} gap={'10px'}>

        <GridItem>
          <Stack spacing={4}>
            <FormControl variant="floating" mb={4}>
              <Input
                placeholder={' '}
                type={'text'}
                name={'segments'}
                onChange={oc}
                value={formState['segments']}
              />
              <FormLabel>Split circle into segments</FormLabel>
              <FormHelperText>Max 500 segments</FormHelperText>
            </FormControl>


            <FormControl variant="floating">
              <Input
                placeholder={' '}
                type={'text'}
                name={'diameter'}
                onChange={oc}
                value={formState['diameter']}
              />
              <FormLabel>Pipe Diameter</FormLabel>
              {/*<FormHelperText>Keep it very short and sweet!</FormHelperText>*/}
            </FormControl>

            <FormControl variant="floating">
              <Input
                placeholder={' '}
                type={'text'}
                name={'layers'}
                onChange={oc}
                value={formState['layers']}
              />
              <FormLabel>How many Layers do you need?</FormLabel>
              {/*<FormHelperText>Keep it very short and sweet!</FormHelperText>*/}
            </FormControl>

            <FormControl variant="floating">
              <Input
                placeholder={' '}
                type={'text'}
                name={'layerHeight'}
                onChange={oc}
                value={formState['layerHeight']}
              />
              <FormLabel>Layer Height</FormLabel>
              {/*<FormHelperText>Keep it very short and sweet!</FormHelperText>*/}
            </FormControl>

            <FormControl>
              <Switch
                onChange={() => setFormState((v) => ({
                  ...v,
                  randomizeStart: !v.randomizeStart
                }))}
                isChecked={formState['randomizeStart']}>

              </Switch>
              <FormLabel>Randomize Startpoint</FormLabel>
              {/*<FormHelperText>Keep it very short and sweet!</FormHelperText>*/}
            </FormControl>

          </Stack>


        </GridItem>
        <GridItem>

          <FormControl>
            <Switch
              onChange={() => setShowRawCode(v => !v)}
              isChecked={showRawCode}>

            </Switch>
            <FormLabel>Show Raw GCode (This will take some time for large gcodes)</FormLabel>
          </FormControl>

          <Button onClick={downloadGcode}>
            Downlad GCode
          </Button>

          {showRawCode &&
            <Box
              contentEditable={true}
              maxHeight={'80vh'}
              border={'2px solid #ccc'}
              p={'9px'}
              overflow={'scroll'}>
              {copyGCode.split('\n').map((l, i) => {
                return <React.Fragment key={i}>{l}<br/></React.Fragment>
              })}
            </Box>}

        </GridItem>
        <GridItem>
          <div ref={mountRef}></div>
        </GridItem>

      </Grid>
    </PageLayout>
  )
}
