"use client";
import { useRef,useEffect } from "react";
import { useStore } from "./index";
import {InitialStore} from "../types/shop";

function StoreInitializer({ initialStore,children }: {initialStore:InitialStore,children:React.ReactNode}) {
    const initialized = useRef(false);
    useEffect(() => {
        if (!initialized.current) {
            useStore.setState(initialStore);
            initialized.current = true;
        }
    }, [initialStore]);
    
    return <>{children}</>;
}
export default StoreInitializer;