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
exports.ListFunctionPointService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListFunctionPointService {
    execute({ id, project_id, type, estimate_functional_size, count_functional_size, created_by, updated_by, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { where: {} };
            if (id !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { id: id });
            if (project_id !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { project_id: project_id });
            if (type !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { type: type });
            if (estimate_functional_size !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { estimate_functional_size: estimate_functional_size });
            if (count_functional_size !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { count_functional_size: count_functional_size });
            if (created_by !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { created_by: created_by });
            if (updated_by !== undefined)
                query.where = Object.assign(Object.assign({}, query.where), { updated_by: updated_by });
            return yield prisma_1.default.functionPoint.findMany(query);
        });
    }
}
exports.ListFunctionPointService = ListFunctionPointService;
