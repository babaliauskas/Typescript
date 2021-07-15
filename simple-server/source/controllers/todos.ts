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
    logging.info(NAMESPACE, `Reading All todos`);
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offser as number | undefined;

      const results = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.status(200).json(results);
    } catch (err) {
      logging.error(NAMESPACE, 'Failed to read todos', err.message);
      return res.status(500).json({ message: 'Failed to read Todos' });
    }
  };
  readTodo = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Reading todo');
    try {
      const { id } = req.params;
      const results = await TodoInstance.findOne({ where: { id } });

      return res.status(200).json(results);
    } catch (err) {
      logging.error(NAMESPACE, 'Failed to read todo', err.message);
      return res.status(500).json({ message: 'Failed to read todo' });
    }
  };
  updateTodo = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Updating Todo');

    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      const now = new Date().toISOString();

      const results = await TodoInstance.findOne({ where: { id } });

      if (!results)
        return res.status(200).json({ message: 'Not Record with this ID' });

      const updatedRecord = await results.update({
        title: !title ? results.getDataValue('title') : title,
        completed: !completed ? results.getDataValue('completed') : completed,
        completedAt: !completed ? results.getDataValue('completedAt') : now,
      });

      return res.status(200).json(updatedRecord);
    } catch (err) {
      logging.error(NAMESPACE, 'Failed to update');
      return res.status(500).json({ message: 'Failed to update' });
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Delete Todo');

    try {
      const { id } = req.params;
      const results = await TodoInstance.findOne({ where: { id } });

      if (!results)
        return res.status(200).json({ message: 'No Record with this ID' });

      const updatedRecord = await results.destroy();
      return res.status(200).json(updatedRecord);
    } catch (err) {
      logging.error(NAMESPACE, 'Failed to delete');
      return res.status(500).json({ message: 'Failed to delete' });
    }
  };
}

export default new Todos();
