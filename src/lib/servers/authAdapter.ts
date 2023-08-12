import type { Prisma } from "@prisma/client"
import type { Adapter, AdapterAccount } from "next-auth/adapters";

export function AuthAdapter(p,store_id): Adapter {

    return {
        async createUser(data) {
            const full_name = data.name?.split(' ') || [];
            const first_name = full_name[0] || '';
            const last_name = full_name[1] || '';
            const email = data.email;
            const avatar = data.image;
            const dataInsert = {
                first_name,
                last_name,
                email,
                avatar,
                store_id: parseInt(store_id)
            }
            return p.ShopCustomer.create({data:dataInsert})
        },
        getUser: (id) => p.ShopCustomer.findUnique({ where: { id } }),
        getUserByEmail: (email) => p.ShopCustomer.findUnique({ where: { email } }),
        async getUserByAccount(provider_providerAccountId) {
            const account = await p.ShopAccount.findUnique({
                where: { provider_providerAccountId },
                select: { customer: true },
            })
            return account?.customer ?? null
        },
        updateUser: ({ id, ...data }) => p.ShopCustomer.update({ where: { id }, data }),
        deleteUser: (id) => p.ShopCustomer.delete({ where: { id } }),
        async linkAccount(data){
            data.customer_id = data.userId;
            delete data.userId;
            return p.ShopAccount.create({ data }) as unknown as AdapterAccount
        },
        unlinkAccount: (provider_providerAccountId) =>
            p.ShopAccount.delete({
                where: { provider_providerAccountId },
            }) as unknown as AdapterAccount,
        async getSessionAndUser(sessionToken) {
            const userAndSession = await p.ShopSession.findUnique({
                where: { sessionToken },
                include: { customer: true },
            })
            if (!userAndSession) return null
            const { customer , ...session } = userAndSession
            return { user : customer, session }
        },
        async createSession(data){
            let newSes = {
                customer_id:data.userId,
                sessionToken:data.sessionToken,
                expires:data.expires,
            };
            return p.ShopSession.create({ data:newSes })
        },
        updateSession: (data) =>
            p.ShopSession.update({ where: { sessionToken: data.sessionToken }, data }),
        deleteSession: (sessionToken) =>
            p.ShopSession.delete({ where: { sessionToken } }),
        async createVerificationToken(data) {
            const verificationToken = await p.ShopVerificationToken.create({ data })
            if (verificationToken.id) delete verificationToken.id
            return verificationToken
        },
        async useVerificationToken(identifier_token) {
            try {
                const verificationToken = await p.ShopVerificationToken.delete({
                    where: { identifier_token },
                })
                if (verificationToken.id) delete verificationToken.id
                return verificationToken
            } catch (error) {
                // If token already used/deleted, just return null
                // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
                if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
                    return null
                throw error
            }
        },
        // async createUser(data){
        //     console.log(data);
        //     return null
        // },
        // getUser: (id) => p.ShopCustomer.findUnique({ where: { id } }),
        // async getUserByEmail(email){
        //     const customer = p.ShopCustomer.findUnique({
        //         where: {
        //             email
        //         }
        //     })
        //     console.log(customer);
        //     return null;
        // },
        // async getUserByAccount(provider_providerAccountId) {
        //     const account = await p.ShopAccount.findUnique({
        //         where: { provider_providerAccountId },
        //         select: { customer: true },
        //     })
        //     return account?.customer ?? null
        // },
        // updateUser: ({ id, ...data }) => p.ShopCustomer.update({ where: { id }, data }),
        // deleteUser: (id) => p.ShopCustomer.delete({ where: { id } }),
        // linkAccount: (data) =>
        //     p.ShopAccount.create({ data }) as unknown as AdapterAccount,
        // unlinkAccount: (provider_providerAccountId) =>
        //     p.ShopAccount.delete({
        //         where: { provider_providerAccountId },
        //     }) as unknown as AdapterAccount,
        // async getSessionAndUser(sessionToken) {
        //     const userAndSession = await p.ShopSession.findUnique({
        //         where: { sessionToken },
        //         include: { customer: true },
        //     })
        //     if (!userAndSession) return null
        //     const { user, ...session } = userAndSession
        //     return { user, session }
        // },
        // createSession: (data) => p.ShopSession.create({ data }),
        // updateSession: (data) =>
        //     p.ShopSession.update({ where: { sessionToken: data.sessionToken }, data }),
        // deleteSession: (sessionToken) =>
        //     p.ShopSession.delete({ where: { sessionToken } }),
        // async createVerificationToken(data) {
        //     const verificationToken = await p.ShopVerificationToken.create({ data })
        //     // ts-expect-errors // MongoDB needs an ID, but we don't
        //     if (verificationToken.id) delete verificationToken.id
        //     return verificationToken
        // },
        // async useVerificationToken(identifier_token) {
        //     try {
        //         const verificationToken = await p.ShopVerificationToken.delete({
        //             where: { identifier_token },
        //         })
        //         // ts-expect-errors // MongoDB needs an ID, but we don't
        //         if (verificationToken.id) delete verificationToken.id
        //         return verificationToken
        //     } catch (error) {
        //         // If token already used/deleted, just return null
        //         // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        //         if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
        //             return null
        //         throw error
        //     }
        // },
    }
}
