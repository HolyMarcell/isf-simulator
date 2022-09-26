import {useState} from 'react'
import {useMqttContext} from "./MqttContext";
import {Box, Grid, Input} from "@chakra-ui/react";
import {IfCButton} from "../components/IfCButton";


export const  SendMessageForm = () => {

  const {publish} = useMqttContext();

  const [sendTopicInput, setSendTopicInput] = useState('');
  const [sendMessageInput, setSendMessageInput] = useState('');


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

            <IfCButton onClick={() => sendMessage()}>Send</IfCButton>


          </Grid>

      </Box>
  )
}
