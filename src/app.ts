import express from 'express';
import config from 'config';
import cors from 'cors';
import log from './log';
import connect from './db/connect';
import routes from './routes';
import { deserializeUser } from './middleware';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(deserializeUser);

app.listen(port, () => {
    log.info(`Server running at http://${host}:${port}`);
    connect();
    routes(app);
})