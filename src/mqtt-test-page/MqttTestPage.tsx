import { Box } from '@chakra-ui/react';
import { PageLayout } from '../components/layout';
import { ScrollLog } from './ScrollLog';
import { SendMessageForm } from './SendMessageForm';
import { ConnectBar } from './ConnectBar';
import { Generators } from './Generators';
import { MqttContextProvider } from './MqttContext';


export const MqttTestPage = () => {


  return (
    <MqttContextProvider>

      <PageLayout>
        <ConnectBar/>
        <Box>
          <SendMessageForm/>
        </Box>
        <Box>
          <Generators/>
        </Box>
        <Box>
          <ScrollLog/>
        </Box>
      </PageLayout>
    </MqttContextProvider>
  )
}
