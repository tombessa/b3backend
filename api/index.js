import express from "express";
import {Router} from "express";

const app = express();

const route = Router();
route.get('/', (req, res)=>{
    return res.json({sucess: true, menssage: "sucess"});
})

app.use(route);
app.listen(3333, ()=>{
    console.log("Online Server!")
});