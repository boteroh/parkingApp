import express, { json } from "express";
import dbconnect from "../db/config.js";
import cellRouter from "../routes/cell_route.js";

class Server {
  constructor() {
    this.app = express();
    this.pathCell = "/";
    this.listen();
    this.dbconnection();
    this.route();
  }

  route() {
    this.app.use(json());
    this.app.use(this.pathCell, cellRouter);
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
