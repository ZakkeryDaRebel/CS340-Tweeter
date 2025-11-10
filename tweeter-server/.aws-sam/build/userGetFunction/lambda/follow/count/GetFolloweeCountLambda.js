"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../../model/service/FollowService");
const GetCountLambda_1 = require("./GetCountLambda");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    return (0, GetCountLambda_1.handler)(request, followService.getFolloweeCount);
};
exports.handler = handler;
