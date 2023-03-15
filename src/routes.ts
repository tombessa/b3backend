import { Router } from 'express';
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailuserController} from "./controllers/user/DetailUserController";
import {DeleteUserController} from "./controllers/user/DeleteUserController";
import {isAuthenticated} from "./middlewares/isAuthenticated";
import {ListUserController} from "./controllers/user/ListUserController";
import {UpdateUserController} from "./controllers/user/UpdateUserController";
import {isCreatingAdmin} from "./middlewares/isAuthenticated";

const router = Router();

//ROUTES

//-- ROTAS USER --
router.post('/user/createAdmin', isCreatingAdmin, new CreateUserController().handle)
router.post('/user', isAuthenticated, new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.patch('/user', isAuthenticated,  new UpdateUserController().handle)
router.get('/me', isAuthenticated,  new DetailuserController().handle )
router.get('/user', isAuthenticated,  new ListUserController().handle )
router.patch('/user/remove', isAuthenticated,  new DeleteUserController().handle )

router.get('/', (req, res)=>{
    return res.json({sucess: true, menssage: "sucess"});
})


export { router };
		
		
		
		
