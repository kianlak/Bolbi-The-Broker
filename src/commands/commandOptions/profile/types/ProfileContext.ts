import type { UserContext } from "../../../../types/UserContext.ts";

export type ProfileContext = {
  user: UserContext;
  avatarUrl: string;
};
