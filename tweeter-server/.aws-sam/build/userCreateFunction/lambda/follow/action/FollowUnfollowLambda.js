"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (request, operation) => {
    const [followerCount, followeeCount] = await operation(request.token, request.user);
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount,
    };
};
exports.handler = handler;
