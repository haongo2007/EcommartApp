import Container from "@mui/material/Container";
import {use} from "react";
import { getProduct } from "server/handlers/products/getProduct";
import { notFound } from "next/navigation";
import ProductIntro from "components/client/product/ProductIntro";
import ProductDescription from "components/client/product/ProductDescription";
import ProductRelation from "components/client/product/ProductRelation";
import { Metadata } from 'next'
import { PageDetailProps } from "types/types";

export const revalidate = 86400;

export async function generateMetadata( { params }: PageDetailProps): Promise<Metadata> {
  // fetch data
  const { locale,shop,slug } = params;
  const product = await getProduct(shop,slug);
  const productDesc = product.description.filter((item) => item.lang === locale);
  const {name} = productDesc[0];
  const {description} = productDesc[0];
  return {
    title: name,
    description: description,
    alternates:{
        canonical:`${shop}/product/${slug}`,
        languages: {
            'en-CA': `en/${shop}/product/${slug}`,
        }
    }
  }
}

export default function ProductDetail({ params }: PageDetailProps) {
    const { locale,shop,slug } = params;
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
