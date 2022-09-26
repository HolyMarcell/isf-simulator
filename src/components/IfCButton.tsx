import {Button, ButtonProps} from "@chakra-ui/react";
import React from "react";
import {useMqttContext} from "../mqtt-test-page/MqttContext";

export const IfCButton: React.FC<ButtonProps> = (props) => {
  const {connected} = useMqttContext();
  return <Button disabled={!connected} {...props} />
}
