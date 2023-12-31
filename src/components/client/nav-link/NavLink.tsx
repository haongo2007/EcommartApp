import { styled } from '@mui/system';
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react"; // component props interface
import Link from 'next/link'

interface StyledLinkProps {
  theme?: object;
  active_route?: 'active' | '';
}

interface StyledLinkComponent {
  href: string,
  children: React.ReactNode,
  style?: object,
  className: string
}
// styled component
const StyledLink = styled(Link)<StyledLinkProps>(({ theme, active_route }) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  color: active_route === "active" ? theme.palette.primary.main : "inherit",
  "&:hover": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const NavLink = ({ href, children, style, className, ...props } : StyledLinkComponent) => {
  const pathname = usePathname();
  const checkRouteMatch = () => {
    if (href === "/") {
      return pathname === href;
    }
    if(pathname === null){
      return href;
    }
    return pathname.includes(href);
  }; // active route

  const currentRoute = checkRouteMatch();
  return (
      <StyledLink
        href={href}
        style={style}
        className={clsx(className)}
        active_route={currentRoute ? "active" : ""}
        {...props}
      >
        {children}
      </StyledLink>
  );
};

export default NavLink;
