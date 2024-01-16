import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../utils/userContext";


export const RequireAuth = ({ allowed }) => {

    const { auth } = useContext(UserContext)
    const location = useLocation()

    return (
        allowed.includes(auth.type)
            ? <Outlet />
            : auth?.userId
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );

}

