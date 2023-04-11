import { ReactElement } from "react";

export default interface RouteObject {
    path: string;
    element?: ReactElement;
  }