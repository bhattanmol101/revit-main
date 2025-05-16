import { JSX } from "react";

export type Menu = {
  id: number;
  title: string;
  path: string;
  icon?: JSX.Element;
  newTab?: boolean;
};
