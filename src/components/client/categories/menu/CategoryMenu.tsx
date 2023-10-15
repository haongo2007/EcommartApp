"use client"
import { styled } from "@mui/material/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CategoryMenuCard from "./CategoryMenuCard";
import Box from "@mui/material/Box";

const Wrapper = styled(Box)(({ open, theme: { direction } }:{open:boolean,theme:any}) => ({
  cursor: "pointer",
  position: "relative",
  height: "40px",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${
        open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"
    })`,
  },
})); // ===========================================================

// ===========================================================
const CategoryMenu = ({ open: isOpen = false, children, categories,locale }) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;
  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) setOpen((open) => !open);
  };

  const handleDocumentClick = useCallback(() => {
    if (popoverRef.current && !isOpen) setOpen(false);
  }, [isOpen]);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);
  return (
      <Wrapper open={open}>
        {React.cloneElement(children, {
          open,
          onClick: toggleMenu,
          className: `${children.props.className}`,
        })}

        <CategoryMenuCard open={open} position={'absolute'} categories={categories} locale={locale} />
      </Wrapper>
  );
};

export default CategoryMenu;
