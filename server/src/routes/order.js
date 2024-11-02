import { createOrder, getOrders, updateOrderStatus } from "../controllers/order/order.js";
import { verifytoken } from "../middleware/auth.js";

export const orderRoutes = async (fastify, optinons) => {
  fastify.addHook("preHandler", async (req, res) => {
    const isAuthenticated = verifytoken(req, res);
    if (!isAuthenticated) {
      return res.status(401).send({ message: "Unauthorized" });
    }
  });

  fastify.post("/order", createOrder);
  fastify.get("/order", getOrders);
  fastify.patch("/order/:orderId/status", updateOrderStatus);
  fastify.post("/order", createOrder);
};
