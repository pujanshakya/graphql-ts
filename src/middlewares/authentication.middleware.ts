import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { match } from "node-match-path";
import { HttpException } from "../exceptions/http.exception";
import * as httpContext from "express-http-context";
import { unprotectedRoutes } from "../utils/unprotected-route";

const authenticate = ({ req, res, next, callback }: any) => {
  const strategyType = getStrategyType(req.path);

  passport.authenticate(
    strategyType,
    { session: false },
    (error, user, info) => {
      try {
        callback(error, user, info);
        next();
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
};

const AuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isUnProtected = unprotectedRoutes.find((unprotectedRoute) => {
    const { matches } = match(unprotectedRoute, req.path);
    return matches;
  });

  if (isUnProtected) return next();

  authenticate({
    req,
    res,
    next,
    callback(error: any, user: any, info: any) {
      if (error || !user) throw new HttpException("401", "Unauthorized");
      const userInfo = (({ id, email }) => ({ id, email }))(user);
      httpContext.set("user", userInfo);
    },
  });
};

const getStrategyType = (url: string) => {
  const splittedUrl = url.split("/");
  return splittedUrl[2] == "admin" ? "jwt-admin" : "jwt-customer";
};

export default AuthenticationMiddleware;
