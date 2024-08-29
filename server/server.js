import express, { json } from 'express';
import dbconnect from "../db/config.js";

class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbconnection();
    };

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running');
        });
    };

    async dbconnection() {
        await dbconnect();
    };
};

export default Server;