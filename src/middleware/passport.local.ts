import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "../services/authentication.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(function verify(username, password, cb) {
      console.log("check username/password:", username, password);
      return handleLogin(username, password, cb);
    })
  );

  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configPassportLocal;
