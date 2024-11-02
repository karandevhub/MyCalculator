import { authRoutes } from "./auth.js";
import { categoryRoutes, productRoutes } from "./products.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix: prefix });
  fastify.register(categoryRoutes, { prefix: prefix });
  fastify.register(productRoutes, { prefix: prefix });
};
