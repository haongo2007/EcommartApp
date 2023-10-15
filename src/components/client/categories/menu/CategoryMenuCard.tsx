import { styled } from "@mui/material/styles";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "../mega-menu/MegaMenu1";
import MegaMenu2 from "../mega-menu/MegaMenu2";
import {flatMap, mapValues} from "lodash-es";
import { CategoryGroupType } from "types/category";
import { useStore } from "stores";
import Box from "@mui/material/Box";

const Wrapper = styled(Box)(({ theme, position, open }:{theme:any, position: "absolute" | "fixed" | "relative", open:boolean}) => ({
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

export const CateMega = ({data,shop,locale}:{data:CategoryGroupType,shop:string|null,locale:string}) => {
    if (typeof window !== "undefined"){
      locale = useStore((state) => state.shopLocale.language);
    }
    if (shop === undefined || Object.keys(data).length === 0) return ;
    if(shop === null){
      data = flatMap(mapValues(data));
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
                { item.children && (<MegaMenu data={item.children} shop={shop}/>) }
            </CategoryMenuItem>
        )
    })
}

export default function CategoryMenuCard(props: { open: boolean; position: "absolute" | "fixed" | "relative"; categories: CategoryGroupType; locale:string }){
  const { open, position,categories,locale} = props;
  const { shopCategory } = useStore();
  let data = categories;
  if (typeof window !== "undefined"){
    data = shopCategory;
  }
  return (
      <Wrapper open={open} position={position} theme={undefined}>
          <CateMega data={data} shop={null} locale={locale}/>
      </Wrapper>
  );
};
