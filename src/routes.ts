import {Express, Request, Response} from 'express';
import {createUserHandler} from './controller/user.controller';
import {createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler, deleteAllSessionsHandler} from './controller/session.controller';

import {createUserSchema} from './schema/user.schema';
import {createUserSessionSchema} from './schema/session.schema';
import {createPostSchema, updatePostSchema, deletePostSchema} from './schema/post.schema';

import {validate, requiresUser} from './middleware';
import { createPostHandler, updatePostHandler, getPostHandler } from './controller/post.controller';


export default (app: Express) => {
    // health check
    app.get('/api/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    // register new user
    // POST /api/user
    app.post('/api/user', validate(createUserSchema),  createUserHandler);

    // login
    // POST /api/sessions
    app.post('/api/sessions', validate(createUserSessionSchema),  createUserSessionHandler);

    // get the user's sessions
    // GET /api/sessions
    app.get('/api/sessions', requiresUser, getUserSessionsHandler);

    //logout
    //DELETE /api/sessions
    app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

    // logout from all sessions
    // PUT /api/sessions
    app.put('/api/sessions', requiresUser, deleteAllSessionsHandler);

    // ------------------------------
    
    // Posts
    //create post
    app.post('/api/posts', [requiresUser, validate(createPostSchema)], createPostHandler)

    //create post
    app.get('/api/posts/:postId', getPostHandler)

    // update post
    app.put('/api/posts/:postId', [requiresUser, validate(updatePostSchema)], updatePostHandler)

    // delete post
    app.delete('/api/posts/:postId', [requiresUser, validate(deletePostSchema)])
}