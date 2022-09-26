import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {localStorageKey, useMqttContext} from "./MqttContext";
import {lsRead} from "../util/localstorage";
import {ConnectionForm, SavedDetails} from "./ConnectionForm";


export const ConnectBar = () => {

  const {connected, connect, disconnect} = useMqttContext();

  const toggleConnect = () => {
    const creds = lsRead<SavedDetails>(localStorageKey);
    connected ? disconnect() : connect(creds);
  }

  return (
    <Box
      position={'relative'}
      top={0}
      left={0}
      bgColor={connected ? 'green.200' : 'red.200'}
      width={'80vw'}
      height={'60px'}
      display={'flex'}
      alignItems={'center'}
      p={'10px'}>
      {connected ? 'Connected :)' : 'Disconnected :/'}

      <ButtonGroup ml={'auto'}>
        <ConnectionForm />
        <Button onClick={toggleConnect}>
          {connected ? 'Disconnect' : 'Connect'}
        </Button>
      </ButtonGroup>
    </Box>
  )
}
