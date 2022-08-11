import {Box} from "@chakra-ui/react";
import {PageLayout} from "../components/layout";
import {ConnectionForm} from "../ConnectionForm";
import {ScrollLog} from "../ScrollLog";


export const HomePage = () => {


  return (
    <PageLayout>
      <Box>
        <ConnectionForm />
      </Box>
      <Box>
        <ScrollLog />
      </Box>
    </PageLayout>
  )
}
