import { Request, Response } from 'express'
import { get } from 'lodash';
import { getPost, deletePost, createPost, findAndUpdatePost } from '../services/post.service';

export const createPostHandler = async(req: Request, res: Response) => {
    const user_id = get(req, 'user._id');
    const { body } = req;
    const post = await createPost({...body, user: user_id});
    return res.status(201).send(post);
}

export const getPostHandler = async(req: Request, res: Response) => {
    const postId = get(req, 'params.postId');
    const post = await getPost({_id: postId})
    if(!post){
        return res.sendStatus(404);
    }
    return res.send(post);
}

export const updatePostHandler = async(req: Request, res: Response) => {
    const postId = get(req, 'params.postId');
    const userId = get(req, 'user._id');

    const { body } = req;
    const post = await getPost({_id: postId});
    if(!post){
        return res.sendStatus(404);
    }

    if(String(post.user) !== userId){
        return res.sendStatus(401);
    }

    const updatedPost = await findAndUpdatePost({_id: postId}, body);
    return res.status(200).send(updatedPost);
}


export const deletePostHandler = async(req: Request, res: Response) => {
    const postId = get(req, 'params.postId');
    const userId = get(req, 'user._id');

    const post = await getPost({_id: postId});

    if(!post){
        return res.sendStatus(404);
    }

    if(String(post.user) !== userId){
        return res.sendStatus(401);
    }

    await deletePost({_id: postId});
    return res.sendStatus(200);
}