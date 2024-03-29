import { Navigate } from "react-router-dom"
import NotAuthorized from "./NotAuthorized"

const ProtectedRoute = ({ user, children, profile, access }) => {
  if (profile?.accessLevel < parseInt(access)) return <NotAuthorized />
  if (!user) return <Navigate to="/auth/login" />
  return children
}

export default ProtectedRoute
