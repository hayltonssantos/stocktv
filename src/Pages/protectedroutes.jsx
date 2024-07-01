import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UserContext } from '../Context/userContext'

const ProtectedRoutes = ({children}) => {

    const { user } = useContext(UserContext)
    const booleanUser = Boolean(user)
    const location = useLocation();  

    
    return user ? children  : <Navigate to="/login" state={{from: location}} />
}

export default ProtectedRoutes