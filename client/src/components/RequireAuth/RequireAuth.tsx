import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

interface IRequireAuthProps {}

const RequireAuth: FC<IRequireAuthProps> = ({ }) => {
    const { isAuth } = useAuth()
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to='/login' state={{ from: location }} replace/>
    }

    return <Outlet/>
}

export default RequireAuth