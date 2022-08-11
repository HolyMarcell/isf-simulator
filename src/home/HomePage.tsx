import {Box} from "@chakra-ui/react";
import {PageLayout} from "../components/layout";
import {ConnectionForm} from "../ConnectionForm";


export const HomePage = () => {


  return (
    <PageLayout>
      <Box>
        <ConnectionForm />
      </Box>
    </PageLayout>
  )
}
