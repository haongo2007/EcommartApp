"use client"
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import clsx from "clsx";
import React from "react";

interface DefaultType {
    children: React.ReactNode,
    className?: string,
    ellipsis?: boolean,
    fontWeight?: number | string,
    textTransform?: string,
    borderBottom?: number,
    color?: string,
    borderColor?:string,
    textAlign?: string,
    lineHeight?: string,
    fontSize?: string,
    flex?: string,
    sx?: object,
    mx?: number,
    ml?: number,
    mb?: number | string,
    mt?: number | string,
    py?: number | string,
    pl?: number | string,
    px?: number | string,
}
const StyledBox = styled(Box, { shouldForwardProp: (props) => props !== "textTransformStyle" }) (({textTransformStyle, ellipsis}) => ({
    textTransform: textTransformStyle || "none",
    whiteSpace: ellipsis ? "nowrap" : "normal",
    overflow: ellipsis ? "hidden" : "",
    textOverflow: ellipsis ? "ellipsis" : "",
})); // ============================================

// ============================================
export const H1 = ({
                       children,
                       className,
                       ellipsis,
                       mb = 0,
                       mt = 0,
                       textTransform,
                       ...props
                   } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="h1"
            mb={mb}
            mt={mt}
            fontSize="30px"
            fontWeight="700"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const H2 = ({
                       children,
                       className,
                       ellipsis,
                       mb = 0,
                       mt = 0,
                       textTransform,
                       ...props
                   } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="h2"
            mb={mb}
            mt={mt}
            fontSize="25px"
            fontWeight="700"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const H3 = ({
                       children,
                       className,
                       ellipsis,
                       textTransform,
                       fontWeight,
                       mb = 0,
                       mt = 0,
                       ...props
                   } : DefaultType) => {
    return (
        <StyledBox
            mb={mb}
            mt={mt}
            component="h3"
            fontSize="20px"
            fontWeight={fontWeight || "700"}
            lineHeight="1.5"
            ellipsis={ellipsis ? 1 : undefined}
            textTransformStyle={textTransform}
            className={clsx({
                [className || ""]: true,
            })}
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const H4 = ({
                       children,
                       className,
                       ellipsis,
                       textTransform,
                       mb = 0,
                       mt = 0,
                       ...props
                   } : DefaultType) => {
    return (
        <StyledBox
            mb={mb}
            mt={mt}
            component="h4"
            fontSize="17px"
            fontWeight="600"
            lineHeight="1.5"
            ellipsis={ellipsis ? 1 : undefined}
            textTransformStyle={textTransform}
            className={clsx({
                [className || ""]: true,
            })}
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const H5 = ({
                       children,
                       className,
                       ellipsis,
                       textTransform,
                       mb = 0,
                       mt = 0,
                       ...props
                   } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="h5"
            mb={mb}
            mt={mt}
            fontSize="16px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const H6 = ({
                       children,
                       className,
                       ellipsis,
                       textTransform,
                       mb = 0,
                       mt = 0,
                       ...props
                   } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="h6"
            mb={mb}
            mt={mt}
            fontSize="14px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const Paragraph = ({
                              children,
                              className,
                              ellipsis,
                              textTransform,
                              mb = 0,
                              mt = 0,
                              ...props
                          } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="p"
            mb={mb}
            mt={mt}
            fontSize="14px"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const Small = ({
                          children,
                          className,
                          ellipsis,
                          textTransform,
                          ...props
                      } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="small"
            fontSize="12px"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const Span = ({
                         children,
                         className,
                         ellipsis,
                         textTransform,
                         ...props
                     } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="span"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
export const Tiny = ({
                         children,
                         className,
                         ellipsis,
                         textTransform,
                         ...props
                     } : DefaultType) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis ? 1 : undefined}
            className={clsx({
                [className || ""]: true,
            })}
            component="small"
            fontSize="10px"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
