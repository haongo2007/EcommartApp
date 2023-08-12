"use client"
import Category from "./Category";
import Dress from "./Dress";
import Laptop from "./Laptop";
import MakeUp from "./MakeUp";
import ShoppingBagOutlined from "./ShoppingBagOutlined";
import Chair from "./Chair";
import React from "react";
import {SvgIconProps} from "@mui/material";
import FeedbackThumbsUp from "./FeedbackThumbsUp";
import CreditCardVerified from "./CreditCardVerified";
import Light from "./Light";
import Telegram from "./Telegram";
import Facebook from "./Facebook";
import Twitter from "./Twitter";
import Google from "./Google";
import AppleStore from "./AppleStore";
import Youtube from "./Youtube";
import Truck from "./Truck";
import MoneyGuarantee from "./MoneyGurantee";
import OnlineSupport from "./OnlineSupport";
import Payment from "./Payment";
import AlarmClock from "./AlarmClock";
import CustomerService from "./CustomerService";

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
  FeedbackThumbsUp,
  CreditCardVerified,
  Light,
  Telegram,
  AppleStore,
  Google,
  Twitter,
  Facebook,
  Youtube,
  Truck,
  MoneyGuarantee,
  OnlineSupport,
  Payment,
  AlarmClock,
  CustomerService
};
export default appIcons;
