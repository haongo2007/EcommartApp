"use client"
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";
import {Box} from "@mui/material";

export default function Fashion1({productData}) {
  const {product_flash_deals,product_new_arrivals,product_deals_day,product_deals_week,product_most_buyed} = productData;
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        overFlow: "hidden",
      }}
    >
      {/* HERO SECTION AND SERCIVE CARDS */}
      <Section1 />
      {/* FLASH DEALS */}
      <Section2 flashDeals={product_flash_deals}/>
      {/*/!* NEW ARRIVALS *!/*/}
      <Section3 newArrivals={product_new_arrivals}/>
      {/*/!* DEALS OF THE WEEK GRID CAROUSEL *!/*/}
      <Section4 dealOfTheDay={product_deals_day}/>
      {/*/!* HOT DEALS CAROUSEL *!/*/}
      <Section5 dealOfTheWeek={product_deals_week}/>
      {/*/!* TRENDING ITEMS *!/*/}
      <Section6 most_buyed={product_most_buyed}/>
      {/*/!* SERVICE ITEMS *!/*/}
      <Section7 />
      {/* SUBSCRIBE NEWSLETTER */}
      <Section8 />
    </Box>
  );
}
