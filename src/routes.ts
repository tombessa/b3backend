import { Router } from 'express';
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailuserController} from "./controllers/user/DetailUserController";
import {DeleteUserController} from "./controllers/user/DeleteUserController";
import {isAuthenticated} from "./middlewares/isAuthenticated";

const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated,  new DetailuserController().handle )
router.delete('/users', isAuthenticated,  new DeleteUserController().handle )

router.get('/', (req, res)=>{
    return res.json({sucess: true, menssage: "sucess"});
})

export { router }; 