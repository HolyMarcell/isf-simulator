import { useState} from "react";
import {useMqttContext} from "./MqttContext";


export const ScrollLog = () => {
  const {messages, subscribe} = useMqttContext();

  const [subTopicInput, setSubTopicInput] = useState('');
  const [subedTopics, setSubedTopics] = useState([]);



  const subToTopic = () => {
    subscribe(subTopicInput);
    setSubedTopics(v => v.concat(subTopicInput));
    setSubTopicInput('');
  }


  return (
    <>
      <div>


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
                  {messages
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
