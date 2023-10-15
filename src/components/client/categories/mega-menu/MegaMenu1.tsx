import StyledMegaMenu from "./StyledMegaMenu";
import BazaarCard from "../../BazaarCard";
import { CateMega } from "../menu/CategoryMenuCard";
import { useStore } from "stores";

// =========================================================
const MegaMenu1 = ({data,shop}) => {
    const locale = useStore((state) => state.shopLocale.language);
    return data ? (
      <StyledMegaMenu>
          <BazaarCard
              hoverEffect={false}
              elevation={2}
              sx={{
                  ml: "1rem",
                  py: "0.5rem",
              }}
          >
            {<CateMega data={data} shop={shop} locale={locale}/>}
          </BazaarCard>
      </StyledMegaMenu>
    ) : null;
};

export default MegaMenu1;
