import {Prisma, PrismaClient} from "@prisma/client";
import db from "../../../lib/servers/prismadb";
import {groupBy} from "lodash-es";
import {responseCategoryGroup} from "../../../helpers/responseCategory";

interface CategoryWhereType {
    domain: string;
}
export const fetchAllCategories = async (
    domainName?: string,
    prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) => {
    const where: {
        parent: number;
        shop?: Partial<CategoryWhereType>;
    } = {
        parent: 0,
    };
    if (domainName !== null){
        where['shop'] = {
            domain : domainName
        }
    }
    const data = await (prisma ?? db).shopCategories.findMany({
        where,
        include: {
            description: true,
            shop: true
        },
    });
    const groupData = groupBy(data, 'shop.domain');
    return responseCategoryGroup(groupData);
}
