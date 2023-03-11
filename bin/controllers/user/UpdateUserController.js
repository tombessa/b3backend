"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const interface_1 = require("../../interface");
const UpdateUserService_1 = require("../../services/user/UpdateUserService");
class UpdateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password, nTry, blocked, role } = req.body;
            const updateUserService = new UpdateUserService_1.UpdateUserService();
            let updated_by = req.user_id;
            let update = {
                id: id,
                name: name,
                email: email,
                password: password,
                nTry: nTry,
                blocked: blocked,
                role: interface_1.Role[role],
                updated_by: updated_by
            };
            const user = yield updateUserService.execute(update);
            return res.json(user);
        });
    }
}
exports.UpdateUserController = UpdateUserController;
