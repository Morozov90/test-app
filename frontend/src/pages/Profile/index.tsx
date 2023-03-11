import { Container, Grid, Typography } from '@mui/material';
import { getMeFn } from "../../api/authApi";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(["getMe"], getMeFn, {
        select({ data }) {
            return data;
        },
        onError() {
            localStorage.removeItem('token');
            navigate('/login');
        },
    });

    if(isLoading || !data) {
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>

    }

    return (
        <Container
            data-testid='profilePage'
            maxWidth={false}
            sx={{ height: '100vh', textAlign: 'center', backgroundColor: '#F4F4C8' }}
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
                        <Grid
                            container
                            sx={{
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                padding: '6rem',
                            }}
                        >
                            <Typography variant="h3" data-testid='nameInfo' >
                               Welcome  {data.firstName} {data.lastName}
                            </Typography>
                            <Typography data-testid='emailInfo' sx={{ textAlign: 'center', width: '100%', marginTop: '1rem' }} variant="h4">
                                email:  {data.email}
                            </Typography>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;