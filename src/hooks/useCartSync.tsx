const useCartSync = (shopCart:any,customer_id:string, syncCartTimer: number, setSyncCartTimer:(timer: number) => void, updateCart:(payload:object) => void) => {
    const onSyncCart = () => {
        updateCart({
            data: JSON.stringify(shopCart),
            customer_id: customer_id || "",
        });
    }
    clearTimeout(syncCartTimer);
        const newTimer:any = setTimeout(() => {
        onSyncCart();
        setSyncCartTimer(0); // Reset timer after sync
    }, 5000);
    setSyncCartTimer(newTimer); // Update timer
};
export default useCartSync;
