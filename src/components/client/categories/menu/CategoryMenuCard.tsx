import { Box, styled } from "@mui/material";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "../mega-menu/MegaMenu1";
import MegaMenu2 from "../mega-menu/MegaMenu2";
import {flatMap, mapValues} from "lodash-es";
import { useStore } from "stores";

const Wrapper = styled(Box)(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
})); // ===============================================================

const megaMenu = [
  MegaMenu1,
  MegaMenu2,
];

export const CateMega = ({data,shop}) => {
    const locale = useStore((state) => state.shopLocale.language);
    if (shop === undefined || Object.keys(data).length === 0) return ;
    if(shop === ''){
      data = flatMap(mapValues(data));
    }else{

    }
    return data.map((item) => {
        let MegaMenu = megaMenu[item.deep];
        return (
            <CategoryMenuItem
                shop={item.shop}
                has_child={item.has_child}
                has_mount={item.has_mount || false}
                href={item.alias}
                icon={item.icon}
                key={item.id}
                id={item.id}
                child_list={item.child_list}
                title={item.description.filter((desc) => desc.lang === locale)[0].title}
                caret={!!item.has_child}
            >
                { item.children && (<MegaMenu data={item.children} shop={shop} />) }
            </CategoryMenuItem>
        )
    })
}
// ===============================================================
const CategoryMenuCard = (props) => {
  const { shopCategory } = useStore();
  console.log(useStore());
  let categories;
  const currentShop = '';
    if (currentShop !== ''){
      if (shopCategory.hasOwnProperty(currentShop)){
          categories = shopCategory[currentShop];
      }
    }else{
      categories = shopCategory
    }
  const { open, position } = props;
  return (
      <Wrapper open={open} position={position}>
          <CateMega data={categories} shop={currentShop}/>
      </Wrapper>
  );
};
export default CategoryMenuCard;
