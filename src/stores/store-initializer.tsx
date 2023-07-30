"use client";
import React, { useRef } from "react";
import { useStore } from "./index";
import {InitialStore} from "../types/shop";

export function StoreInitializer({ initialStore, children }: {initialStore:InitialStore,children:React.ReactNode}) {
    const initializedBefore = useRef(false);
    if (!initializedBefore.current) {
        useStore.getState().hydrateStore(initialStore);
        initializedBefore.current = true;
    }

    return children;
}
