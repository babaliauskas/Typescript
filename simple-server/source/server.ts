import http from 'http';
import express, { urlencoded, json } from 'express';
import config from './config/config';
import logging from './config/logging';
import healthRouter from './routes/healthCheck';
import db from './config/database/database.config';

const NAMESPACE = 'Server';
const router = express();

db.sync().then(() => logging.info('Database', 'Connected to DB'));

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}]`, `STATUS - [${req.statusCode}]`);
    });

    next();
});

router.use(urlencoded({ extended: false }));
router.use(json());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST GET DELETE PUT PATCH');
        return res.status(200).json({});
    }
    next();
});

router.use('/health', healthRouter);

router.use((req, res, next) => {
    const error = new Error('Not Found');

    return res.status(400).json({ message: error.message });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
