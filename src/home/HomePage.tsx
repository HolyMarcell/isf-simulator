import {Box} from "@chakra-ui/react";
import {PageLayout} from "../components/layout";
import {ScrollLog} from "../ScrollLog";
import {SendMessageForm} from "../SendMessageForm";
import {ConnectBar} from "../ConnectBar";


export const HomePage = () => {


  return (
    <PageLayout>
      <ConnectBar />
      <Box>
        <SendMessageForm />
      </Box>
      <Box>
        <ScrollLog />
      </Box>
    </PageLayout>
  )
}
