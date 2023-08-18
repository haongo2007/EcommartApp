import { CartTypeClient, CartListType } from "../types/carts";
import { responseProduct } from "./responseProduct";


export const responseCart = (cart: CartTypeClient) => {
  const variant = JSON.parse(cart.variant);
  let finalPrice = cart.product.price;
  const images =  Object.values(variant).flatMap((item) => {
    if(parseInt(item.price) > 0){
      finalPrice = item.price;
    }
    return item.images.split(',');
  });
  return {
    finalPrice,
    price: parseFloat(cart.product.price),
    qty: parseInt(cart.qty),
    variant,
    slug: cart.product.slug,
    product: responseProduct(cart.product),
    images,  
    description: cart.product.description,
    id: cart.product.id,
    promotion: cart.product.promotion,
    store_id: cart.store_id,
    shopName: cart.product.store_name
  }
};

export const responseCartsList = (carts: CartListType) =>
  carts.map((cart) => {
    const { product, ...cartWithoutProduct } = {...responseCart(cart)};
    return cartWithoutProduct;
  });