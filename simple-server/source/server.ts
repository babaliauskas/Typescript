import http from 'http';
import express, { urlencoded, json } from 'express';
import config from './config/config';
import logging from './config/logging';
import healthRouter from './routes/healthCheck';
import todoRouter from './routes/todos';
import db from './config/database/database.config';
import Middleware from './middleware';

const NAMESPACE = 'Server';
const router = express();

db.sync().then(() => logging.info('Database', 'Connected to DB'));

router.use(Middleware.logging);

router.use(urlencoded({ extended: false }));
router.use(json());
router.use(Middleware.controlAccess);

router.use('/health', healthRouter);
router.use('/todo', todoRouter);

router.use((req, res, next) => {
    const error = new Error('Not Found');

    return res.status(400).json({ message: error.message });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
