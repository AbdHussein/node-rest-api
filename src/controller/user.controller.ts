import { Request, Response } from 'express'
import { omit } from 'lodash';
import { createUser } from '../services/user.service';
import log from '../log';

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (error: any) {
        log.error(error);
        res.status(409).send(error.message);
    }
}   