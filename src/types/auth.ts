import { User } from "next-auth";

export interface ExtendedUser extends User {
  id: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}