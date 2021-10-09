import config from "config";
import jwt from 'jsonwebtoken';
import log from "../log";

const privateKey = config.get('privateKey') as string;

export const sign = (object: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, options);
} 

// a wrapper around jwt.verify
export const decode = (token: string) => {
    try{
        const decoded = jwt.verify(token, privateKey);
        return { valid: true, expired: false, decoded};
    }catch(error: any){
        log.error(error.message);
        return { 
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
}