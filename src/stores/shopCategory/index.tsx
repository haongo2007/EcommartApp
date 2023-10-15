import {ShopCategories} from "@prisma/client";

const recursiveChildren = (state,item) => {
  state.children.map((child) => {
    if(!child.hasOwnProperty('children')){
      child['children'] = [];
    }
    if (child.id === item.parent){
      child['has_mount'] = true;
      child['children'].push(item);
    }else{
      recursiveChildren(child,item);
    }
  })
}

export const createCategoryStore = (set, get) => ({
  shopCategory: [],
  setCategory: (params) => {
    const { shopCategory } = get();
    const { data,id,domain } = params;
    const indexState = shopCategory[domain].findIndex((i:ShopCategories) => i.id === id);
    if (indexState < 0) return;
    data.map((item) => {
      if (item.parent === id){
        if(!shopCategory[domain][indexState].hasOwnProperty('children')){
          shopCategory[domain][indexState]['children'] = [];
        }
        item['has_mount'] = true;
        shopCategory[domain][indexState]['has_mount'] = true;
        shopCategory[domain][indexState]['children'].push(item);
      }else{
        recursiveChildren(shopCategory[domain][indexState],item);
      }
    })
    set(shopCategory);
  },
});
