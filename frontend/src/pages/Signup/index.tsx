import { Container, Grid, Box, Typography, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../../components';
import { LinkItem } from '../Login';
import { useMutation } from "react-query";
import { signUpUserFn } from "../../api/authApi";
import { ILoginResponse } from "../../api/types";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const signupSchema = object({
    firstName: string().min(1, 'First name is required').max(70),
    lastName: string().min(1, 'Last name is required').max(70),
    email: string().min(1, 'Email is required').email('Email is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string()
        .min(1, 'Please confirm your password')
        .oneOf([ref('password')], 'Your passwords do not match.')
})

export type ISignUp = InferType<typeof signupSchema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const defaultValues: ISignUp = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    const {
        mutate: registerUser,
        isLoading,
    } = useMutation<ILoginResponse, unknown, ISignUp>((userData) => signUpUserFn(userData), {
        onSuccess(data) {
            localStorage.setItem('token', data.token);
            navigate('/');
        },
        onError(error: unknown) {
            toast.error((error as any).response.data.message, {
                position: "top-right",
            });
        },
    });


    const methods = useForm<ISignUp>({
        resolver: yupResolver(signupSchema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
        registerUser(values)
    };

    return (
        <Container
            maxWidth={false}
            sx={{ height: '100vh', backgroundColor: '#F4F4C8' }}
        >
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                sx={{ width: '100%', height: '100%' }}
            >
                <Grid
                    item
                    sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}
                >
                    <Grid
                        container
                        sx={{
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                            padding: '3rem',
                        }}
                    >
                        <FormProvider {...methods}>
                            <Typography
                                variant='h4'
                                sx={{
                                    textAlign: 'center',
                                    width: '100%',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                Welcome!
                            </Typography>
                            <Grid
                                item
                                container
                                justifyContent='space-between'
                                rowSpacing={5}
                                sx={{
                                    maxWidth: '45rem',
                                    margin: 'auto',
                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                        onSubmit={methods.handleSubmit(onSubmitHandler)}
                                    >
                                        <Typography
                                            variant='h6'
                                            component='h1'
                                            sx={{ textAlign: 'center', marginBottom: '1.5rem' }}
                                        >
                                            Create new your account
                                        </Typography>

                                        <FormInput
                                            label='First Name'
                                            type='text'
                                            name='firstName'
                                            focused
                                            required
                                        />
                                        <FormInput
                                            label='Last Name'
                                            type='text'
                                            name='lastName'
                                            focused
                                            required
                                        />
                                        <FormInput
                                            label='Enter your email'
                                            type='email'
                                            name='email'
                                            focused
                                            required
                                        />
                                        <FormInput
                                            type='password'
                                            label='Password'
                                            name='password'
                                            required
                                            focused
                                        />
                                        <FormInput
                                            type='password'
                                            label='Confirm Password'
                                            name='passwordConfirm'
                                            required
                                            focused
                                        />

                                        <LoadingButton
                                            loading={isLoading}
                                            type='submit'
                                            variant='contained'
                                            sx={{
                                                padding: '0.8rem',
                                                marginTop: 2,
                                                width: '50%',
                                                margin: 'auto',
                                            }}
                                        >
                                            Sign Up
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center'>
                                <Stack sx={{ marginTop: '3rem', textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        Already have an account? <LinkItem to='/'>Login</LinkItem>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </FormProvider>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignupPage;