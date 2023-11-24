import React from "react";
import { __ViewName__Props } from "./interfaces";
import { use__ViewName__Controller } from "./__ViewName__(kebabCase).controller";

export const __ViewName__: React.FC<__ViewName__Props> = ({
  useController = use__ViewName__Controller,
}) => {
  const controller = useController();

  return <div>__ViewName__</div>;
};
