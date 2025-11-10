"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (request, operation) => {
    const count = await operation(request.token, request.user);
    return {
        success: true,
        message: null,
        count: count,
    };
};
exports.handler = handler;
