"use client"
import Category from "./Category";
import Dress from "./Dress";
import Laptop from "./Laptop";
import MakeUp from "./MakeUp";
import ShoppingBagOutlined from "./ShoppingBagOutlined";
import Chair from "./Chair";
import React from "react";
import {SvgIconProps} from "@mui/material";

type AppIconType = {
  [key: string]: React.FunctionComponent<SvgIconProps>
}

const appIcons: AppIconType = {
  Category,
  Dress,
  Laptop,
  MakeUp,
  Chair,
  ShoppingBagOutlined,
};
export default appIcons;
