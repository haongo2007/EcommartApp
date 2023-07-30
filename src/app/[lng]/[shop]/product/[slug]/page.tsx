import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import {use} from "react";
import { getProduct, getProductMeta } from "server/handlers/products/getProduct";
import { notFound } from "next/navigation";
import ProductIntro from "components/product/ProductIntro";
import ProductDescription from "components/product/ProductDescription";
import ProductRelation from "components/product/ProductRelation";

import { Metadata } from 'next'
 
type Props = {
    params: {
        lng:string,
        shop:string,
        slug:string
    }
}
 
export async function generateMetadata( { params }: Props): Promise<Metadata> {
  // fetch data
  const { lng,shop,slug } = params;
  const productDesc = await getProductMeta(shop,slug,lng);
  return {
    title: productDesc.name,
    description: productDesc.description,
    alternates:{
        canonical:`${shop}/product/${slug}`,
        languages: {
            'en-CA': `en/${shop}/product/${slug}`,
        }
    }
  }
}

export default function ProductDetail({ params }: Props) {
    const { lng,shop,slug } = params;
    const product = use(getProduct(shop,slug));
    if (!product) {
        return notFound();
    }
    return (
        <Container sx={{my: 4}}>
            <ProductIntro product={product} />
            <ProductDescription product={product} /> 
            <ProductRelation product={product} />
        </Container>
    );
}
