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
const isAuthenticated_2 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
//ROUTES
//-- ROTAS USER --
router.post('/user/createAdmin', isAuthenticated_2.isCreatingAdmin, new CreateUserController_1.CreateUserController().handle);
router.post('/user', isAuthenticated_1.isAuthenticated, new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.post('/sessionSocialmedia', isAuthenticated_1.isSocialMediaLogin, new AuthUserController_1.AuthUserController().handleSocialMedia);
router.patch('/user', isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailuserController().handle);
router.get('/user', isAuthenticated_1.isAuthenticated, new ListUserController_1.ListUserController().handle);
router.patch('/user/remove', isAuthenticated_1.isAuthenticated, new DeleteUserController_1.DeleteUserController().handle);
router.get('/', (req, res) => {
    return res.json({ sucess: true, menssage: "sucess" });
});
