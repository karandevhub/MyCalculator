import fastify from "fastify";
import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { DATABASE_URI, PORT } from "./src/config/config.js";

const start = async () => {
  await connectDB(DATABASE_URI);
  const app = fastify();
  await buildAdminRouter(app)
  const port = PORT || 4000;
  app.listen({ port: port, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Server is running at http://localhost:${PORT}${admin.options.rootPath}`);
    }
  });
};

start();
