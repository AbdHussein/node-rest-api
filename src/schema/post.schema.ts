import {object, string} from 'zod';
const payload = {
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        body: string({
            required_error: 'Body is required'
        }).min(120, "Body is too short - should be 120 chars minimum."),
    }),
};

const params = {
    params: object({
        postId: string({
            required_error: 'post ID is required'
        }),
    }),
};

export const createPostSchema = object({
    ...payload
});


export const updatePostSchema = object({
    ...params,
    ...payload
});

export const deletePostSchema = object({
    ...params,
});