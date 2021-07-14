import express from 'express';
import controller from '../controllers/todos';
import TodoValidator from '../validator';
import Middleware from '../middleware';

const router = express.Router();

router.post('/create', TodoValidator.checkCreateTodo(), Middleware.handleValidationError, controller.createTodo);

export = router;
