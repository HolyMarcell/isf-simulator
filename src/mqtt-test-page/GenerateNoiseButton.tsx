import {useMqttContext} from "./MqttContext";
import {useRef, useState} from "react";
import {IfCButton} from "../components/IfCButton";


export const GenerateNoiseButton = () => {
  const {subscribe, publish} = useMqttContext();

  const noiseTo = useRef<number>();

  const [isNoise, setIsNoise] = useState(false);

  const generateNoise = () => {
    subscribe('WACKEN');
    subscribe('HACKEN');
    subscribe('BACKEN');

    setIsNoise(true);
    let i = 0;

    const noise = () => {
      publish('WACKEN', i.toString());
      i += 1;
      publish('HACKEN', Math.random().toString());
      publish('BACKEN', Math.random().toString());
      noiseTo.current = setTimeout(noise, 10);
    }
    noise();
  }

  const stopNoise = () => {
    setIsNoise(false);
    clearTimeout(noiseTo.current);
  }

  return (
    <>
      {!isNoise &&
          <IfCButton
              colorScheme={'green'}
              onClick={generateNoise}>Generate Noise</IfCButton>
      }
      {isNoise &&
          <IfCButton
              colorScheme={'orange'}
              onClick={stopNoise}>Stop Noise</IfCButton>
      }
    </>
  )
}
