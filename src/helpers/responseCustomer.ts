import { ShopCustomerClient } from "types/customer";

export const responseCustomer = (customer: ShopCustomerClient | null | undefined) => {
  if (customer) {
    return {
      ...customer,
      birthday: customer.birthday.toUTCString(),
    };
  } else {
    return null;
  }
};