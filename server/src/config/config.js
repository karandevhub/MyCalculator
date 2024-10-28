import { fastifySession } from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import "dotenv/config";

const MongodbStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongodbStore({
  uri: process.env.DATABASE_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log("session store error: ", error);
});


export const authenticate = async(email, password) => {
    if(email==="karan@gmail.com" && password==="123456")
        return Promise.resolve({email: email, password: password});
    else
     return null;
}

export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD