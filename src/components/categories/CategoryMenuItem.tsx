import Link from "next/link";
import {Box, CircularProgress, MenuItem, styled, SvgIcon} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useSettings from "../../hooks/useSettings";
import appIcons from "../icons";
import { useStore } from "../../stores";
import {trpc} from "../../providers/trpcProvider";
import { Shops } from "@prisma/client";

const Wrapper = styled(Box)(({ theme}:{theme:any}) => ({
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 250ms ease-in-out",
    "& .title": {
      flexGrow: 1,
      paddingLeft: "0.75rem",
    },
  },
  "&:hover": {
    "& > .category-dropdown-link": {
      color: theme.palette.primary.main,
      background: theme.palette.action.hover,
    },
    "& > .mega-menu": {
      display: "block",
    },
  },
}));

// =============================================================
type CategoryMenuProps = {
  id:number;
  child_list:string;
  has_mount:boolean;
  href:string;
  has_child:number;
  title:string;
  caret:boolean;
  icon:string | null;
  children:React.ReactNode;
}

const CategoryMenuItem = (props:CategoryMenuProps) => {
  const { id, child_list, has_mount, href, has_child, title, caret, icon, children } = props;
  const { settingState } = useSettings();
  const { setCategory } = useStore();
  const domain = useStore((state) => state.shopInfo.domain);
  const { refetch,isInitialLoading } = trpc.category.getChilds.useQuery(child_list,{
    enabled: false
  });
  const handleCallChild = async () => {
    if (!has_child || has_mount){
      return false;
    }
    refetch().then(({data}) => {
      setCategory({data,id,domain});
    });
  }
  let SvgIcon = '';
  if(icon !== '' && icon !== null){
    SvgIcon = appIcons[icon];
  }
  return (
    <Wrapper onMouseEnter={() => handleCallChild()}>
      <Link href={domain+href} passHref>
        <MenuItem className="category-dropdown-link">
          {icon && <SvgIcon fontSize="small" color="inherit" />}
          <span className="title">{title}</span>
          { isInitialLoading ?
            <CircularProgress size={15}/> :
            (caret && (settingState.direction === "ltr" ? ( <ChevronRight fontSize="small" /> ) : ( <ChevronLeft fontSize="small" />)))
          }
        </MenuItem>
      </Link>
      { children }
    </Wrapper>
  );
};

export default CategoryMenuItem;
