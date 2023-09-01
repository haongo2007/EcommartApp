import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {groupBy} from "lodash-es";
import {responseCategoryGroup} from "../../../helpers/responseCategory";

export const fetchAllCategoriesParentWithGroup = async (
    store_id?: number,
    store_name?: string,
    prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) => {
    const where: {
        parent: number;
        store_id?: number;
    } = {
        parent: 0,
    };
    const include: {
        description: boolean,
        shop?:boolean,
    } = {
        description: true,
    };
    if (store_id !== null){
        where['store_id'] = store_id;
    }
    if(!store_name){
        include['shop'] = true;
    }
    const data = await (prisma ?? db).shopCategories.findMany({
        where,
        include
    });
    if(!store_name){
        const groupData = groupBy(data, 'shop.domain');
        return responseCategoryGroup(groupData);
    }
    return responseCategoryGroup({[`${store_name}`]: data});
}
