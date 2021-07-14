import { body, query } from 'express-validator';

class TodoValidator {
    checkCreateTodo = () => {
        return [
            body('title').notEmpty().withMessage("Title can't be empty"),
            body('completed').optional().isBoolean().withMessage('Value should be boolean').isIn([0, false]).withMessage('value should be 0 or false')
        ];
    };
    readAllTodos = () => {
        return [
            query('limit').notEmpty().withMessage("Query 'limit' can't be empty").isInt({ min: 1, max: 10 }).withMessage('Value should be between 1-10'),
            query('offset').optional().isNumeric().withMessage('Value should be a number')
        ];
    };
}

export default new TodoValidator();
