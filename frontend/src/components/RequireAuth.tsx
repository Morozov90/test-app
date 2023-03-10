import * as React from "react";
import {
    useLocation,
    Navigate,
} from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem('token');
    let location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}