"use client"
import { Fragment } from "react";
import { Box, Button, Divider } from "@mui/material";
import Image from "../BazaarImage";
import { FlexBox } from "../flex-box"; // =======================================
import { signIn } from "next-auth/react"
import { useStore } from "../../stores";

// =======================================
const SocialButtons = (props) => {
  const curDomain = useStore((state) => state.shopInfo.domain);
  const locale = useStore((state) => state.shopLocale.language);
  return (
    <Fragment>
      <Box mb={3} mt={3.8}>
        <Box width="200px" mx="auto">
          <Divider />
        </Box>

        <FlexBox justifyContent="center" mt={-1.625}>
          <Box color="grey.600" bgcolor="background.paper" px={2}>
            or
          </Box>
        </FlexBox>
      </Box>

      <Button
        className="facebookButton"
        size="medium"
        fullWidth
        sx={{
          height: 44,
        }}
      >
        <Image
          src="/assets/images/icons/facebook-filled-white.svg"
          alt="facebook"
        />
        <Box fontSize="12px" ml={1} onClick={() => signIn('facebook',{
          callbackUrl: '/'+locale+'/'+curDomain,
        })}>
          Continue with Facebook
        </Box>
      </Button>

      <Button
        className="googleButton"
        size="medium"
        fullWidth
        sx={{
          height: 44,
        }}
      >
        <Image 
        src="/assets/images/icons/google-1.svg" 
        alt="google" 
        />
        <Box fontSize="12px" ml={1} onClick={() => signIn('google',{
          callbackUrl: '/'+locale+'/'+curDomain,
        })}>
          Continue with Google
        </Box>
      </Button>
    </Fragment>
  );
};

export default SocialButtons;
