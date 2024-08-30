import { Router } from "express";
import {
  postCell,
  getCell,
  parkingCar,
  updateCell,
  payment,
  exit,
  getCellById,
  deleteCell,
} from "../controllers/parking.controller.js";

const cellRouter = Router();

cellRouter.get("/cells", getCell);
cellRouter.get("/cells/:id", getCellById);
cellRouter.post("/cells", postCell);
cellRouter.put("/cells/:id", updateCell);
cellRouter.delete("/cells/:id", deleteCell);

cellRouter.post("/parking/:id", parkingCar);
cellRouter.get("/pay/:id", payment);
cellRouter.post("/exit/:id", exit);

export default cellRouter;
