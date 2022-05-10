import express from 'express';
import { Router } from "express";
import { BillController } from "../Controllers/Bill"
import bodyParser from 'body-parser';
import { TokenController } from '../Controllers/Token';


const tokenController = new TokenController();


const Controller = new BillController();


export class BillRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {

        this.Router.post('/create/:id', Controller.create);

    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}