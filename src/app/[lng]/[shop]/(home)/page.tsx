import {Metadata} from "next";
import Fashion1 from "components/pages-sections/fashion1";
import {use} from "react";
import { getProductHome } from "server/handlers/products/getProductHome";

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home({params: { lng,shop } }: {params:{lng:string,shop:string}}) {
  const productHome = use(getProductHome(shop));
  return (
      <Fashion1 productData={productHome} />
  );
}
