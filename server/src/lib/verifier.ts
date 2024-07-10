import { JwtRsaVerifier } from "aws-jwt-verify";
import env from "dotenv";
env.config({
  path: ".env",
});

export const verifier = JwtRsaVerifier.create({
  issuer: process.env.KINDE_ISSUER!,
  audience: process.env.KINDE_AUDIENCE!,
  jwksUri: process.env.KINDE_JWKS_URI!,
});
