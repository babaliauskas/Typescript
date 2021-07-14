import express from 'express';
import Controller from '../controllers/todos';
import TodoValidator from '../validator';
import Middleware from '../middleware';

const router = express.Router();

router.post('/create', TodoValidator.checkCreateTodo(), Middleware.handleValidationError, Controller.createTodo);
router.get('/read', TodoValidator.readAllTodos(), Middleware.handleValidationError, Controller.readAllTodos);

export = router;
