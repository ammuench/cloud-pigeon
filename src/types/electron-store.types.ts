import { z } from "zod";

const googleTokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.literal("Bearer"),
  id_token: z.string(),
  expiry_date: z.number().optional(),
  expires_in: z.number().optional(),
});

export const electronStoreSchema = z.object({
  googleToken: googleTokenSchema.optional(),
  machineId: z.string().optional(),
});

export type GoogleToken = z.infer<typeof googleTokenSchema>;
export type ElectronStore = z.infer<typeof electronStoreSchema>;
