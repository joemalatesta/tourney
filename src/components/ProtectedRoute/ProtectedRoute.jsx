import { Navigate } from "react-router-dom"
import NotAuthorized from "./NotAuthorized"

const ProtectedRoute = ({ user, children, profile }) => {
  console.log(profile);
  if(profile?.accessLevel < 90 ) return <NotAuthorized />
  if (!user) return <Navigate to="/auth/login" />
  return children
}

export default ProtectedRoute
