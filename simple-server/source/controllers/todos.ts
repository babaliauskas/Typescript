import { Request, Response } from 'express';
import logging from '../config/logging';
import { TodoInstance } from '../model';

const NAMESPACE = 'Todos Controller';

class Todos {
    createTodo = async (req: Request, res: Response) => {
        logging.info(NAMESPACE, `Creating Todo`);

        try {
            const results = await TodoInstance.create({ ...req.body });
            return res.status(200).json(results);
        } catch (err) {
            logging.error(NAMESPACE, 'Failed to create Todo', err.message);
            return res.status(500).json({ message: 'Failed to create Todo' });
        }
    };
    readAllTodos = async (req: Request, res: Response) => {
        try {
            const limit = req.query?.limit as number | undefined;
            const offset = req.query?.offser as number | undefined;

            // if (limit > 10) limit = 10;
            const results = await TodoInstance.findAll({ where: {}, limit, offset });
            return res.status(200).json(results);
        } catch (err) {
            logging.error(NAMESPACE, 'Failed to read todos', err.message);
            return res.status(500).json({ message: 'Failed to read Todos' });
        }
    };
}

export default new Todos();
