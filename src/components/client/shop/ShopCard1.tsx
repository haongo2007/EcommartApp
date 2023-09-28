import Link from "next/link";
import { Call, East, Place } from "@mui/icons-material";
import {
    alpha,
    Avatar,
    Box,
    Card,
    IconButton,
    Rating,
    styled,
} from "@mui/material";
import { FlexBetween, FlexBox } from "../flex-box";
import { H3, Span } from "../Typography";
import { ShopTypeClient } from "types/shop";
import { ShopDescriptions } from "@prisma/client";

// styled components
const ContentWrapper = styled(Box)(({ theme, img }) => ({
    color: "white",
    backgroundSize: "cover",
    padding: "17px 30px 56px",
    backgroundPosition: "center",
    backgroundImage: `linear-gradient(to bottom,
    ${alpha(theme.palette.grey[900], 0.8)}, ${alpha(
        theme.palette.grey[900],
        0.8
    )}), 
    url(${img || "/assets/images/banners/cycle.png"})`,
}));

const ShopCard1 = ({shop,locale}:{shop:ShopTypeClient,locale:string}) => {
    const { rating, phone, coverPicture, logo, domain, language } = shop;
    const address = shop.address.length ? shop.address[0].address +', '+ shop.address[0].street +', '+ shop.address[0].ward_name +', '+ shop.address[0].district_name +', '+ shop.address[0].province_name +', '+ shop.address[0].country : ''
    const descShop = shop.description.filter((item:ShopDescriptions) => item.lang === locale)[0];
    return (
        <Card>
            <ContentWrapper img={coverPicture}>
                <H3 fontWeight="600" mb={1} mt={0}>
                    { descShop.title }
                </H3>

                <Rating
                    value={rating || 0}
                    color="warn"
                    size="small"
                    readOnly
                    sx={{
                        mb: "0.75rem",
                    }}
                />

                <FlexBox mb={1} gap={1}>
                    <Place
                        fontSize="small"
                        sx={{
                            fontSize: 17,
                            mt: "3px",
                        }}
                    />
                    <Span color="white">{address}</Span>
                </FlexBox>

                <FlexBox alignItems="center" gap={1}>
                    <Call
                        fontSize="small"
                        sx={{
                            fontSize: 17,
                        }}
                    />
                    <Span color="white">{phone}</Span>
                </FlexBox>
            </ContentWrapper>

            <FlexBetween pl={3} pr={1}>
                <Avatar
                    src={logo}
                    sx={{
                        width: 64,
                        height: 64,
                        mt: "-32px",
                        border: "3px solid",
                        borderColor: "grey.100",
                    }}
                />
                <Link href={language+'/'+domain}>
                    <IconButton
                        sx={{
                            my: 0.5,
                        }}
                    >
                        <East
                            sx={{
                                fontSize: 19,
                                transform: ({ direction }) =>
                                    `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                            }}
                        />
                    </IconButton>
                </Link>
            </FlexBetween>
        </Card>
    );
};

export default ShopCard1;
