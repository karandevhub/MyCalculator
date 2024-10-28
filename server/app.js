import fastify from "fastify";
import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import { buildAdminRouter } from "./src/config/setup.js";

const start = async () => {
  await connectDB(process.env.DATABASE_URI);
  const app = fastify();
  await buildAdminRouter(app)
  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Server is running at http://localhost:${PORT}`);
    }
  });
};

start();
