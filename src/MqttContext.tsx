import React, {useContext, useEffect, useRef, useState} from "react";
import * as paho from "paho-mqtt";


const MqttContext = React.createContext({});


const mqtt_connect = (onMessage, url, user, pass) => {
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
  const [topics, setTopics] = useState([]);

  const onMessage = (message) => {
    setMsg(v => v.concat({...message, date: new Date().toLocaleTimeString()}).slice(-40));
  }

  const client = useRef();

  const connect = (url, user, pass) => {
    client.current = mqtt_connect(onMessage, url, user, pass);
  }

  useEffect(() => {
    return () => client.current?.disconnect();
  }, [])

  const publish = (topic, message) => {
    client.current.publish(topic, message);
  }

  const subscribe = (topic) => {
    client.current.subscribe(topic);
    setTopics(v => v.concat(topic));
  }

  return (
    <MqttContext.Provider value={{messages: msg, topics, publish, subscribe, connect}}>
      {children}
    </MqttContext.Provider>
  )
}
