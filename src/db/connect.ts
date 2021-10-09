import mongoose from 'mongoose';
import config from 'config';
import log from '../log';


const connect = () => {
    const dbUri  = config.get('dbURI') as string;

    return mongoose
    .connect(dbUri)
    .then(() => {
        log.info('Database connected');
    }).catch(error => {
        log.error('Database error', error.message);
        process.exit(1);
    })
}

export default connect;