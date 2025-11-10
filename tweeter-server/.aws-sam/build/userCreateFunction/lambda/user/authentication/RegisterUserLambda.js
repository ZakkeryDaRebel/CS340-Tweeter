"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const UserService_1 = require("../../../model/service/UserService");
const AuthenticationLambda_1 = require("./AuthenticationLambda");
const handler = async (request) => {
    return (0, AuthenticationLambda_1.handler)(async () => {
        const userService = new UserService_1.UserService();
        return await userService.register(request.firstName, request.lastName, request.alias, request.password, request.imageStringBase64, request.imageFileExtension);
    });
};
exports.handler = handler;
