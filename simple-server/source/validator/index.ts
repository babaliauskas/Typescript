import { body, query, param } from 'express-validator';

class TodoValidator {
  checkCreateTodo = () => {
    return [
      body('title').notEmpty().withMessage("Title can't be empty"),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage('Value should be boolean')
        .isIn([0, false])
        .withMessage('value should be 0 or false'),
    ];
  };
  readAllTodos = () => {
    return [
      query('limit')
        .notEmpty()
        .withMessage("Query 'limit' can't be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage('Value should be between 1-10'),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage('Value should be a number'),
    ];
  };
  readTodo = () => {
    return [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isUUID(4)
        .withMessage('Value should be uuid v4'),
    ];
  };
  updateTodo = () => {
    return [
      body('title').optional(),
      body('completed').optional(),
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isUUID(4)
        .withMessage('Value should be uuid v4'),
    ];
  };
}

export default new TodoValidator();
