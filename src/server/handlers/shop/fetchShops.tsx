import { Prisma, PrismaClient } from "@prisma/client";import {responseShopList} from "../../../helpers/responseShops";import db from "../../../lib/servers/prismadb";export const fetchShops = async (        limit: number,        prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>    ) => {    const data = await (prisma ?? db).shops.findMany({        include: {            description: true,            address: true,        },        take: limit,        where: {            status: 1,            active: 1,        },    });    const total = await (prisma ?? db).shops.count();    return responseShopList({data,total});};