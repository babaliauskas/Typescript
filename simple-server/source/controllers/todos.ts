import { Request, Response } from 'express';
import logging from '../config/logging';
import { TodoInstance } from '../model';

const NAMESPACE = 'Todos Controller';

const createTodo = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Creating Todo`);

    try {
        const result = await TodoInstance.create({ ...req.body });
        return res.status(200).json(result);
    } catch (err) {
        logging.error(NAMESPACE, 'Failed to create Todo', err.message);
        return res.status(500).json({ message: 'Failed to create Todo' });
    }
};

export default { createTodo };
