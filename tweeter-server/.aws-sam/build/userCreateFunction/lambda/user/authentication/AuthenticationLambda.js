"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (operation) => {
    const [user, token] = await operation();
    return {
        success: true,
        message: null,
        user: user,
        token: token,
    };
};
exports.handler = handler;
