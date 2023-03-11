"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const ListUserController_1 = require("./controllers/user/ListUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const router = (0, express_1.Router)();
exports.router = router;
//-- ROTAS USER --
router.post('/users', isAuthenticated_1.isAuthenticated, new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.patch('/users', isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailuserController().handle);
router.get('/users', isAuthenticated_1.isAuthenticated, new ListUserController_1.ListUserController().handle);
router.patch('/users/remove', isAuthenticated_1.isAuthenticated, new DeleteUserController_1.DeleteUserController().handle);
router.get('/', (req, res) => {
    return res.json({ sucess: true, menssage: "sucess" });
});
