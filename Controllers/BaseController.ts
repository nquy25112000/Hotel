
import { Request, Response, NextFunction } from 'express';


export class BaseController {
    public sendResponse = (result?: any, req?: Request, res?: Response) => {
        if (res) {
            res.set('Cache-Control', 'no-cache,no-store');
            res.json(result)
        }
        return Promise.resolve();
    };
}