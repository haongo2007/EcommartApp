"use client";
import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import BazaarImage from "components/client/BazaarImage";
import { FlexBox, FlexRowCenter } from "components/client/flex-box";

const Error404 = () => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
      <BazaarImage
        src="/assets/images/illustrations/404.svg"
        sx={{
          display: "block",
          maxWidth: 320,
          width: "100%",
          mb: 3,
        }}
      />

      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          sx={{
            m: 1,
          }}
          onClick={handleGoBack}
        >
          Go Back
        </Button>

        <Link href="/" passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            sx={{
              m: 1,
            }}
          >
            Go to Home
          </Button>
        </Link>
      </FlexBox>
    </FlexRowCenter>
  );
};

export default Error404;