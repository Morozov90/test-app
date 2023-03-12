import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../../components';
import { useMutation } from "react-query";
import { loginUserFn } from "../../api/authApi";
import { IErrorBase, ILoginResponse } from "../../api/types";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LinkItem } from "../../components"
import { useRedirectAuthenticatedUser } from "../../hooks/useRedirectAuthenticatedUser";

const loginSchema = object({
    email: string().min(1, 'Email is required').email('Email is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export type ILogin = InferType<typeof loginSchema>;

const LoginPage = () => {
    const navigate = useNavigate();
    useRedirectAuthenticatedUser();
    const defaultValues: ILogin = {
        email: '',
        password: '',
    };

    const methods = useForm<ILogin>({
        resolver: yupResolver(loginSchema),
        defaultValues,
    });

    const { mutate: loginUser, isLoading } = useMutation<ILoginResponse, IErrorBase, ILogin>(
        (userData: ILogin) => loginUserFn(userData),
        {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                navigate('/');
            },
            onError: ({ response}) => {
                toast.error(response?.data.message, {
                    position: "top-right",
                });
            },
        }
    );
    const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
        loginUser(values);
    };

    return (
        <Container
            data-testid='loginPage'
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
                    sx={{ maxWidth: '40rem', width: '100%', backgroundColor: '#fff' }}
                >
                    <FormProvider {...methods}>
                        <Grid
                            container
                            sx={{
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                padding: '6rem',
                            }}
                        >
                            <Grid
                                item
                                container
                                justifyContent='space-between'
                                rowSpacing={5}
                                sx={{
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
                                            Log into your account
                                        </Typography>

                                        <FormInput
                                            label='Enter your email'
                                            type='email'
                                            name='email'
                                            focused
                                            required
                                            data-testid='email'
                                        />
                                        <FormInput
                                            type='password'
                                            label='Password'
                                            name='password'
                                            required
                                            focused
                                            data-testid='password'
                                        />

                                        <LoadingButton
                                            loading={isLoading}
                                            type='submit'
                                            variant='contained'
                                            data-testid='submitButton'
                                            sx={{
                                                padding: '0.8rem',
                                                marginTop: 2,
                                                width: '80%',
                                                margin: 'auto',
                                            }}
                                        >
                                            Login
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center'>
                                <Stack sx={{ marginTop: '3rem', textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        Need an account?{' '}
                                        <LinkItem data-testid='registerLink' to='/register'>Sign up here</LinkItem>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;