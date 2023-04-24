"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    constructor(statusCode, errors) {
        super();
        this.status = statusCode;
        this.errors = errors;
        this.message = "Validation error";
    }
}
exports.ValidationException = ValidationException;
