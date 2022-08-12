import {useEffect, useRef, useState} from 'react'
import {useMqttContext} from "./MqttContext";
import {Box, Button, Grid, Input} from "@chakra-ui/react";





export const  SendMessageForm = () => {

  const {subscribe, publish} = useMqttContext();

  const [sendTopicInput, setSendTopicInput] = useState('');
  const [sendMessageInput, setSendMessageInput] = useState('');

  const generateNoise = () => {
    subscribe('WACKEN');
    subscribe('HACKEN');
    subscribe('BACKEN');

    let i = 0;

    const noise = () => {
      publish('WACKEN', i.toString());
      i += 1;
      publish('HACKEN', Math.random().toString());
      publish('BACKEN', Math.random().toString());
      setTimeout(noise, 10);
    }
    noise();
  }

  const sendMessage = () => {
    publish(sendTopicInput, sendMessageInput);
  }


  return (
    <Box mt={'25px'}
         pt={'25px'}
         borderTop={'1px solid'}>



          <Grid templateColumns={'100px 300px 300px 100px 150px'} gap={4}>
            <Box display={'flex'} alignItems={'center'}>Send message</Box>
            <Input
              placeholder={'topic'}
              name={'topic'}
              value={sendTopicInput}
              onChange={(e) => setSendTopicInput(e.target.value)}/>

            <Input
              placeholder={'message'}
              name={'message'}
              value={sendMessageInput}
              onChange={(e) => setSendMessageInput(e.target.value)}/>

            <Button onClick={() => sendMessage()}>Send</Button>
            <Button colorScheme={'green'} onClick={generateNoise}>Generate Noise</Button>
          </Grid>

      </Box>
  )
}

