"use client"
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Card, styled, Typography } from "@mui/material";
import { CreditCard, FavoriteBorder, Person, Place } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import NavLink from "components/nav-link/NavLink";

const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
const StyledNavLink = styled(({ children, isCurrentPath, ...rest }) => (
  <NavLink {...rest}>{children}</NavLink>
))(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const AccountSideBar = ({locale,domain}:{locale:string,domain:string}) => {
  const pathname : string | null = usePathname();
  const hashPath = pathname?.split('/'); 
  const linkList = [
    {
      title: "DASHBOARD",
      list: [
        {
          href: `/${locale}/${domain}/account/orders`,
          title: "Orders",
          icon: ShoppingBagOutlined,
          key: 'orders',
          count: 5,
        },
        {
          href: `/${locale}/${domain}/account/wish-list`,
          title: "Wishlist",
          icon: FavoriteBorder,
          key: 'wish-list',
          count: 19,
        },
        {
          href: `/${locale}/${domain}/account/support-tickets`,
          title: "Support Tickets",
          icon: CustomerService,
          key: 'support-tickets',
          count: 1,
        },
      ],
    },
    {
      title: "ACCOUNT SETTINGS",
      list: [
        {
          href: `/${locale}/${domain}/account`,
          key: 'account',
          title: "Profile Info",
          icon: Person,
          count: '',
        },
        {
          href: `/${locale}/${domain}/account/address`,
          title: "Addresses",
          key: 'address',
          icon: Place,
          count: 16,
        },
        {
          href: `/${locale}/${domain}/account/payment-methods`,
          title: "Payment Methods",
          key: 'payment-methods',
          icon: CreditCard,
          count: 4,
        },
      ],
    },
  ];
  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={hashPath && hashPath[hashPath.length - 1] == item.key}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                />
                <span>{item.title}</span>
              </FlexBox>

              <span>{item.count}</span>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};

export default AccountSideBar;
