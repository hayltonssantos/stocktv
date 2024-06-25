import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from '../Context/userContext'

const ProtectedRoutes = () => {

    const { user } = useContext(UserContext)
    const booleanUser = Boolean(user)
   

    
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes