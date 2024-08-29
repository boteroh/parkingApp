import { Router } from "express";
import { postCell, getCell } from "../controllers/parking.controller.js";

const cellRouter = Router();

cellRouter.get('/cells', getCell);
cellRouter.post('/cells', postCell);


export default cellRouter;