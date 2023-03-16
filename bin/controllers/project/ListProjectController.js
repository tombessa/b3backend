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
exports.ListProjectController = void 0;
const ListProjectService_1 = require("../../services/project/ListProjectService");
class ListProjectController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, url, accountable_id } = req.query;
            const listProjectService = new ListProjectService_1.ListProjectService();
            let created_by = req.user_id;
            let updated_by = req.user_id;
            let plist = {
                id: id,
                name: name,
                url: url,
                accountable_id: accountable_id,
                created_by: created_by,
                updated_by: updated_by,
            };
            const project = yield listProjectService.execute(plist);
            return res.json(project);
        });
    }
}
exports.ListProjectController = ListProjectController;
