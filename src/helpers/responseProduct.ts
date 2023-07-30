import { ProductTypeClient, ProductListType } from "../types/product";
import { responseProductCategories } from "./responseProductCategories";
import { responsePromotionList } from "./responsePromotion";


export const responseProduct = (product: ProductTypeClient) => ({
  ...product,
  // decimal cannot be rendered on the client side later on, so we convert it to string
  price: JSON.parse(JSON.stringify(product.price)),
  cost: JSON.parse(JSON.stringify(product.cost)),
  attribute: JSON.parse(JSON.stringify(product.attribute)),
  createdAt: product.createdAt.toUTCString(),
  updatedAt: product.updatedAt?.toUTCString(),
  promotion: product.promotion ? responsePromotionList(product.promotion) : null,
  categories: product.categories ? responseProductCategories(product.categories) : null,
});

export const responseProductList = (products: ProductListType) => products.data.map((product) => responseProduct(product));
