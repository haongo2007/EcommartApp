"use client"
import { CallOutlined, MailOutline } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LAYOUT_CONSTANT } from "../../constants";
import {AppInfomation} from "../../types/types";
import { FlexBox } from "./flex-box";
import { Span } from "./Typography";
import NavLink from "./nav-link/NavLink";
import LanguageMenu from "./menus/LanguageMenu";
import CurrencyMenu from "./menus/CurrencyMenu";
import { ShopLocal } from "types/shop";

type StyledTopbarProps = {
    theme?: object;
    bgColor?: string;
}

type TopbarProps = {
    infomation: AppInfomation,
    locales: ShopLocal,
    bgColor?:string,
    currency: boolean,
    language: boolean
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
        "@media only screen and (max-width: 600px)": {
            "& > *": {
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
const TopBar = ({ bgColor,locales, infomation, language = true ,currency = true } : TopbarProps) => {
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
                    <FlexBox alignItems="center">
                        <CallOutlined fontSize="small" />
                        <Span className="title">{infomation.phone}</Span>
                    </FlexBox>

                    <FlexBox alignItems="center" ml={2.5}>
                        <MailOutline fontSize="small" />
                        <Span className="title">{infomation.email}</Span>
                    </FlexBox>
                </FlexBox>

                <FlexBox className="topbarRight" alignItems="center">
                    <NavLink className="link" href="/faq">
                        Theme FAQ&quot;s
                    </NavLink>

                    <NavLink className="link" href="/help">
                        Need Help?
                    </NavLink>

                    { language && (<LanguageMenu locale={locales.language} languages={locales.languages}/>)}
                    { currency && (<CurrencyMenu locale={locales.currency} currencies={locales.currencies} />)}
                </FlexBox>
            </Container>
        </TopbarWrapper>
    );
};

export default TopBar;
