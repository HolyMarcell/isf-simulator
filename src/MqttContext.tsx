import React, {useContext, useEffect, useRef, useState} from "react";
import * as paho from "paho-mqtt";


const MqttContext = React.createContext({});


const mqtt_connect = ({onMessage, onConnected, onDisconnected, url, user, pass}) => {
  const client = new paho.Client(url, 'ISF-Simulator-Client');
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
  const [topics, setTopics] = useState([]);
  const [connected, setConnected] = useState(false);

  const onMessage = (message) => {
    setMsg(v => v.concat({...message, date: new Date().toLocaleTimeString()}).slice(-40));
  }

  const client = useRef();

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
    client.current.subscribe(topic);
    setTopics(v => v.concat(topic));
  }

  return (
    <MqttContext.Provider value={{
      messages: msg,
      topics,
      publish,
      subscribe,
      connect,
      disconnect,
      connected}}>
      {children}
    </MqttContext.Provider>
  )
}
