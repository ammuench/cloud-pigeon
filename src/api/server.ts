import express from "express";
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

import envVariablesJSON from "../../env-variables.json";
import envVariablesSchema, {
  EnvironmentVariables,
} from "../types/JSON/env-variables.types";

let envVariables: EnvironmentVariables;

try {
  envVariables = envVariablesSchema.parse(envVariablesJSON);
} catch (e) {
  console.error(e);
  process.exit(1);
}

const app = express();

app.get("/public", (req, res) =>
  res.send("Everyone in the world can read this message.")
);

app.use(
  expressjwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${envVariables.auth0Domain}/.well-known/jwks.json`,
    }) as GetVerificationKey,

    // Validate the audience and the issuer.
    audience: envVariables.apiIdentifier,
    issuer: `https://${envVariables.auth0Domain}/`,
    algorithms: ["RS256"],
  })
);

app.get("/private", (req, res) =>
  res.send("Only authenticated users can read this message.")
);

app.listen(3001, () => console.log("CloudPigeonAPI listening on port 3001!"));

export default app;
