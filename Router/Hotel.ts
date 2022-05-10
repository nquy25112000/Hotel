import express from 'express';
import { Router } from "express";
import { HotelController } from "../Controllers/Hotel"
import bodyParser from 'body-parser';


const Controller = new HotelController();


export class HotelRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', Controller.findAll);
        this.Router.post('/create', Controller.create);

    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}