import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import logging from '../config/logging';

const NAMESPACE = 'Server';
class Middleware {
    controlAccess = (req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'POST GET DELETE PUT PATCH');
            return res.status(200).json({});
        }
        next();
    };
    logging = (req: Request, res: Response, next: NextFunction) => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}]`);

        res.on('finish', () => {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}]`, `STATUS - [${res.statusCode}]`);
        });

        next();
    };

    handleValidationError = (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);

        if (!error.isEmpty()) return res.status(200).json(error);
        next();
    };
}

export default new Middleware();
