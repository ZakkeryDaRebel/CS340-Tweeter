"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class UserService {
    // Helper Method
    async fakeDataAuthentication() {
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid registration");
        }
        return [user, tweeter_shared_1.FakeData.instance.authToken.token];
    }
    // Endpoint 11
    async getUser(token, alias) {
        // TODO: Replace with the result of calling server
        let user = tweeter_shared_1.FakeData.instance.findUserByAlias(alias);
        return user == null ? null : user.dto;
    }
    // Endpoint 12
    async register(firstName, lastName, alias, password, imageStringBase64, imageFileExtension) {
        // TODO: Replace with the result of calling the server
        return this.fakeDataAuthentication();
    }
    // Endpoint 13
    async login(alias, password) {
        // TODO: Replace with the result of calling the server
        return this.fakeDataAuthentication();
    }
    // Endpoint 14
    async logout(token) {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    }
}
exports.UserService = UserService;
