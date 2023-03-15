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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProjectService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListProjectService {
    execute({ id, name, url, accountable_id, created_by, updated_by, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { where: {} };
            if (id !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (name !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { name: name });
            if (url !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { url: url });
            if (accountable_id !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { accountable_id: accountable_id });
            if (created_by !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (updated_by !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { updated_by: updated_by });
            return yield prisma_1.default.project.findMany(query);
        });
    }
}
exports.ListProjectService = ListProjectService;
