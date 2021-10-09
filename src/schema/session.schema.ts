import { object, string, ref } from 'yup';

export const createUserSessionSchema = object({
    body: object({
        email: string()
        .email('Must be a vaild email')
        .required('Email is required'),
        password: string().required('password is required')
        .min(8, 'Password too short - should be 8 character minimum.')
        .matches(/^[a-zA-Z0-9_.-]*$/)
    })
})