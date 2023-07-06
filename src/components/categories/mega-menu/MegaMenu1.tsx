import StyledMegaMenu from "./StyledMegaMenu";
import BazaarCard from "../../BazaarCard";
import { CateMega } from "../CategoryMenuCard";

// =========================================================
const MegaMenu1 = ({data,shop}) => {
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
              {<CateMega data={data} shop={shop}/>}
            </BazaarCard>
        </StyledMegaMenu>
      ) : null;
};

export default MegaMenu1;
