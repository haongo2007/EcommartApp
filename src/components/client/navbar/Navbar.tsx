"use client"
import { Box, Button, Container, MenuItem, styled } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import BazaarCard from "../BazaarCard";
import { FlexBox } from "../flex-box";
import Category from "../icons/Category";
import NavLink from "../nav-link/NavLink";
import { Paragraph } from "../Typography";
import CategoryMenu from "../categories/menu/CategoryMenu";
import MegaMenu from "./MegaMenu";
import MegaMenu2 from "./MegaMenu2";
import useSettings from "hooks/useSettings";
import useCheckCatePage from "hooks/useCheckCatePage";

// const common css style
const navLinkStyle = {
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "primary.main",
  },
  "&:last-child": {
    marginRight: 0,
  },
}; // style components

const StyledNavLink = styled(NavLink)(() => ({ ...navLinkStyle }));
const ParentNav = styled(Box)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
    "& > .parent-nav-item": {
      display: "block",
    },
  },
}));
const ParentNavItem = styled(Box)(({ theme }) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  [theme.breakpoints.down(1640)]: {
    right: "100%",
    left: "auto",
    paddingRight: 8,
  },
}));
const NavBarWrapper = styled(BazaarCard)(({ theme, border }) => ({
  height: "60px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  ...(border && {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  }),
  [theme.breakpoints.down(1150)]: {
    display: "none",
  },
}));
const InnerContainer = styled(Container)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const CategoryMenuButton = styled(Button)(({ theme }) => ({
  width: "278px",
  height: "40px",
  backgroundColor: theme.palette.grey[100],
}));
const ChildNavsWrapper = styled(Box)(() => ({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)",
}));
// ==========================================================
const Navbar = ({ navListOpen, hideCategories,hideHorizontalCategories, elevation, border, domain, locale }: { navListOpen?:boolean, hideCategories?:boolean,hideHorizontalCategories?:boolean, elevation?:number, border?:number, domain:string, locale:string}) => {
  if(useCheckCatePage()){
    return (<></>);
  }
  const { settingState } = useSettings();
  const MenuMain = [
    {
      title: "Home",
      href: `/${locale}/${domain}`,
      key: 'home',
      count: 1,
    },
    {
      title: "Shop",
      href: `/${locale}/${domain}/store`,
      key: 'shop',
      count: 2,
    },
  ];

  const renderNestedNav = (isRoot = false) => {
    return MenuMain.map((nav) => {
      if (isRoot) {
        // show megamenu
        if (nav.megaMenu) {
          return (
            //@ts-ignore
            <MegaMenu key={nav.title} title={nav.title} menuList={nav.child} />
          );
        } // show megamenu with sub

        if (nav.megaMenuWithSub) {
          return (
            //@ts-ignore
            <MegaMenu2 key={nav.title} title={nav.title} menuList={nav.child} />
          );
        }

        if (nav.href) {
          return (
            <StyledNavLink href={nav.href} key={nav.title}>
              {nav.title}
            </StyledNavLink>
          );
        }

        if (nav.child) {
          return (
            <FlexBox
              key={nav.title}
              alignItems="center"
              position="relative"
              flexDirection="column"
              sx={{
                "&:hover": {
                  "& > .child-nav-item": {
                    display: "block",
                  },
                },
              }}
            >
              <FlexBox alignItems="flex-end" gap={0.3} sx={navLinkStyle}>
                {nav.title}{" "}
                <KeyboardArrowDown
                  sx={{
                    color: "grey.500",
                    fontSize: "1.1rem",
                  }}
                />
              </FlexBox>

              <ChildNavsWrapper className="child-nav-item">
                <BazaarCard
                  elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    minWidth: 200,
                  }}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ChildNavsWrapper>
            </FlexBox>
          );
        }
      } else {
      if (nav.href) {
        return (
          <NavLink href={nav.href} key={nav.title}>
            <MenuItem>{nav.title}</MenuItem>
          </NavLink>
        );
      }

      if (nav.child) {
          return (
            <ParentNav position="relative" minWidth="230px" key={nav.title}>
              <MenuItem color="grey.700">
                <Box flex="1 1 0" component="span">
                  {nav.title}
                </Box>

                {settingState.direction === "ltr" ? (
                  <ArrowRight fontSize="small" />
                ) : (
                  <ArrowLeft fontSize="small" />
                )}
              </MenuItem>

              <ParentNavItem className="parent-nav-item">
                <BazaarCard
                  sx={{
                    py: "0.5rem",
                    minWidth: "230px",
                  }}
                  elevation={3}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ParentNavItem>
            </ParentNav>
          );
        }
      }
    });
  };

  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={border}>
      {!hideCategories ? (
        <InnerContainer>
          {/* Category megamenu */}
          <CategoryMenu open={navListOpen}>
            <CategoryMenuButton variant="text">
              <Category fontSize="small" />
              <Paragraph
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml={1.25}
                color="grey.600"
              >
                Categories
              </Paragraph>

              {settingState.direction === "ltr" ? (
                <ChevronRight className="dropdown-icon" fontSize="small" />
              ) : (
                <ChevronLeft className="dropdown-icon" fontSize="small" />
              )}
            </CategoryMenuButton>
          </CategoryMenu>

          {/* Horizontal menu */}
          {!hideHorizontalCategories ? (
            <FlexBox sx={{ width: "70%"}} gap={4}>{renderNestedNav(false)}</FlexBox>
          ) : ('')}
        </InnerContainer>
      ) : (
        <InnerContainer
          sx={{
            justifyContent: "center",
          }}
        >
          <FlexBox gap={4}>{renderNestedNav(true)}</FlexBox>
        </InnerContainer>
      )}
    </NavBarWrapper>
  );
};

export default Navbar;
