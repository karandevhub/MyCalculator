import fastify from "fastify";
import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { DATABASE_URI, PORT } from "./src/config/config.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

const start = async () => {
  await connectDB(DATABASE_URI, {
    tlsAllowInvalidCertificates: true,
    connectTimeoutMS: 30000,
  });
  const app = fastify();
  app.register(fastifySocketIO, {
    cors: {
      origin: "*",  
    },
    transports: ["websocket"],
    pingInterval: 10000,
    pingTimeout: 5000
  });
  

  await buildAdminRouter(app);
  await registerRoutes(app);

  const port = PORT || 4000;
  app.listen({ port: port, host:"0.0.0.0"}, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `Server is running at http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });
  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("New client connected⛷️");
    
      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
    
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    
      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`Client joined room ${orderId}`);
      });
      socket.on("liveTrackingUpdates", (orderId) => {
        socket.join(orderId);
        console.log(`Client joined room ${orderId}`);
      });
    
      socket.on("newOrder", (orderId) => {
        app.io.to(orderId).emit("newOrder", orderId);
      });
    });
    
  });
};

start();
