"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../../model/service/FollowService");
const FollowUnfollowLambda_1 = require("./FollowUnfollowLambda");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    return (0, FollowUnfollowLambda_1.handler)(request, followService.follow);
};
exports.handler = handler;
