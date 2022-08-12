import {useState} from "react";
import {useMqttContext} from "./MqttContext";
import {Box, Button, Grid, Input} from "@chakra-ui/react";
import {IfCButton} from "./components/IfCButton";


export const ScrollLog = () => {
  const {messages, subscribe, topics} = useMqttContext();

  const [subTopicInput, setSubTopicInput] = useState('');

  const subToTopic = () => {
    if(subTopicInput.length > 0) {
      subscribe(subTopicInput);
    }
    setSubTopicInput('');
  }


  return (
    <>
      <Box mt={'25px'}
           pt={'25px'}
           borderTop={'1px solid'}>

        <Grid templateColumns={'100px 400px 100px'} gap={4}>
          <Box display={'flex'} alignItems={'center'}>Subscribe</Box>
          <Input
            placeholder={'topic'}
            name={'subtop'}
            value={subTopicInput}
            onChange={(e) => setSubTopicInput(e.target.value)}/>
          <IfCButton onClick={subToTopic}>Subscribe</IfCButton>
        </Grid>
      </Box>

      <Box mt={'25px'}
           pt={'25px'}
           minWidth={'80vw'}
           borderTop={'1px solid'}>

        <div style={{display: 'flex', paddingTop: '130px', flex: '1'}}>
          {topics.map((subedTopic) => {
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
                        <span>{v.payloadString.toString()}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Box>
    </>
  )
}
