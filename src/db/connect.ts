import mongoose from 'mongoose';
import config from 'config';
import log from '../log';


const connect = async () => {
    const dbUri  = config.get<string>('dbURI');
    try{
        await mongoose.connect(dbUri);
        log.info('Database connected');
    }catch(error: any){
        log.error('Database error', error.message);
        process.exit(1);
    }
}

export default connect;