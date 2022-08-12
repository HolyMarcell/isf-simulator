import {Box, ButtonGroup} from "@chakra-ui/react";
import {GenerateNoiseButton} from "./GenerateNoiseButton";
import {GenerateXYZButton} from "./GenerateXYZButton";


export const Generators = () => {
  return (
    <Box
      mt={'25px'}
      pt={'25px'}
      borderTop={'1px solid'}>
      <ButtonGroup spacing={2}>

        <GenerateNoiseButton/>
        <GenerateXYZButton/>
      </ButtonGroup>
    </Box>
  )
}
