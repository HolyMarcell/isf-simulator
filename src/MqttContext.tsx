import React, {useContext, useEffect, useRef, useState} from "react";
import * as paho from "paho-mqtt";


const MqttContext = React.createContext({});


const connect = (onMessage) => {
  const client = new paho.Client('ws://localhost:15675/ws', 'REACTCLIENT2');
  client.onConnected = () => {
    console.log('Connected <3');
  }
  client.onMessageArrived = onMessage;
  client.connect({userName: 'user', password: 'bitnami'});
  return client;
}

export const useMqttContext = () => {
  return useContext(MqttContext);
}


export const MqttContextProvider: React.FC<{children: React.ReactElement}> = ({children}) => {

  const [msg, setMsg] = useState([]);

  const onMessage = (message) => {
    setMsg(v => v.concat({...message, date: new Date().toLocaleTimeString()}).slice(40));
  }

  const client = useRef();
  useEffect(() => {
    client.current = connect(onMessage);

    return () => client.current.disconnect();
  }, []);

  const publish = (topic, message) => {
    client.current.publish(topic, message);
  }

  const subscribe = (topic) => {
    client.current.subscribe(topic)
  }

  return (
    <MqttContext.Provider value={{messages: msg, publish, subscribe}}>
      {children}
    </MqttContext.Provider>
  )
}
