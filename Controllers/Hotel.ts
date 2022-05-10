import { HotelService } from '../Services/Hotel'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new HotelService();


export class HotelController {


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(400)); });
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item = req.body;
            item.id = uuidv4();
            const result = await service.create(item);
            baseController.sendResponse(result, req, res);
        } catch (error) {
            baseController.sendResponse(error, req, res.status(400));
        }

    }
}


