import { Box, ChakraProvider } from '@chakra-ui/react';
import { MqttTestPage } from "./mqtt-test-page/MqttTestPage";
import { Route, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { GcodePipe } from './gcode-pipe/GcodePipe';
import { theme } from './theme';


const Nav = ({children}) => {
  return (
    <>
      <Box
        background={'#ccc'}
        width={'100%'}
        height={'60px'}
        display={'flex'}
        alignItems={'center'}
        paddingLeft={'10vw'}
        marginBottom={'60px'}
      >
        <Link to={'/'}>Home</Link>
        <Box p={'20px'}>|</Box>
        <Link to={'/mqtt'}>MQTT Test</Link>
        <Box p={'20px'}>|</Box>
        <Link to={'/gcode-pipe'}>GCode pipe</Link>
      </Box>
      {children}
    </>
  )
}


export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter basename={'/isf-simulator/'} >
        <Routes>
          <Route path={'/'} element={<Nav><HomePage /></Nav>} />
          <Route path={'/mqtt'} element={<Nav><MqttTestPage/></Nav>} />
          <Route path={'/gcode-pipe'} element={<Nav><GcodePipe/></Nav>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}
