// import { UserType } from "@prisma/client";
// import db from "./servers/prismadb";
import { responseCustomer } from "helpers/responseCustomer";
import { getSession } from "./servers/session";

export const getCurrentUser = async () => {
  const session = await getSession();
  return responseCustomer(session?.user);
};

// export const isAdmin = async (userId?: string) => {
//   if (!userId) return false;

//   const { userType } = (await db.user.findFirst({
//       where: {
//         id: userId,
//       },
//       select: {
//         userType: true,
//       },
//     })) || {};

//   return userType === UserType.Admin;
// };
