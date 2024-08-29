import express, { json } from "express";
import dbconnect from "../db/config.js";
import { postCell, getCell } from "../controllers/parking.controller.js";
import cellRouter from "../routes/cell_route.js";

class Server {
  constructor() {
    this.app = express();
    this.pathCell = "/cells";
    this.listen();
    this.dbconnection();
    this.route();
  }

  route() {
    this.app.use(json());
    this.app.get(this.pathCell, getCell);
    this.app.post(this.pathCell, postCell);
  };

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  };

  async dbconnection() {
    await dbconnect();
  };
}

export default Server;
