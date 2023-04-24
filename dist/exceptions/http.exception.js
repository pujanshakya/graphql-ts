"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, message) {
        super();
        this.status = statusCode;
        this.message = message;
    }
}
exports.HttpException = HttpException;
