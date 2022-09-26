import React, {useContext, useEffect, useRef, useState} from "react";
import * as paho from "paho-mqtt";


const MqttContext = React.createContext<MqttContextApi>({
  messages: [],
  topics: [],
  subscribe: () => {},
  publish: () => {},
  connect: () => {},
  disconnect: () => {},
  connected: false
});


interface MqttContextApi {
  messages: string[];
  topics: string[];
  subscribe: (topic: string) => void;
  publish: (topic: string, message: string) => void;
  connect: ({url, user, pass}: {url: string, user: string, pass: string}) => void,
  disconnect: () => void,
  connected: boolean
}


const mqtt_connect = ({onMessage, onConnected, onDisconnected, url, user, pass}) => {
  const client = new paho.Client(url, 'ISF-Simulator-Client');
  // @ts-ignore
  client.onConnected = () => {
    console.log('Connected <3');
    onConnected();
  }
  client.onConnectionLost = () => {
    console.log('Disconnected :/');
    onDisconnected();
  }
  client.onMessageArrived = onMessage;
  client.connect({userName: user, password: pass});
  return client;
}

export const useMqttContext = () => {
  return useContext(MqttContext);
}

export const localStorageKey = 'pa-labs.mqtt.connection';
export const MqttContextProvider: React.FC<{ children: React.ReactElement }> = ({children}) => {
  const [msg, setMsg] = useState([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  const onMessage = (message) => {
    setMsg(v => v.concat({...message, date: new Date().toLocaleTimeString()}).slice(-40));
  }

  const client = useRef<any>();

  const connect = ({url, user, pass}) => {
    const onConnected = () => setConnected(true);
    const onDisconnected = () => setConnected(false);

    client.current = mqtt_connect({onMessage, onConnected, onDisconnected, url, user, pass});
  }

  useEffect(() => {
    return () => client.current?.disconnect();
  }, []);

  const disconnect = () => {
    client.current?.disconnect();
  }

  const publish = (topic, message) => {
    client.current.publish(topic, message);
  }

  const subscribe = (topic) => {
    if (!topics.includes(topic)) {

      client.current.subscribe(topic);
      setTopics(v => v.concat(topic));
    }
  }

  return (
    <MqttContext.Provider value={{
      messages: msg,
      topics,
      publish,
      subscribe,
      connect,
      disconnect,
      connected
    }}>
      {children}
    </MqttContext.Provider>
  )
}
