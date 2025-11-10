"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../../model/service/FollowService");
const LoadArrayLambda_1 = require("./LoadArrayLambda");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    return (0, LoadArrayLambda_1.handler)(request, followService.loadMoreFollowees);
};
exports.handler = handler;
