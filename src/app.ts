import express from "express";
import "dotenv/config";
import { initRouters } from "./routes/web";
import initDatabase from "./config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8888;

//config cors: only PORT in originList can call API
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static files
app.use(express.static("public"));

//config session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

//config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

//config res.locals
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//config routers
initRouters(app);

//seeding data
initDatabase();

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
});
