"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const node_match_path_1 = require("node-match-path");
const http_exception_1 = require("../exceptions/http.exception");
const httpContext = __importStar(require("express-http-context"));
const unprotected_route_1 = require("../utils/unprotected-route");
const authenticate = ({ req, res, next, callback }) => {
    const strategyType = getStrategyType(req.path);
    passport_1.default.authenticate(strategyType, { session: false }, (error, user, info) => {
        try {
            callback(error, user, info);
            next();
        }
        catch (err) {
            next(err);
        }
    })(req, res, next);
};
const AuthenticationMiddleware = (req, res, next) => {
    const isUnProtected = unprotected_route_1.unprotectedRoutes.find((unprotectedRoute) => {
        const { matches } = (0, node_match_path_1.match)(unprotectedRoute, req.path);
        return matches;
    });
    if (isUnProtected)
        return next();
    authenticate({
        req,
        res,
        next,
        callback(error, user, info) {
            if (error || !user)
                throw new http_exception_1.HttpException("401", "Unauthorized");
            const userInfo = (({ id, email }) => ({ id, email }))(user);
            httpContext.set("user", userInfo);
        },
    });
};
const getStrategyType = (url) => {
    const splittedUrl = url.split("/");
    return splittedUrl[2] == "admin" ? "jwt-admin" : "jwt-customer";
};
exports.default = AuthenticationMiddleware;
