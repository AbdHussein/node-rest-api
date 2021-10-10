import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'name is required'
        }),
        password: string({
            required_error: 'password is required'
        }).min(8, 'Password too short - should be 8 character minimum.'),
        passwordConfirmation: string({
            required_error: 'Password Confirmation is required'
        }),
        email: string({
            required_error: 'Password Confirmation is required'
        }).email('Must be a vaild email')
    }).refine((data) => data.password == data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,'body.passwordConfirmation'>;