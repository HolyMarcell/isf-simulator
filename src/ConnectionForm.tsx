import {useState} from "react";
import {Box, Button, Flex, Grid, Heading, Input} from "@chakra-ui/react";
import {lsRead, lsWrite} from "./util/localstorage";
const localStorageKey = 'pa-labs.mqtt.connection';

export interface SavedDetails {
  user: string;
  pass: string;
  url: string;
}

export const ConnectionForm = () => {

  const saved = lsRead<SavedDetails>(localStorageKey);

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



  return (
    <div>
      <Heading size={'md'} pb={30}>onenct to MQTT Server (via websockets)</Heading>

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
      <Flex mt={9}>
        <Button onClick={save}>Save Details</Button>
      </Flex>
    </div>
  )
}
