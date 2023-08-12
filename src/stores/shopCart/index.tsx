import { isEqual } from "lodash-es";
import { CartItemProps } from "types/types";

export const createShopCartStore = (set, get) => ({
    shopCarts: {},
    setCart: (itemCart:CartItemProps) => {
      const { shopCarts } = get();
      const {shopName} = itemCart;
      if(!shopCarts.hasOwnProperty(shopName)){
        shopCarts[shopName] = [];
        shopCarts[shopName] = [ itemCart ];
      }else{
        const cartList = shopCarts[shopName];
        const checkCart = cartList.findIndex(
          (el:CartItemProps) => el.id === itemCart.id && isEqual(el.variant,itemCart.variant)
        );
        if (checkCart >= 0){
          if(itemCart.qty === 0){ // remove
            shopCarts[shopName] = [ ...cartList.slice(0, checkCart), ...cartList.slice(checkCart + 1) ];
          }else{
            shopCarts[shopName][checkCart].qty = itemCart.qty;
          }
        }else{
          shopCarts[shopName] = [ itemCart ];
        }
      }
      set(shopCarts);
    },
});