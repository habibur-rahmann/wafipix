import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-type", "Authorization"],
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};
