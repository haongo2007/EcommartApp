import {Metadata} from "next";
import Fashion1 from "components/client/pages-sections/fashion1";
import {use} from "react";
import { getProductHome } from "server/handlers/products/getProductHome";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home({params: { lng,shop } }:PageDefaultProps) {
  const productHome = use(getProductHome(shop));
  return (
    ''
        // <Fashion1 productData={productHome} />
  );
}
