import { Router } from 'express';
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailuserController} from "./controllers/user/DetailUserController";
import {DeleteUserController} from "./controllers/user/DeleteUserController";
import {isAuthenticated, isCreatingAdmin} from "./middlewares/isAuthenticated";
import {ListUserController} from "./controllers/user/ListUserController";
import {UpdateUserController} from "./controllers/user/UpdateUserController";

const router = Router();

//-- ROTAS USER --
router.post('/users/createAdmin', isCreatingAdmin, new CreateUserController().handle)
router.post('/users', isAuthenticated, new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.patch('/users', isAuthenticated,  new UpdateUserController().handle)
router.get('/me', isAuthenticated,  new DetailuserController().handle )
router.get('/users', isAuthenticated,  new ListUserController().handle )
router.patch('/users/remove', isAuthenticated,  new DeleteUserController().handle )

router.get('/', (req, res)=>{
    return res.json({sucess: true, menssage: "sucess"});
})

export { router }; 