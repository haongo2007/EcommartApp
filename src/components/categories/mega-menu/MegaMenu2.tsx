import StyledMegaMenu from "./StyledMegaMenu";
import {Box, Card, Grid} from "@mui/material";
import { FlexBox } from "../../flex-box";
import NavLink from "../../nav-link/NavLink";

// =======================================================================
const MegaMenu2 = ({ data,minWidth = "760px" }) => {
  const locale = 'vi';
  return data ? (
      <StyledMegaMenu>
          <Card
              elevation={2}
              sx={{
                  ml: "1rem",
                  minWidth,
              }}
          >
              <FlexBox px={2.5} py={1.75} alignItems="unset">
                  <Box flex="1 1 0">
                      <Grid container spacing={4}>
                          {data.map((item, ind) => (
                              <Grid item md={3} key={ind}>
                                  {item.alias ? (
                                      <NavLink className="title-link" href={item.shop.domain+item.alias}>
                                          {item.description.filter((desc) => desc.lang === locale)[0].title}
                                      </NavLink>
                                  ) : (
                                      <Box className="title-link">{item.description.filter((desc) => desc.lang === locale)[0].title}</Box>
                                  )}
                                  {item.children?.map((sub, ind) => (
                                      <NavLink className="child-link" href={sub.shop.domain+sub.alias} key={ind}>
                                          {sub.description.filter((desc) => desc.lang === locale)[0].title}
                                      </NavLink>
                                  ))}
                              </Grid>
                          ))}
                      </Grid>
                  </Box>

                  {/*{rightImage && (*/}
                  {/*  <Box mt={1.5}>*/}
                  {/*    <Link href={rightImage.href}>*/}
                  {/*      <a>*/}
                  {/*        <LazyImage*/}
                  {/*          src={rightImage.imgUrl}*/}
                  {/*          objectFit="contain"*/}
                  {/*          width={137}*/}
                  {/*          height={318}*/}
                  {/*          alt="banner"*/}
                  {/*        />*/}
                  {/*      </a>*/}
                  {/*    </Link>*/}
                  {/*  </Box>*/}
                  {/*)}*/}
              </FlexBox>

              {/*{bottomImage && (*/}
              {/*  <Link href={bottomImage.href}>*/}
              {/*    <a>*/}
              {/*      <Box position="relative" height="170px">*/}
              {/*        <LazyImage*/}
              {/*          src={bottomImage.imgUrl}*/}
              {/*          layout="fill"*/}
              {/*          objectFit="cover"*/}
              {/*          alt="banner"*/}
              {/*        />*/}
              {/*      </Box>*/}
              {/*    </a>*/}
              {/*  </Link>*/}
              {/*)}*/}
          </Card>
      </StyledMegaMenu>
  ): null;
};

export default MegaMenu2;
