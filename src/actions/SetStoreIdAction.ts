"use client";

import { useEffect, useRef } from "react";

export default function SetStoreIdAction({ setshopId }) {
  const setShopIdRef = useRef(setshopId);

  useEffect(() => {
    setShopIdRef.current = setshopId;
  });

  useEffect(() => {
    setShopIdRef.current();
  }, []);

  return null;
}