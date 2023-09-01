import { usePathname } from "next/navigation";


const useCheckCatePage = () => {
    const path = usePathname();
    const regexCheckAuth = /(?<=\/[^/]+\/[^/]+\/)([^/]+)/;
    const checkMatchCatePage = path?.match(regexCheckAuth);
    if (checkMatchCatePage !== undefined && checkMatchCatePage !== null && checkMatchCatePage[1] === 'category' ) {
        return true
    }
    return false;
};
export default useCheckCatePage;
