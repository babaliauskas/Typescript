import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Health Controller';

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Health check route called');

    return res.status(200).json({ message: 'pong' });
};

export default { healthCheck };
