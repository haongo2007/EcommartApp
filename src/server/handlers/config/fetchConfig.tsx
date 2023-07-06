import { Prisma, PrismaClient } from "@prisma/client";import {responseConfigList} from "../../../helpers/responseConfig";import db from "../../../lib/servers/prismadb";export const fetchConfig = async (    store_id: number,    group: string,    code: string,    key: string,    prisma?: PrismaClient<Prisma.PrismaClientOptions,never,Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>) => {    const data = await (prisma ?? db).shopConfig.findMany({        where: {            store_id,            group,            code,            key,        },    });    return responseConfigList(data);};