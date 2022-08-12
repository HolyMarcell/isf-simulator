import {useState} from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import {lsRead, lsWrite} from "./util/localstorage";
import {localStorageKey, useMqttContext} from "./MqttContext";


export interface SavedDetails {
  user: string;
  pass: string;
  url: string;
}

export const ConnectionForm = () => {
  const {connect} = useMqttContext();
  const saved = lsRead<SavedDetails>(localStorageKey);
  const [isOpen, setIsOpen] = useState(false);

  const [url, setUrl] = useState<string>(saved?.url || '');
  const [user, setUser] = useState<string>(saved?.user || '');
  const [pass, setPass] = useState<string>(saved?.pass || '');


  const save = () => {
    lsWrite<SavedDetails>(localStorageKey, {
      user,
      pass,
      url
    });
  }

  const restore = () => {
    const {url, user, pass} = lsRead<SavedDetails>(localStorageKey);
    setUrl(url);
    setPass(pass);
    setUser(user);
  }

  const handleConnect = () => {
    connect({url, user, pass})
  }

  if(!isOpen) {
    return (
      <Button onClick={() => setIsOpen(v => !v)}>
        Edit Connection
      </Button>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={'20px'}>



        <Heading size={'md'} pb={30}>Conenct to MQTT Server (via websockets)</Heading>

        <Grid templateColumns={'100px 400px'} gap={4}>
          <Box display={'flex'} alignItems={'center'}>URL</Box>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={'URL'}/>

          <Box display={'flex'} alignItems={'center'}>Username</Box>
          <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder={'Username'}/>

          <Box display={'flex'} alignItems={'center'}>Password</Box>
          <Input
            type={'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={'Password'}/>
        </Grid>
        <ButtonGroup mt={9} gap={2}>
          <Button onClick={handleConnect}>Test Connection</Button>
          <Button onClick={restore}>Restore from saved</Button>
          <Button colorScheme={'blue'}  onClick={save}>Save Details</Button>
        </ButtonGroup>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
