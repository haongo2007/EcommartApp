"use client"
import Link from "next/link";
import { format } from "date-fns";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import AccountHeader from "./AccountHeader";
import AccountSideBar from "./AccountSideBar";
import {signOut} from "next-auth/react"
import { useAccountContext } from "providers/AccountProvider";

// ============================================================
const AccountDashboard = ({locale,domain}:{locale:string,domain:string}) => {
  const { account } = useAccountContext();
  console.log(account);
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md")); // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <FlexBox>
      <Box>
        <Link href={`/${locale}/${domain}/account/${account?.first_name + account?.last_name}`} passHref>
          <Button
            color="primary"
            sx={{
              px: 4,
              bgcolor: "primary.light",
            }}
          >
            Edit Profile
          </Button>
        </Link>
      </Box>
      <Box ml={2.5}>
        <Button
          onClick={() => {
              signOut({ callbackUrl: '/'+locale+'/'+domain });
            }
          }
          color="primary"
          sx={{
            px: 4,
            bgcolor: "primary.light",
          }}
        >
          Logout
        </Button>
      </Box>
    </FlexBox>
  );
  const infoList = [
    {
      title: "16",
      subtitle: "All Orders",
    },
    {
      title: "02",
      subtitle: "Awaiting Payments",
    },
    {
      title: "00",
      subtitle: "Awaiting Shipment",
    },
    {
      title: "01",
      subtitle: "Awaiting Delivery",
    },
  ];
  return (
    <>
      {/* TITLE HEADER AREA */}
      <AccountHeader
        icon={Person}
        title="My Profile"
        button={HEADER_LINK}
        navigation={<AccountSideBar />}
      />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
                src={account?.avatar}
                sx={{
                  height: 64,
                  width: 64,
                }}
              />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{`${account?.first_name} ${account?.last_name}`}</H5>
                    <FlexBox alignItems="center">
                      <Typography color="grey.600">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        {500}
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography color="grey.600" letterSpacing="0.2em">
                    SILVER USER
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow
        sx={{
          cursor: "auto",
          p: "0.75rem 1.5rem",
          ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start",
          }),
        }}
      >
        <TableRowItem title="First Name" value={account?.first_name} />
        <TableRowItem title="Last Name" value={account?.last_name} />
        <TableRowItem title="Email" value={account?.email} />
        <TableRowItem title="Phone" value={account?.phone || 'Unknown'} />
        <TableRowItem
          title="Birth date"
          value={account?.birthday ? format(new Date(account?.birthday), "dd MMM, yyyy") : '00:00:00'}
        />
      </TableRow>
    </>
  );
};

const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};
export default AccountDashboard;
