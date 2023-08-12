"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { CallOutlined, ExpandMore, MailOutline } from "@mui/icons-material";
import { Box, Container, MenuItem, styled } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import Image from "../../components/BazaarImage";
import { Span } from "../../components/Typography";
import { FlexBox } from "../../components/flex-box";
import BazaarMenu from "../../components/BazaarMenu";
import NavLink from "../../components/nav-link/NavLink";
import { LAYOUT_CONSTANT } from "../../constants"; // styled component
import {usePathname} from "next/navigation";
import {AppInfomation} from "../../types/types";
import {useStore} from "../../stores";
import {APP_INFOMATION} from "../../constants";

interface StyledTopbarProps {
    theme?: object;
    bgColor?: string;
}

interface TopbarProps {
    bgColor?:string,
    infomation?:AppInfomation,
    useCurrency:boolean,
}

const TopbarWrapper = styled(Box, {
    shouldForwardProp: (props) => props !== "bgColor",
})<StyledTopbarProps>(({ theme, bgColor }) => ({
    fontSize: 12,
    height: LAYOUT_CONSTANT.topbarHeight,
    background: bgColor || theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "& .topbarLeft": {
        "& .logo": {
            display: "none",
        },
        "& .title": {
            marginLeft: "10px",
        },
        "@media only screen and (max-width: 900px)": {
            "& .logo": {
                display: "block",
            },
            "& > *:not(.logo)": {
                display: "none",
            },
        },
    },
    "& .topbarRight": {
        "& .link": {
            paddingRight: 30,
            color: theme.palette.secondary.contrastText,
        },
        "@media only screen and (max-width: 900px)": {
            "& .link": {
                display: "none",
            },
        },
    },
    "& .menuItem": {
        minWidth: 100,
    },
    "& .disabled": {
        background: "#f6f9fc!important",
    },
    "& .handler": {
        height: LAYOUT_CONSTANT.topbarHeight,
    },
    "& .smallRoundedImage": {
        height: 15,
        width: 25,
        borderRadius: 2,
    },
    "& .menuTitle": {
        fontSize: 12,
        marginLeft: "0.5rem",
        fontWeight: 600,
    },
})); // ===========================================

// ===========================================
const Topbar = ({ bgColor,infomation,useCurrency } : TopbarProps) => {
    const asPath = usePathname();
    const { shopLocale } = useStore();
    const languageList = shopLocale.hasOwnProperty('languages') ? shopLocale.languages : APP_INFOMATION.languages;
    const currencyList = shopLocale?.currencies;
    return (
        <TopbarWrapper bgcolor={bgColor}>
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <FlexBox className="topbarLeft" alignItems="center">
                    <div className="logo">
                        <Link href="/" passHref>
                            <Image
                                display="block"
                                height="28px"
                                src={infomation ? infomation.logo : APP_INFOMATION.logo}
                                alt="logo"
                            />
                        </Link>
                    </div>

                    <FlexBox alignItems="center">
                        <CallOutlined fontSize="small" />
                        <Span className="title">{infomation ? infomation.phone : APP_INFOMATION.phone}</Span>
                    </FlexBox>

                    <FlexBox alignItems="center" ml={2.5}>
                        <MailOutline fontSize="small" />
                        <Span className="title">{infomation ? infomation.email : APP_INFOMATION.email}</Span>
                    </FlexBox>
                </FlexBox>

                <FlexBox className="topbarRight" alignItems="center">
                    <NavLink className="link" href="/faq">
                        Theme FAQ&quot;s
                    </NavLink>

                    <NavLink className="link" href="/help">
                        Need Help?
                    </NavLink>

                    {useCurrency && ( <BazaarMenu type={'currency'} options={currencyList}/>) }
                    <BazaarMenu type={'language'} options={languageList}/>
                </FlexBox>
            </Container>
        </TopbarWrapper>
    );
};

export default Topbar;
