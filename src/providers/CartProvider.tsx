"use client";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { CartItemProps } from "../types/types";
import { isEqual } from "lodash-es";
import { useAccountContext } from "./AccountProvider";


interface CartContextValues {
  cartItems: {},
  setCartItems: (cartItems: CartItemProps[]) => void;
}
export const CartContext = createContext<CartContextValues>({
  cartItems: {},
  setCartItems: () => {},
});

const reducer = (state, action) => {
  let cartItem = action.payload;
  let cartList = state[cartItem.shopname];
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      // if (cartItem instanceof Array){
      //   return [ ...cartItem ];
      // }
      // let result = [];
      // const checkCart = cartList.findIndex(
      //   (el) => el.id === cartItem.id && isEqual(el.variant,cartItem.variant)
      // );

      // if (checkCart >= 0){
      //   if(parseInt(cartItem.qty) === 0){ // remove
      //     result = [ ...cartList.slice(0, checkCart), ...cartList.slice(checkCart + 1) ];
      //   }else{
      //     cartList[checkCart].qty = cartItem.qty;
      //     result = [...cartList];
      //   }
      // }else{
      //   result = [ ...state[cartItem.shopname], cartItem ];
      // }
      // localStorage.setItem("carts", JSON.stringify(result));
      // return result
    case "CHECK_CART_AMOUNT":
      // const newItem = [];
      // if(state.length > 0){
      //   state.forEach((item) => {
      //     cartItem.forEach((cart) => {
      //       if(cart.product_id === item.id && isEqual(cart.variant,item.variant)){
      //         if(cart.qty !== item.qty){
      //           cart.product.qty = parseInt(cart.qty);
      //           newItem.push(cart.product);
      //         }
      //       }else{ // not founded
      //         cart.product.qty = parseInt(cart.qty);
      //         cart.product.variant = JSON.parse(cart.variant);
      //         newItem.push(cart.product);
      //       }
      //     })
      //   })
      // }else{
      //   cartItem.forEach((cart) => { // not founded
      //       cart.product.qty = parseInt(cart.qty);
      //       cart.product.variant = JSON.parse(cart.variant);
      //       newItem.push(cart.product);
      //   })
      // }
      // if (newItem.length > 0){
      //   result = { ...state,...newItem };
      //   localStorage.setItem("carts", JSON.stringify(result));
      //   return result
      // }
      // return null
    default: {
      return state;
    }
  }
}; // =======================================================

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { account } = useAccountContext();
  const [cartItems, setCartItems] = useReducer(reducer, []);
  const cartStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("carts")) : null;
  const contextValue = useMemo(
    () => ({
      cartItems,
      setCartItems,
    }),
    [cartItems, setCartItems]
  );
  console.log(children);
  useEffect(() => {
    const timeOutId = setTimeout( async() => {
      if (account !== undefined && account !== null){ // logged
        if (cartItems.length > 0){ // sync cart client to server
          // sync database
          // dbShop.addToCart(cartItems);
        }
      }else{ // without logged
        if (cartItems.length === 0 && cartStorage !== null){
          setCartItems({
            type: "CHANGE_CART_AMOUNT",
            payload: cartStorage,
          });
        }
      }
    }, 2000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [cartItems]);

  useEffect( () => {
    const timeOutId = setTimeout(() => {
      if (account !== undefined && account !== null){ // logged
        // dbShop.getCartWithCustomer(session.user.id).then((response) => {
        //   if (response.cartRes.length > 0){ // fetch cart from server
        //     setCartItems({
        //       type: "CHECK_CART_AMOUNT",
        //       payload: response.cartRes,
        //     });
        //   }
        // });
      }
    }, 3000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
