import { BookRoomService } from '../Services/BookRoom'
import { TokenService } from '../Services/Token'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BaseController } from './BaseController';

const service = new BookRoomService();
const tokenService = new TokenService();


export class BookRoomController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await service.findAll();
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.id = uuidv4();
        const token = req.headers["authorization"]?.split(" ")[1];
        const UserId = await tokenService.findUserIdWhereToken(token);
        try {
            const result = await service.create(item, UserId);
            this.sendResponse(result, req, res.status(200))
        }
        catch (err) {
            this.sendResponse(err, req, res.status(400))
        }

    }
}
