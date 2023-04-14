import { z } from "zod";

const envVariablesSchema = z.object({
  auth0Domain: z.string(),
  clientId: z.string(),
  apiIdentifier: z.string(),
});

export type EnvironmentVariables = z.infer<typeof envVariablesSchema>;

export default envVariablesSchema;
