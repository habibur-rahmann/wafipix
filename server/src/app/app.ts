import express from "express";
import cors from "cors";
import { errorHandler } from "../../src/lib/custom-error-handler";
import NodeCache from "node-cache";

// import router
import portfolioRoutes from "../routers/portfolio.routes";
import serviceRoutes from "../routers/service.routes";
import heroBannerRoutes from "../routers/hero-banner.routes";
import userRoutes from "../routers/user.routes";
import reviewRotues from "../routers/review.routes";
import authRoutes from '../routers/auth.routes'
import emailRoutes from '../routers/email.routes'

import { corsOptions } from "../lib/cors-options";

// run express
const app = express();

// create a new cache
export const nodeCache = new NodeCache();

//use cors
app.use(cors(corsOptions));

// parse application/json
app.use(express.json());
app.use(express.text());

// all routes ---------------
app.use(portfolioRoutes);
app.use(serviceRoutes);
app.use(heroBannerRoutes);
app.use(userRoutes);
app.use(reviewRotues);
app.use(authRoutes)
app.use(emailRoutes)

// use centralized error handling
app.use(errorHandler);

// end line to export app
export { app };
