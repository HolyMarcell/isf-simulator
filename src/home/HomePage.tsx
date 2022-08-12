import {Box} from "@chakra-ui/react";
import {PageLayout} from "../components/layout";
import {ConnectionForm} from "../ConnectionForm";
import {ScrollLog} from "../ScrollLog";
import {SendMessageForm} from "../SendMessageForm";


export const HomePage = () => {


  return (
    <PageLayout>
      <Box>
        <ConnectionForm />
      </Box>
      <Box>
        <SendMessageForm />
      </Box>
      <Box>
        <ScrollLog />
      </Box>
    </PageLayout>
  )
}
