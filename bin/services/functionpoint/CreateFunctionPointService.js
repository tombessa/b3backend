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
exports.CreateFunctionPointService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateFunctionPointService {
    execute({ id, project_id, type, estimate_functional_size, count_functional_size, created_by, updated_by, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!project_id) {
                throw new Error("'project_id' Required");
            }
            if (!type) {
                throw new Error("'type' Required");
            }
            const unique = yield prisma_1.default.functionPoint.findFirst({
                where: {
                    project_id: project_id,
                }
            });
            if (unique) {
                throw new Error("FunctionPoint already exists");
            }
            let query = { data: { id: undefined,
                    project_id: undefined,
                    type: undefined,
                    estimate_functional_size: undefined,
                    count_functional_size: undefined,
                    created_by: undefined,
                    updated_by: undefined,
                } };
            if (id !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { id: id });
            if (project_id !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { project_id: project_id });
            if (type !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { type: type });
            if (estimate_functional_size !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { estimate_functional_size: estimate_functional_size });
            if (count_functional_size !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { count_functional_size: count_functional_size });
            if (created_by !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { created_by: created_by });
            if (updated_by !== undefined)
                query.data = Object.assign(Object.assign({}, query.data), { updated_by: updated_by });
            return yield prisma_1.default.functionPoint.create(query);
        });
    }
}
exports.CreateFunctionPointService = CreateFunctionPointService;
