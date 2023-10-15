"use client"
import ShopCard1 from "../../shop/ShopCard1";
import {Container, Grid, Pagination} from "@mui/material";
import {H2} from "../../Typography";
import { FlexBetween } from "../../flex-box";
import { ShopTypeClient } from "types/shop";
import {useTranslations} from 'next-intl';


type ShopListTypeProps = {
    locale: string;
    data: ShopTypeClient[];
    total: number;
};

const ShopListSection = ({total,data,locale}:ShopListTypeProps) => {
    const t = useTranslations('Contain');

    return (
        <>
            {/* BODY CONTENT */}
            <Container
                sx={{
                    mt: 4,
                    mb: 6,
                }}
            >
                <H2 mb={3}>
                    { t('title')}
                </H2>
                {/* ALL SHOP LIST AREA */}
                <Grid container spacing={3}>
                    {data.map((item) => (
                        <Grid item lg={4} sm={6} xs={12} key={item.id}>
                            <ShopCard1 shop={item} locale={locale}/>
                        </Grid>
                    ))}
                </Grid>
                {/* PAGINTAION AREA */}
                <FlexBetween flexWrap="wrap" mt={4}>
                    <Pagination
                        count={Number(total) / data.length}
                        variant="outlined"
                        color="primary"
                    />
                </FlexBetween>
            </Container>
        </>
    );
};

export default ShopListSection;
