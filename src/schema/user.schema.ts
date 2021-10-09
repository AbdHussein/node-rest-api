import { object, string, ref } from 'yup';

export const createUserSchema = object({
    body: object({
        name: string().required('name is required'),
        password: string().required('password is required')
        .min(8, 'Password too short - should be 8 character minimum.')
        .matches(/^[a-zA-Z0-9_.-]*$/),
        passwordConfirmation: string().oneOf(
            [ref('password'), null],
            'passwords must match'
        ),
        email: string()
        .email('Must be a vaild email')
        .required('Email is required')
    })
})