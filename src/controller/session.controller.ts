import { Request, Response } from 'express'
import config from 'config';
import { validatePassword } from '../services/user.service';
import { createSession, createAccessToken, updateSession, findSessions, invalidateAllSessions} from '../services/session.service';
import log from '../log';
import {sign} from '../utils/jwt.utils';
import { get } from 'lodash';


export const createUserSessionHandler = async(req: Request, res: Response) => {
    try {
        // Validate the email and password
        const user = await validatePassword(req.body);

        if(!user){
            return res.status(401).send('Invalid email or password');
        }   

        // Create a session
        const session = await createSession(user['_id'], req.get('user-agent') || "");
        
        // Create access token
        const accessToken = await createAccessToken({user, session});
        
        // Create refresh token
        const refreshToken = sign(session, 
            {expiresIn: config.get('refreshTokenTtl')}    
        )   
        // Send access & refresh token to the user
        return res.send({
            accessToken,
            refreshToken
        });
    } catch (error: any) {
        log.error(error);
        res.status(409).send(error.message);
    }
}

export const invalidateUserSessionHandler = async(req: Request, res: Response) => {
    const sessionId = get(req, 'user.session');

    await updateSession({_id: sessionId}, {valid: false});

    return res.sendStatus(200);
}

export const getUserSessionsHandler = async(req: Request, res: Response) => {
    const user_id = get(req, 'user._id');

    const sessions = await findSessions({user: user_id, valid: true});
    
    return res.send(sessions);
}

export const deleteAllSessionsHandler = async(req: Request, res: Response) => {
    try{
        const user_id = get(req, 'user._id');
        const sessionId = get(req, 'user.session');

        await invalidateAllSessions({user: user_id, _id : {$ne: sessionId} }, {valid: false});

        return res.sendStatus(200);
    }catch(error: any){
        return res.status(500).send(error.toString());
    }
}