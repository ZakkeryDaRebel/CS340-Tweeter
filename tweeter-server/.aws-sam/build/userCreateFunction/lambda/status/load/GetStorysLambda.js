"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const LoadStatusesLambda_1 = require("./LoadStatusesLambda");
const StatusService_1 = require("../../../model/service/StatusService");
const handler = async (request) => {
    const statusService = new StatusService_1.StatusService();
    return (0, LoadStatusesLambda_1.handler)(request, statusService.loadMoreStoryItems);
};
exports.handler = handler;
