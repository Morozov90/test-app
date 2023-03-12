import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


export function useRedirectAuthenticatedUser() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            navigate('/');
        }
    }, [token, navigate])

}