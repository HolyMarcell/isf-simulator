import {ChakraProvider} from "@chakra-ui/react";
import {AppCode} from "./AppCode";
import {HomePage} from "./home/HomePage";


export const App = () => {
  return (
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  )
}
