import { body } from 'express-validator';

class TodoValidator {
    checkCreateTodo = () => {
        return [
            body('title').notEmpty().withMessage("Title can't be empty"),
            body('completed').optional().isBoolean().withMessage('Value should be boolean').isIn([0, false]).withMessage('value should be 0 or false')
        ];
    };
}

export default new TodoValidator();
