import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000","http://client:3000", "https://www.wafipix.com", "www.wafipix.com", "wafipix.com"],
  allowedHeaders: ["Content-type", "Authorization", "Access-Control-Allow-Credentials", "*"],
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};
