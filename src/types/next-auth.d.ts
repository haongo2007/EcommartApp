import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User & {
      id: string;
      avatar: string;
      first_name: string;
      last_name: string;
      email: string;
      store_id: number;
      phone: string;
      birthday: Date;
    };
  }
}
