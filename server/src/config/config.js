import { fastifySession } from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import "dotenv/config";
import { Admin } from "../models/user.js";

const MongodbStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongodbStore({
  uri: process.env.DATABASE_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log("session store error: ", error);
});

export const authenticate = async (email, password) => {
  if (email && password) {
    const user = await Admin.findOne({ email });
    if (!user) return null;
    if (user.password === password)
      return Promise.resolve({ email: email, password: password });
    else return null;
  }
};

export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;
