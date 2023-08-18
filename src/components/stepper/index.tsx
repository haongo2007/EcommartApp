"use client"
import { Fragment, useState } from "react";
import { Box, Chip } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import { useRouter } from "next/navigation";

// ========================================================
const Stepper = ({locale,domain}:{locale:string,domain:string}) => {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const stepperList = [
    {
      title: "Cart",
      disabled: false,
    },
    {
      title: "Details",
      disabled: false,
    },
    {
      title: "Payment",
      disabled: false,
    },
    {
      title: "Review",
      disabled: true,
    },
  ];

  const handleStepClick = (step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      switch (selected) {
        case 0:
          router.push(`/${locale}/${domain}/cart`);
          break;
  
        case 1:
          router.push(`/${locale}/${domain}/cart/checkout`);
          break;
  
        case 2:
          router.push(`/${locale}/${domain}/cart/payment`);
          break;
  
        case 3:
          router.push(`/${locale}/${domain}/cart/orders`);
          break;
  
        default:
          break;
      }
    }
  };

  return (
    <>
    <FlexRowCenter flexWrap="wrap" my="-4px">
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <Chip
            disabled={step.disabled}
            label={`${ind + 1}. ${step.title}`}
            onClick={handleStepClick(step, ind)}
            sx={{
              backgroundColor:
                ind <= selected ? "primary.main" : "primary.light",
              color: ind <= selected ? "primary.contrastText" : "primary.main",
              p: "0.5rem 1rem",
              fontSize: "14px",
              fontWeight: "600",
              my: "4px",
              "&:hover:not(:disabled)": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          />
          {ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bgcolor={ind < selected ? "primary.main" : "primary.light"}
            />
          )}
        </Fragment>
      ))}
    </FlexRowCenter>
    </>
  );
};

export default Stepper;
