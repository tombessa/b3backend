import { Router } from 'express';
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailuserController} from "./controllers/user/DetailUserController";
import {DeleteUserController} from "./controllers/user/DeleteUserController";
import {isAuthenticated} from "./middlewares/isAuthenticated";
import {ListUserController} from "./controllers/user/ListUserController";
import {UpdateUserController} from "./controllers/user/UpdateUserController";
import {isCreatingAdmin} from "./middlewares/isAuthenticated";
import {CreateProjectController} from "./controllers/project/CreateProjectController";
import {ListProjectController} from "./controllers/project/ListProjectController";
import {UpdateProjectController} from "./controllers/project/UpdateProjectController";
import {DeleteProjectController} from "./controllers/project/DeleteProjectController";
import {CreateFunctionPointController} from "./controllers/functionpoint/CreateFunctionPointController";
import {ListFunctionPointController} from "./controllers/functionpoint/ListFunctionPointController";
import {UpdateFunctionPointController} from "./controllers/functionpoint/UpdateFunctionPointController";
import {DeleteFunctionPointController} from "./controllers/functionpoint/DeleteFunctionPointController";

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


router.post('/project', isAuthenticated, new CreateProjectController().handle)
router.get('/project', isAuthenticated, new ListProjectController().handle)
router.patch('/project', isAuthenticated, new UpdateProjectController().handle)
router.delete('/project', isAuthenticated, new DeleteProjectController().handle)

router.post('/functionpoint', isAuthenticated, new CreateFunctionPointController().handle)
router.get('/functionpoint', isAuthenticated, new ListFunctionPointController().handle)
router.patch('/functionpoint', isAuthenticated, new UpdateFunctionPointController().handle)
router.delete('/functionpoint', isAuthenticated, new DeleteFunctionPointController().handle)



router.get('/', (req, res)=>{
    return res.json({sucess: true, menssage: "sucess"});
})


export { router };
