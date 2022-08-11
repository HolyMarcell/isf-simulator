import {ChakraProvider} from "@chakra-ui/react";
import {HomePage} from "./home/HomePage";
import {MqttContextProvider} from "./MqttContext";


export const App = () => {
  return (
    <ChakraProvider>
      <MqttContextProvider>
        <HomePage/>
      </MqttContextProvider>
    </ChakraProvider>
  )
}
