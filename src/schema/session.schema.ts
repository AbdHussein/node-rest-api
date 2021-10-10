import {object, string} from 'zod';


export const createUserSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        })
        .email('Must be a vaild email'),

        password: string({
            required_error: 'password is required'
        }).min(8, 'Password too short - should be 8 character minimum.')
    })
})