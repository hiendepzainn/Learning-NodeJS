import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "../services/authentication.service";
import { getUserAndRoleByID, getUserByID } from "../services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(function verify(username, password, cb) {
      console.log("check username/password:", username, password);
      return handleLogin(username, password, cb);
    })
  );

  // What data that storage in field "data" at session table (MySQL)
  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id });
    });
  });

  // What data that convert from "data" to to load to req.user
  passport.deserializeUser(function (object: any, cb) {
    process.nextTick(async function () {
      const user = await getUserAndRoleByID(object.id);
      return cb(null, user);
    });
  });
};

export default configPassportLocal;
