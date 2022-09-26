import {useMqttContext} from "./MqttContext";
import {useRef, useState} from "react";
import {IfCButton} from "../components/IfCButton";
import {channels} from "./channels";


export const GenerateXYZButton = () => {
  const {messages, subscribe, publish} = useMqttContext();
  const timeoutTracker = useRef<number>();

  const [isOn, setIsOn] = useState(false);

  const generateData = () => {
    subscribe(channels.xyz);
    setIsOn(true);
    const noise = () => {

      const data = {
        x: (Math.random()*100).toFixed(2),
        y: (Math.random()*100).toFixed(2),
        z: (Math.random()*100).toFixed(2),
        a: (Math.random()*100).toFixed(2),
        b: (Math.random()*100).toFixed(2),
      }

      publish(channels.xyz, JSON.stringify(data));
      timeoutTracker.current = setTimeout(noise, 500);
    }
    noise();
  }

  const stopData = () => {
    setIsOn(false);
    clearTimeout(timeoutTracker.current);
  }

  return (
    <>
      {!isOn &&
          <IfCButton
              colorScheme={'green'}
              onClick={generateData}>Generate XYZ Data</IfCButton>
      }
      {isOn &&
          <IfCButton
              colorScheme={'orange'}
              onClick={stopData}>Stop XYZ Data</IfCButton>
      }
    </>
  )
}
