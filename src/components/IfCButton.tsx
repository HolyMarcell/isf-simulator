import {Button, ButtonProps} from "@chakra-ui/react";
import React from "react";
import {useMqttContext} from "../MqttContext";

export const IfCButton: React.FC<ButtonProps> = (props) => {
  const {connected} = useMqttContext();
  return <Button disabled={!connected} {...props} />
}
