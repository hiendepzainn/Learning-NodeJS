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
};

export default configPassportLocal;
