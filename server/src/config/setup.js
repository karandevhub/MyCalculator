import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { COOKIE_PASSWORD, sessionStore, authenticate } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";
AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role", "isActivated"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Branch,
    },
  ],
  branding: {
    companyName: "Qwikzo",
    withMadeWithLove: false,
    favicon: "",
    logo: "",
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: "/admin",
});

export const buildAdminRouter = async (app) => {
  try {
    await AdminJSFastify.buildAuthenticatedRouter(
      admin,
      {
        authenticate,
        cookiePassword: COOKIE_PASSWORD,
        cookieName: "adminjs",
      },
      app,
      {
        store: sessionStore,
        saveUninitialized: true,
        secret: COOKIE_PASSWORD,
        cookie: {
          httpOnly: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
        },
      }
    );
  } catch (error) {
    console.error("Error setting up AdminJS router:", error);
  }
};
