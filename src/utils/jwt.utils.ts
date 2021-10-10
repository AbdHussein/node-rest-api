import config from "config";
import jwt from 'jsonwebtoken';
import log from "../log";

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export const sign = (object: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm:'RS256'
    });
} 

// a wrapper around jwt.verify
export const decode = (token: string) => {
    try{
        const decoded = jwt.verify(token, publicKey);
        return { valid: true, expired: false, decoded};
    }catch(error: any){
        return { 
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
}