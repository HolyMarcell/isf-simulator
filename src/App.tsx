import {useEffect, useRef, useState} from 'react'
import './App.css'
import * as paho from 'paho-mqtt';


const connect = (onMessage) => {
  const client = new paho.Client('ws://localhost:15675/ws', 'REACTCLIENT2');
  client.onConnected = () => {
    console.log('Connected <3');
  }

  // const pub = () =>  {
  //   client.publish('TOPIC', 'Hello world');
  //   setTimeout(pub, 1000);
  // }
  // pub();

  client.onMessageArrived = onMessage;

  client.connect({userName: 'user', password: 'bitnami'});

  return client;
}


function App() {
  const [msg, setMsg] = useState([]);
  const client = useRef(null);

  const [subTopicInput, setSubTopicInput] = useState('');
  const [subedTopics, setSubedTopics] = useState([]);

  const [sendTopicInput, setSendTopicInput] = useState('');
  const [sendMessageInput, setSendMessageInput] = useState('');

  const generateNoise = () => {
    setSubedTopics((v) => [...v, "WACKEN", "HACKEN", "BACKEN"]);
    client.current.subscribe('WACKEN');
    client.current.subscribe('HACKEN');
    client.current.subscribe('BACKEN');

    let i = 0;

    const noise = () => {
      client.current.publish('WACKEN', i.toString());
      i += 1;
      client.current.publish('HACKEN', Math.random().toString());
      client.current.publish('BACKEN', Math.random().toString());
      setTimeout(noise, 10);
    }
    noise();
  }

  useEffect(() => {
    client.current = connect((message) => {
      setMsg(v => v.concat({...message, date: new Date().toLocaleTimeString()}).slice(40));
    });
    return () => client.current.disconnect();
  }, [])

  const subToTopic = () => {
    client.current.subscribe(subTopicInput);
    setSubedTopics(v => v.concat(subTopicInput));
    setSubTopicInput('');
  }

  const sendMessage = () => {
    client.current.publish(sendTopicInput, sendMessageInput);
  }

  const autoSend = () => {
    client.current.publish(sendTopicInput, sendMessageInput);
    setTimeout(autoSend, 5);
  }

  return (
    <>
      <div style={{position: 'absolute', width: '100%', top: '10px', left: '20px'}}>

        <button onClick={generateNoise}>Generate Noise</button>

        <div>
          <label>
            Send Message:
            <input
              style={{margin: '20px'}}
              placeholder={'topic'}
              name={'topic'}
              value={sendTopicInput}
              onChange={(e) => setSendTopicInput(e.target.value)}/>

            <input
              style={{margin: '20px'}}
              placeholder={'message'}
              name={'message'}
              value={sendMessageInput}
              onChange={(e) => setSendMessageInput(e.target.value)}/>

            <button onClick={() => sendMessage()}>Send</button>
            <button onClick={() => autoSend()}>AutoSend (0.5s)</button>

          </label>
        </div>

        <hr/>

        <div style={{display: 'flex'}}>
          <label>
            Subscribe to topic:
            <input
              style={{margin: '20px'}}
              placeholder={'topic'}
              name={'subtop'}
              value={subTopicInput}
              onChange={(e) => setSubTopicInput(e.target.value)}/>
            <button onClick={subToTopic}>Subscribe</button>
          </label>
        </div>

      </div>
      <div style={{width: '100vw'}} >

        <div style={{display: 'flex', paddingTop: '130px', flex: '1'}}>
          {subedTopics.map((subedTopic) => {
            return (
              <div key={subedTopic} style={{flex: '1'}}>
                <h3>{subedTopic}</h3>
                <ul>
                  {msg
                    .filter(({topic}) => topic === subedTopic)
                    .reverse()
                    .map((v, i) => (
                      <li key={i}>
                        <span style={{color: '#777', paddingRight: '5px'}}>{v.date}: </span>
                      {v.payloadString}
                      </li>
                    ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
